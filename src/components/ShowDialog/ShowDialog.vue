<template>
  <div>
    <!-- 对话框 -->
    <el-dialog
      :title="edit ? '修改' : '添加'"
      :visible.sync="dialogVisible"
      width="50%"
      :show-close="false"
      :close-on-click-modal="false"
      class="showDialog"
    >
      <div class="dialog-form">
        <el-form :inline="true" :model="dialogForm" class="demo-form-inline">
          <el-row>
            <el-col :span="8">
              <el-form-item label="岗位一">
                <el-select
                  class="position"
                  v-model="dialogForm.drugPositionOneId"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in drugPositionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="岗位二">
                <el-select
                  class="position"
                  v-model="dialogForm.drugPositionTwoId"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in drugPositionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="岗位三">
                <el-select
                  class="position"
                  v-model="dialogForm.drugPositionThreeId"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in drugPositionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <hr />
          <el-row :gutter="20" class="limitRow">
            <el-col :span="12">
              <el-form-item label="药监上报职称">
                <el-select
                  v-model="dialogForm.drugTitleId"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in drugTitleOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="药监编制职称">
                <el-select
                  v-model="dialogForm.drugOrgId"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in drugOrgOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="limitRow">
            <el-col :span="12">
              <el-form-item label="药监门店">
                <!-- <el-cascader
                  v-model="shopId"
                  :options="shopOptions"
                  :props="cascaderProps"
                  clearable
                  :show-all-levels="false"
                  @change="handleChange"
                ></el-cascader> -->
                <el-select
                  v-model="dialogForm.drugShopId"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in drugShopOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="药监专业">
                <el-select
                  v-model="dialogForm.drugMajorId"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in drugMajorOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="limitRow">
            <el-col :span="12">
              <el-form-item label="药监学历">
                <el-select
                  v-model="dialogForm.drugEducationId"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in drugEducationOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="药监学校">
                <el-select
                  v-model="dialogForm.drugSchool"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in drugSchoolOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="进入本单位时间">
                <el-date-picker
                  v-model="dialogForm.workTime"
                  type="date"
                  clearable
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="$emit('commit-form', dialogForm)">
          确 定
        </el-button>
        <el-button @click="$emit('cancel')">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDrugPosition,
  getDrugTitleSelect,
  getDrugSchoolOptions,
  getDrugOrgSelect,
} from "@/api/showDialog";
import { getAllDepartmentShop, getShopSelect, filterTree } from "@/api/person";
export default {
  props: ["showDialogVisible", "isEdit", "drugMajor", "drugEducation", "form", "drugSchool"],
  data() {
    return {
      dialogVisible: this.showDialogVisible,
      dialogForm: this.form,
      edit: this.isEdit,
      drugPositionOptions: null,
      drugTitleOptions: null,
      drugOrgOptions: null,
      drugSchoolOptions: this.drugSchool,
      drugShopOptions: null,
      drugMajorOptions: this.drugMajor,
      drugEducationOptions: this.drugEducation,
      shopOptions: [],
      cascaderProps: {
        expandTrigger: "hover",
        label: "label",
        value: "value",
        children: "children",
      },
      shopId: null,
    };
  },
  watch: {
    showDialogVisible() {
      this.dialogVisible = this.showDialogVisible;
    },
    isEdit() {
      this.edit = this.isEdit;
    },
    drugMajor() {
      this.drugMajorOptions = this.drugMajor;
    },
    drugEducation() {
      this.drugEducationOptions = this.drugEducation;
    },
        drugSchool() {
      this.drugSchoolOptions = this.drugSchool;
    },
    form() {
      this.dialogForm = this.form;
    },
  },
  methods: {
    // 获取岗位
    getPositionList() {
      getDrugPosition().then((res) => {
        this.drugPositionOptions = res.data;
      });
    },
    // 获取上报职称
    getTitleList() {
      getDrugTitleSelect().then((res) => {
        this.drugTitleOptions = res.data;
      });
    },
    // 获取编制职称
    getOrgList() {
      getDrugOrgSelect().then((res) => {
        this.drugOrgOptions = res.data;
      });
    },
    // 获取门店
    getShopList() {
      // getAllDepartmentShop().then((res) => {
      //   this.shopOptions = [filterTree(res.data[0])];
      // });
      getShopSelect().then((res) => {
        this.drugShopOptions = res.data;
      });
    },
    // handleChange(val) {
    //   this.drug = val[3];
    // },
  },
  created() {
    this.getPositionList();
    this.getTitleList();
    this.getOrgList();
    this.getShopList();
  },
};
</script>

<style lang="scss" scoped>
.showDialog {
  padding: 5px 20px;
}
.el-form-item {
  margin: 10px 20px 10px 0;
}
.el-select,
.el-date-editor {
  &:not(.position) {
    width: 230px;
  }
  width: 160px;
}
.dialog-form {
  .el-row {
    padding: 0 20px;
  }
}
/deep/ .el-dialog__footer {
  text-align: center;
  .el-button {
    margin: 0 30px 20px;
  }
}
/deep/ .limitRow .el-form-item__label {
  text-align: left;
  width: 100px;
}
</style>