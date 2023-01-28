<template>
  <div
    class="com-container"
    style="position: relative; display: flex; align-items: center"
  >
    <div class="com-container_img"></div>
    <div class="text-box">
      <div class="text">业务分类</div>
      <div class="proportion">占比</div>
    </div>
    <div class="com-container-echart" id="business-segment_chart"></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  onBeforeUnmount,
  inject,
  computed,
  watch,
} from "vue";
import { echartConfig } from "./config/business-segment-config";
import * as R from "ramda";
import store from "@/store";
export default defineComponent({
  name: "business-segment",
  setup() {
    const echarts: any = inject("echarts");
    let businessData = reactive({
      seriesData: [],
    });
    const getIndexDataState = computed(
      () => store.getters["mainMoudle/getMainDataList"]
    );
    let myChart;
    const updateCharts = () => {
      businessData.seriesData = getIndexDataState.value.business;
      const updateEchartConfig = {
        legend: {
          formatter: (name: string) => {
            let rate = R.propOr(
              0,
              "rate",
              R.find(R.propEq("name", name))(businessData.seriesData)
            );
            // rate = (rate * 100).toFixed(1);
            rate = rate.toFixed(2);
            // 显示名称+百分比
            return `${name}   ${rate}%`;
          },
        },
        series: [
          {
            data: businessData.seriesData,
          },
        ],
      };
      myChart.setOption(updateEchartConfig);
    };
    watch(
      getIndexDataState,
      (newVal, oldVal) => {
        if (newVal != oldVal) {
          updateCharts();
        }
      },
      { deep: true }
    );
    onMounted(() => {
      myChart = echarts.init(document.getElementById("business-segment_chart"));
      myChart.setOption(echartConfig);
      // 绘制图表
      updateCharts();
      window.onresize = function () {
        myChart.resize();
      };
    });
    onBeforeUnmount(() => {
      myChart.dispose();
    });
    return {};
  },
});
</script>
<style scoped lang="scss">
// .com-container_img {
//   background: url();
// }
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
.com-container_img {
  position: absolute;
  left: 25px;
  width: 176px;
  height: 147px;
  background: url("@/assets/icon/pic_jx_fbbg.png") 50% / cover no-repeat;
  animation: changeright 6s linear infinite;
}
.text-box {
  position: absolute;
  left: 85px;
  z-index: 111111;
  text-align: center;
  cursor: pointer;
  .text {
    font-size: 14px;
    font-family: "Medium";
    font-weight: 500;
    color: #ffffff;
    line-height: 35px;
    text-shadow: 0px 0px 10px rgba(125, 193, 245, 0.7);
  }
  .proportion {
    font-size: 14px;
    font-family: "Medium";
    font-weight: 500;
    color: #7dc1f5;
    line-height: 20px;
  }
}
</style>
