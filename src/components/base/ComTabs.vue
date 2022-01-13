<template>
  <ul class="com-tabs-wrap" :class="['offset_' + activeIndex]">
    <li
      v-for="item in tabList"
      class="tab-item"
      :class="{ active: item.active }"
      :key="item.id"
      @click="onClick(item)"
    >
      <i :class="item.iconClass"></i>
      <span class="desc" :style="{ 'font-weight': bold ? 'bold' : 'normal' }">
        {{ item.desc }}</span
      >
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      tabList: [],
      activeIndex: 0,
    };
  },
  props: {
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
    bold: { type: Boolean, default: false },
  },
  watch: {
    list: {
      handler: function () {
        Object.assign(this, {
          tabList: this.list.map((item) => {
            item.active = false;
            return item;
          }),
        });
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {},
  methods: {
    onClick(item) {
      Object.assign(this, {
        tabList: this.tabList.map((innerItem, innerIndex) => {
          if (innerItem.id === item.id) {
            innerItem.active = true;
            Object.assign(this, { activeIndex: innerIndex });
          } else {
            innerItem.active = false;
          }

          return innerItem;
        }),
      });

      this.$emit("click", item);
    },
  },
};
</script>
<style lang="less" scoped>
.com-tabs-wrap {
  background-color: #fff;
  padding: 0;
  position: relative;
  margin: 0;
  .setFlexPos(row, flex-start, center);
  &::before {
    content: " ";
    position: absolute;
    width: 120px;
    height: 3px;
    background-color: #5b93ff;
    bottom: 0;
    transition: left 360ms ease-in-out 0s;
  }
  &.offset_0 {
    &::before {
      left: 10px;
    }
  }
  &.offset_1 {
    &::before {
      left: 144px;
    }
  }
  &.offset_2 {
    &::before {
      left: 280px;
    }
  }
  .tab-item {
    list-style: none;
    width: 120px;
    padding: 16px 0;
    margin: 0 8px;
    text-align: center;
    font-size: 14px;
    color: #35404d;
    cursor: pointer;
    &:hover {
      color: #5b93ff;
    }
    &.active {
      color: #5b93ff;
    }
  }
}
</style>
