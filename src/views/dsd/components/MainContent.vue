<template>
  <div>
    <!-- 人员添加按钮 -->
    <el-row class="addBtn">
      <el-col :span="2">
        <el-button type="primary" @click="selectAddPerson">
          人员选择添加
        </el-button>
      </el-col>
    </el-row>
    <!-- 列表区域 -->
    <el-table
      :data="tableData"
      :cell-style="cellStyle"
      :header-cell-style="headerCellStyle"
      border
      style="width: 100%"
    >
      <el-table-column label="功能" align="center" width="280">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="$emit('edit-person', scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="$emit('delete-person', scope.row)"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="$emit('update-sort', scope.row)"
            >修改排列序号</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排列序号"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="shopName"
        label="门店"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="drugShopName"
        label="药监门店"
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
      <el-table-column prop="sex" label="性别" align="center"></el-table-column>
      <el-table-column label="出生年月" width="160" align="center">
        <template slot-scope="scope">
          {{ scope.row.birthday | formatDateTime }}
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      <el-table-column
        prop="title"
        label="职称（获得时间)"
        width="200"
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
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="drugTitle"
        label="药监上报职称"
        width="140"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="drugOrg"
        label="药监编制职称"
        width="140"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="drugEducation"
        label="药监学历"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="drugMajor"
        label="药监专业"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="drugPositionAll"
        label="职务或岗位"
        width="160"
        align="center"
      ></el-table-column>
      <el-table-column label="进入本单位时间" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.workTime | formatDateTime }}
        </template>
      </el-table-column>
      <el-table-column
        prop="healthStatus"
        label="健康状况"
        width="120"
        align="center"
      >
        <template slot-scope="{ row }">
          <span v-if="row.healthStatus === 0">不健康</span>
          <span v-else>健康</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="educationStatus"
        label="是否继续教育"
        width="140"
        align="center"
      >
        <template slot-scope="{ row }">
          <span v-if="row.educationStatus === 0">否</span>
          <span v-else>是</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="trainStatus"
        label="是否参加培训"
        width="140"
        align="center"
      >
        <template slot-scope="{ row }">
          <span v-if="row.trainStatus === 0">否</span>
          <span v-else>是</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加人员对话框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="80%"
    >
      <!-- 查询 -->
      <el-card class="headerForm" shadow="never">
        <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input
              v-model="queryInfo.name"
              placeholder="请输入姓名"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="职称">
            <el-select
              v-model="queryInfo.titleIds"
              multiple
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
              v-model="queryInfo.educationId"
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
          <el-form-item label="专业">
            <el-select
              v-model="queryInfo.major"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in majorOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="药监门店是否为空">
            <el-select
              v-model="queryInfo.isNullDrugShopId"
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
          <el-form-item label="人员类别">
            <el-select
              v-model="queryInfo.peopleKindId"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in peopleKindOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职务">
            <el-select
              v-model="queryInfo.drugPositionId"
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
          <el-table-column label="操作" align="center" width="160">
            <template slot-scope="{ row }">
              <el-button type="primary" @click="editDrugInfo(row)"
                >编辑药监信息</el-button
              >
            </template>
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
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="drugShopName"
            label="药监门店"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column prop="name" label="姓名" width="120" align="center">
          </el-table-column>
          <el-table-column
            prop="peopleKind"
            label="人员类别"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="title"
            label="职称（获得时间)"
            width="200"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="drugOrg"
            label="药监职称"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="education"
            label="学历"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="drugEducation"
            label="药监学历"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="major"
            label="专业"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="drugMajor"
            label="药监专业"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="drugPositionAll"
            label="职务或岗位"
            width="150"
            align="center"
          ></el-table-column>
                    <el-table-column
            prop="drugSchool"
            label="药监学校"
            width="150"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum"
          :page-sizes="[1, 3, 5]"
          :page-size="queryInfo.pageSize"
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

    <!-- 编辑药监信息 -->
    <show-dialog
      :is-edit="isEdit"
      :drugMajor="drugMajorList"
      :drugEducation="drugEducationList"
      :drugSchool="drugSchoolList"
      :form="form"
      :showDialogVisible="yaoJiandialog"
      @commit-form="confirmEdit"
      @cancel="editCancel"
    ></show-dialog>
  </div>
</template>

