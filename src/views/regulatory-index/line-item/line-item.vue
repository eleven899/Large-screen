<template>
  <div class="wrapper">
    <div class="title">{{ item.title }}</div>
    <div class="content">
      <div
        class="content-box"
        v-for="(innerItem, innerIndex) in item.info"
        :key="innerIndex"
        :class="{ 'content-big': index > 2 }"
      >
        <img
          class="content-box-img"
          :src="
            require('@/assets/business-img/icon_top_' +
              innerItem.img_url +
              '.svg')
          "
        />
        <div class="content-box-main">
          <span class="content-box-main_title">{{ innerItem.title }}</span>
          <span class="content-box-main_span">{{ innerItem.main }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
} from "vue";
export default defineComponent({
  name: "line-item",
  props: {
    item: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  setup() {
    const data = reactive({});
    onBeforeMount(() => {
      //2.组件挂载页面之前执行----onBeforeMount
    });
    onMounted(() => {
      //3.组件挂载到页面之后执行-------onMounted
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>
<style scoped lang="scss">
.wrapper {
  padding-bottom: 10px;
  background: rgba(7, 6, 72, 0.5);
  border: 1px solid #0464c2;
}
.title {
  width: 345px;
  height: 48px;
  font-size: 20px;
  font-family: "Semibold";
  font-weight: 600;
  color: #ffdeac;
  text-shadow: 0px 0px 8px rgba(254, 238, 155, 0.3);
  text-align: center;
  line-height: 48px;
  background: url(@/assets/business-img/pic_btbg_7.svg) left center no-repeat;
  box-sizing: border-box;
}
.content {
  width: 345px;
  background: rgba(7, 6, 72, 0.5);
  &-box {
    width: 305px;
    height: 88px;
    margin: 16px auto 0 auto;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid rgba(84, 142, 255, 0.39);
    &-img {
      width: 56px;
      height: 56px;
      display: block;
      margin: 0 16px 0 20px;
    }
    &-main {
      padding-top: 5px;
      &_title {
        display: block;
        font-size: 14px;
        font-family: "Regular";
        font-weight: 400;
        color: #b6dfff;
      }
      &_span {
        font-size: 24px;
        font-family: "Medium";
        font-weight: 500;
        color: #ffffff;
        line-height: 36px;
        text-shadow: 0px 0px 10px rgba(125, 193, 245, 0.7);
      }
    }
  }
  &-big {
    height: 137px;
  }
}
</style>
