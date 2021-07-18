<template>
  <div class="app-container">
    <h2>报表查询-实际高于编制</h2>
    <header-form
      :query-form="queryForm"
      @query-info="query"
      @export-excel="exportExcel"
    ></header-form>
    <div class="tableContainer">
      <el-table :data="tableData" border>
        <el-table-column prop="shopname" label="门店名称" align="center">
        </el-table-column>
        <el-table-column prop="type" label="编制要求职称" align="center">
        </el-table-column>
        <el-table-column prop="num" label="编制要求职称对应人数" align="center">
        </el-table-column>
        <el-table-column prop="nownum" label="实际人员配置数量" align="center">
        </el-table-column>
        <el-table-column prop="diff" label="差异" align="center">
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
import { getgybzMemberList, exportgybzMemberList } from "@/api/dataReport";

const defaultForm = {
  shopId: null,
  pageNum: 1,
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
    getTableData() {
      getgybzMemberList(this.queryForm).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    exportExcel() {
      exportgybzMemberList(this.queryForm).then((res) => {
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
        downloadElement.download = time + "实际高于编制.xlsx";
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
      });
    },
    query() {
      this.queryForm.pageNum = 1;
      this.getTableData();
    },
    handleSizeChange(newSize) {
      this.queryForm.pageNum = 1;
      this.queryForm.pageSize = newSize;
      this.getTableData();
    },
    handleCurrentChange(newPage) {
      this.queryForm.pageNum = newPage;
      this.getTableData();
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