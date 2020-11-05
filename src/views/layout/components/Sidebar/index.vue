<template>
  <scroll-bar>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <!-- <el-submenu index="0">
        <template slot="title">
          <i class="iconfont icon-renyuanguanli"></i>
          <span>基础数据管理</span>
        </template>
        <el-menu-item index="/bdm/classifyInfo">
          <template slot="title">
            <i class="iconfont icon-renyuanliebiao"></i>
            <span>分类信息</span>
          </template>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="1">
        <template slot="title">
          <i class="iconfont icon-renyuanguanli"></i>
          <span>组织人员管理</span>
        </template>
        <el-menu-item index="/opm/person">
          <template slot="title">
            <i class="iconfont icon-renyuanliebiao"></i>
            <span>人员列表</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/opm/organization">
          <template slot="title">
            <i class="iconfont icon-zuzhijigou"></i>
            <span>组织机构</span>
          </template>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont icon-guanli"></i>
          <span>药监申报管理</span>
        </template>
        <el-menu-item index="/dsd/entry">
          <template slot="title">
            <i class="iconfont icon-shujuluru"></i>
            <span>药监申报录入</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/dsd/console">
          <template slot="title">
            <i class="iconfont icon-kongzhitai"></i>
            <span>药监申报控制台</span>
          </template>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="iconfont icon-chaxunliebiao"></i>
          <span>数据报表查询</span>
        </template>
        <el-menu-item index="/drq/roster">
          <template slot="title">
            <i class="iconfont icon-querylist"></i>
            <span>药监花名册查询</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/drq/actualHigher">
          <template slot="title">
            <i class="iconfont icon-renyuan"></i>
            <span>实际高于编制</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/drq/actualAndVirtual">
          <template slot="title">
            <i class="iconfont icon-renyuan-shi"></i>
            <span>实际虚挂人员</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/drq/shopVirtual">
          <template slot="title">
            <i class="iconfont icon-renyuan-kong"></i>
            <span>本店虚挂人员</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/drq/equal">
          <template slot="title">
            <i class="iconfont icon-icon-"></i>
            <span>实际与编制相同人员</span>
          </template>
        </el-menu-item>
      </el-submenu> -->

      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import ScrollBar from "@/components/ScrollBar";

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters(["sidebar", "routers"]),
    routes() {
      // return this.$router.options.routes
      return this.routers;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>