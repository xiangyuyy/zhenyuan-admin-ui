<template>
  <div class="app-container">
    <el-card class="header" shadow="never">
      <div class="form">
        <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
          <el-form-item label="单号">
            <el-input
              v-model="queryInfo.reportId"
              clearable
              placeholder="请输入单号"
            ></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="queryInfo.reportTimeBegin"
              type="datetime"
              placeholder="开始"
            >
            </el-date-picker>
            —
            <el-date-picker
              v-model="queryInfo.reportTimeEnd"
              type="datetime"
              placeholder="结束"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="门店/区域">
            <el-cascader
              v-model="shopIdList"
              :options="shopOptions"
              :props="cascaderProps"
              :show-all-levels="false"
              filterable
              clearable
              collapse-tags
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="操作员">
            <el-select
              v-model="queryInfo.operatorId"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in operatorOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select
              v-model="queryInfo.checkStatus"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in checkStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="queryGo">
        <el-button type="primary" @click="queryMsg"> 查询 </el-button>
      </div>
    </el-card>
    <!-- 表格 -->
    <div class="table-container">
      <el-table :data="consoleTableData" border style="width: 100%">
        <el-table-column label="选择" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-if="scope.row.checkStatus === 0"
              @click="editDetail(scope.row)"
            >
              编辑明细
            </el-button>
            <el-button type="text" v-else @click="toChange(scope.row)">
              详情
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="checkStatus" label="审核状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.checkStatus === 0">未审</span>
            <span v-else>已审</span>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" align="center" width="60px">
        </el-table-column>
        <el-table-column prop="id" label="单号" align="center">
        </el-table-column>
        <el-table-column prop="shopName" label="门店" width="140" align="center">
        </el-table-column>
        <el-table-column label="申报建立日期" width="141" align="center">
          <template slot-scope="scope"
            >{{ scope.row.reportTime | formatDateTime }}
          </template>
        </el-table-column>
        <el-table-column prop="operatorName" label="操作员" align="center">
        </el-table-column>
        <el-table-column label="EXCEL导出" align="center" width="300">
          <template slot-scope="{row}">
            <a class="daochu" @click="drive_1(row)"> 普通导出</a>
            <a class="daochu" @click="drive_2(row)">含药监学校导出</a>
          </template>
        </el-table-column>
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
  </div>
</template>

<script>
import { getAllDepartmentShop, filterTree } from "@/api/person";
import {
  getDrugReportList,
  getAllOperator,
  exportDrugReport,
  exportSpecialDrugReport,
} from "@/api/declare";

export default {
  data() {
    return {
      consoleTableData: null,
      //查询数据
      queryInfo: {
        reportId: null,
        reportTimeBegin: null,
        reportTimeEnd: null,
        // shopId: null,
        shopIds: [],
        operatorId: null,
        checkStatus: null,
        pageNum: 1,
        pageSize: 5,
      },
      //门店
      shopIdList: [],
      shopOptions: [],
      cascaderProps: {
        multiple: true,
        label: "label",
        value: "value",
        children: "children",
      },
      operatorOptions: null,
      checkStatusOptions: [
        { label: "未审", value: "0" },
        { label: "已审", value: "1" },
      ],
      //总条数
      total: 0,
    };
  },
  methods: {
    //获取门店
    getShopList() {
      getAllDepartmentShop().then((res) => {
        this.shopOptions = [filterTree(res.data[0])];
      });
    },
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
    getTableData() {
      getDrugReportList(this.queryInfo).then((res) => {
        this.consoleTableData = res.data.list;
        this.total = res.data.total;
      });
    },
    //操作员
    getOperator() {
      getAllOperator().then((res) => {
        this.operatorOptions = res.data;
      });
    },
    queryMsg() {
      this.queryInfo.pageNum = 1;
      this.getTableData();
    },
    //编辑明细
    editDetail(row) {
      console.log("row", row);
      this.$router.push({
        path: "/dsd/editDetail/",
        query: { reportId: row.id, shopId: row.shopId },
      });
    },
    //变更
    toChange(row) {
      this.$router.push({ path: "/dsd/change/", query: { data: row } });
    },
    // 普通导出
    drive_1(row) {
      exportDrugReport(row.id).then((res) => {
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
        downloadElement.download = time + "普通导出.xlsx";
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
      });
    },
    drive_2(row) {
      exportSpecialDrugReport(row.id).then((res) => {
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
        downloadElement.download = time + "含药监学校导出.xlsx";
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
      });
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageNum = 1;
      this.queryInfo.pageSize = newSize;
      this.getTableData();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getTableData();
    },
  },
  created() {
    this.getShopList();
    this.getTableData();
    this.getOperator();
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  margin-bottom: 40px;
  .form {
    padding-top: 15px;
    .el-cascader {
      width: 260px;
    }
    .el-input,
    .el-select {
      width: 160px;
    }
    .el-form-item {
      margin-right: 40px;
    }
  }
  .queryGo {
    position: absolute;
    top: 15px;
    right: 50px;
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
}
/deep/ .el-date-editor .el-range-separator {
  width: 6%;
}
.daochu {
  color: blue;
  &:nth-child(1){
    margin-right: 20px;
  }
}
.daochu:hover {
  color: purple;
  cursor: pointer;
}
</style>