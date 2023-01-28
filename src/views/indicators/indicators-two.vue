<template>
  <div class="box-two" id="wrapper-case_echart_"></div>
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
import { echartConfig_ } from "./config/indicators";
export default defineComponent({
  name: "indicatorsTwo",
  setup() {
    const getIndexDataState = computed(
      () => store.getters["mainMoudle/getMainDataList"]
    );
    let title = "任务总数";
    let indicatorsTwoData = reactive({
      data: {
        task: [],
        taskMaxNum: [],
      },
    });
    const echarts: any = inject("echarts");
    let myChart;
    const updateCharts = () => {
      indicatorsTwoData.data = getIndexDataState.value.month_data;
      const updateEchartConfig = {
        title: {
          text: `${title} : ${indicatorsTwoData.data.task}`,
        },
        xAxis: [{}],
        series: [
          {
            data: indicatorsTwoData.data.taskMaxNum,
          },
          {
            data: indicatorsTwoData.data.task,
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
      myChart = echarts.init(document.getElementById("wrapper-case_echart_"));
      myChart.setOption(echartConfig_);
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
.box-two {
  width: 300px;
  height: 60px;
  box-sizing: border-box;
}
</style>
