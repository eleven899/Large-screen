<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <HeaderTop :isFooterShow="true" :switchBg="false" />
        <div class="container">
          <div class="container-left">
            <div class="container-left_box">
              <div class="container-left_box_title">
                全年各季度交易情况 <i class="top"></i><i class="bottom"></i>
              </div>
              <div class="echart h-251">
                <quarterly-trading></quarterly-trading>
              </div>
            </div>
            <div class="container-left_box mt-28">
              <div class="container-left_box_title">
                业务分布 <i class="top"></i><i class="bottom"></i>
              </div>
              <div class="echart h-535">
                <businessDistribution></businessDistribution>
              </div>
            </div>
          </div>
          <div class="container-center">
            <img
              class="container-center-img"
              src="@/assets/business-img/light_bg.png"
            />
            <div class="container-center_box">
              <div class="container-center_box_title">全年销售总金额</div>
              <div
                class="container-center_box_money container-center_box_gradient"
              >
                <span class="">{{ moneyFormat(showNumber.toFixed(0)) }}</span>
                <span class="container-center_box_span">元</span>
              </div>
            </div>
            <div class="container-center_line"></div>
            <div class="container-center_case">
              <div class="container-center_case_title">全年预期销售额</div>
              <flopCount :indexData="indexData" :percent="indexData.percent" />
            </div>
            <div class="container-center_casket mt-49 container-center_cover">
              <div class="container-center_casket_title h-48">
                <div
                  class="h-48 fly_border w-894"
                  style="display: flex; align-items: center; padding-left: 20px"
                >
                  <i class="top"></i><i class="bottom"></i>
                  全年数据指标
                </div>
              </div>
              <div class="echart h-152">
                <indicators></indicators>
              </div>
            </div>
            <div class="container-center_casket">
              <div class="container-center_casket_title h-48">
                <div
                  class="h-48 fly_border w-894"
                  style="display: flex; align-items: center; padding-left: 20px"
                >
                  <i class="top"></i><i class="bottom"></i>
                  月度成交额
                </div>
              </div>
              <div class="echart h-200">
                <tradingVolume></tradingVolume>
              </div>
            </div>
          </div>
          <div class="container-right">
            <div class="container-right_box">
              <div class="container-right_box_title">
                企业前三甲 <i class="top"></i><i class="bottom"></i>
              </div>
              <div class="echart h-251">
                <corporateRankings />
              </div>
            </div>
            <div class="container-right_box mt-24">
              <div class="container-right_box_title">
                业务分类 <i class="top"></i><i class="bottom"></i>
              </div>
              <div class="echart h-205">
                <business-segment></business-segment>
              </div>
            </div>
            <div class="container-right_box mt-25">
              <div class="container-right_box_title">
                季度纳税金额 <i class="top"></i><i class="bottom"></i>
              </div>
              <div class="echart h-256">
                <premium-trading></premium-trading>
              </div>
            </div>
          </div>
        </div>
        <div class="footer"></div>
      </div>
    </div>
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, onUnmounted } from "vue";
import useDraw from "@/utils/useDraw";
import { title, subtitle, moduleInfo } from "@/constant/index";
import HeaderTop from "@/components/header.vue";
import corporateRankings from "../corporate-rankings/corporate-rankings.vue";
import quarterlyTrading from "../quarterly-trading/quarterly-trading.vue";
import premiumTrading from "../premium-received/premium-received.vue";
import businessSegment from "../business-segment/business-segment.vue";
import businessDistribution from "../business-distribution/business-distribution.vue";
import flopCount from "./flop-count/flop-count.vue";
import tradingVolume from "../trading-volume/trading-volume.vue";
import indicators from "../indicators/indicators.vue";
import store from "@/store";
import { getMainData } from "@/service/main/main";
import gsap from "gsap";

