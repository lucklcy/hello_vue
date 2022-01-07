<template>
  <div class="clock dark">
    <div class="display">
      <div class="weekdays">
        <span
          v-for="item in weekdays"
          :key="item.text"
          :class="{ active: item.isActive }"
          v-text="item.text"
        ></span>
      </div>
      <div class="ampm" v-text="ampm"></div>
      <div class="digits">
        <div
          :class="item.className"
          v-for="(item, index) in displayContent"
          :key="index"
        >
          <template v-if="item.isNumber">
            <span class="d1"></span>
            <span class="d2"></span>
            <span class="d3"></span>
            <span class="d4"></span>
            <span class="d5"></span>
            <span class="d6"></span>
            <span class="d7"></span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
const NUM_STR_ARR = "zero,one,two,three,four,five,six,seven,eight,nine".split(
  ","
);

export default {
  name: "clock",
  components: {},
  props: {},

  data() {
    return {
      weekdays: [
        { text: "SUN", isActive: false },
        { text: "MON", isActive: false },
        { text: "TUE", isActive: false },
        { text: "WED", isActive: false },
        { text: "THU", isActive: false },
        { text: "FRI", isActive: false },
        { text: "SAT", isActive: false },
      ],
      ampm: "AM",
      displayContent: [],
    };
  },
  methods: {
    init() {
      const weekday = dayjs().day();
      this.weekdays.forEach(
        (item, index) => (item.isActive = index === weekday)
      );
    },
    generateContent() {
      this.ampm = dayjs().hour() > 12 ? "PM" : "AM";
      const timeString = dayjs().format("HH:mm:ss");
      const content = [...timeString].map((item) => {
        const className = NUM_STR_ARR[parseInt(item)];
        return className
          ? { className, isNumber: true }
          : { className: "dots", isDot: true };
      });
      this.displayContent.splice(0, this.displayContent.length, ...content);
      this.timer = setTimeout(this.generateContent, 1000);
    },
  },
  mounted() {
    this.init();
    this.generateContent();
  },
  onBeforeUnmount() {
    this.timer && clearTimeout(this.timer);
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/less/mixins.less";
.clock {
  transform: scale(0.556, 0.556);
  width: 400px;
  position: fixed;
  left: -89px;
  bottom: -27px;
  .display {
    text-align: center;
    padding: 44px 20px 20px;
    position: relative;
    height: 120px;
  }

  /*----------Light color theme-----------*/

  &.light {
    color: #272e38;
    .weekdays {
      color: #272e38;
    }
    .digits div {
      &.dots::before,
      &.dots::after {
        background-color: #272e38;
      }
      span {
        background-color: #272e38;
        border-color: #272e38;
      }
    }
    .display {
      background-color: rgb(255, 255, 255);
    }
  }

  /*----------Dark color theme-----------*/
  &.dark {
    color: #fff;
    .weekdays {
      color: #fff;
    }
    .digits div {
      span {
        background-color: #cacaca;
        border-color: #cacaca;
      }
      &.dots::before,
      &.dots::after {
        background-color: #cacaca;
      }
    }
    .display {
      background-color: #0d141f;
    }
  }
  /*----------The Digits-----------*/
  .digits {
    padding: 0 50px 0 0;
    div {
      text-align: left;
      position: relative;
      .setSize(28px, 50px);
      display: inline-block;
      margin: 0 4px;
      &.one .d5,
      &.one .d7 {
        opacity: 1;
      }
      &.two .d1,
      &.two .d5,
      &.two .d2,
      &.two .d6,
      &.two .d3 {
        opacity: 1;
      }
      &.three .d1,
      &.three .d5,
      &.three .d2,
      &.three .d7,
      &.three .d3 {
        opacity: 1;
      }
      &.four .d5,
      &.four .d2,
      &.four .d4,
      &.four .d7 {
        opacity: 1;
      }
      &.five .d1,
      &.five .d2,
      &.five .d4,
      &.five .d3,
      &.five .d7 {
        opacity: 1;
      }
      &.six .d1,
      &.six .d2,
      &.six .d4,
      &.six .d3,
      &.six .d6,
      &.six .d7 {
        opacity: 1;
      }
      &.seven .d1,
      &.seven .d5,
      &.seven .d7 {
        opacity: 1;
      }
      &.eight .d1,
      &.eight .d2,
      &.eight .d3,
      &.eight .d4,
      &.eight .d5,
      &.eight .d6,
      &.eight .d7 {
        opacity: 1;
      }
      &.nine .d1,
      &.nine .d2,
      &.nine .d3,
      &.nine .d4,
      &.nine .d5,
      &.nine .d7 {
        opacity: 1;
      }
      &.zero .d1,
      &.zero .d3,
      &.zero .d4,
      &.zero .d5,
      &.zero .d6,
      &.zero .d7 {
        opacity: 1;
      }
      /* The dots */
      &.dots {
        width: 5px;
        &::before,
        &::after {
          .setSize(5px, 5px);
          content: "";
          position: absolute;
          left: 0;
          top: 14px;
        }
        &::after {
          top: 34px;
        }
      }
      span {
        opacity: 0;
        position: absolute;
        transition: 0.25s;
        &::before,
        &::after {
          content: "";
          position: absolute;
          .setSize(0, 0);
          border: 5px solid transparent;
        }
      }
    }
    .d1 {
      .setSize(16px, 5px);
      top: 0;
      left: 6px;
      &::before {
        border-width: 0 5px 5px 0;
        border-right-color: inherit;
        left: -5px;
      }
      &::after {
        border-width: 0 0 5px 5px;
        border-left-color: inherit;
        right: -5px;
      }
    }

    .d2 {
      .setSize(16px, 5px);
      top: 24px;
      left: 6px;
      &::before {
        border-width: 3px 4px 2px;
        border-right-color: inherit;
        left: -8px;
      }
      &::after {
        border-width: 3px 4px 2px;
        border-left-color: inherit;
        right: -8px;
      }
    }
    .d3 {
      .setSize(16px, 5px);
      top: 48px;
      left: 6px;
      &::before {
        border-width: 5px 5px 0 0;
        border-right-color: inherit;
        left: -5px;
      }
      &::after {
        border-width: 5px 0 0 5px;
        border-left-color: inherit;
        right: -5px;
      }
    }
    .d4 {
      .setSize(5px, 14px);
      top: 7px;
      left: 0;
      &::before {
        border-width: 0 5px 5px 0;
        border-bottom-color: inherit;
        top: -5px;
      }
      &::after {
        border-width: 0 0 5px 5px;
        border-left-color: inherit;
        bottom: -5px;
      }
    }
    .d5 {
      .setSize(5px, 14px);
      top: 7px;
      right: 0;
      &::before {
        border-width: 0 0 5px 5px;
        border-bottom-color: inherit;
        top: -5px;
      }
      &::after {
        border-width: 5px 0 0 5px;
        border-top-color: inherit;
        bottom: -5px;
      }
    }
    .d6 {
      .setSize(5px, 14px);
      top: 32px;
      left: 0;
      &::before {
        border-width: 0 5px 5px 0;
        border-bottom-color: inherit;
        top: -5px;
      }
      &::after {
        border-width: 0 0 5px 5px;
        border-left-color: inherit;
        bottom: -5px;
      }
    }
    .d7 {
      .setSize(5px, 14px);
      top: 32px;
      right: 0;
      &::before {
        border-width: 0 0 5px 5px;
        border-bottom-color: inherit;
        top: -5px;
      }
      &::after {
        border-width: 5px 0 0 5px;
        border-top-color: inherit;
        bottom: -5px;
      }
    }
  }
  /* Weekdays */

  .weekdays {
    font-size: 15px;
    width: 100%;
    .setPosition(absolute, 10px, auto, auto, 0);
    text-align: center;
    span {
      opacity: 0.4;
      padding: 0 10px;
      &.active {
        opacity: 1;
      }
    }
  }

  .ampm {
    .setPosition(absolute, auto, 50px, 20px, auto);
    font-size: 18px;
  }
}
</style>
