<template>
  <div class="parent-page-wrap">
    <span>Parent</span>
    <Child></Child>
  </div>
</template>
<script>
import Child from "~/comp/lifecycle/child";
export default {
  data() {
    return {};
  },
  props: {},
  computed: {},
  components: { Child },
  watch: {},
  methods: {},
  beforeCreate() {
    console.log("parent component beforeCreate!");
  },
  created() {
    console.log("parent component created!");
  },
  beforeUpdate() {
    console.log("parent component beforeUpdate!");
  },
  updated() {
    console.log("parent component updated!");
  },
  beforeMount() {
    console.log("parent component beforeMount!");
  },
  mounted() {
    console.log("parent component mounted!");
  },
  beforeDestroy() {
    console.log("parent component beforeDestroy!");
  },
  destroyed() {
    console.log("parent component destroyed!");
  },
};
</script>
<style lang="less" scoped>
.parent-page-wrap {
  background-color: #fff;
}
</style>
