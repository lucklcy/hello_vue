<template>
  <div id="app">
    <Layout>
      <router-view />
    </Layout>
  </div>
</template>
<script>
import Layout from "~/layout";
export default {
  components: {
    Layout,
  },
};
</script>

<style lang="less">
#app {
  .setSize(100%, 100%);
  background-color: #eaedee;
}
</style>
