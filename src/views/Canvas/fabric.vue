<template>
  <div class="canvas-fabric-wrap">
    <canvas id="canvas" class="canvas"></canvas>
    <el-button @click="zoom(1000)">zoom</el-button>
    <el-button @click="canvasToPng">生成图片</el-button>
    <div>
      <img :src="canvasImg" />
    </div>
  </div>
</template>
<script>
import { fabric } from "fabric"; // 引入 fabric
export default {
  data() {
    return {
      iimg: require("../../assets/images/favorite.png"),
      canvasImg: "",
    };
  },
  props: {},
  computed: {},
  components: {},
  watch: {},
  methods: {
    zoom(width) {
      const { canvas } = this;
      const scale = width / canvas.getWidth();
      const height = scale * canvas.getHeight();

      canvas.setDimensions({ width, height });
      canvas.calcOffset();
      const objects = canvas.getObjects();
      for (const i in objects) {
        const scaleX = objects[i].scaleX;
        const scaleY = objects[i].scaleY;
        const left = objects[i].left;
        const top = objects[i].top;

        objects[i].scaleX = scaleX * scale;
        objects[i].scaleY = scaleY * scale;
        objects[i].left = left * scale;
        objects[i].top = top * scale;

        objects[i].setCoords();
      }
      canvas.renderAll();
    },
    canvasToPng() {
      const { canvas } = this;
      Object.assign(this, {
        canvasImg: canvas.toDataURL({ format: "png", quality: 5 }),
      }); // "png" "jpeg"
    },
    init() {
      const canvas = new fabric.Canvas("canvas", {
        width: 400, // 画布宽度
        height: 400, // 画布高度
        backgroundColor: "#eee", // 画布背景色
        // isDrawingMode: true, // 开启绘图模式
      }); // 这里传入的是canvas元素的id
      Object.assign(this, { canvas });

      // // 设置画笔颜色
      // canvas.freeDrawingBrush.color = "#11999e";

      // // 设置画笔粗细
      // canvas.freeDrawingBrush.width = 10;

      // // 画笔投影
      // canvas.freeDrawingBrush.shadow = new fabric.Shadow({
      //   blur: 10,
      //   offsetX: 10,
      //   offsetY: 10,
      //   affectStroke: true,
      //   color: "#30e3ca",
      // });

      // canvas.setBackgroundImage(
      //   require("@/assets/images/favorite.png"),
      //   canvas.renderAll.bind(canvas),
      //   {
      //     angle: 15, // 旋转背景图
      //   }
      // );

      // 创建一个长方形
      const rect = new fabric.Rect({
        top: 100, // 距离容器顶部 100px
        left: 100, // 距离容器左侧 100px
        width: 30, // 矩形宽度 30px
        height: 30, // 矩形高度 30px
        fill: "red", // 填充 红色
      });
      // 圆形
      const circle = new fabric.Circle({
        top: 100,
        left: 100,
        radius: 50, // 半径：50px
        backgroundColor: "green", // 背景色：绿色
        fill: "orange", // 填充色：橙色
        stroke: "#f6416c", // 边框颜色：粉色
        strokeWidth: 5, // 边框粗细：5px
        strokeDashArray: [20, 5, 14], // 边框虚线规则：填充20px 空5px 填充14px 空20px 填充5px ……
        shadow: "10px 20px 6px rgba(10, 20, 30, 0.4)", // 投影：向右偏移10px，向下偏移20px，羽化6px，投影颜色及透明度
        transparentCorners: false, // 选中时，角是被填充了。true 空心；false 实心
        borderColor: "#16f1fc", // 选中时，边框颜色：天蓝
        borderScaleFactor: 5, // 选中时，边的粗细：5px
        borderDashArray: [20, 5, 10, 7], // 选中时，虚线边的规则
        cornerColor: "#a1de93", // 选中时，角的颜色是 青色
        cornerStrokeColor: "pink", // 选中时，角的边框的颜色是 粉色
        cornerStyle: "circle", // 选中时，叫的属性。默认rect 矩形；circle 圆形
        cornerSize: 20, // 选中时，角的大小为20
        cornerDashArray: [10, 2, 6], // 选中时，虚线角的规则
        selectionBackgroundColor: "#7f1300", // 选中时，选框的背景色：朱红
        padding: 40, // 选中时，选择框离元素的内边距：40px
        borderOpacityWhenMoving: 0.6, // 当对象活动和移动时，对象控制边界的不透明度
      });

      const logo = require("@/assets/images/james.jpg");
      fabric.Image.fromURL(logo, (oImg) => {
        oImg.scale(0.06); // 缩放
        oImg.set({
          left: 10,
          top: 150,
        });
        canvas.add(oImg); // 将图片加入到画布
      });

      const text = new fabric.Text("雷猴啊");
      canvas.add(text);

      canvas.add(circle); // 将圆形添加到 canvas 画布里
      canvas.add(rect); // 将矩形添加到 canvas 画布里

      fabric.Image.fromURL(
        "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27d1b4e5f8824198b6d51a2b1c2d0d75~tplv-k3u1fbpfcp-zoom-crop-mark:400:400:400:400.awebp",
        (img) => {
          console.log({ img });
          // 设置背景图
          // canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          //   scaleX: canvas.width / img.width, // 计算出图片要拉伸的宽度
          //   scaleY: canvas.height / img.height, // 计算出图片要拉伸的高度
          // });
        }
      );
    },
  },
  created() {},
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
.canvas-fabric-wrap {
  background-color: #fff;
  padding: 12px 10px 0 10px;
  .canvas {
    border: 1px solid #ccc;
  }
}
</style>
