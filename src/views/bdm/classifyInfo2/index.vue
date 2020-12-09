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
        <el-button
          style="float: right; margin-bottom: 20px"
          type="primary"
          @click="addItem()"
          >添加</el-button
        >
        <el-table :data="dialogTableData" border style="width: 100%">
          <el-table-column prop="codesetid" label="宏景字段" align="center">
          </el-table-column>
          <el-table-column prop="codeitemid" label="代码" align="center">
          </el-table-column>
          <el-table-column prop="codeitemdesc" label="名称" align="center">
          </el-table-column>
          <el-table-column prop="pycode" label="拼音码" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="modify(scope.row)">
                编辑
              </el-button>
              <el-button
                type="danger"
                size="mini"
                @click="deleteItem(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 添加、修改对话框 -->
    <el-dialog
      :title="isEdit ? '编辑' : '添加'"
      :visible.sync="dialogVisible1"
      width="30%"
    >
      <div class="box">
        <label>名称</label>
        <el-input v-model="mingcheng"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm(mingcheng)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCodeItem,
  getCodeItemList,
  getCodeItemListFor2,
  updateOrAddCodeItem,
  deleteCodeItem,
} from "@/api/baseData";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      dialogVisible1: false,
      mingcheng: null,
      codeid: null,
      isEdit: false,
      dialogTableData: [],
      paramInfo: {
        codesetid: null,
        codeitemid: null,
        codeitemdesc: null,
        pycode: null,
      },
    };
  },
  methods: {
    getTableData() {
      getCodeItemListFor2().then((res) => {
        this.tableData = res.data;
      });
    },
    look(key) {
      this.paramInfo.codesetid = key;
      getCodeItem(key).then((res) => {
        this.dialogTableData = res.data;
      });
      this.dialogVisible = true;
    },
    modify(row) {
      this.paramInfo = row;
      this.isEdit = true;
      this.mingcheng = row.codeitemdesc;
      this.dialogVisible1 = true;
    },
    editConfirm(params) {
      this.paramInfo.codeitemdesc = params;
      updateOrAddCodeItem(this.paramInfo).then((res) => {
        this.look(this.paramInfo.codesetid);
        this.dialogVisible1 = false;
        this.isEdit = false;
        this.mingcheng = null;
      });
    },
    addItem() {
      this.dialogVisible1 = true;
    },
    deleteItem(row) {
      this.$confirm("是否删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteCodeItem(row).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.look(this.paramInfo.codesetid);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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
  .box {
    text-align: center;
    .el-input {
      width: 200px;
      margin-left: 20px;
    }
  }
}
</style>