<script>
import {
  getMemberList,
  addPersonal,
  getAllEducation,
  member,
} from "@/api/declare";
import {
  getAllTitle,
  getDrugPosition,
  getMemberMajor,
  getMemberEducation,
  update,
  getMajorSelect,
  getPeopleKindSelect,
  getDrugSchoolOptions,
} from "@/api/person";
import ShowDialog from "@/components/ShowDialog/ShowDialog";
const defaultQueryInfo = {
  titleIds: null,
  educationId: null,
  isNullDrugShopId: null,
  peopleKindId: null,
  major: null,
  shopId: null,
  reportId: null,
  name: null,
  pageNum: 1,
  pageSize: 5,
};

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
export default {
  props: ["content", "sId", "rId"],
  components: {
    ShowDialog,
  },
  data() {
    return {
      tableData: this.content,
      shopId: this.sId,
      reportId: this.rId,
      dialogVisible: false,
      //获取职称 学历 职务
      titleOptions: null,
      educationOptions: null,
      majorOptions: null,
      drugPositionOptions: null,
      peopleKindOptions: null,
      drugShopOptions: [
        { label: "空", value: 0 },
        { label: "非空", value: 1 },
      ],
      // 查询信息
      queryInfo: Object.assign({}, defaultQueryInfo),
      //列表数据
      personList: null,
      selectedList: null,
      //添加参数
      addReportMemberDto: {
        memberIds: [],
        shopId: null,
        reportId: null,
      },
      total: 0,
      // 编辑药监信息
      isEdit: false,
      yaoJiandialog: false,
      //药监专业
      drugMajorList: null,
      // 药监学历
      drugEducationList: null,
      // 药监学校
      drugSchoolList: null,
      //录入/修改表单
      form: Object.assign({}, defaultForm),
    };
  },
  watch: {
    content() {
      this.tableData = this.content;
    },
    sId() {
      this.shopId = this.sId;
    },
    rId() {
      this.reportId = this.rId;
    },
  },
  methods: {
    selectAddPerson() {
      if (this.shopId) {
        this.queryInfo.reportId = this.reportId;
        this.queryInfo.shopId = this.shopId;
        getMemberList(this.queryInfo).then((res) => {
          this.personList = res.data.list;
          console.log(this.personList);
          this.total = res.data.total;
        });
        this.dialogVisible = true;
        this.getTitleList();
        this.getEducationList();
        this.getMajor();
        this.getDrugPositionList();
        this.getPersonKind();
      } else {
        this.$message({
          message: "请选择门店",
          type: "warning",
        });
      }
    },
    //获取职称
    getTitleList() {
      getAllTitle().then((res) => {
        this.titleOptions = res.data;
      });
    },
    //获取学历
    getEducationList() {
      getAllEducation().then((res) => {
        this.educationOptions = res.data;
      });
    },
    // 获取专业
    getMajor() {
      getMajorSelect().then((res) => {
        this.majorOptions = res.data;
      });
    },
    //获取职务
    getDrugPositionList() {
      getDrugPosition().then((res) => {
        this.drugPositionOptions = res.data;
      });
    },
    // 获取人员类别
    getPersonKind() {
      getPeopleKindSelect().then((res) => {
        if (res.code === 200) {
          this.peopleKindOptions = res.data;
        }
      });
    },
    queryPerson() {
      console.log(this.queryInfo.titleIds);
      getMemberList(this.queryInfo).then((res) => {
        this.personList = res.data.list;
        this.total = res.data.total;
      });
    },
    headerCellStyle(data) {
      if (data.columnIndex >= 12 && data.columnIndex <= 15) {
        return "background:#FFFF66";
      }
      return "";
    },
    cellStyle(data) {
      if (data.columnIndex >= 12 && data.columnIndex <= 15) {
        return "background:#FFFF66";
      }
      return "";
    },
    handleSelectionChange(val) {
      this.addReportMemberDto.memberIds = val.map((item) => item.id);
    },
    addPerson() {
      if (this.addReportMemberDto.memberIds.length) {
        //进行添加确定逻辑
        this.addReportMemberDto.reportId = this.reportId;
        this.addReportMemberDto.shopId = this.shopId;
        addPersonal(this.addReportMemberDto).then((res) => {
          this.$emit("certainInfo");
          this.dialogVisible = false;
          this.queryInfo = Object.assign({}, defaultQueryInfo);
        });
      } else {
        this.$message({
          message: "请选择要添加的人员",
          type: "warning",
        });
      }
    },
    cancel() {
      this.dialogVisible = false;
      this.queryInfo = Object.assign({}, defaultQueryInfo);
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageNum = 1;
      this.queryInfo.pageSize = newSize;
      this.selectAddPerson();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.selectAddPerson();
    },
    headerDialogStyle(data) {
      if (
        data.columnIndex === 4 ||
        data.columnIndex === 8 ||
        data.columnIndex === 10
      ) {
        return "background:#FFFF66";
      }
      return "";
    },
    cellDialogStyle(data) {
      if (
        data.columnIndex === 4 ||
        data.columnIndex === 8 ||
        data.columnIndex === 10
      ) {
        return "background:#FFFF66";
      }
      return "";
    },
    // 编辑药监信息
    editDrugInfo(row) {
      // 获取药监专业
      getMemberMajor(row.id).then((res) => {
        this.drugMajorList = res.data;
      });
      // 获取药监学历
      getMemberEducation(row.id).then((res) => {
        this.drugEducationList = res.data;
      });
      // 获取药监学校
      getDrugSchoolOptions(row.id).then((res) => {
        this.drugSchoolList = res.data;
      });
      member(row.id).then((res) => {
        this.form = res.data;
        this.isEdit = true;
        this.yaoJiandialog = true;
      });
    },
    // 编辑药监信息确定
    confirmEdit() {
      console.log(this.form);
      update(this.form).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.selectAddPerson();
      });
      this.yaoJiandialog = false;
    },
    // 编辑药监信息取消
    editCancel() {
      this.yaoJiandialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.addBtn {
  margin-top: 40px;
}
.el-table {
  margin: 30px 0 0;
}
.dialog-footer {
  display: inline-block;
  margin-top: 80px;
  text-align: center;
  .el-button {
    padding: 15px 40px;
    margin: 0 20px;
  }
}
</style>