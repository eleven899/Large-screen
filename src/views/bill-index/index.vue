<template>
  <div id="index" ref="appRef">
    <div class="jianguan_bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <HeaderTop
          :dropdownData="dropdownData"
          :isFooterShow="false"
          :switchBg="true"
        />
        <div class="container">
          <div class="container-header">
            <div class="container-header-left">
              <img
                class="container-header-left_img"
                src="@/assets/bill-img/title_1.png"
              />
              <span class="container-header-left_span"
                >平台累计向合作企业开具发票总额：</span
              >
              <div class="container-header-left_money">
                <flopCount :num="String(billData.top_data[0].num)" />
              </div>
            </div>
            <div class="container-header-right">
              <img
                class="container-header-right_img"
                src="@/assets/bill-img/title_2.png"
              />
              <span class="container-header-right_span"
                >平台累计为个体工商户开具发票总额：</span
              >
              <div class="container-header-right_money">
                <flopCount :num="String(billData.top_data[1].num)" />
              </div>
            </div>
          </div>
          <div class="container-main">
            <div class="container-main-name">
              <img src="../../assets/images/arr@1x.png" alt="" />
              {{ billData.large_screen_title[0].title_1 }}
              <img src="../../assets/images/arr@1x.png" alt="" />
            </div>
            <img
              class="container-footer-img"
              src="../../assets/images/pic_frame_3.png"
              alt=""
            />
            <img
              class="container-footer-img_"
              src="../../assets/images/pic_frame_4.png"
              alt=""
            />
            <div class="container-main-content">
              <div
                class="container-main-content-box"
                v-for="(item, index) in billData.list_data"
                :key="index"
              >
                <lineItem :item="item" />
              </div>
            </div>
          </div>
          <div class="container-footer">
            <div class="container-footer-name">
              <img src="../../assets/images/arr@1x.png" alt="" />
              {{ billData.large_screen_title[0].title_2 }}
              <img src="../../assets/images/arr@1x.png" alt="" />
            </div>
            <img
              class="container-footer-img"
              src="../../assets/images/pic_frame_2.png"
              alt=""
            />
            <img
              class="container-footer-img_"
              src="../../assets/images/pic_frame_1.png"
              alt=""
            />
            <!-- <dv-border-box-11 :title="billData.large_screen_title[0].title_2"> -->
            <div class="container-footer-content">
              <div
                class="container-footer-content-box"
                v-for="(item, index) in listTitle"
                :key="index"
              >
                <line-echart-item
                  :item="item"
                  :index="index"
                  :config="echartConfig"
                ></line-echart-item>
              </div>
            </div>
            <!-- </dv-border-box-11> -->
          </div>
        </div>
        <div class="footer"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import useDraw from "@/utils/useDraw";
import { title, subtitle, moduleInfo } from "@/constant/index";
import HeaderTop from "@/components/header.vue";
import flopCount from "./flop-count/flop-count.vue";
import lineEchartItem from "./line-echart-item/line-echart-item.vue";
import lineItem from "./line-item/line-item.vue";
import { echartConfig } from "./config/line-item-config";
import { getBillData } from "@/service/main/main";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    flopCount,
    lineEchartItem,
    lineItem,
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
    let billData = ref(null);
    let listTitle = [
      "平台月开具发票金额",
      "平台月开具发票数量",
      "平台月开具发票企业总数",
      "平台月开具发票个体工商户总数",
    ];
    const dropdownData = {
      current: "税务监管",
      dropdownItem: {
        one: {
          name: "首页",
          command: 0,
        },
        two: {
          name: "资金监管",
          command: 1,
        },
        three: {
          name: "任务流转",
          command: 3,
        },
      },
    };
    // 生命周期
    onMounted(() => {
      cancelLoading();
      // todo 屏幕适应
      windowDraw();
      calcRate();
    });

    onUnmounted(() => {
      loading.value = true;
      unWindowDraw();
    });
    //请求数据
    const getBillIndex = async () => {
      const store = useStore();
      const res: any = await getBillData();
      console.log("税务监管页面数据:", res.data);
      billData.value = res.data;
      store.commit("billMoudle/changeBillData", billData);
      loading.value = false;
    };
    getBillIndex();
    //一分钟请求一次数据
    // setInterval(() => {
    //   loading.value = false;
    //   getBillIndex();
    // }, 60000);
    // return
    return {
      loading,
      appRef,
      title,
      subtitle,
      moduleInfo,
      echartConfig,
      billData,
      listTitle,
      dropdownData,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";
.container {
  width: 1920px;
  margin-top: 80px;
  &-header {
    width: 1920px;
    height: 100px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    &-left {
      display: flex;
      align-items: center;
      &_img {
        display: inline-block;
        margin-top: 16px;
      }
      &_span {
        display: inline-block;
        margin: 0 8px 0 15px;
        font-size: 20px;
        font-family: "Regular";
        font-weight: 400;
        color: #7dc1f5;
        letter-spacing: 1px;
      }
    }
    &-right {
      display: flex;
      align-items: center;
      margin-left: 33px;
      margin-right: 100px;
      &_img {
        display: inline-block;
        margin-top: 18px;
      }
      &_span {
        display: inline-block;
        margin: 0 8px 0 15px;
        font-size: 20px;
        font-family: "Regular";
        font-weight: 400;
        color: #7dc1f5;
        letter-spacing: 1px;
      }
    }
  }
  &-main {
    width: 1920px;
    height: 460px;
    margin-top: 10px;
    position: relative;

    &-name {
      width: 662px;
      height: 68px;
      padding: 0 140px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      position: absolute;
      left: 50%;
      top: -26px;
      margin-left: -331px;
      font-size: 24px;
      font-family: PangMenZhengDao;
      color: #ffffff;
      text-shadow: 0px 0px 12px #7d9df5;
      background-image: url("../../assets/images/ic_jg_a_1.png");
      box-sizing: border-box;
      img:nth-child(2) {
        transform: rotate(180deg);
      }
    }
    &-content {
      width: 1920px;
      height: 460px;
      padding: 50px 0px 0 30px;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      &-box {
        width: 898px;
        margin-right: 20px;
      }
    }
  }
  &-footer {
    width: 1920px;
    height: 330px;
    margin-top: 20px;
    position: relative;
    &-img {
      position: absolute;
      left: 0;
      top: 0;
    }
    &-img_ {
      position: absolute;
      right: 0;
      top: 0;
    }
    &-name {
      width: 662px;
      height: 68px;
      padding: 0 140px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      position: absolute;
      left: 50%;
      top: -27px;
      margin-left: -331px;
      font-size: 24px;
      font-family: PangMenZhengDao;
      color: #ffffff;
      text-shadow: 0px 0px 12px #7d9df5;
      background-image: url("../../assets/images/ic_jg_a_1.png");
      box-sizing: border-box;
      img:nth-child(2) {
        transform: rotate(180deg);
      }
    }
    &-content {
      width: 1920px;
      height: 350px;
      padding: 40px 0 0 0;
      display: flex;
      box-sizing: border-box;
      &-box {
        width: 437px;
        height: 270px;
        padding-top: 10px;
        margin-left: 35px;
        box-sizing: border-box;
      }
    }
  }
}
.footer {
  width: 1920px;
  height: 45px;
  background: url("@/assets/icon/pic_dk_21920.png") 50% / cover no-repeat;
}
</style>
