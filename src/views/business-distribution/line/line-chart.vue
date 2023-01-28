<template>
  <div class="line" id="line_chart"></div>
</template>

<script lang="ts">
import store from "@/store";
import {
  defineComponent,
  onMounted,
  inject,
  reactive,
  watch,
  computed,
  onBeforeUnmount,
} from "vue";
import { echartConfig } from "../config/line-config";
export default defineComponent({
  name: "line-chart",
  setup() {
    const getIndexDataState = computed(
      () => store.getters["mainMoudle/getMainDataList"]
    );
    const echarts: any = inject("echarts");

    let lineData = reactive({
      charts: [],
    });

    let myChart;

    const updateCharts = () => {
      lineData.charts = getIndexDataState.value.national_business.charts;
      let lineY = [];
      let lineY1 = [];
      let top10CityList = [];
      let top10CityData = [];
      for (let i = 0; i < lineData.charts.length; i++) {
        top10CityList.push(lineData.charts[i].name);
        top10CityData.push(lineData.charts[i].value);
        const data = {
          name: lineData.charts[i].name,
          color: lineData.charts[i].color,
          value: lineData.charts[i].value,
          itemStyle: {
            show: true,
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: lineData.charts[i].color,
                },
                {
                  offset: 1,
                  color: lineData.charts[i].endColor,
                },
              ],
              global: false, // 缺省为 false
            },
            barBorderRadius: 10,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 15,
              shadowColor: "rgba(0, 0, 0, 0.1)",
            },
          },
        };
        const data1 = {
          name: lineData.charts[i].name,
          color: "rgba(36, 108, 249)",
          value: 100,
          itemStyle: {
            show: true,
            color: "rgba(36, 108, 249, 0.4)",
            barBorderRadius: 10,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 15,
              shadowColor: "rgba(0, 0, 0, 0.1)",
            },
          },
        };
        lineY.push(data);
        lineY1.push(data1);
      }
      const updateEchartConfig = {
        // color: color,
        yAxis: [
          {
            data: top10CityList,
          },
          {
            data: top10CityData,
          },
        ],
        series: [
          {
            data: lineY,
          },
          {
            data: lineY1,
            barGap: "-100%",
          },
        ],
        animationEasing: "cubicOut",
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
      myChart = echarts.init(document.getElementById("line_chart"));
      myChart.setOption(echartConfig);
      updateCharts();
      window.onresize = function () {
        myChart.resize();
      };
    });
    onBeforeUnmount(() => {
      if (myChart) {
        myChart.dispose();
      }
    });
    return {};
  },
});
</script>
<style scoped lang="scss">
.line {
  width: 417px;
  height: 189px;
  margin: 0 auto;
}
</style>
