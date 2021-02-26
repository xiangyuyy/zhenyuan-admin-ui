<template>
  <div class="app-container">
    <!-- 操作区 -->
    <el-card shadow="never">
      <!-- 查询区域 -->
      <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
        <el-form-item label="门店/区域">
          <el-cascader
            v-model="shopIdList"
            :options="shopOptions"
            :props="cascaderProps"
            :show-all-levels="false"
            clearable
            collapse-tags
            filterable
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
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
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="addPerson">
            药监岗位信息录入
          </el-button>
        </el-col>
        <!--         <el-col :span="4">
          <el-upload :action="uploadURL">
            <el-button type="success" plain>药监期初EXECL导入</el-button>
          </el-upload>
        </el-col> -->
        <el-col :span="4">
          <el-button type="primary" @click="details" plain>详情</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 表格区 -->
    <div class="tableArea">
      <el-table
        :data="userList"
        :cell-style="cellStyle"
        :header-cell-style="headerCellStyle"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="选择" align="center" width="80">
          <template slot-scope="scope">
            <el-radio
              v-model="form.id"
              :label="scope.row.id"
              @change.native="radioChange(scope.row)"
              >&nbsp;
            </el-radio>
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
          width="110"
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
        <el-table-column label="身份证号" width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.idCard }}
          </template>
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          align="center"
        ></el-table-column>
        <el-table-column label="出生年月" width="160" align="center">
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
          prop="title"
          label="职称（获得时间)"
          width="200"
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
          prop="education"
          label="学历"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="major"
          label="专业"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="drugMajor"
          label="药监专业"
          width="120"
          align="center"
        ></el-table-column>
         <el-table-column
          prop="peopleKind"
          label="人员类别"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="drugPositionAll"
          label="职务或岗位"
          width="140"
          align="center"
        ></el-table-column>
        <el-table-column label="参加专业工作时间" width="180" align="center">
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
    <!-- 对话框 -->
    <show-dialog
      :is-edit="isEdit"
      :drugMajor="drugMajorList"
      :drugEducation="drugEducationList"
      :drugSchool="drugSchoolList"
      :form="form"
      :showDialogVisible="dialogVisible"
      @commit-form="addForm"
      @cancel="cancel"
    ></show-dialog>
  </div>
</template>

