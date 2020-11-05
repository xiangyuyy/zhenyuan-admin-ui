<template>
  <div class="app-container">
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="title" label="名称" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <a class="goLook" @click="look(scope.row.key)">查 看</a>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :visible.sync="dialogVisible" width="50%">
      <div>
        <el-table :data="dialogTableData" border style="width: 100%">
          <el-table-column prop="codesetid" label="宏景字段" align="center">
          </el-table-column>
          <el-table-column prop="codeitemid" label="代码" align="center">
          </el-table-column>
          <el-table-column prop="codeitemdesc" label="名称" align="center">
          </el-table-column>
          <el-table-column prop="pycode" label="拼音码" align="center">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCodeItem, getCodeItemList } from "@/api/baseData";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      dialogTableData: [],
    };
  },
  methods: {
    getTableData() {
      getCodeItemList().then((res) => {
        this.tableData = res.data;
      });
    },
    look(key) {
      getCodeItem(key).then((res) => {
        this.dialogTableData = res.data;
      });
      this.dialogVisible = true;
    },
  },
  created() {
    this.getTableData();
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  .el-card {
    padding: 20px 40px;
    .goLook {
      color: blue;
    }
    .goLook:hover {
      color: purple;
    }
  }
}
</style>