<template>
  <div class="com-container">
    <div class="com-container-echart" :id="premium_chart"></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  computed,
  watch,
  ref,
} from "vue";
import { echartConfig } from "./config/premium-received-config";
import { inject, onBeforeUnmount } from "vue";
import store from "@/store";
export default defineComponent({
  name: "premium-received",
  setup() {
    let premium_chart = ref("eChart" + Date.now() + Math.random());
    const getIndexDataState = computed(
      () => store.getters["mainMoudle/getMainDataList"]
    );
    const echarts: any = inject("echarts");
    let premiumData = reactive({
      YearData: [],
      xData: [],
      LastYear: [],
      currentYear: [],
    });
    let myChart;
    const updateCharts = () => {
      premiumData.YearData = getIndexDataState.value.premium_received.YearData;
      premiumData.xData = getIndexDataState.value.premium_received.xData;
      premiumData.LastYear = getIndexDataState.value.premium_received.LastYear;
      premiumData.currentYear =
        getIndexDataState.value.premium_received.currentYear;
      const updateEchartConfig = {
        legend: {
          // data: premiumData.YearData,
          data: [
            {
              name: `${premiumData.YearData[0]}`,
              // 强制设置图形为圆。
              icon: "circle",
            },
            {
              name: `${premiumData.YearData[1]}`,
              // 强制设置图形为圆。
              icon: "circle",
            },
          ],
        },
        xAxis: [
          {
            data: premiumData.xData,
          },
        ],
        series: [
          {
            name: premiumData.YearData[0],
            data: premiumData.LastYear,
          },
          {
            name: premiumData.YearData[1],
            data: premiumData.currentYear,
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
      myChart = echarts.init(document.getElementById(premium_chart.value));
      // 绘制图表
      myChart.setOption(echartConfig);
      updateCharts();
      window.onresize = function () {
        myChart.resize();
      };
    });
    onBeforeUnmount(() => {
      myChart.dispose();
    });
    return {
      premium_chart,
    };
  },
});
</script>
<style scoped lang="scss"></style>
