<template>
  <div class="app-container">
    <!-- 头部 -->
    <el-card shadow="never">
      <div class="header-container">
        <h1>药监申报录入表</h1>
        <div class="div-container">
          <div>
            <label>单号 </label>
            <span
              style="background: #ccc; padding: 5px 10px"
              v-text="reportId"
            ></span>
          </div>
          <div>
            <label>部门申报建立日期</label>
            <el-date-picker
              v-model="reportTime"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </div>
          <div>
            <label>门店</label>
            <el-cascader
              expand-trigger="hover"
              filterable
              v-model="shopIdList"
              :options="shopOptions"
              :props="cascaderProps"
              :show-all-levels="false"
              @change="handleChange"
            ></el-cascader>
          </div>
          <div>
            <el-button type="primary" @click="toolShow">
              药监计算工具
            </el-button>
          </div>
          <div class="box">
            <p>
              执业药师 <span>{{ formList1.praPharmacist }}</span>
            </p>
            <p>
              执业中药师 <span>{{ formList1.praChinesePharmacist }}</span>
            </p>
            <p>
              药师 <span>{{ formList1.pharmacist }}</span>
            </p>
            <p>
              技工 <span>{{ formList1.mechanic }}</span>
            </p>
          </div>
        </div>
      </div>
    </el-card>
    <!-- 主要内容区 -->
    <div>
      <main-content
        :sId="shopId"
        :rId="reportId"
        :content="personList"
        @certainInfo="getPersonList"
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
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button type="danger" @click="clear">清空</el-button>
        <el-button type="warning" @click="goHome">退出</el-button>
      </el-row>
    </div>
    <!-- 修改对话框 -->
    <show-dialog
      :is-edit="isEdit"
      :drugMajor="drugMajorList"
      :drugEducation="drugEducationList"
      :drugSchool="drugSchoolList"
      :form="form"
      :showDialogVisible="dialogVisible"
      @commit-form="editForm"
      @cancel="cancel"
    ></show-dialog>
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
    <!-- 药监计算工具对话框 -->
    <el-dialog
      title="药监计算工具"
      :visible.sync="toolDialogVisible"
      width="40%"
    >
      <div class="tool">
        <div class="tool-left">
          <el-form :model="toolForm" label-width="80px">
            <el-form-item label="行政隶属">
              <el-select v-model="toolForm.subjection" placeholder="市区(街道)">
                <el-option
                  v-for="item in subjectionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="有无中药">
              <el-select
                v-model="toolForm.chineseMedicine"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in chineseMedicineOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否远程">
              <el-select v-model="toolForm.longRange" placeholder="请选择">
                <el-option
                  v-for="item in longRangeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="area">
            <label>药品经营面积</label>
            <el-input v-model="toolForm.area"></el-input>
            <span>M2</span>
          </div>
        </div>
        <div class="tool-go">
          <el-button @click.native="getDrugCountList">GO</el-button>
        </div>
        <div class="tool-right">
          <div class="tool-right-item">
            <p>
              执业药师 <span>{{ formList2.praPharmacist }}</span>
            </p>
            <p>
              执业中药师 <span>{{ formList2.praChinesePharmacist }}</span>
            </p>
            <p>
              药师 <span>{{ formList2.pharmacist }}</span>
            </p>
            <p>
              技工 <span>{{ formList2.mechanic }}</span>
            </p>
          </div>
          <el-button
            type="primary"
            :disabled="isDisabled"
            @click="sureDrugCountList"
          >
            确 定
          </el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 修改sort -->
    <el-dialog title="提示" :visible.sync="sortDialogVisible" width="30%">
      <div>
        <el-input v-model="sortVal" placeholder="正序排序"></el-input>
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
  getReportId,
  getShopDrugCount,
  getDrugCount,
  sureDrugCount,
  getDrugReportMemberList,
  deleteDrugReportMember,
  member,
  sureDrugReport,
  deleteAllDrugReportMember,
  choseShopAddDrugReportMember,
  changeDrugReportMemberSort,
  exportDrugReport,
} from "@/api/declare";
import {
  update,
  getAllDepartmentShop,
  filterTree,
  getMemberMajor,
  getMemberEducation,
  getDrugSchoolOptions,
} from "@/api/person";
import ShowDialog from "@/components/ShowDialog/ShowDialog";
import MainContent from "./components/MainContent";

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
  drugSchool: null,
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
};
const defaultFormList1 = {
  praPharmacist: 0,
  praChinesePharmacist: 0,
  pharmacist: 0,
  mechanic: 0,
};
const defaultFormList2 = {
  praPharmacist: 0,
  praChinesePharmacist: 0,
  pharmacist: 0,
  mechanic: 0,
};
export default {
  components: {
    ShowDialog,
    MainContent,
  },
  data() {
    return {
      sortDialogVisible: false,
      sortVal: "",
      sortId: "",
      reportId: null,
      //部门申报建立日期
      reportTime: "",
      // 区域
      regionList: [],
      //门店
      shopOptions: [],
      cascaderProps: {
        label: "label",
        value: "value",
        children: "children",
      },
      shopIdList: [],
      shopId: null,
      //控制药监计算工具对话框的显示
      toolDialogVisible: false,
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
      //药监工具表单
      formList1: Object.assign({}, defaultFormList1),
      formList2: Object.assign({}, defaultFormList2),
      toolForm: Object.assign({}, defaultToolForm),
      isDisabled: true,
      // 用户列表数据
      personList: null,
      // 控制添加/修改对话框的显示
      isEdit: false,
      dialogVisible: false,
      //药监专业
      drugMajorList: null,
      // 药监学历
      drugEducationList: null,
            // 药监学校
      drugSchoolList: null,
      //录入/修改表单
      form: Object.assign({}, defaultForm),
      queryInfo: {
        reportId: null,
        pageNum: 1,
        pageSize: 5,
      },
      total: 0,
      //控制确定按钮弹出的对话框的显示
      showBtnDialogVisible: false,
    };
  },
  methods: {
    //获取人员列表
    getPersonList() {
      this.queryInfo.reportId = this.reportId;
      getDrugReportMemberList(this.queryInfo).then((res) => {
        this.personList = res.data.list;
        this.total = res.data.total;
      });
    },
    //获取单号
    getReport() {
      getReportId().then((res) => {
        this.reportId = res.data;
      });
    },
    //获取门店
    getShopOptions() {
      getAllDepartmentShop().then((res) => {
        this.shopOptions = [filterTree(res.data[0])];
      });
    },
    handleChange(val) {
      this.shopIdList = val;
      this.shopId = String([val[Array.from(val).length - 1]]);
      // 根据shopId获取药监数据
      getShopDrugCount(this.shopId).then((res) => {
        if (res.data !== null) {
          this.formList1 = res.data;
        } else {
          this.formList1 = Object.assign({}, defaultFormList1);
        }
      });
      choseShopAddDrugReportMember(this.shopId, this.reportId).then((res) => {
        this.queryInfo.reportId = this.reportId;
        getDrugReportMemberList(this.queryInfo).then((res) => {
          this.personList = res.data.list;
          this.total = res.data.total;
          this.queryInfo.pageNum = 1;
        });
      });
    },
    toolShow() {
      if (this.shopId) {
        this.toolForm = Object.assign({}, defaultToolForm);
        this.formList2 = Object.assign({}, defaultFormList2);
        this.toolForm.shopId = this.shopId;
        this.toolDialogVisible = true;
      } else {
        this.$message({
          message: "请选择门店",
          type: "warning",
        });
      }
    },
    //获取药监数据
    getDrugCountList() {
      getDrugCount(this.toolForm).then((res) => {
        this.formList2 = res.data;
        this.isDisabled = false;
      });
    },
    //确定药监数据
    sureDrugCountList() {
      if (this.formList2) {
        sureDrugCount(this.formList2).then((res) => {
          this.formList1 = this.formList2;
        });
        this.toolDialogVisible = false;
        this.isDisabled = true;
      } else {
        this.$message({
          message: "未计算数据",
          type: "warning",
        });
      }
    },
    confirm() {
      this.showBtnDialogVisible = true;
    },
    saveAndExport() {
      sureDrugReport({
        reportId: this.reportId,
        reportTime: this.reportTime,
      }).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.$message({
            message: "保存成功",
            type: "success",
          });
          exportDrugReport(this.reportId).then((res) => {
            const blob = new Blob([res], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
            });
            var time = new Date();
            time =
              time.getFullYear() +
              "-" +
              (time.getMonth() + 1) +
              "-" +
              time.getDate();
            const downloadElement = document.createElement("a");
            const href = window.URL.createObjectURL(blob);
            downloadElement.href = href;
            downloadElement.download = time + "普通导出.xlsx";
            document.body.appendChild(downloadElement);
            downloadElement.click();
            document.body.removeChild(downloadElement); // 下载完成移除元素
            window.URL.revokeObjectURL(href); // 释放掉blob对象
          });
          this.$router.push("/dsd/console");
        }
        this.showBtnDialogVisible = false;
      });
    },
    saveNotExport() {
      sureDrugReport({
        reportId: this.reportId,
        reportTime: this.reportTime,
      }).then((res) => {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        this.showBtnDialogVisible = false;
        this.$router.push("/dsd/console");
      });
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
            // 获取药监学校
      getDrugSchoolOptions(row.memberId).then((res) => {
        this.drugSchoolList = res.data;
      });
      member(row.memberId).then((res) => {
        this.form = res.data;
        this.isEdit = true;
        this.dialogVisible = true;
      });
    },
    deletePerson(row) {
      this.$confirm("是否删除?", {
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
    //修改确定
    editForm() {
      update(this.form).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.getPersonList();
      });
      this.dialogVisible = false;
    },
    cancel() {
      this.dialogVisible = false;
    },
  },
  created() {
    this.getReport();
    this.getShopOptions();
  },
};
</script>

