<template>
  <div class="parent-page-wrap">
    <span>Parent</span>
    <Child :test_data="test_data"></Child>
    <button @click="onAdd">add</button>
  </div>
</template>
<script>
import Child from "~/comp/lifecycle/child";
export default {
  data() {
    return {
      test_data: {
        count: 0,
      },
    };
  },
  props: {},
  computed: {},
  components: { Child },
  watch: {},
  methods: {
    onAdd() {
      let { count } = this.test_data;
      Object.assign(this.test_data, { count: ++count });
    },
  },
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
