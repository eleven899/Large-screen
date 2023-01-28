<template>
  <div class="box">
    <img
      class="box-img"
      :src="
        require('../../../assets/supervise-img/ic_' + item.img_url + '.png')
      "
    />
    <div class="content">
      <span class="content-span">{{ item.amount }}</span>
      <div class="content-title">{{ item.title }}</div>
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
  name: "statisticalItem",
  props: {
    item: {
      type: Object,
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
.box {
  width: 280px;
  display: flex;
  &-img {
    width: 82px;
  }
}
.content {
  &-span {
    display: block;
    margin: 20px 0 20px 0;
    font-size: 32px;
    font-family: "Medium";
    font-weight: 500;
    color: #ffffff;
    text-shadow: 0px 0px 13px rgba(125, 193, 245, 0.7);
  }
  &-title {
    font-size: 18px;
    font-family: "Regular";
    font-weight: 400;
    color: #7dc1f5;
  }
}
</style>
