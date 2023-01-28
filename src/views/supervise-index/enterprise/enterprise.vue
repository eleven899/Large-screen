<template>
  <div class="box">
    <img
      class="box-img"
      :src="
        require('../../../assets/supervise-img/ic_jf_b' + item.img_url + '.png')
      "
    />
    <div class="box-content">
      <span class="box-content-title">{{ item.title }}</span>
      <div class="box-content-info">
        {{ item.amount }}
        <span class="box-content-span">{{ item.unit }}</span>
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
  name: "enterpriseItem",
  props: {
    item: { type: Object },
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
.box {
  height: 104px;
  box-sizing: border-box;
  display: flex;
  &-img {
    width: 88px;
    height: 104px;
  }
  &-content {
    margin-left: 18px;
    &-title {
      margin-left: 2px;
      display: block;
      margin: 18px 0;
      font-size: 18px;
      font-family: "Regular";
      font-weight: 400;
      color: #7dc1f5;
    }
    &-info {
      font-size: 32px;
      font-family: "Medium";
      font-weight: 500;
      color: #ffffff;
      text-shadow: 0px 0px 15px rgba(125, 193, 245, 0.7);
    }
    &-span {
      font-size: 16px;
      font-family: "Regular";
      font-weight: 400;
      color: #ffffff;
    }
  }
}
</style>
