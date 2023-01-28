<template>
  <div class="com-container">
    <div class="com-container-echart" id="home-page-traffic_chart"></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  watch,
  onBeforeUnmount,
} from "vue";
import { echartConfig } from "./config/quarterly-trading-config";
import { inject } from "vue";
import store from "@/store";
import { computed } from "@vue/reactivity";
export default defineComponent({
  name: "quarterly-trading",
  setup() {
    //读取vuex数据
    const getIndexDataState = computed(
      () => store.getters["mainMoudle/getMainDataList"]
    );
    const echarts: any = inject("echarts");

    //初始化echarts数据
    let quarterlyData = reactive({
      xData: [],
      barData: [],
      lineData: [],
      legendData: [],
    });

    let myChart;

    //更新图表数据  响应式
    const updateCharts = () => {
      quarterlyData.barData = getIndexDataState.value.annual_trade.barData;
      quarterlyData.lineData = getIndexDataState.value.annual_trade.lineData;
      quarterlyData.xData = getIndexDataState.value.annual_trade.xData;
      quarterlyData.legendData =
        getIndexDataState.value.annual_trade.legendData;

      const updataEchartConfig = {
        legend: {
          // data: quarterlyData.legendData,
          data: ["", ""],
        },
        xAxis: [
          {
            data: quarterlyData.xData,
          },
        ],
        series: [
          {
            name: quarterlyData.legendData[0],
            data: quarterlyData.barData,
            label: {
              formatter: (params) => {
                if (
                  quarterlyData.barData[params.dataIndex] == 0 &&
                  quarterlyData.lineData[params.dataIndex] == 0
                ) {
                  return "";
                } else if (quarterlyData.lineData[params.dataIndex] > 0) {
                  return `{b|+${quarterlyData.lineData[params.dataIndex]}%}`;
                } else if (quarterlyData.lineData[params.dataIndex] == 0) {
                  return "";
                } else {
                  return `{a|${quarterlyData.lineData[params.dataIndex]}%}`;
                }
              },
              rich: {
                a: {
                  fontSize: "14px",
                  fontFamily: "Regular",
                  fontWeight: 500,
                  color: "red", //红色
                  textShadow: "0px 0px 10px rgba(125,193,245,0.7000)",
                },
                b: {
                  fontSize: "14px",
                  fontFamily: "Medium",
                  fontWeight: 500,
                  color: "#9FFF38", //绿色
                },
              },
            },
          },
          {
            name: quarterlyData.legendData[1],
            // data: quarterlyData.lineData,
          },
        ],
      };
      myChart.setOption(updataEchartConfig);
    };

    //监听getIndexDataState数据变化，达到实时更新
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
      myChart = echarts.init(
        document.getElementById("home-page-traffic_chart")
      );
      myChart.setOption(echartConfig);
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
<style scoped lang="scss"></style>
