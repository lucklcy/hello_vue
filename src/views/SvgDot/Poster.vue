<template>
  <div class="svg-dot-poster-wrap">
    <div class="draw-panel">
      <img :src="iimg" alt="图片" />
      <span
        style="
          color: red;
          font-weight: 800;
          font-size: 40px;
          font-family: serif;
        "
        >这是一个标题</span
      >
      <div class="s-shadow" style="box-shadow: -10px -10px 5px #888888">
        阴影
      </div>
    </div>
    <el-button @click="doDownloadSvg">下载</el-button>
  </div>
</template>
<script>
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      iimg: require("../../assets/images/favorite.png"),
    };
  },
  props: {},
  computed: {},
  components: {},
  watch: {},
  methods: {
    doDownloadSvg() {
      html2canvas(document.querySelector(".draw-panel"))
        .then((canvas) => {
          document.body.appendChild(canvas);
          return true;
        })
        .catch((err) => {
          console.log({ err });
        });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.svg-dot-poster-wrap {
  background-color: #fff;
  .draw-panel {
  }
}
</style>
