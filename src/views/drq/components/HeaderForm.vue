<template>
  <div>
    <el-card shadow="never">
      <el-form :inline="true" :model="form">
<!--         <el-form-item label="区域">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="门店">
          <el-select v-model="form.shopName" placeholder="请选择">
            <el-option label="门店" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="form.reportTimeBegin"
            type="date"
            placeholder="开始"
          >
          </el-date-picker
          >—
          <el-date-picker
            v-model="form.reportTimeEnd"
            type="date"
            placeholder="结束"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="$emit('query-info',form)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["queryForm"],
  data() {
    return {
      form: this.queryForm,
    };
  },
  watch:{
      queryForm(){
          this.form=this.queryForm
      }
  }
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