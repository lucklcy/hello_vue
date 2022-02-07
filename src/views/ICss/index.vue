<template>
  <div class="css-index-wrap">
    <ComTabs :list="tabList" :bold="true" @click="onTabClick"></ComTabs>
    <router-view></router-view>
  </div>
</template>
<script>
import ComTabs from "~/base/ComTabs";
export default {
  data() {
    return {
      tabList: [{ id: "grid", desc: "Grid布局" }],
    };
  },
  props: {},
  computed: {},
  components: {
    ComTabs,
  },
  watch: {},
  methods: {
    onTabClick() {},
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.css-index-wrap {
  background-color: #fff;
  border-radius: 3px;
  .setSize(100%,100%);
}
</style>
