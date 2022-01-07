<template>
  <el-breadcrumb separator="/">
    <template v-if="breadcrumb">
      <el-breadcrumb-item :to="{ path: item.path }" v-for="(item, index) in breadcrumb" :key="`${index}_${item.title}`">{{ item.title }}</el-breadcrumb-item>
    </template>
    <template v-else>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
<script>
export default {
  name: 'bread-crumb',
  components: {},
  data() {
    return {
      breadcrumb: null
    }
  },
  created() {
    const { meta } = this.$route
    Object.assign(this, { breadcrumb: meta.breadcrumb })
  },

  watch: {
    $route: {
      handler: function (newRoute) {
        const { meta } = this.$route
        Object.assign(this, { breadcrumb: meta.breadcrumb })
      },
      deep: true
    }
  }
}
</script>
