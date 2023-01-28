<template>
  <div :class="{ header: true, headerbg: switchBg }">
    <div class="header_box">
      <div class="header_box_left">
        <img class="header_box_left_img" src="@/assets/icon/ic_logo_1.svg" />
        {{ name }}
        <Dropdown :item="dropdownData" />
      </div>
      <div class="header_box_right">
        <img
          class="header_box_left_img"
          style="width: 30px; height: 30px"
          src="@/assets/icon/quanping.png"
          v-show="isShow"
          @click="handleFullScreen"
        />
        <img
          class="header_box_left_img"
          style="width: 35px; height: 35px"
          src="@/assets/icon/quxiao.png"
          v-show="!isShow"
          @click="handleFullScreen"
        />
        <span class="year">{{ timeInfo.dateYear }}</span>
        <span class="week">{{ timeInfo.dateWeek }}</span>
        <span class="day">{{ timeInfo.dateDay }}</span>
      </div>
    </div>
    <div class="header_footer" v-if="isFooterShow">
      全年完成：{{ ((indexData.sales / indexData.num) * 100).toFixed(2) }}%
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  onUnmounted,
  onMounted,
  computed,
} from "vue";
import dropdown from "@/components/dropdown.vue";
import { formatTime } from "@/utils/index";
import { WEEK } from "@/constant/index";
import screenfull from "screenfull";
import { useStore } from "vuex";

interface timeOutPerson {
  setInterval: any;
  dateDay: string;
  dateYear: string;
  dateWeek: string;
}
export default defineComponent({
  name: "HeaderTop",
  components: {
    dropdown,
  },
  props: {
    isFooterShow: {
      type: Boolean,
      default: false,
    },
    switchBg: {
      type: Boolean,
      default: true,
    },
    dropdownData: {
      type: Object,
      default: function () {
        return {
          current: "首页",
          dropdownItem: {
            one: {
              name: "资金监管",
              command: 1,
            },
            two: {
              name: "税务监管",
              command: 2,
            },
            three: {
              name: "任务流转",
              command: 3,
            },
          },
        };
      },
    },
  },
  setup(props: any) {
    const store = useStore();
    const indexData = reactive({
      sales: null,
      num: null,
    });
    if (props.isFooterShow) {
      indexData.sales = computed(
        () => store.state.mainMoudle.mainData.sales_money.sales
      );
      indexData.num = computed(
        () => store.state.mainMoudle.mainData.sales_money.num
      );
    }
    const name = "青岛民联科技发展有限公司";
    // * 时间内容
    const timeInfo: timeOutPerson = reactive({
      setInterval: 0,
      dateDay: "",
      dateYear: "",
      dateWeek: "",
    });
    // todo 处理时间监听
    const handleTime = () => {
      timeInfo.setInterval = setInterval(() => {
        const date = new Date();
        timeInfo.dateDay = formatTime(date, "HH: mm: ss");
        timeInfo.dateYear = formatTime(date, "yyyy/MM/dd");
        timeInfo.dateWeek = WEEK[date.getDay()];
      }, 1000);
    };
    let isShow = ref(true);
    const handleFullScreen = () => {
      if (!screenfull.isEnabled) {
        return false;
      }
      isShow.value = screenfull.isFullscreen;
      screenfull.toggle();
    };
    onMounted(() => {
      handleTime();
    });
    onUnmounted(() => {
      clearInterval(timeInfo.setInterval);
    });
    return {
      timeInfo,
      isShow,
      handleFullScreen,
      name,
      indexData,
    };
  },
});
</script>
<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 1920px;
  height: 176px;
  z-index: 99;
  background: url("@/assets/icon/title@2x.png") 50% / cover no-repeat;
  &_box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    &_left {
      height: 50px;
      margin-left: 45px;
      display: flex;
      align-items: center;
      font-family: "semibold";
      font-size: 18px;
      font-weight: 600;
      color: #d9efff;
      letter-spacing: 1px;
      text-shadow: 0px 0px 8px rgba(125, 191, 245, 0.52);
      &_img {
        width: 26px;
        height: 26px;
        display: block;
        margin-right: 9px;
      }
    }
    &_right {
      display: flex;
      align-items: center;
      height: 50px;
      margin-right: 45px;
      font-size: 18px;
      font-weight: 600;
      color: #d9efff;
      letter-spacing: 1px;
      text-shadow: 0px 0px 8px rgba(125, 191, 245, 0.52);
      .year {
        font-size: 20px;
        font-family: "Medium";
        font-weight: 500;
        color: #7dc1f5;
        line-height: 23px;
      }
      .week {
        padding: 0 5px;
        font-size: 16px;
        font-family: "Regular";
        font-weight: 400;
        color: #7dc1f5;
        line-height: 22px;
        letter-spacing: 1px;
      }
      .day {
        font-size: 26px;
        font-family: "Medium";
        font-weight: 500;
        color: #b6dfff;
        line-height: 30px;
      }
    }
  }
  &_footer {
    width: 200px;
    height: 30px;
    border-radius: 20px;
    text-align: center;
    font-size: 14px;
    font-family: "Regular";
    font-weight: 400;
    color: #ffffff;
    line-height: 30px;
    margin: 60px auto 0 auto;
    background: url("@/assets/icon/pic_title_bar.svg");
  }
}
.headerbg {
  background: url("@/assets/business-img/title2@2x.png") 50% / cover no-repeat;
}
</style>
