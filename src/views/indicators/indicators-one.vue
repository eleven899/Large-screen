<template>
  <div class="box-one" id="wrapper-case_echart"></div>
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
import { echartConfig } from "./config/indicators";
export default defineComponent({
  name: "indicatorsOne",
  setup() {
    const getIndexDataState = computed(
      () => store.getters["mainMoudle/getMainDataList"]
    );
    const echarts: any = inject("echarts");
    let title = "活跃个体工商户总数";
    let indicatorsOneData = reactive({
      data: {
        aaum: [],
        aaumMaxNum: [],
      },
    });
    let myChart;
    const updateCharts = () => {
      indicatorsOneData.data = getIndexDataState.value.month_data;
      const updateEchartConfig = {
        title: {
          text: `${title} : ${indicatorsOneData.data.aaum}`,
        },
        xAxis: [{}],
        series: [
          {
            data: indicatorsOneData.data.aaumMaxNum,
          },
          {
            data: indicatorsOneData.data.aaum,
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
      myChart = echarts.init(document.getElementById("wrapper-case_echart"));
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
.box-one {
  width: 300px;
  height: 60px;
  box-sizing: border-box;
}
</style>
