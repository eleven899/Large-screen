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
                src="@/assets/business-img/ic_jg_t_1.svg"
              />
              <span class="container-header-left_span"
                >{{ infoData.top_data[0].title }}:</span
              >
              <div class="container-header-left_money">
                <flopCount :num="String(infoData.top_data[0].num)" />
              </div>
            </div>
            <div class="container-header-right">
              <img
                class="container-header-right_img"
                src="@/assets/business-img/ic_jg_t_2.svg"
              />
              <span class="container-header-right_span"
                >{{ infoData.top_data[1].title }}:</span
              >
              <div class="container-header-right_money">
                <flopCount :num="String(infoData.top_data[1].num)" />
              </div>
            </div>
          </div>
          <div class="container-main">
            <div class="container-main-name">
              <img src="../../assets/images/arr@1x.png" alt="" />
              {{ infoData.large_screen_title[0].title_1 }}
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
                v-for="(item, index) in infoData.monthly_summary"
                :key="index"
              >
                <lineItem :item="item" :index="index" />
              </div>
            </div>
          </div>
          <div class="container-footer">
            <div class="container-footer-name">
              <img src="../../assets/images/arr@1x.png" alt="" />
              {{ infoData.large_screen_title[0].title_2 }}
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
import { getInfoData } from "@/service/main/main";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    flopCount,
    lineEchartItem,
    lineItem,
    HeaderTop,
  },
  setup() {
    const store = useStore();
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
    let infoData = ref(null);
    const listTitle = [
      "平台月转入金额",
      "平台月发放金额",
      "平台月提现金额",
      "平台月收入金额",
    ];
    const dropdownData = {
      current: "资金监管",
      dropdownItem: {
        one: {
          name: "首页",
          command: 0,
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

    // 生命周期
    onMounted(() => {
      cancelLoading();
      // todo 屏幕适应
      windowDraw();
      calcRate();
    });

    onUnmounted(() => {
      unWindowDraw();
      loading.value = true;
    });
    //请求数据
    const getregulatoryIndex = async () => {
      const res: any = await getInfoData();
      infoData.value = res.data;
      console.log("资金监管页面数据:", res.data);
      store.commit("infoMoudle/changeMainData", res.data);
    };
    getregulatoryIndex();
    //一分钟请求一次数据
    // setInterval(() => {
    //   loading.value = false;
    //   getregulatoryIndex();
    // }, 60000);
    return {
      loading,
      appRef,
      title,
      subtitle,
      moduleInfo,
      echartConfig,
      infoData,
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
    // justify-content: end;
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
      margin-left: 88px;
      // margin-right: 207px;
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
      top: -25px;
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
    &-title {
      width: 662px;
      height: 68px;
      margin-left: -331px;
      position: absolute;
      left: 50%;
      top: -35px;
    }
    &-content {
      width: 1920px;
      height: 460px;
      padding: 45px 0px 0 30px;
      display: flex;
      justify-content: space-around;
      box-sizing: border-box;
      &-box {
        width: 345px;
        margin-right: 32px;
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
.el-dropdown-link {
  margin-top: 6px;
  width: 89px;
  height: 55px;
  margin-left: 20px;
  display: block;
  box-sizing: border-box;
  font-size: 16px;
  color: #40fff4;
  line-height: 55px;
  text-align: center;
  background: url("@/assets/business-img/tab_1@2x.png") 50% / cover no-repeat;
}
</style>
