<template>
  <div class="sword-wrap">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {},
  computed: {},
  components: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
@import "../../assets/less/mixins.less";
.sword-wrap {
  // background-color: black;
  .setSize(72px, 72px);
  position: relative;
  margin: 20px auto 0 auto;
  border-radius: 50%;
  span {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  :first-child {
    left: 0%;
    top: 0%;
    animation: sword-one 1s linear infinite;
    border-bottom: 3px solid #efeffa;
  }

  :nth-child(2) {
    right: 0%;
    top: 0%;
    animation: sword-two 1s linear infinite;
    border-right: 3px solid #efeffa;
  }

  :last-child {
    right: 0%;
    bottom: 0%;
    animation: sword-three 1s linear infinite;
    border-top: 3px solid #efeffa;
  }

  @keyframes sword-one {
    0% {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    }
  }

  @keyframes sword-two {
    0% {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    }
  }

  @keyframes sword-three {
    0% {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    }
  }
}
</style>
