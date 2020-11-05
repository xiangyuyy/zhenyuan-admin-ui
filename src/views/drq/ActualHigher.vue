<template>
  <div class="app-container">
    <h2>报表查询-实际高于编制</h2>
    <header-form :query-form="queryForm" @query-info="query"></header-form>
    <el-row>
      <el-col :span="4">
        <el-button type="primary">导出</el-button>
      </el-col>
    </el-row>
    <div class="tableContainer">
      <el-table :data="tableData" border>
        <el-table-column type="index" label="选择" width="100" align="center">
        </el-table-column>
        <el-table-column prop="shopName" label="门店名称" align="center">
        </el-table-column>
        <el-table-column prop="name" label="编制要求职称" align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="编制要求职称对应人数"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="idCard" label="世纪人员配置数量" align="center">
        </el-table-column>
        <el-table-column prop="sex" label="差异" align="center">
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryForm.pageNum"
        :page-sizes="[1, 5, 10, 15]"
        :page-size="queryForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import HeaderForm from "./components/HeaderForm";
const defaultForm = {
  region: null,
  shopName: null,
  name: null,
  reportTimeBegin: null,
  reportTimeEnd: null,
  pagrNum: 1,
  pageSize: 5,
};
export default {
  components: {
    HeaderForm,
  },
  data() {
    return {
      queryForm: Object.assign({}, defaultForm),
      tableData: null,
      total: 0,
    };
  },
  methods: {
    query() {
      this.queryForm.pagrNum = 1;
      console.log(1);
    },
    handleSizeChange(newSize) {
      this.queryForm.pagrNum = 1;
      this.queryForm.pageSize = newSize;
    },
    handleCurrentChange(newPage) {
      this.pagrNum = newPage;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 40px;
  .el-row {
    .el-col {
      .el-button {
        padding: 15px 40px;
      }
    }
  }
  .tableContainer {
    margin-top: 20px;
  }
  h2 {
    margin: 0;
  }
}
</style>