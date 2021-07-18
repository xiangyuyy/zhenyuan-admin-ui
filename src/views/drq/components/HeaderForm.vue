<template>
  <div>
    <el-card shadow="never">
      <el-form :inline="true" :model="form">
        <el-form-item label="门店/区域">
          <el-cascader
            v-model="shopIdList"
            :options="shopOptions"
            :props="cascaderProps"
            :show-all-levels="false"
            clearable
            collapse-tags
            filterable
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="$emit('query-info', form)"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-row>
      <el-col :span="4">
        <el-button type="primary" @click="$emit('export-excel')"
          >导出</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAllDepartmentShop, filterTree } from "@/api/person";
export default {
  props: ["queryForm"],
  data() {
    return {
      form: this.queryForm,
      shopOptions: [],
      //门店
      cascaderProps: {
        multiple: true,
        label: "label",
        value: "value",
        children: "children",
      },
      shopIdList: [],
    };
  },
  watch: {
    queryForm() {
      this.form = this.queryForm;
    },
  },
  created() {
    this.getShopOptions();
  },
  methods: {
    //获取门店
    getShopOptions() {
      getAllDepartmentShop().then((res) => {
        this.shopOptions = [filterTree(res.data[0])];
      });
    },
    // handleChange(val) {
    //   this.shopIdList = val;
    //   this.shopId = String([val[Array.from(val).length - 1]]);
    //   console.log(this.shopId);
    //   this.form.shopId = this.shopId;
    // },
    handleChange(val) {
      this.form.shopIds = [];
      this.shopIdList = val;
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < val[i].length; j++) {
          if (j === val[i].length - 1) {
            this.form.shopIds.push(val[i][j]);
          }
        }
      }
      this.form.shopIds = Array.from([...new Set(this.queryInfo.shopIds)]);
      console.log(this.form.shopIds);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin: 30px 0;
  .el-form {
    .el-form-item {
      margin-right: 40px;
    }
  }
}
</style>