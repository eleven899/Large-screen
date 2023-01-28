<template>
  <div class="com-container">
    <div class="com-container-echart" :id="trading_chart"></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  computed,
  onBeforeUnmount,
  watch,
  ref,
} from "vue";
import { echartConfig } from "./config/trading-volume-config";
import { inject } from "vue";
import store from "@/store";
import { autoToolTip } from "../../utils/echarts_auto_tooltip";
export default defineComponent({
  name: "trading-volume",
  setup() {
    let clearLoop_ = null;
    let trading_chart = ref("eChart" + Date.now() + Math.random());
    const getIndexDataState = computed(
      () => store.getters["mainMoudle/getMainDataList"]
    );
    const echarts: any = inject("echarts");
    const tradingData = reactive({
      YearData: [],
      xData: [],
      LastYear: [],
      currentYear: [],
    });
    let myChart;
    const updateCharts = () => {
      tradingData.YearData = getIndexDataState.value.monthly_turnover.YearData;
      tradingData.xData = getIndexDataState.value.monthly_turnover.xData;
      tradingData.LastYear = getIndexDataState.value.monthly_turnover.LastYear;
      tradingData.currentYear =
        getIndexDataState.value.monthly_turnover.currentYear;
      let sum = 12 - tradingData.xData.length;
      if (tradingData.xData.length < 12) {
        for (let i = 0; i < sum; i++) {
          tradingData.xData.push("");
        }
      }
      const updateEchartConfig = {
        legend: {
          data: [
            {
              name: `${tradingData.YearData[0]}`,
              // 强制设置图形为圆。
              icon: "circle",
            },
            {
              name: `${tradingData.YearData[1]}`,
              // 强制设置图形为圆。
              icon: "circle",
            },
          ],
        },
        xAxis: [
          {
            data: tradingData.xData,
          },
        ],
        series: [
          {
            name: tradingData.YearData[0],
            data: tradingData.LastYear,
          },
          {
            name: tradingData.YearData[1],
            data: tradingData.currentYear,
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
      myChart = echarts.init(document.getElementById(trading_chart.value));
      myChart.setOption(echartConfig);
      updateCharts();
      const updateEchartConfig_ = {
        series: [
          {
            name: tradingData.YearData[0],
            data: tradingData.LastYear,
          },
          {
            name: tradingData.YearData[1],
            data: tradingData.currentYear,
          },
        ],
      };
      if (getIndexDataState.value.monthly_turnover.LastYear.length > 1) {
        const { clearLoop } = autoToolTip(myChart, updateEchartConfig_, {
          loopSeries: true,
          interval: 3000,
        });
        clearLoop_ = clearLoop;
      }
      window.onresize = function () {
        myChart.resize();
      };
    });
    onBeforeUnmount(() => {
      if (getIndexDataState.value.monthly_turnover.LastYear.length > 1) {
        clearLoop_();
      }
      myChart.dispose();
    });
    return {
      trading_chart,
    };
  },
});
</script>
<style scoped lang="scss"></style>