export default defineComponent({
  components: {
    quarterlyTrading,
    premiumTrading,
    corporateRankings,
    businessSegment,
    tradingVolume,
    flopCount,
    indicators,
    businessDistribution,
    HeaderTop,
  },
  setup() {
    // * 适配处理
    const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw();
    // * 加载标识
    const loading = ref<boolean>(true);
    // 处理 loading 展示
    const cancelLoading = () => {
      setTimeout(() => {
        loading.value = false;
      }, 500);
    };

    //初始化数据
    let indexData = reactive({
      sales: 0,
      percent: 0,
    });
    let showNumber = ref(0);

    //正则
    const moneyFormat = (msg: any): string => {
      msg = msg.toString();
      if (msg.length <= 0) return "0";
      let reg =
        msg.indexOf(".") > -1 ? /(\d)(?=(\d{3})+.)/g : /(\d)(?=(?:\d{3})+$)/g;
      return msg.replace(reg, "$1.");
    };

    //vuex获取indexdata数据
    const getIndexData = async () => {
      const res: any = await getMainData();
      if (res.code) {
        console.log("首页大屏数据", res.data, "一分钟请求一次");
        (indexData.sales = res.data?.sales_money?.sales),
          (indexData.percent = res.data?.sales_money?.percent || 0);
        store.commit("mainMoudle/changeMainData", res?.data);
        loading.value = false;
      }
    };
    getIndexData();
    const timing = setInterval(() => {
      loading.value = false;
      getIndexData();
    }, 60000);
    // 生命周期
    onMounted(() => {
      cancelLoading();
      //屏幕适应
      windowDraw();
      calcRate();
    });

    onUnmounted(() => {
      clearInterval(timing);
      loading.value = true;
      unWindowDraw();
    });

    // return
    return {
      loading,
      appRef,
      title,
      subtitle,
      moduleInfo,
      indexData,
      moneyFormat,
      showNumber,
    };
  },
  watch: {
    indexData: {
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          return;
        } else {
          gsap.to(this, { duration: 2, showNumber: newVal.sales });
        }
      },
      deep: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";

.container {
  width: 1920px;
  margin-top: 102px;
  display: flex;
  box-sizing: border-box;
  &-left {
    width: 488px;
    padding-left: 28px;
    box-sizing: border-box;
    // border: 1px solid rgb(214, 34, 34);
    &_box {
      width: 100%;
      &_title {
        width: 460px;
        height: 48px;
        padding-left: 22px;
        display: flex;
        align-items: center;
        font-size: 18px;
        font-family: "Semibold";
        font-weight: 600;
        color: #ffffff;
        line-height: 25px;
        text-shadow: 0px 0px 8px rgba(254, 238, 155, 0.3);
        background: url("@/assets/icon/pic_btbg_1.svg") left center no-repeat;
        box-sizing: border-box;
        // border: 1px solid rgb(78, 37, 143);
      }
    }
  }
  &-center {
    width: 944px;
    box-sizing: border-box;
    position: relative;
    @keyframes changeright {
      0% {
        -webkit-transform: rotate(0deg);
      }

      50% {
        -webkit-transform: rotate(180deg);
      }

      100% {
        -webkit-transform: rotate(360deg);
      }
    }
    &-img {
      position: absolute;
      top: -100px;
      left: 35px;
      z-index: 1;
      animation: changeright 12s linear infinite;
    }
    &_box {
      width: 100%;
      margin-top: 123px;
      &_title {
        height: 20px;
        font-size: 26px;
        font-family: "Regular";
        text-align: center;
        font-weight: 400;
        color: #ffffff;
        line-height: 20px;
        text-shadow: 0px 0px 12px #7d9df5;
      }
      &_money {
        height: 101px;
        margin-top: 12px;
        font-size: 78px;
        font-family: "semibold";
        font-weight: bold;
        color: #ed397f;
        line-height: 102px;
        letter-spacing: 2px;
        text-align: center;
      }
      &_span {
        font-size: 24px;
        font-family: Regular;
        font-weight: 400;
        color: #ed397f;
      }
      &_gradient {
        // display: inline-block;
        background-image: linear-gradient(to right, #ffb13c, #ed397f);
        background-clip: text;
        color: transparent;
      }
    }
    &_line {
      width: 250px;
      height: 1px;
      background: #0b54d3;
      opacity: 0.7;
      margin: 8px auto 0 auto;
      filter: blur(1px);
    }
    &_case {
      width: 100%;
      margin-top: 40px;
      box-sizing: border-box;
      &_title {
        height: 20px;
        text-align: center;
        font-size: 20px;
        font-family: "Regular";
        font-weight: 400;
        color: #b6dfff;
        line-height: 20px;
      }
    }
    &_casket {
      width: 100%;
      position: relative;
      z-index: 9;
      background-color: rgb(7, 7, 72);
      &_title {
        display: flex;
        align-items: center;
        margin: 0 24px 0 26px;
        box-sizing: border-box;
        background: url("@/assets/icon/pic_btbg_5.svg") left center no-repeat;
        font-size: 18px;
        font-family: "Semibold";
        font-weight: 600;
        color: #ffffff;
        text-shadow: 0px 0px 8px rgba(254, 238, 155, 0.3);
        .fly_border {
          &::before {
            background-image: linear-gradient(
              90deg,
              transparent,
              #cfd1d8,
              transparent
            );
          }
          &::after {
            background-image: linear-gradient(
              -90deg,
              transparent,
              #cfd1d8,
              transparent
            );
          }
          i:nth-child(1) {
            background-image: linear-gradient(
              -180deg,
              transparent,
              #cfd1d8,
              transparent
            );
          }
          i:nth-child(2) {
            background-image: linear-gradient(
              360deg,
              transparent,
              #cfd1d8,
              transparent
            );
          }
        }
      }
    }
    &_cover {
      width: 897px;
      margin: 49px 0 0 25px;
      .container-center_casket_title {
        margin: 0px;
      }
    }
  }
  &-right {
    width: 488px;
    padding-right: 28px;
    box-sizing: border-box;
    // border: 1px solid rgb(214, 34, 34);
    &_box {
      width: 100%;
      &_title {
        width: 460px;
        height: 48px;
        padding-left: 22px;
        display: flex;
        align-items: center;
        font-size: 18px;
        font-family: "Semibold";
        font-weight: 600;
        color: #ffffff;
        line-height: 25px;
        text-shadow: 0px 0px 8px rgba(254, 238, 155, 0.3);
        background: url("@/assets/icon/pic_btbg_1.svg") left center no-repeat;
        box-sizing: border-box;
        // border: 1px solid rgb(78, 37, 143);
      }
    }
  }
}
.footer {
  width: 1920px;
  height: 45px;
  background: url("@/assets/icon/pic_dk_21920.png") 50% / cover no-repeat;
}
.fly_border::before {
  left: 0px;
}
</style>
