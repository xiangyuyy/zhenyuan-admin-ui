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
            </el-date-picker
            >—
            <el-date-picker
              v-model="queryInfo.reportTimeEnd"
              type="datetime"
              placeholder="结束"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="门店">
            <el-cascader
              expand-trigger="hover"
              filterable
              clearable
              v-model="shopIdList"
              :options="shopOptions"
              :props="cascaderProps"
              :show-all-levels="false"
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
        <el-button type="primary" @click="queryList"> 查询 </el-button>
      </div>
    </el-card>
    <!-- 表格 -->
    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="选择" align="center">
          <template slot-scope="scope">
            <el-radio
              v-model="selectInfo.reportId"
              :label="scope.row.id"
              @change.native="radioChange(scope.row)"
              >&nbsp;
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="checkStatus" label="审核状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.checkStatus === 0">未审</span>
            <span v-else>已审</span>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column prop="id" label="单号" width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="shopName"
          label="门店"
          width="140"
          align="center"
        >
        </el-table-column>
        <el-table-column label="申报建立日期" width="140" align="center">
          <template slot-scope="scope"
            >{{ scope.row.reportTime | formatDateTime }}
          </template>
        </el-table-column>
        <el-table-column prop="operatorName" label="操作员" align="center">
        </el-table-column>
        <el-table-column label="EXCEL导出" align="center" width="300">
          <template slot-scope="{ row }">
            <a class="daochu" @click="drive_1(row)">普通导出</a>
            <a class="daochu" @click="drive_2(row)">含药监学校导出</a>
          </template>
        </el-table-column>
        <el-table-column label="药监信息" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="yaoJianInfo(scope.row)"
              >药监信息</el-button
            >
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
        :page-sizes="[1, 5, 10, 15]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <div class="table-container">
      <el-table :data="dataList" border style="width: 100%">
        <el-table-column label="功能" align="center" width="140">
          <template slot-scope="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="historyData(row.memberId)"
              >查看历史数据</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="60"
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
          label="药监上报职称"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="drugEducation"
          label="药监学历"
          width="140"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="drugMajor"
          label="药监专业"
          width="140"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="drugSchool"
          label="药监学校"
          align="center"
          width="200"
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
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange_1"
        @current-change="handleCurrentChange_1"
        :current-page="selectInfo.pageNum"
        :page-sizes="[1, 5, 10]"
        :page-size="selectInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total_1"
      >
      </el-pagination>
    </div>

    <!-- 药监信息 -->
    <el-dialog
      title="药监信息"
      :visible.sync="yaoJianInfodialogVisible"
      width="30%"
    >
      <div class="tool">
        <div class="tool-left">
          <div class="toolFormLabel">
            <label>行政隶属</label>
            <span>{{ toolForm.subjection }}</span>
          </div>
          <div class="toolFormLabel">
            <label>有无中药</label>
            <span>{{ toolForm.chineseMedicine }}</span>
          </div>
          <div class="toolFormLabel">
            <label>是否远程</label>
            <span>{{ toolForm.longRange }}</span>
          </div>
          <div class="area">
            <label>药品经营面积</label>
            <span class="mianji">{{ toolForm.area }}</span>
            <span>M2</span>
          </div>
        </div>
        <div class="tool-right">
          <div class="tool-right-item">
            <p>
              执业药师 <span>{{ toolForm.praPharmacist }}</span>
            </p>
            <p>
              执业中药师 <span>{{ toolForm.praChinesePharmacist }}</span>
            </p>
            <p>
              药师 <span>{{ toolForm.pharmacist }}</span>
            </p>
            <p>
              技工 <span>{{ toolForm.mechanic }}</span>
            </p>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDrugReportList,
  getDrugReportMemberList,
  getDrugChangeReportMemberList,
  getAllOperator,
  getShopDrugCount,
  exportDrugReport,
  exportSpecialDrugReport,
} from "@/api/declare";
import { getAllDepartmentShop } from "@/api/person";
const defaultSelectInfo = {
  //选中数据的单号
  reportId: null,
  pageNum: 1,
  pageSize: 5,
};

const defaultToolForm = {
  shopId: null,
  subjection: null,
  chineseMedicine: null,
  longRange: null,
  area: null,
  praPharmacist: null,
  praChinesePharmacist: null,
  pharmacist: null,
  mechanic: null,
  praPharmacist: null,
  praChinesePharmacist: null,
  pharmacist: null,
  mechanic: null,
};

