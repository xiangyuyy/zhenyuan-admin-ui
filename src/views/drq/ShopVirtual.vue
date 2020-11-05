<template>
  <div class="app-container">
    <h2>报表查询-本店虚挂人员</h2>
    <header-form :query-form="queryForm" @query-info="query"></header-form>
    <el-row>
      <el-col :span="4">
        <el-button type="primary">导出</el-button>
      </el-col>
    </el-row>

    <div class="tableContainer">
      <el-table
        :data="tableData"
        :cell-style="cellStyle"
        :header-cell-style="headerCellStyle"
        border
      >
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="shopName" label="门店名称" align="center">
        </el-table-column>
        <el-table-column prop="drugShopName" label="虚挂人姓名" align="center">
        </el-table-column>
        <el-table-column prop="name" label="虚挂人员实际门店" align="center">
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号码" align="center">
        </el-table-column>
        <el-table-column prop="sex" label="性别" align="center">
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
    headerCellStyle(data) {
      if (data.columnIndex === 1) {
        return "background:#00FFCC";
      } else if (data.columnIndex === 3) {
        return "background:#FFFF66";
      }
      return "";
    },
    cellStyle(data) {
      if (data.columnIndex === 1) {
        return "background:#00FFCC";
      } else if (data.columnIndex === 3) {
        return "background:#FFFF66";
      }
      return "";
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