<script>
import {
  getMemberList,
  update,
  getAllDepartmentShop,
  filterTree,
  getAllTitle,
  getMajorSelect,
  getDrugPosition,
  getMemberMajor,
  getMemberEducation,
  getPeopleKindSelect,
  getDrugSchoolOptions
} from "@/api/person";
import { member, getAllEducation } from "@/api/declare";
import ShowDialog from "@/components/ShowDialog/ShowDialog";
const defaultQueryInfo = {
  // shopId: null,
  shopIds: [],
  name: null,
  drugPositionId: null,
  isNullDrugShopId: null,
  peopleKindId:null,
  major: null,
  educationId: null,
  titleIds: null,
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
  components: {
    ShowDialog,
  },
  data() {
    return {
      //门店
      shopIdList: [],
      shopOptions: [],
      cascaderProps: {
        multiple: true,
        label: "label",
        value: "value",
        children: "children",
      },
      titleOptions: null,
      majorOptions: null,
      //岗位或职务
      drugPositionOptions: null,
      peopleKindOptions:null,
      drugShopOptions: [
        { label: '空', value: 0 },
        { label: '非空', value: 1},
      ],
      // 学历
      educationOptions: null,
      //文件上传地址
      uploadURL: "",
      //查询信息
      queryInfo: Object.assign({}, defaultQueryInfo),
      // 用户列表数据
      userList: null,
      // 控制录入/修改对话框的显示
      dialogVisible: false,
      // 录入/修改表单

      isEdit: null,
      //药监专业
      drugMajorList: null,
      // 药监学历
      drugEducationList: null,
                  // 药监学校
      drugSchoolList: null,
      form: Object.assign({}, defaultForm),
      //总条数
      total: 0,
    };
  },
  methods: {
    getUserList() {
      getMemberList(this.queryInfo).then((res) => {
        this.userList = res.data.list;
        this.total = res.data.total;
      });
    },
    queryPerson() {
      this.queryInfo.pageNum = 1;
      this.getUserList();
      // this.queryInfo = Object.assign({}, defaultQueryInfo);
    },
    //获取门店
    getShopOptions() {
      getAllDepartmentShop().then((res) => {
        this.shopOptions = [filterTree(res.data[0])];
      });
    },
    //获取学历
    getEducationList() {
      getAllEducation().then((res) => {
        this.educationOptions = res.data;
      });
    },
    // handleChange(val) {
    //   this.shopIdList = val;
    //   this.queryInfo.shopId = String([val[Array.from(val).length - 1]]);
    // },
    handleChange(val) {
      this.queryInfo.shopIds = [];
      this.shopIdList = val;
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < val[i].length; j++) {
          if (j === val[i].length - 1) {
            this.queryInfo.shopIds.push(val[i][j]);
          }
        }
      }
      this.queryInfo.shopIds = Array.from([...new Set(this.queryInfo.shopIds)]);
      console.log(this.queryInfo.shopIds);
    },
    //获取职称
    getTitleOptions() {
      getAllTitle().then((res) => {
        this.titleOptions = res.data;
      });
    },
  // 获取人员类别
  getPersonKind(){
    getPeopleKindSelect().then(res=>{
      if(res.code===200){
        this.peopleKindOptions=res.data
      }
    })
  },
    getMajorOptions() {
      getMajorSelect().then((res) => {
        this.majorOptions = res.data;
      });
    },
    //职务
    getDrugPositionOptions() {
      getDrugPosition().then((res) => {
        this.drugPositionOptions = res.data;
      });
    },
    addPerson() {
      if (this.form.id) {
        // 获取药监专业
        getMemberMajor(this.form.id).then((res) => {
          this.drugMajorList = res.data;
        });
        //获取药监学历
        getMemberEducation(this.form.id).then((res) => {
          this.drugEducationList = res.data;
        });
                    // 获取药监学校
      getDrugSchoolOptions(this.form.id).then((res) => {
        this.drugSchoolList = res.data;
      });
        //获取人员信息
        member(this.form.id).then((res) => {
          this.form = res.data;
          this.isEdit = false;
          this.dialogVisible = true;
        });
      } else {
        this.$message({
          message: "请选择要录入的人员",
          type: "warning",
        });
      }
    },
    details() {
      if (this.form.id) {
        this.$router.push({
          path: "/opm/details",
          query: {
            id: this.form.id,
          },
        });
      } else {
        this.$message({
          message: "请选择查看详情的人员",
          type: "warning",
        });
      }
    },
    radioChange(row) {
      this.form.id = row.id;
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
    cancel() {
      this.dialogVisible = false;
    },
    addForm(params) {
      update(params).then((res) => {
        this.getUserList();
        this.dialogVisible = false;
        this.$message({
          message: "录入成功",
          type: "success",
        });
      });
    },
    headerCellStyle(data) {
      if (data.columnIndex === 2) {
        return "background:#00FFCC";
      } else if (
        data.columnIndex === 3 ||
        (data.columnIndex >= 10 && data.columnIndex <= 12) ||
        (data.columnIndex >= 15 && data.columnIndex <= 17)
      ) {
        return "background:#FFFF66";
      }
      return "";
    },
    cellStyle(data) {
      if (data.columnIndex === 2) {
        return "background:#00FFCC";
      } else if (
        data.columnIndex === 3 ||
        (data.columnIndex >= 10 && data.columnIndex <= 12) ||
        (data.columnIndex >= 15 && data.columnIndex <= 17)
      ) {
        return "background:#FFFF66";
      } else if (data.columnIndex >= 18 && data.columnIndex <= 20) {
        return "background:#33CC66";
      }
      return "";
    },
  },
  created() {
    this.getUserList();
    this.getShopOptions();
    this.getEducationList();
    this.getPersonKind();
    this.getTitleOptions();
    this.getMajorOptions();
    this.getDrugPositionOptions();
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  padding: 20px;
  .el-form {
    border-bottom: 2px solid #ccc;
    .el-cascader {
      width: 260px;
    }
    .el-input {
      width: 120px;
    }
    .el-select {
      margin-left: 5px;
      width: 140px;
    }
  }
  .el-row {
    margin-top: 20px;
  }
}
.el-form-item {
  margin: 10px 20px 10px 0;
}
.tableArea {
  margin-top: 40px;
}
</style>