<style lang="scss" scoped>
.div-container {
  display: flex;
  align-items: center;
  & > div {
    flex: auto;
    label {
      margin-right: 10px;
    }
  }
  .box {
    position: relative;
    padding: 0 10px;
    width: 120px;
    font-weight: 700;
    background-color: #36a9ce;
    span {
      position: absolute;
      right: 20px;
    }
  }
}
.tool::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
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
.tool {
  display: flex;
  justify-content: center;
  .tool-left {
    padding: 20px 10px 0;
    width: 290px;
    height: 260px;
    background-color: #ffdf25;
    box-shadow: 4px 4px 4px #aaa;
    .area {
      label,
      span {
        font-size: 20px;
        font-weight: 700;
      }
      .el-input {
        margin: 0 0 0 10px;
        width: 100px;
        font-size: 16px;
      }
    }
  }
  .tool-go {
    .el-button {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      margin: 80px;
      color: #fff;
      font-weight: 700;
      background-color: #009dd9;
      box-shadow: 2px 2px 4px #aaa;
    }
  }
  .tool-right {
    width: 200px;
    height: 260px;
    .tool-right-item {
      position: relative;
      width: 100%;
      padding: 5px 10px;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 20px;
      box-shadow: 4px 4px 4px #aaa;
      background-color: #36a9ce;
      span {
        position: absolute;
        right: 20px;
      }
    }
    .el-button {
      font-size: 16px;
      padding: 15px 60px;
    }
  }
}
/deep/ .el-dialog--center .el-dialog__body {
  padding: 0;
}
</style>