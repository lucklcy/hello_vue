<template>
  <div class="canvas-index-wrap">
    <ComTabs :list="tabList" :bold="true" @click="onTabClick"></ComTabs>
    <router-view></router-view>
  </div>
</template>
<script>
import ComTabs from "~/base/ComTabs";
export default {
  data() {
    return {
      tabList: [
        { id: "fabric", desc: "Fabric" },
        { id: "temp1", desc: "测试一" },
        { id: "temp2", desc: "测试二" },
      ],
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
.canvas-index-wrap {
  background-color: #fff;
  border-radius: 3px;
  .setSize(100%,100%);
}
</style>
