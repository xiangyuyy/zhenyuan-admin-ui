<template>
  <div class="app-container">
    <h2>报表查询-实际与编制相同人员</h2>
    <header-form
      :query-form="queryForm"
      @query-info="query"
      @export-excel="exportExcel"
    ></header-form>

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
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="name" label="药监门店" align="center">
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
import { getbzxtMemberList, exportbzxtMemberList } from "@/api/dataReport";
const defaultForm = {
  shopName: null,
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
      getbzxtMemberList(this.queryForm).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    exportExcel() {
      exportbzxtMemberList(this.queryForm.shopId).then((res) => {
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
        downloadElement.download = time + "实际与编制相同人员.xlsx";
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