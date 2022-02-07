<template>
  <div class="layout-container" :class="{ 'menu-collapse': isCollapse }">
    <div class="left-container" :class="{ collapse: isCollapse }">
      <div class="logo">
        <img :src="logoPic" class="logo-pic" />
        <span v-if="!isCollapse">VUE2</span>
        <i
          class="menu-collapse-btn"
          :class="{
            'el-icon-s-fold': !isCollapse,
            'el-icon-s-unfold': isCollapse,
          }"
          @click="toggleCollapse"
        ></i>
      </div>
      <LeftMenu :isCollapse="isCollapse"></LeftMenu>
      <Sword v-show="!isCollapse"></Sword>
      <Clock v-show="!isCollapse"></Clock>
    </div>
    <div class="right-container">
      <header>
        <Breadcrumb></Breadcrumb>
        <div class="right-header">
          <el-avatar shape="square" size="medium" :src="headUrl"></el-avatar>
        </div>
      </header>
      <div class="main-container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import Clock from "./clock.vue";
import LeftMenu from "./leftMenu.vue";
import Breadcrumb from "./breadcrumb.vue";
import Sword from "./sword.vue";
import { storageGet, storageSet } from "@/utils";
import { Y, N } from "@/common/const";

export default {
  name: "layout",
  components: { Clock, LeftMenu, Breadcrumb, Sword },
  props: {},
  data() {
    return {
      isCollapse: storageGet("local", "isCollapse") === Y,
      logoPic: require("@/assets/images/favorite.png"),
      headUrl: require("@/assets/images/favorite.png"),
    };
  },
  methods: {
    toggleCollapse() {
      const { isCollapse } = this;
      storageSet("local", "isCollapse", isCollapse ? N : Y);
      Object.assign(this, { isCollapse: !isCollapse });
    },
  },
};
</script>
<style lang="less" scoped>
.layout-container {
  .setSize(100%, 100%);
  position: relative;
  padding: 0 0 0 224px;
  &.menu-collapse {
    padding: 0 0 0 66px;
  }
  .left-container {
    .setSize(224px, auto);
    .setPosition(absolute, 0, auto, 0, 0);
    overflow-y: auto;
    .scrollBar();
    &.collapse {
      .setSize(66px, auto);
    }
    background-color: #1e2b3d;
    .logo {
      .setSize(100%, 40px);
      .setFlexPos(row, space-around, center);
      color: #fff;
      padding: 4px 0;
      font-size: 16px;
      .menu-collapse-btn {
        font-size: 20px;
        cursor: pointer;
        padding: 4px;
      }
      .logo-pic {
        .setSize(28px, auto);
        border-radius: 50%;
      }
    }
    .left-menu-vertical {
      border-right: none;
    }
  }
  .right-container {
    .setSize(100%, 100%);
    header {
      .setSize(100%, 40px);
      padding: 0 20px;
      .setFlexPos(row, space-between, center);
      border-bottom: 1px solid @border-color;
      background-color: #fff;
      .right-header {
        .setFlexPos(row, space-between, center);
        .setSize(80px, auto);
      }
    }
    .main-container {
      padding: 6px;
      .setSize(100%, calc(100% - 60px));
    }
  }
}
</style>