export default {
  data() {
    return {
      //门店
      shopIdList: [],
      shopOptions: [],
      cascaderProps: {
        label: "label",
        value: "value",
        children: "children",
      },
      //查询数据
      queryInfo: {
        reportId: null,
        reportTimeBegin: null,
        reportTimeEnd: null,
        // shopId: null,
        shopIds: null,
        operatorId: null,
        checkStatus: null,
        pageNum: 1,
        pageSize: 5,
      },
      tableData: null,
      operatorOptions: null,
      checkStatusOptions: [
        { label: "未审", value: "0" },
        { label: "已审", value: "1" },
      ],
      //选中通过单号获取数据参数
      selectInfo: Object.assign({}, defaultSelectInfo),
      selectStatus: null,
      //总条数
      total: 0,
      total_1: 0,
      dataList: null,
      // 控制药监信息对话框是否显示
      yaoJianInfodialogVisible: false,
      //药监信息对话框数据
      toolForm: Object.assign({}, defaultToolForm),
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
      this.shopIdList = val;
      this.queryInfo.shopId = String([val[Array.from(val).length - 1]]);
    },
    getTableData() {
      getDrugReportList(this.queryInfo).then((res) => {
        this.queryInfo.reportId = res.data.id;
        this.tableData = res.data.list;
        this.total = res.data.total;
      });
    },
    //操作员
    getOperator() {
      getAllOperator().then((res) => {
        this.operatorOptions = res.data;
      });
    },
    queryList() {
      this.queryInfo.pageNum = 1;
      this.getTableData();
    },
    getUserList() {
      if (this.selectStatus === 0) {
        //未审核的数据
        getDrugReportMemberList(this.selectInfo).then((res) => {
          this.dataList = res.data.list;
          this.total_1 = res.data.total;
        });
      } else {
        //已审核的数据
        getDrugChangeReportMemberList(this.selectInfo).then((res) => {
          this.dataList = res.data.list;
          this.total_1 = res.data.total;
        });
      }
    },
    radioChange(row) {
      this.selectInfo = Object.assign({}, defaultSelectInfo);
      //点击获取对应的数据列表
      this.selectInfo.reportId = row.id;
      this.selectStatus = row.checkStatus;
      this.selectInfo.pageNum = 1;
      this.getUserList();
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
    // 获取药监信息
    yaoJianInfo(row) {
      this.yaoJianInfodialogVisible = true;
      getShopDrugCount(row.shopId).then((res) => {
        this.toolForm = res.data;
        if (this.toolForm.subjection === 1) {
          this.toolForm.subjection = "市区";
        } else if (this.toolForm.subjection === 2) {
          this.toolForm.subjection = "乡镇";
        } else {
          this.toolForm.subjection = "村";
        }
        this.toolForm.chineseMedicine === 1
          ? (this.toolForm.chineseMedicine = "是")
          : (this.toolForm.chineseMedicine = "否");
        this.toolForm.longRange === 1
          ? (this.toolForm.longRange = "是")
          : (this.toolForm.longRange = "否");
      });
    },
    historyData(mId) {
      this.$router.push({ path: "/drq/historyQuery/", query: { mId } });
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
    handleSizeChange_1(newSize) {
      this.selectInfo.pageNum = 1;
      this.selectInfo.pageSize = newSize;
      this.getUserList();
    },
    handleCurrentChange_1(newPage) {
      this.selectInfo.pageNum = newPage;
      this.getUserList();
    },
  },
  created() {
    this.getTableData();
    this.getShopOptions();
    this.getOperator();
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 40px;
}
.header {
  position: relative;
  margin-bottom: 40px;
  .form {
    padding-top: 15px;
    .el-input,
    .el-select,
    .el-date-picker {
      width: 140px;
    }
    .el-form-item {
      margin-right: 30px;
    }
  }
  .queryGo {
    position: absolute;
    top: 15px;
    right: 20px;
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
.pagination-container {
  float: right;
  margin: 5px 0 40px 0;
}
/deep/ .el-date-editor .el-range-separator {
  width: 6%;
}
.daochu {
  color: blue;
  &:nth-child(1) {
    margin-right: 20px;
  }
}
.daochu:hover {
  color: purple;
  cursor: pointer;
}
.tool {
  display: flex;
  justify-content: center;
  .tool-left {
    padding: 5px;
    width: 240px;
    height: 200px;
    margin-right: 25px;
    background-color: #ffdf25;
    box-shadow: 4px 4px 4px #aaa;
    .toolFormLabel {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 400;
      width: 100%;
      line-height: 40px;
      margin: 0 0 10px 0;
      text-align: center;
      label {
        width: 80px;
      }
      span {
        display: inline-block;
        width: 100px;
        background-color: #fff;
      }
    }
    .area {
      text-align: center;
      line-height: 40px;
      label,
      span {
        font-size: 18px;
        font-weight: 700;
      }
      .mianji {
        display: inline-block;
        width: 80px;
        background-color: #fff;
      }
    }
  }

  .tool-right {
    width: 140px;
    height: 80px;
    margin: 5px;
    .tool-right-item {
      position: relative;
      width: 100%;
      padding: 5px;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 10px;
      box-shadow: 4px 4px 4px #aaa;
      background-color: #36a9ce;
      span {
        position: absolute;
        right: 5px;
      }
    }
  }
}
</style>