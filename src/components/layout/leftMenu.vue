<template>
  <el-menu
    :uniqueOpened="true"
    :collapse="isCollapse"
    :default-active="$route.path"
    class="left-menu-vertical"
    background-color="#304057"
    text-color="#fff"
    active-text-color="#409eff"
    :collapse-transition="false"
    :router="true"
  >
    <el-submenu
      :index="`${index}`"
      v-for="(item, index) in menuList"
      :key="index"
    >
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ item.title }}</span>
      </template>
      <template v-if="item.children && item.children.length > 0">
        <el-menu-item
          :index="innerItem.path"
          v-for="(innerItem, innerIndex) in item.children"
          :key="`second_menu_${innerIndex}`"
        >
          <template slot="title">
            <i class="el-icon-s-unfold"></i>
            <span slot="title">{{ innerItem.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-submenu>
  </el-menu>
</template>
<script>
const menuList = [
  {
    title: "测试",
    children: [{ title: "测试", path: "/test" }],
  },
  {
    title: "组件学习",
    children: [{ title: "父子组件生命周期", path: "/comp" }],
  },
  {
    title: "SVG学习",
    children: [{ title: "营销海报", path: "/svg/poster" }],
  },
  {
    title: "CANVAS",
    children: [{ title: "FABRIC", path: "/canvas/fabric" }],
  },
];
export default {
  name: "left-menu",
  components: {},
  props: {
    isCollapse: { type: Boolean, default: false },
  },
  data() {
    return {
      menuList,
    };
  },
};
</script>
