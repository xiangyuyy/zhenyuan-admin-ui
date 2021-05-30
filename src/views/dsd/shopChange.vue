<template>
  <div class="app-container">
    <el-card class="header" shadow="never">
      <h2>门店变更录入</h2>
      <el-row :gutter="20">
        <el-col :span="8">
          <label>门店</label>
          <el-cascader
            expand-trigger="hover"
            filterable
            clearable
            v-model="shopIdList"
            :options="shopOptions"
            :props="cascaderProps"
            :show-all-levels="false"
            @change="handleChange"
          ></el-cascader>
        </el-col>
        <el-col :span="2">
          <div class="queryGo">
            <el-button type="primary" @click="queryMsg"> 查询 </el-button>
          </div>
        </el-col>
        <el-col :span="14">
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

    <div>
      <el-button type="primary" @click="addNewPerson">新增人员</el-button>
    </div>

    <div class="table-container">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column label="功能" align="center" width="110">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="changeApplication(scope.row)"
              >变更申请</el-button
            >
          </template>
        </el-table-column>
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
        <!-- <el-table-column
          prop="isInvitual"
          label="是否虚挂"
                    width="100"
          align="center"
        ></el-table-column> -->
        <el-table-column
          prop="drugTitle"
          label="药监上报职称"
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
    <div class="tiJiao_btn">
      <el-button type="primary" v-if="isShowChange" @click="tiJiaoChange"
        >提交变更</el-button
      >
      <el-button type="primary" v-if="isShowChange" @click="chexiaoChange"
        >撤销变更</el-button
      >
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
            <el-col :span="12">
              <el-form-item label="变更原因">
                <el-select
                  v-model="dialogForm.changeReason"
                  filterable
                  clearable
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

    <!-- 选择变更原因对话框 -->
    <el-dialog
      title="变更原因"
      :visible.sync="showChangeReasonDialog"
      center
      width="30%"
    >
      <div class="reason_row">
        <label>变更原因</label>
        <el-select v-model="bianGengYY" placeholder="请选择变更原因">
          <el-option
            v-for="item in changeReasonOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showChangeReasonDialog = false">取 消</el-button>
        <el-button type="primary" @click="showAddPerson">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加人员对话框 -->
    <el-dialog
      :visible.sync="showAddPersonDialog"
      :close-on-click-modal="false"
      :show-close="false"
      width="80%"
    >
      <!-- 查询 -->
      <el-card class="headerForm" shadow="never">
        <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input
              v-model="addPersonDialogQuery.name"
              placeholder="请输入姓名"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="现有职称">
            <el-select
              v-model="addPersonDialogQuery.titleId"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in titleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历">
            <el-select
              v-model="addPersonDialogQuery.educationId"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in educationOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职务">
            <el-select
              v-model="addPersonDialogQuery.drugPositionId"
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
          <el-form-item>
            <el-button type="primary" @click="queryPerson">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <!-- 表格区域 -->
      <div class="table-container">
        <el-table
          :data="personList"
          :cell-style="cellDialogStyle"
          :header-cell-style="headerDialogStyle"
          border
          @selection-change="handleSelectionChange"
          style="width: 100%"
        >
          <el-table-column type="selection" label="全选" align="center">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="60"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="shopName"
            label="门店"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="drugShopName"
            label="药监门店"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column prop="name" label="姓名" align="center">
          </el-table-column>
          <el-table-column
            prop="title"
            label="职称（获得时间)"
            width="200"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="drugTitle"
            label="药监职称"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="education"
            label="学历"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="major"
            label="专业"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="drugPositionAll"
            label="职务或岗位"
            width="150"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          @size-change="handlePensonSizeChange"
          @current-change="handlePensonCurrentChange"
          :current-page="addPersonDialogQuery.pageNum"
          :page-sizes="[1, 5, 10]"
          :page-size="addPersonDialogQuery.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addPerson">增加</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDrugChangeReportMemberList,
  getShopDrugChangeReportMemberList,
  getMemberRecord,
  updateMemberRecord,
  getShopDrugCount,
  getChangeReportId,
  getMemberList,
  getAllEducation,
  addReportChangeMember,
  addPersonal,
  isChangeStatus,
  sureChanges,
  cancelChanges,
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
  getAllTitle,
  getAllDrugChangeReason,
  getDrugSchoolOptions,
} from "@/api/person";

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

