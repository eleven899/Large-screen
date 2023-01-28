<template>
  <div class="box-four" id="wrapper-case_fulfilEchart"></div>
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
export default defineComponent({
  name: "indicatorsThree",
  setup() {
    const getIndexDataState = computed(
      () => store.getters["mainMoudle/getMainDataList"]
    );
    let indicatorsThree = reactive({
      indicatorsData: {
        complete: 0,
        completeMaxNum: 0,
      },
    });
    let myChart;
    const echarts: any = inject("echarts");
    const updateCharts = () => {
      indicatorsThree.indicatorsData = getIndexDataState.value.month_data;
      const updateEchartConfig = {
        series: [
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: indicatorsThree.indicatorsData.completeMaxNum,
            splitNumber: 12,
            radius: "120%", // 饼图的半径
            center: ["50%", "74%"],
            itemStyle: {
              color: "#11C6BB",
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
                return `{b|${value}%} \n{a|任务完成度}`;
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
                value: indicatorsThree.indicatorsData.complete,
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
        if (newVal == oldVal) {
          updateCharts();
        }
      },
      { immediate: true, deep: true }
    );
    onMounted(() => {
      myChart = echarts.init(
        document.getElementById("wrapper-case_fulfilEchart")
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
.box-four {
  width: 300px;
  height: 152px;
  box-sizing: border-box;
}
</style>
