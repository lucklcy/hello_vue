<template>
  <div class="component-study-wrap">
    <div>组件生命周期</div>
    <Parent></Parent>
  </div>
</template>
<script>
import Parent from "~/comp/lifecycle/parent";
export default {
  data() {
    return {};
  },
  props: {},
  computed: {},
  components: { Parent },
  watch: {},
  methods: {},
  beforeCreate() {
    console.log("Page component beforeCreate!");
  },
  created() {
    console.log("Page component created!");
  },
  beforeUpdate() {
    console.log("Page component beforeUpdate!");
  },
  updated() {
    console.log("Page component updated!");
  },
  beforeMount() {
    console.log("Page component beforeMount!");
  },
  mounted() {
    console.log("Page component mounted!");
  },
  beforeDestroy() {
    console.log("Page component beforeDestroy!");
  },
  destroyed() {
    console.log("Page component destroyed!");
  },
};
</script>
<style lang="less" scoped>
.component-study-wrap {
  background-color: #fff;
}
</style>
