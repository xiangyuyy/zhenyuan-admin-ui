<template>
  <div class="app-container">
    <el-card shadow="never">
      <el-row :gutter="20">
        <el-col :span="6">
          <label>单号</label>
          <span>{{ headerInfo.id }}</span>
        </el-col>
        <el-col :span="6">
          <label>门店</label>
          <span>{{ headerInfo.shopName }}</span>
        </el-col>
        <el-col :span="4">
          <label>操作员</label>
          <span>{{ headerInfo.operatorName }}</span>
        </el-col>
        <el-col :span="6">
          <label>日期</label>
          <el-date-picker
            v-model="headerInfo.reportTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-col>
      </el-row>
    </el-card>
    <!-- 主要区域 -->
    <div>
      <main-content
        :sId="shopId"
        :rId="headerInfo.id"
        :content="personList"
        @certainInfo="updateList"
        @edit-person="editPerson"
        @delete-person="deletePerson"
      ></main-content>
    </div>
    <!-- 分页区域 -->
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <div class="btnRow">
      <el-row>
        <el-button v-if="sureStatus" type="primary" @click="checkData"
          >审核</el-button
        >
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button type="danger" @click="clear">清空</el-button>
        <el-button type="warning" @click="goHome">退出</el-button>
      </el-row>
    </div>
    <!-- 按钮对话框 -->
    <el-dialog
      :center="true"
      class="btnCenter"
      :visible.sync="showBtnDialogVisible"
      width="50%"
    >
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="saveAndExport">保存并导出</el-button>
        <el-button type="primary" @click="saveNotExport">保存不导出</el-button>
        <el-button type="info" @click="showBtnDialogVisible = false"
          >取 消</el-button
        >
      </div>
    </el-dialog>
    <!-- 修改对话框 -->
    <show-dialog
      :is-edit="isEdit"
      :drugMajor="drugMajorList"
      :drugEducation="drugEducationList"
      :form="form"
      :showDialogVisible="dialogVisible"
      @commit-form="editForm"
      @cancel="cancel"
    ></show-dialog>
  </div>
</template>


<script>
import {
  getDrugReportMemberList,
  getDrugReport,
  deleteDrugReportMember,
  member,
  passDrugReport,
  sureDrugReport,
  deleteAllDrugReportMember,
  isCanSH,
} from "@/api/declare";
import { update, getMemberMajor, getMemberEducation } from "@/api/person";
import MainContent from "./MainContent";
import ShowDialog from "@/components/ShowDialog/ShowDialog";

const defaultForm = {
  id: null,
  drugPositionOneId: null,
  drugPositionTwoId: null,
  drugPositionThreeId: null,
  drugTitleId: null,
  drugOrgId: null,
  drugShopId: null,
  drugMajorId: null,
  drugEducationId: null,
  workTime: null,
};
export default {
  components: {
    MainContent,
    ShowDialog,
  },
  data() {
    return {
      headerInfo: [],
      queryInfo: {
        reportId: null,
        pageNum: 1,
        pageSize: 5,
      },
      shopId: null,
      personList: null,
      total: 0,
      isEdit: false,
      dialogVisible: false,
      //药监专业
      drugMajorList: null,
      // 药监学历
      drugEducationList: null,
      //录入/修改表单
      form: Object.assign({}, defaultForm),
      //按钮对话框
      showBtnDialogVisible: false,
      sureStatus: false,
    };
  },
  methods: {
    getHeaderInfo() {
      getDrugReport(this.$route.query.reportId).then((res) => {
        this.shopId = res.data.shopId;
        this.headerInfo = res.data;
      });
    },
    getPersonList() {
      this.queryInfo.reportId = this.$route.query.reportId;
      getDrugReportMemberList(this.queryInfo).then((res) => {
        this.personList = res.data.list;
        this.total = res.data.total;
      });
    },
    getSureStatus() {
      isCanSH().then((res) => {
        this.sureStatus = res.data;
      });
    },
    updateList() {
      this.getPersonList();
    },
    editPerson(row) {
      // 获取药监专业
      getMemberMajor(row.memberId).then((res) => {
        this.drugMajorList = res.data;
      });
      // 获取药监学历
      getMemberEducation(row.memberId).then((res) => {
        this.drugEducationList = res.data;
      });
      member(row.memberId).then((res) => {
        this.form = res.data;
      });
      this.isEdit = true;
      this.dialogVisible = true;
    },
    //修改确定
    editForm() {
      update(this.form).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.getPersonList();
        this.dialogVisible = false;
      });
    },
    cancel() {
      this.dialogVisible = false;
    },
    deletePerson(row) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteDrugReportMember(row.id).then((res) => {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            const index = this.personList.findIndex(
              (item) => item.id === row.id
            );
            this.personList.splice(index, 1);
            this.getPersonList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageNum = 1;
      this.queryInfo.pageSize = newSize;
      this.getPersonList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getPersonList();
    },
    checkData() {
      passDrugReport(this.$route.query.reportId).then((res) => {
        this.$message({
          message: "审核成功",
          type: "success",
        });
        this.$router.go(-1);
      });
    },
    confirm() {
      this.showBtnDialogVisible = true;
    },
    saveAndExport() {
      //this.showBtnDialogVisible = false;
      //this.$router.push("/dsd/console");
      sureDrugReport({ reportId: this.queryInfo.reportId }).then((res) => {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        this.showBtnDialogVisible = false;
        this.$router.push("/dsd/console");
      });
    },
    saveNotExport() {
      // console.log(this.queryInfo.reportId);
      sureDrugReport({ reportId: this.queryInfo.reportId }).then((res) => {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        this.showBtnDialogVisible = false;
        this.$router.push("/dsd/console");
      });
    },
    clear() {
      this.$confirm("是否清空?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteAllDrugReportMember(this.queryInfo.reportId).then((res) => {
            this.$message({
              message: "清空人员信息成功",
              type: "success",
            });
            this.personList = [];
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    goHome() {
      this.$router.push("/home");
    },
  },
  created() {
    this.getHeaderInfo();
    this.getPersonList();
    this.getSureStatus();
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 40px;
}

.el-row {
  padding: 0 20px;
  .el-col {
    label {
      font-size: 24px;
      font-weight: 700;
      margin-right: 20px;
    }
    span {
      font-size: 22px;
      color: #666;
    }
  }
}
.btnRow {
  margin-top: 80px;
  text-align: center;
  .el-button {
    padding: 15px 40px;
    margin: 40px 20px;
  }
}
.dialog-footer .el-button {
  padding: 15px 40px;
  margin: 40px 20px;
}
/deep/ .el-dialog--center .el-dialog__body {
  padding: 0;
}
</style>