export default {
  data() {
    return {
      // 显示变更原因对话框
      showChangeReasonDialog: false,
      bianGengYY: null,
      // 显示添加人员数据对话框
      showAddPersonDialog: false,
      userList: null,
      //查询数据
      queryInfo: {
        shopId: null,
        pageNum: 1,
        pageSize: 5,
      },
      addPersonDialogQuery: {
        titleId: null,
        educationId: null,
        drugPositionId: null,
        shopId: null,
        reportId: null,
        name: null,
        pageNum: 1,
        pageSize: 5,
      },
      //获取职称 学历 职务
      titleOptions: null,
      educationOptions: null,
      drugPositionOptions: null,
      // 控制添加人员对话框显示
      personList: null,

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
      //门店
      shopOptions: [],
      cascaderProps: {
        label: "label",
        value: "value",
        children: "children",
      },
      shopIdList: [],
      //药监信息对数据
      toolForm: Object.assign({}, defaultToolForm),
      reportId: null,
      //添加参数
      addReportMemberDto: {
        changeReason: null,
        memberIds: [],
        shopId: null,
        reportId: null,
      },
      // 控制提交变更按钮是否显示
      isShowChange: false,
    };
  },
  methods: {
    //获取门店
    getShopOptions() {
      getAllDepartmentShop().then((res) => {
        this.shopOptions = [filterTree(res.data[0])];
      });
    },
    handleChange(val) {
      if (val.length === 0) return;
      this.toolForm = Object.assign({}, defaultToolForm);
      this.queryInfo.shopId = String([val[Array.from(val).length - 1]]);
      this.addPersonDialogQuery.shopId = this.queryInfo.shopId;
      this.addReportMemberDto.shopId = this.queryInfo.shopId;
      getShopDrugCount(this.queryInfo.shopId).then((res) => {
        if (res.data === null) return;
        this.toolForm = res.data;
        if (this.toolForm.subjection === 1) {
          this.toolForm.subjection = "市区";
        } else if (this.toolForm.subjection === 2) {
          this.toolForm.subjection = "乡镇";
        } else {
          this.toolForm.subjection = "村";
        }
        this.toolForm.chineseMedicine === 1
          ? (this.toolForm.chineseMedicine = "有")
          : (this.toolForm.chineseMedicine = "无");
        this.toolForm.longRange === 1
          ? (this.toolForm.longRange = "是")
          : (this.toolForm.longRange = "否");
      });
    },
    // 新增人员
    addNewPerson() {
      getChangeReportId(this.queryInfo.shopId).then((res) => {
        this.reportId = res.data;
        this.addPersonDialogQuery.reportId = res.data;
        this.addReportMemberDto.reportId = res.data;
        this.showChangeReasonDialog = true;
      });
    },
    // 查询人员
    queryPerson() {
      this.addPersonDialogQuery.pageNum = 1;
      getMemberList(this.addPersonDialogQuery).then((res) => {
        this.personList = res.data.list;
        this.total = res.data.total;
      });
    },
        // 分页查询人员
    queryPagePerson() {
      getMemberList(this.addPersonDialogQuery).then((res) => {
        this.personList = res.data.list;
        this.total = res.data.total;
      });
    },
    //获取职称
    // getTitleList() {
    //   getAllTitle().then((res) => {
    //     this.titleOptions = res.data;
    //   });
    // },
    //获取学历
    getEducationList() {
      getAllEducation().then((res) => {
        this.educationOptions = res.data;
      });
    },
    //获取职务
    getDrugPositionList() {
      getDrugPosition().then((res) => {
        this.drugPositionOptions = res.data;
      });
    },
    // 获得人员列表
    getPersonList() {
      this.queryPerson();
      this.getEducationList();
      this.getDrugPositionList();
      this.getTitleList();
    },
    queryMsg() {
      this.queryInfo.pageNum = 1;
      this.getUserList();
      isChangeStatus(this.queryInfo.shopId).then((res) => {
        this.isShowChange = res.data;
      });
    },
    // 获得表格数据
    getUserList() {
      getShopDrugChangeReportMemberList(this.queryInfo).then((res) => {
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
      getAllTitle().then((res) => {
        this.titleOptions = res.data;
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
    // 显示
    showAddPerson() {
      this.addReportMemberDto.changeReason = this.bianGengYY;
      this.getPersonList();
      this.showChangeReasonDialog = false;
      this.showAddPersonDialog = true;
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
        this.isShowChange = true;
        // this.$message({
        //   message: "变更信息成功",
        //   type: "success",
        // });
        // this.$router.push("/dsd/console");
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
    handlePensonSizeChange(newSize) {
      this.addPersonDialogQuery.pageNum = 1;
      this.addPersonDialogQuery.pageSize = newSize;
      this.queryPagePerson();
    },
    handlePensonCurrentChange(newPage) {
      this.addPersonDialogQuery.pageNum = newPage;
      this.queryPagePerson();
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
    handleSelectionChange(val) {
      this.addReportMemberDto.memberIds = val.map((item) => item.id);
    },
    addPerson() {
      console.log(this.addReportMemberDto.memberIds);
      if (this.addReportMemberDto.memberIds.length) {
        addReportChangeMember(this.addReportMemberDto).then((res) => {
          this.getUserList();
          this.isShowChange = true;
          this.showAddPersonDialog = false;
          this.addPersonDialogQuery.titleId = null;
          this.addPersonDialogQuery.educationId = null;
          this.addPersonDialogQuery.drugPositionId = null;
        });
      } else {
        this.$message({
          message: "请选择要添加的人员",
          type: "warning",
        });
      }
    },
    cancel() {
      this.showAddPersonDialog = false;
    },
    headerDialogStyle(data) {
      if (data.columnIndex === 2) {
        return "background:#00FFCC";
      } else if (
        data.columnIndex === 5 ||
        data.columnIndex === 8 ||
        data.columnIndex === 9
      ) {
        return "background:#FFFF66";
      }
      return "";
    },
    //  提交变更
    tiJiaoChange() {
      sureChanges(this.queryInfo.shopId).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.$router.push("/dsd/console");
        }
      });
    },
    //  撤销变更
    chexiaoChange() {
      cancelChanges(this.queryInfo.shopId).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.queryInfo.pageNum = 1;
          this.getUserList();
          isChangeStatus(this.queryInfo.shopId).then((res) => {
            this.isShowChange = res.data;
          });
        }
      });
    },
    cellDialogStyle(data) {
      if (data.columnIndex === 2) {
        return "background:#00FFCC";
      } else if (
        data.columnIndex === 5 ||
        data.columnIndex === 8 ||
        data.columnIndex === 9
      ) {
        return "background:#FFFF66";
      }
      return "";
    },
  },
  created() {
    // this.getUserList();
    this.getPositionList();
    this.getTitleList();
    this.getOrgList();
    this.getShopOptions();
    this.getChangeReason();
    this.getShopList();
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 220px;
  margin-bottom: 40px;
  .el-row {
    position: relative;
    margin-top: 40px;
    padding: 0 20px;
    .el-col {
      .queryGo {
        margin-top: -20px;
        width: 80px;
        height: 80px;
        padding: 2px;
        box-shadow: 0 0 4px #666;
        border-radius: 38px;
        .el-button {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: left;
          font-size: 16px;
          background-color: #009dd9;
        }
      }
      .tool {
        position: absolute;
        top: 0;
        right: 40px;
        margin-top: -80px;
        display: flex;
        justify-content: center;
        .tool-left {
          padding: 5px;
          width: 260px;
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
.tiJiao_btn {
  margin-top: 20px;
  text-align: center;
  .el-button {
    padding: 15px 40px;
    margin: 40px 20px;
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
.reason_row {
  line-height: 60px;
  display: flex;
  justify-content: center;
  align-content: center;
  label {
    margin-right: 15px;
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