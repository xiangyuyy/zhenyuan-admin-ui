<template>
  <div class="app-container">
    <el-card shadow="never">
      <el-row :gutter="20">
        <el-col :span="4">
          <label>单号</label>
          <span>{{ headerInfo.id }}</span>
        </el-col>
        <el-col :span="4">
          <label>门店</label>
          <span>{{ headerInfo.shopName }}</span>
        </el-col>
        <el-col :span="3">
          <label>操作员</label>
          <span>{{ headerInfo.operatorName }}</span>
        </el-col>
        <el-col :span="5">
          <label>日期</label>
          <el-date-picker
            v-model="headerInfo.reportTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="8">
          <div class="tool">
            <div class="tool-left">
              <div class="toolFormLabel">
                <label>行政隶属</label>
                <span>{{ toolForm.subjection }}</span>
              </div>
              <div class="toolFormLabel">
                <label>有无中药</label>
                <span>{{ toolForm.chineseMedicine }}</span>
              </div>
              <div class="toolFormLabel">
                <label>是否远程</label>
                <span>{{ toolForm.longRange }}</span>
              </div>
              <div class="area">
                <label>药品经营面积</label>
                <span class="mianji">{{ toolForm.area }}</span>
                <span>M2</span>
              </div>
            </div>
            <div class="tool-right">
              <div class="tool-right-item">
                <p>
                  执业药师 <span>{{ toolForm.praPharmacist }}</span>
                </p>
                <p>
                  执业中药师 <span>{{ toolForm.praChinesePharmacist }}</span>
                </p>
                <p>
                  药师 <span>{{ toolForm.pharmacist }}</span>
                </p>
                <p>
                  技工 <span>{{ toolForm.mechanic }}</span>
                </p>
              </div>
            </div>
          </div>
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
        @update-sort="updateSort"
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
    <!-- 修改sort -->
    <el-dialog title="提示" :visible.sync="sortDialogVisible" width="30%">
      <div>
        <el-input v-model="sortVal" placeholder="正序排序"></el-input>
        <p>正序排序</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sortDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSort">确 定</el-button>
      </span>
    </el-dialog>
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
  sureAndExportDrugReport,
  deleteAllDrugReportMember,
  isCanSH,
  getShopDrugCount,
  changeDrugReportMemberSort,
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

const defaultToolForm = {
  shopId: null,
  subjection: null,
  chineseMedicine: null,
  longRange: null,
  area: null,
  praPharmacist: null,
  praChinesePharmacist: null,
  pharmacist: null,
  mechanic: null,
  praPharmacist: null,
  praChinesePharmacist: null,
  pharmacist: null,
  mechanic: null,
};
export default {
  components: {
    MainContent,
    ShowDialog,
  },
  data() {
    return {
      sortDialogVisible: false,
      sortVal: "",
      sortId: "",
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
      //药监信息对话框数据
      toolForm: Object.assign({}, defaultToolForm),
      // //控制药监计算工具对话框的显示
      subjectionOptions: [
        {
          label: "市区",
          value: "1",
        },
        {
          label: "乡镇",
          value: "2",
        },
        {
          label: "村",
          value: "3",
        },
      ],
      chineseMedicineOptions: [
        {
          label: "无",
          value: "0",
        },
        {
          label: "有",
          value: "1",
        },
      ],
      longRangeOptions: [
        {
          label: "否",
          value: "0",
        },
        {
          label: "是",
          value: "1",
        },
      ],
    };
  },
  methods: {
    // 获得药监计算数据
    getYaoJianInfo() {
      console.log(this.$route.query.shopId);
      getShopDrugCount(this.$route.query.shopId).then((res) => {
        this.toolForm = res.data;
        if (this.toolForm.subjection === 1) {
          this.toolForm.subjection = "市区";
        } else if (this.toolForm.subjection === 2) {
          this.toolForm.subjection = "乡镇";
        } else {
          this.toolForm.subjection = "村";
        }
        this.toolForm.chineseMedicine === 1
          ? (this.toolForm.chineseMedicine = "是")
          : (this.toolForm.chineseMedicine = "否");
        this.toolForm.longRange === 1
          ? (this.toolForm.longRange = "是")
          : (this.toolForm.longRange = "否");
      });
    },
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
    updateSort(row) {
      this.sortDialogVisible = true;
      this.sortVal = row.sort;
      this.sortId = row.id;
    },
    editSort() {
      changeDrugReportMemberSort(this.sortId, this.sortVal).then((res) => {
        if (res.code === 200) {
          this.$message.success("修改成功!");
          this.sortDialogVisible = false;
          this.getPersonList();
        } else {
          this.$message.error("修改失败!");
        }
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
    // 保存导出
    saveAndExport() {
      //this.showBtnDialogVisible = false;
      //this.$router.push("/dsd/console");
      sureAndExportDrugReport({ reportId: this.queryInfo.reportId }).then(
        (res) => {
          this.$message({
            message: "保存成功",
            type: "success",
          });
          this.showBtnDialogVisible = false;
          this.$router.push("/dsd/console");
        }
      );
    },
    // 保存不导出
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
    this.getYaoJianInfo();
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 40px;
}

.el-row {
  padding: 0 10px;
  .el-col {
    .tool {
      display: flex;
      .tool-left {
        padding: 5px;
        width: 240px;
        height: 200px;
        margin-right: 25px;
        background-color: #ffdf25;
        box-shadow: 4px 4px 4px #aaa;
        .toolFormLabel {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          font-weight: 400;
          width: 100%;
          line-height: 40px;
          margin: 0 0 10px 0;
          text-align: center;
          label {
            width: 80px;
          }
          span {
            display: inline-block;
            width: 100px;
            background-color: #fff;
          }
        }
        .area {
          text-align: center;
          line-height: 40px;
          label,
          span {
            font-size: 18px;
            font-weight: 700;
          }
          .mianji {
            display: inline-block;
            width: 80px;
            background-color: #fff;
          }
        }
      }

      .tool-right {
        width: 140px;
        height: 80px;
        margin: 5px;
        .tool-right-item {
          position: relative;
          width: 100%;
          padding: 5px;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 10px;
          box-shadow: 4px 4px 4px #aaa;
          background-color: #36a9ce;
          span {
            position: absolute;
            right: 5px;
          }
        }
      }
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