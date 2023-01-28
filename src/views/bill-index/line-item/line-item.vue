<template>
  <div class="wrapper">
    <div class="title">{{ item.title }}</div>
    <div class="content">
      <div
        class="content-box"
        v-for="(innerItem, innerIndex) in item.data"
        :key="innerIndex"
      >
        <img
          class="content-box-img"
          :src="require('@/assets/bill-img/item_' + innerItem.img_url + '.svg')"
        />
        <div class="content-box-main">
          <span class="content-box-main_title">{{ innerItem.title }}</span>
          <span class="content-box-main_span">{{ innerItem.money }}</span>
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
  border: 1px solid rgba(84, 142, 255, 0.39);
}
.title {
  width: 100%;
  height: 48px;
  font-size: 20px;
  font-family: "Semibold";
  font-weight: 600;
  color: #ffdeac;
  text-shadow: 0px 0px 8px rgba(254, 238, 155, 0.3);
  text-align: center;
  line-height: 48px;
  background: url("@/assets/bill-img/b1.svg") left center no-repeat;
  box-sizing: border-box;
}
.content {
  width: 100%;
  display: flex;
  background: rgba(7, 6, 72, 0.5);
  &-box {
    width: 273px;
    height: 283px;
    margin: 16px auto 0 auto;
    box-sizing: border-box;
    background: rgba(125, 193, 245, 0.05);
    position: relative;
    &-img {
      width: 104px;
      height: 156px;
      display: block;
      margin: 34px auto 0 auto;
    }
    &-main {
      padding-top: 5px;
      position: absolute;
      top: 161px;
      width: 273px;
      &_title {
        display: block;
        font-size: 18px;
        font-family: "Regular";
        font-weight: 400;
        color: #b6dfff;
        letter-spacing: 1px;
        text-align: center;
      }
      &_span {
        margin-top: 15px;
        display: block;
        font-size: 36px;
        font-family: "Medium";
        font-weight: 500;
        color: #ffffff;
        text-align: center;
        text-shadow: 0px 0px 10px rgba(125, 193, 245, 0.7);
      }
    }
  }
  &-big {
    height: 137px;
  }
}
</style>
