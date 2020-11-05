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
      <el-table-column label="功能" align="center" width="160">
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
        align="center"
      ></el-table-column>
      <el-table-column
        prop="major"
        label="专业"
        width="180"
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
      <el-table-column label="参加专业工作时间" width="180" align="center">
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
          <el-form-item label="现有职称">
            <el-select
              v-model="queryInfo.titleId"
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
          <el-table-column
            prop="drugShopName"
            label="虚拟挂职药店"
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
          :page-sizes="[1, 5, 10]"
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
  </div>
</template>

<script>
import { getMemberList, addPersonal, getAllEducation } from "@/api/declare";
import { getAllTitle, getDrugPosition } from "@/api/person";
const defaultQueryInfo = {
  titleId: null,
  educationId: null,
  drugPositionId: null,
  shopId: null,
  reportId: null,
  pageNum: 1,
  pageSize: 5,
};
export default {
  props: ["content", "sId", "rId"],
  data() {
    return {
      tableData: this.content,
      shopId: this.sId,
      reportId: this.rId,
      dialogVisible: false,
      //获取职称 学历 职务
      titleOptions: null,
      educationOptions: null,
      drugPositionOptions: null,
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
          this.total = res.data.total;
        });
        this.dialogVisible = true;
        this.getTitleList();
        this.getEducationList();
        this.getDrugPositionList();
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
    //获取职务
    getDrugPositionList() {
      getDrugPosition().then((res) => {
        this.drugPositionOptions = res.data;
      });
    },
    queryPerson() {
      getMemberList(this.queryInfo).then((res) => {
        this.personList = res.data.list;
        this.total = res.data.total;
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