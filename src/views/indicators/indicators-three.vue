<template>
  <div class="box-three" id="wrapper-case_timeEchart"></div>
</template>

<script lang="ts">
import store from "@/store";
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  reactive,
  watch,
  onBeforeUnmount,
} from "vue";
import IndicatorsFour from "./indicators-four.vue";
export default defineComponent({
  name: "indicatorsThree",
  setup() {
    let indicatorsThreData = reactive({
      indicatorsData: {
        schedule: 0,
        scheduleMaxNum: 100,
      },
    });
    const echarts: any = inject("echarts");
    let myChart;
    const getIndexDataState = computed(
      () => store.getters["mainMoudle/getMainDataList"]
    );
    const updateCharts = () => {
      indicatorsThreData.indicatorsData = getIndexDataState.value.month_data;
      const updateEchartConfig = {
        //第一个图表
        series: [
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: indicatorsThreData.indicatorsData.scheduleMaxNum,
            splitNumber: 12,
            radius: "120%", // 饼图的半径
            center: ["50%", "74%"],
            itemStyle: {
              color: "#946EEF",
              shadowColor: "rgba(0,138,255,0.45)",
            },
            progress: {
              show: true,
              roundCap: true,
              width: 8,
            },
            pointer: {
              width: 0,
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 8,
                color: [[1, "#201E59"]],
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            title: {},
            detail: {
              offsetCenter: ["0%", "-20%"],
              formatter: function (value) {
                return `{b|${value}%}\n{a|个体工商户活跃度}`;
              },
              rich: {
                a: {
                  fontSize: "14px",
                  fontFamily: "Regular",
                  fontWeight: 400,
                  color: "#7DC1F5",
                },
                b: {
                  fontSize: "26px",
                  fontFamily: "Medium",
                  fontWeight: 500,
                  color: "#BFEFFF",
                  textShadow: "0px 0px 5px rgba(125,193,245,0.7000)",
                },
              },
            },
            data: [
              {
                value: indicatorsThreData.indicatorsData.schedule,
              },
            ],
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
      myChart = echarts.init(
        document.getElementById("wrapper-case_timeEchart")
      );
      // 绘制图表
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
.box-three {
  width: 300px;
  height: 152px;
  box-sizing: border-box;
}
</style>
