<template>
  <div class="app-container">
    <el-card>
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable>
      </el-input>
      <el-tree
        class="filter-tree"
        :data="organizationData"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree"
      >
      </el-tree>
    </el-card>
  </div>
</template>

<script>
import { getAllDepartment } from "@/api/person";

export default {
  data() {
    return {
      filterText: "",
      organizationData: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    getOrganizationData() {
      getAllDepartment().then((res) => {
        this.organizationData = res.data;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
  },
  created() {
    this.getOrganizationData();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  .el-card {
    padding:20px 40px;
    .el-input {
      width: 200px;
      margin: 20px 0;
    }
  }
}
</style>