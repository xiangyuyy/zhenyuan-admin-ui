<template>
  <div class="app-container">
    <el-card shadow="never" class="headerCard">
      <h3>{{ headerData.name }}的历史记录</h3>
      <div>
        <el-row>
          <el-col :span="4">
            <label>姓名：</label><span>{{ headerData.name }}</span>
          </el-col>
          <el-col :span="6">
            <label>门店：</label>
            <span>{{ headerData.shopName }}</span>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card class="timer" shadow="never">
      <label>变更日期</label>
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

      <el-button type="primary" @click="queryList">查询</el-button>
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
          prop="title"
          label="职称"
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
import { member, getMemberRecordList } from "@/api/dataReport";
export default {
  data() {
    return {
      headerData: {
        name: null,
        shopName: null,
      },
      userList: null,
      queryInfo: {
        createTimeBegin: null,
        createTimeEnd: null,
        memberId: null,
        pageNum: 1,
        pageSize: 5,
      },
      total: 0,
    };
  },
  methods: {
    //获得头部数据
    getHeaderData() {
      member(this.$route.query.mId).then((res) => {
        this.headerData = res.data;
      });
    },
    getTableData() {
      this.queryInfo.memberId = this.$route.query.mId;
      getMemberRecordList(this.queryInfo).then((res) => {
        console.log(res);
        this.userList = res.data.list;
        this.total = res.data.total;
      });
    },
    queryList() {
      this.getTableData();
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
    headerCellStyle(data) {
      if (data.columnIndex === 3) {
        return "background:#00FFCC";
      }
      return "";
    },
    cellStyle(data) {
      if (data.columnIndex === 3) {
        return "background:#00FFCC";
      }
      return "";
    },
  },
  created() {
    this.getHeaderData();
    this.getTableData();
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