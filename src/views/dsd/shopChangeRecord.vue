<template>
  <div class="app-container">
    <el-card shadow="never" class="headerCard">
      <h3>门店申报变更记录查询</h3>
      <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
        <el-form-item label="门店/区域">
          <el-cascader
            expand-trigger="hover"
            filterable
            v-model="shopIdList"
            :options="shopOptions"
            :props="cascaderProps"
            :show-all-levels="false"
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
        <el-form-item label="变更原因">
          <el-select
            v-model="queryInfo.changeReason"
            placeholder="请选择变更原因"
          >
            <el-option
              v-for="item in bianGengReasonOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="queryInfo.createTimeBegin"
            type="date"
            placeholder="开始"
          >
          </el-date-picker
          >—
          <el-date-picker
            v-model="queryInfo.createTimeEnd"
            type="date"
            placeholder="结束"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryList">查询</el-button>
          <el-button type="primary" plain @click="exportShopMemberRecord"
            >导出</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格 -->
    <div class="table-container">
      <el-table
        :data="userList"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="reportId"
          label="单号"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="shopName"
          label="门店"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="drugShopName"
          label="药监门店"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column label="变更日期" width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.createTime | formatDateTime }}
          </template>
        </el-table-column>
        <el-table-column
          prop="changeReason"
          label="变更理由"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="idCard"
          label="身份证号"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          align="center"
        ></el-table-column>
        <el-table-column label="出生年月" width="240" align="center">
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
          prop="drugTitle"
          label="药监职称"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="drugEducation"
          label="药监学历"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="drugMajor"
          label="药监专业"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="drugPositionAll"
          label="职务或岗位"
          width="160"
          align="center"
        ></el-table-column>
        <el-table-column label="参加专业工作时间" width="240" align="center">
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
        <el-table-column label="是否参加培训" width="140" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.trainStatus === 0">否</span>
            <span v-else>是</span>
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
        :page-sizes="[1, 5, 10, 20]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  member,
  getMemberRecordList,
  getShopMemberRecordList,
  exportShopMemberRecordList,
} from "@/api/dataReport";
import { getAllDepartmentShop, getAllDrugChangeReason } from "@/api/person";
export default {
  data() {
    return {
      //门店
      shopOptions: [],
      cascaderProps: {
        label: "label",
        value: "value",
        children: "children",
      },
      shopIdList: [],
      headerData: {
        name: null,
        shopName: null,
      },
      userList: null,
      queryInfo: {
        shopId: null,
        // 变更原因
        changeReason: null,
        name: null,
        createTimeBegin: null,
        createTimeEnd: null,
        pageNum: 1,
        pageSize: 5,
      },
      total: 0,
      bianGengReasonOptions: null,
    };
  },
  methods: {
    //获取门店
    getShopOptions() {
      getAllDepartmentShop().then((res) => {
        this.shopOptions = [filterTree(res.data[0])];
      });
    },
    handleChange(val) {
      console.log(val);
      this.shopIdList = val;
      this.queryInfo.shopId = String([val[Array.from(val).length - 1]]);
      console.log(this.queryInfo.shopId);
    },
    // 获取变更原因
    getChangeReason() {
      getAllDrugChangeReason().then((res) => {
        console.log(res);
        this.bianGengReasonOptions = res.data;
      });
    },
    getTableData() {
      getShopMemberRecordList(this.queryInfo).then((res) => {
        console.log(res);
        this.userList = res.data.list;
        this.total = res.data.total;
      });
    },
    queryList() {
      this.getTableData();
    },
    //导出
    exportShopMemberRecord() {
      exportShopMemberRecordList(this.queryInfo).then((res) => {
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
        downloadElement.download = time + "申报变更记录.xlsx";
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
    // headerCellStyle(data) {
    //   if (data.columnIndex === 3) {
    //     return "background:#00FFCC";
    //   }
    //   return "";
    // },
    // cellStyle(data) {
    //   if (data.columnIndex === 3) {
    //     return "background:#00FFCC";
    //   }
    //   return "";
    // },
  },
  created() {
    // this.getTableData();
    this.getChangeReason();
    this.getShopOptions();
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding-bottom: 20px;
  .headerCard {
    label,
    span {
      font-size: 18px;
      font-weight: 700;
    }
  }
}
h3 {
  margin: 0 0 20px 0;
}
/deep/ .el-date-editor .el-range-separator {
  width: 6%;
}
.timer {
  margin: 40px 0;
}
label {
  span {
    margin-right: 40px;
  }
}
.el-button {
  margin-left: 80px;
}

label {
  margin-right: 10px;
}
</style>