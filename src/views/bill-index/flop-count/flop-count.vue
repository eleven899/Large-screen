<template>
  <div class="wrapper">
    <div
      :class="{ 'wrapper-item': true, 'wrapper-item_bg': item == '.' }"
      v-for="(item, index) in money"
      :key="index"
    >
      {{ item }}
    </div>
    <span class="wrapper-span">元</span>
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
const useFlotCoutEffect = (props: any) => {
  let money = props.num;
  var reg =
    money.indexOf(".") > -1 ? /(\d)(?=(\d{3})+.)/g : /(\d)(?=(?:\d{3})+$)/g;
  money = money.replace(reg, "$1.");
  return {
    money,
  };
};
export default defineComponent({
  name: "flop-count",
  props: {
    num: {
      type: String,
      default: "000000000",
    },
  },
  setup(props) {
    const data = reactive({});
    onBeforeMount(() => {
      //2.组件挂载页面之前执行----onBeforeMount
    });
    onMounted(() => {
      //3.组件挂载到页面之后执行-------onMounted
    });
    const { money } = useFlotCoutEffect(props);
    return {
      ...toRefs(data),
      money,
    };
  },
});
</script>
<style scoped lang="scss">
.wrapper {
  height: 88px;
  box-sizing: border-box;
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  &-item {
    width: 30px;
    height: 45px;
    color: aliceblue;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-family: "Medium";
    font-weight: 500;
    color: #ffffff;
    border: 1px solid rgba(125, 193, 245, 0.5);
    margin: 0 3px;
    &_bg {
      width: 10px;
      padding-bottom: 30px;
      background-color: transparent;
      color: rgba(255, 255, 255, 1);
      align-self: flex-end;
      margin: 0;
      border: none;
    }
  }
  &-span {
    padding-top: 10px;
    display: block;
    font-size: 20px;
    font-family: "Regular";
    font-weight: 400;
    color: rgba(125, 193, 245, 1);
    margin-left: 7px;
  }
}
</style>
