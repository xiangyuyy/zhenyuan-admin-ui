<template>
  <div class="app-container">
    <h2>药监计算结果查询</h2>
    <el-card shadow="never">
      <label>门店</label>
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
      <el-button type="primary" plain @click="query"> 查询 </el-button>
    </el-card>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" align="center" width="80px">
      </el-table-column>
      <el-table-column label="行政隶属" align="center">
        <template slot-scope="{ row }">
          <span v-if="row.subjection === 1">市区</span>
          <span v-else-if="row.subjection === 2">乡镇</span>
          <span v-else>村</span>
        </template>
      </el-table-column>
      <el-table-column label="有无中药" align="center">
        <template slot-scope="{ row }">
          <span v-if="row.chineseMedicine === 0">无</span>
          <span v-else>有</span>
        </template>
      </el-table-column>
      <el-table-column label="是否远程" align="center">
        <template slot-scope="{ row }">
          <span v-if="row.longRange === 0">否</span>
          <span v-else>是</span>
        </template>
      </el-table-column>
      <el-table-column prop="area" label="经营面积" align="center">
      </el-table-column>
      <el-table-column prop="praPharmacist" label="执业药师" align="center">
      </el-table-column>
      <el-table-column
        prop="praChinesePharmacist"
        label="执业中药师"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="pharmacist" label="药师" align="center">
      </el-table-column>
      <el-table-column prop="mechanic" label="技工" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllDepartmentShop, getDrugCountList } from "@/api/person";
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
};
export default {
  data() {
    return {
      shopOptions: [],
      cascaderProps: {
        label: "label",
        value: "value",
        children: "children",
      },
      // 获得门店数据列表
      shopIdList: [],

      queryInfo: {
        shopId: null,
        pageNum: 1,
        pageSize: 5,
      },

      // 表格
      tableData: null,
      // 药监工具表单
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
      this.queryInfo.shopId = val[val.length - 1];
    },
    query() {
      this.getTableData();
    },
    // 获得表格数据
    getTableData() {
      getDrugCountList(this.queryInfo).then((res) => {
        this.tableData = res.data.list;
      });
    },
  },
  created() {
    this.getShopOptions();
    // this.getTableData();
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 40px;
  .el-card{
    padding-left: 20px;
    margin: 20px 0;
    label{
      margin-right: 15px;

    }
    .el-button{
      padding: 10px 30px;
      margin-left: 60px;
    }
  }
}
</style>