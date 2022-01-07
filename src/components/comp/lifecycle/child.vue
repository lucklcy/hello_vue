<template>
  <div class="child-page-wrap">
    <h1>Child:{{ test_data.count }}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    test_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {},
  components: {},
  watch: {},
  methods: {},
  beforeCreate() {
    console.log("child component beforeCreate!");
  },
  created() {
    console.log("child component created!");
  },
  beforeUpdate() {
    console.log("child component beforeUpdate!");
  },
  updated() {
    console.log("child component updated!");
  },
  beforeMount() {
    console.log("child component beforeMount!");
  },
  mounted() {
    console.log("child component mounted!");
  },
  beforeDestroy() {
    console.log("child component beforeDestroy!");
  },
  destroyed() {
    console.log("child component destroyed!");
  },
};
</script>
<style lang="less" scoped>
.child-page-wrap {
  background-color: #fff;
}
</style>
