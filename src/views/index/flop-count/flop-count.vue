<template>
  <div class="wrapper">
    <div
      :class="{ 'wrapper-item': true, 'wrapper-item_bg': item == '.' }"
      v-for="(item, index) in moneyFormat(showNumber.toFixed(0))"
      :key="index"
    >
      {{ item }}
    </div>
    <span class="wrapper-span">元</span>
    <div class="wrapper-box_" v-show="percent > 0 ? false : true"></div>
    <div class="wrapper-box" v-show="percent > 0 ? true : false">
      环比去年
      <img class="wrapper-box_img" src="@/assets/icon/ic_arr_up.svg" />
      <span class="wrapper-box_span">{{ percent }}%</span>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import {
  defineComponent,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  ref,
  computed,
} from "vue";
import gsap from "gsap";
export default defineComponent({
  name: "flop-count",
  props: {
    indexData: {
      type: Object,
    },
    percent: {
      type: Number,
    },
  },
  watch: {
    getIndexDataState: {
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          gsap.to(this, { duration: 2, showNumber: newVal.sales_money.num });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  setup(props) {
    const data = reactive({});
    let showNumber = ref(0);
    const getIndexDataState = computed(
      () => store.getters["mainMoudle/getMainDataList"]
    );
    //vuex获取indexdata数据
    const moneyFormat = (msg: any): string => {
      msg = msg.toString();

      let reg =
        msg.indexOf(".") > -1 ? /(\d)(?=(\d{3})+.)/g : /(\d)(?=(?:\d{3})+$)/g;
      return msg.replace(reg, "$1.");
    };
    onBeforeMount(() => {
      //2.组件挂载页面之前执行----onBeforeMount
    });
    onMounted(() => {
      //3.组件挂载到页面之后执行-------onMounted
    });
    return {
      ...toRefs(data),
      showNumber,
      moneyFormat,
      getIndexDataState,
    };
  },
});
</script>
<style scoped lang="scss">
.wrapper {
  // padding-right: 165px;
  box-sizing: border-box;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: flex-end;
  margin-top: 24px;
  // border: 1px solid rgb(25, 192, 72);
  &-item {
    width: 30px;
    height: 45px;
    background: #fa2268;
    color: aliceblue;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-family: "Medium";
    font-weight: 500;
    color: #ffffff;
    margin: 3px;
    &_bg {
      background-color: transparent;
      color: white;
      align-self: flex-end;
      margin: 0;
    }
  }
  &-span {
    display: block;
    font-size: 16px;
    font-family: "Regular";
    font-weight: 400;
    color: #ed397f;
    margin-left: 7px;
  }
  &-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    height: 28px;
    margin-left: 8px;
    background: rgba(182, 223, 255, 0.16);
    border-radius: 1px;
    border: 1px solid rgba(62, 127, 255, 0.5);
    font-size: 14px;
    font-family: "Regular";
    font-weight: 400;
    color: #b6dfff;
    &_img {
      display: block;
      margin: 0 6px;
    }
    &_span {
      font-size: 15px;
      font-family: "Medium";
      font-weight: 500;
      color: #ff6a8e;
    }
  }
  &-box_ {
    margin-left: 20px;
    background: transparent;
    border-radius: 0px;
    border: 0px solid rgba(62, 127, 255, 0.5);
  }
}
</style>
