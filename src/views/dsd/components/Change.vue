<template>
  <div class="app-container">
    <el-card class="header" shadow="never">
      <h2>药监申报详情</h2>
      <el-row :gutter="20">
        <el-col :span="6">
          <label>单号</label>
          <span>{{ headerInfo.id }}</span>
        </el-col>
        <el-col :span="6">
          <label>门店</label>
          <span>{{ headerInfo.shopName }}</span>
        </el-col>
        <el-col :span="6">
          <label>操作员</label>
          <span>{{ headerInfo.operatorName }}</span>
        </el-col>
      </el-row>
    </el-card>
    <div class="table-container">
      <el-table
        :data="userList"
        :cell-style="cellStyle"
        :header-cell-style="headerCellStyle"
        border
        style="width: 100%"
      >
        <!--         <el-table-column label="功能" align="center" width="110">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="changeApplication(scope.row)"
              >变更申请</el-button
            >
          </template>
        </el-table-column> -->
        <el-table-column
          prop="sort"
          label="排列序号"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column
          prop="idCard"
          label="身份证号"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          align="center"
        ></el-table-column>
        <el-table-column label="出生年月" width="240" align="center">
          <template slot-scope="scope">
            {{ scope.row.birthday | formatDateTime }}
          </template>
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          align="center"
        ></el-table-column>
                <el-table-column
          prop="drugShopName"
          label="药监门店"
          width="180"
          align="center"
        ></el-table-column>
                <el-table-column
          prop="isInvitual"
          label="是否虚挂"
                    width="100"
          align="center"
        ></el-table-column>
      <el-table-column
          prop="drugTitle"
          label="药监上报制职称"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="drugEducation"
          label="药监学历"
          width="140"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="drugMajor"
          label="药监专业"
          width="140"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="drugSchool"
          label="药监学校"
          align="center"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="drugPositionAll"
          label="职务或岗位"
          width="160"
          align="center"
        ></el-table-column>
        <el-table-column label="参加专业工作时间" width="240" align="center">
          <template slot-scope="scope">
            {{ scope.row.workTime | formatDateTime }}
          </template>
        </el-table-column>
        <el-table-column label="健康状况" width="120" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.healthStatus === 0">不健康</span>
            <span v-else>健康</span>
          </template>
        </el-table-column>
        <el-table-column label="是否继续教育" width="140" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.educationStatus === 0">否</span>
            <span v-else>是</span>
          </template>
        </el-table-column>
        <el-table-column label="是否参加培训" width="140" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.trainStatus === 0">否</span>
            <span v-else>是</span>
          </template>
        </el-table-column>
      </el-table>
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
    <!-- 修改对话框 -->
    <el-dialog
      title="人员信息变更"
      :visible.sync="dialogVisible"
      width="50%"
      class="showDialog"
    >
      <div class="dialog-form">
        <el-form :inline="true" :model="dialogForm" class="demo-form-inline">
          <el-row>
            <el-col :span="8">
              <el-form-item label="岗位一">
                <el-select
                  class="position"
                  v-model="dialogForm.drugPositionOneId"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in drugPositionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="岗位二">
                <el-select
                  class="position"
                  v-model="dialogForm.drugPositionTwoId"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in drugPositionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="岗位三">
                <el-select
                  class="position"
                  v-model="dialogForm.drugPositionThreeId"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in drugPositionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <hr />
          <el-row :gutter="20" class="limitRow">
            <el-col :span="12">
              <el-form-item label="药监上报职称">
                <el-select
                  v-model="dialogForm.drugTitleId"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in drugTitleOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="药监编制职称">
                <el-select
                  v-model="dialogForm.drugOrgId"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in drugOrgOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="limitRow">
            <el-col :span="12">
              <el-form-item label="药监门店">
                <el-select
                  v-model="dialogForm.drugShopId"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in drugShopOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="药监专业">
                <el-select
                  v-model="dialogForm.drugMajorId"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in drugMajorOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="limitRow">
            <el-col :span="12">
              <el-form-item label="药监学历">
                <el-select
                  v-model="dialogForm.drugEducationId"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in drugEducationOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="药监学校">
                <el-select
                  v-model="dialogForm.drugSchool"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in drugSchoolOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="进入本单位时间">
                <el-date-picker
                  v-model="dialogForm.workTime"
                  type="date"
                  clearable
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="limitRow">
            <el-col span="12">
              <el-form-item label="变更原因">
                <el-select
                  v-model="dialogForm.changeReason"
                  placeholder="请选择变更原因"
                >
                  <el-option
                    v-for="item in changeReasonOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="变更时间">
                <el-date-picker
                  v-model="dialogForm.createTime"
                  type="date"
                  clearable
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitChangeApplication"
          >提交变更申请</el-button
        >
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDrugChangeReportMemberList,
  getMemberRecord,
  updateMemberRecord,
} from "@/api/declare";
import {
  getDrugPosition,
  getDrugTitleSelect,
  getDrugOrgSelect,
} from "@/api/showDialog";
import {
  getMemberMajor,
  getMemberEducation,
  getAllDepartmentShop,
  getShopSelect,
  filterTree,
  getAllDrugChangeReason,
      getDrugSchoolOptions,
} from "@/api/person";
export default {
  data() {
    return {
      reportId: null,
      headerInfo: [],
      userList: null,
      //查询数据
      queryInfo: {
        reportId: null,
        pageNum: 1,
        pageSize: 5,
      },
      total: 0,
      drugPositionOptions: null,
      drugTitleOptions: null,
      drugOrgOptions: null,
      drugShopOptions: null,
      drugMajorOptions: null,
      drugEducationOptions: null,
                  drugSchoolOptions: null,
      changeReasonOptions: null,
      //控制变更对话框的显示
      dialogVisible: false,
      dialogForm: {
        memberId: null,
        reportId: null,
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
        createTime: null,
        changeReason: null,
        changeReasonOptions: null,
      },
    };
  },
  methods: {
    getHeaderInfo() {
      this.headerInfo = this.$route.query.data;
      this.queryInfo.reportId = this.$route.query.data.id;
    },
    getUserList() {
      getDrugChangeReportMemberList(this.queryInfo).then((res) => {
        this.userList = res.data.list;
        this.total = res.data.total;
      });
    },
    // 获取岗位
    getPositionList() {
      getDrugPosition().then((res) => {
        this.drugPositionOptions = res.data;
      });
    },
    // 获取上报职称
    getTitleList() {
      getDrugTitleSelect().then((res) => {
        this.drugTitleOptions = res.data;
      });
    },
    // 获取编制职称
    getOrgList() {
      getDrugOrgSelect().then((res) => {
        this.drugOrgOptions = res.data;
      });
    },
    // 获取变更原因
    getChangeReason() {
      getAllDrugChangeReason().then((res) => {
        this.changeReasonOptions = res.data;
      });
    },
    // 获取门店
    getShopList() {
      // getAllDepartmentShop().then((res) => {
      //   this.drugShopOptions = [filterTree(res.data[0])];
      // });
      getShopSelect().then((res) => {
        console.log(res);
        this.drugShopOptions = res.data;
      });
    },
    changeApplication(row) {
      // 获取药监专业
      getMemberMajor(row.memberId).then((res) => {
        this.drugMajorOptions = res.data;
      });
      // 获取药监学历
      getMemberEducation(row.memberId).then((res) => {
        this.drugEducationOptions = res.data;
      });
            // 获取药监学历
      getMemberEducation(row.memberId).then((res) => {
        this.drugEducationOptions = res.data;
      });
              // 获取药监学校
      getDrugSchoolOptions(row.memberId).then((res) => {
        this.drugSchoolOptions = res.data;
      });
      
      getMemberRecord(row.id).then((res) => {
        this.dialogForm = res.data;
        this.dialogVisible = true;
      });
    },
    submitChangeApplication() {
      updateMemberRecord(this.dialogForm).then((res) => {
        this.getUserList();
        this.dialogVisible = false;
        this.$message({
          message: "变更信息成功",
          type: "success",
        });
        this.$router.push("/dsd/console");
      });
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageNum = 1;
      this.queryInfo.pageSize = newSize;
      this.getUserList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getUserList();
    },
    // headerCellStyle(data) {
    //   if (
    //     data.columnIndex === 8 ||
    //     data.columnIndex === 9 ||
    //     data.columnIndex === 12 ||
    //     data.columnIndex === 13
    //   ) {
    //     return "background:#FFFF66";
    //   }
    //   return "";
    // },
    // cellStyle(data) {
    //   if (
    //     data.columnIndex === 8 ||
    //     data.columnIndex === 9 ||
    //     data.columnIndex === 12 ||
    //     data.columnIndex === 13
    //   ) {
    //     return "background:#FFFF66";
    //   } else if (data.columnIndex >= 14 && data.columnIndex <= 17) {
    //     return "background:#33CC66";
    //   }
    //   return "";
    // },
  },
  created() {
    this.getHeaderInfo();
    this.getUserList();
    this.getPositionList();
    this.getTitleList();
    this.getOrgList();
    this.getShopList();
    this.getChangeReason();
  },
};
</script>

<style lang="scss" scoped>
.header {
  .el-row {
    margin-top: 40px;
    padding: 0 20px;
    .el-col {
      label {
        font-size: 20px;
        font-weight: 700;
        margin-right: 20px;
      }
      span {
        font-size: 22px;
        color: #666;
      }
    }
  }
}
.table-container {
  margin-top: 40px;
}
.el-form-item {
  margin: 10px 20px 10px 0;
}
.el-select,
.el-date-editor {
  &:not(.position) {
    width: 230px;
  }
  width: 160px;
}
.dialog-form {
  .el-row {
    padding: 0 20px;
  }
}
/deep/ .el-dialog__body {
  padding: 10px 20px;
}
/deep/ .limitRow .el-form-item__label {
  text-align: left;
  width: 100px;
}
/deep/ .el-dialog__footer {
  text-align: center;
  padding-bottom: 40px;
  .el-button {
    margin: 0 30px;
  }
}
</style>