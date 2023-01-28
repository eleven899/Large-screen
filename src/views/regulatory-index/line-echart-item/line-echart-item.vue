<template>
  <div class="com-container">
    <div class="com-container-title">{{ item }}</div>
    <div class="echart" :id="'line-item_chart' + index"></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  inject,
  onMounted,
  watch,
  computed,
} from "vue";
import { echartConfig } from "../config/line-item-config";
// import { autoToolTip } from "../../../utils/echarts_auto_tooltip";
import { useStore } from "vuex";
export default defineComponent({
  name: "line-echart-item",
  props: {
    index: Number,
    config: Object,
    item: String,
  },
  setup(props) {
    let store = useStore();
    const echarts: any = inject("echarts");
    let charts = computed(() => {
      //返回的是ref对象
      return store.state.infoMoudle.infoData.chart_data[props.index];
    });
    // 测试数据 勿删除
    // setTimeout(() => {
    //   store.state.infoMoudle.infoData.chart_data[props.index] = [
    //     {
    //       name: "1月",
    //       value: 99,
    //       color: "rgba(36, 108, 249,.5)",
    //       endColor: "rgba(36, 108, 249,1)",
    //     },
    //     {
    //       name: "2月",
    //       value: 64,
    //       color: "rgba(36, 108, 249,.5)",
    //       endColor: "rgba(36, 108, 249,1)",
    //     },
    //     {
    //       name: "3月",
    //       value: 88,
    //       color: "rgba(36, 108, 249,.5)",
    //       endColor: "rgba(36, 108, 249,1)",
    //     },
    //     {
    //       name: "4月",
    //       value: 88,
    //       color: "rgba(36, 108, 249,.5)",
    //       endColor: "rgba(36, 108, 249,1)",
    //     },
    //     {
    //       name: "5月",
    //       value: 88,
    //       color: "rgba(17, 202, 190,.5)",
    //       endColor: "rgba(17, 202, 190,1)",
    //     },
    //     {
    //       name: "6月",
    //       value: 150.6,
    //       color: "rgba(36, 108, 249,.5)",
    //       endColor: "rgba(36, 108, 249,1)",
    //     },
    //     {
    //       name: "7月",
    //       value: 83,
    //       color: "rgba(36, 108, 249,.5)",
    //       endColor: "rgba(36, 108, 249,1)",
    //     },
    //     {
    //       name: "8月",
    //       value: 83,
    //       color: "rgba(36, 108, 249,.5)",
    //       endColor: "rgba(36, 108, 249,1)",
    //     },
    //     {
    //       name: "9月",
    //       value: 83,
    //       color: "rgba(36, 108, 249,.5)",
    //       endColor: "rgba(36, 108, 249,1)",
    //     },
    //     {
    //       name: "10月",
    //       value: 83,
    //       color: "rgba(36, 108, 249,.5)",
    //       endColor: "rgba(36, 108, 249,1)",
    //     },
    //     {
    //       name: "11月",
    //       value: 83,
    //       color: "rgba(36, 108, 249,.5)",
    //       endColor: "rgba(36, 108, 249,1)",
    //     },
    //     {
    //       name: "12月",
    //       value: 83,
    //       color: "rgba(36, 108, 249,.5)",
    //       endColor: "rgba(36, 108, 249,1)",
    //     },
    //   ];
    // }, 3000);
    let myChart;
    const updateCharts = () => {
      const lineY = [];
      for (let i = 0; i < charts.value.length; i++) {
        const data = {
          name: charts.value[i].name,
          color: charts.value[i].color,
          value: charts.value[i].value,

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
                  color: charts.value[i].color,
                },
                {
                  offset: 1,
                  color: charts.value[i].endColor,
                },
              ],
              global: false, // 缺省为 false
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 13,
              shadowColor: "rgba(0, 0, 0, 0.1)",
            },
          },
        };
        lineY.push(data);
      }
      const lineX = [];
      for (let i = 0; i < charts.value.length; i++) {
        let monthData = charts.value[i].name;
        lineX.push(monthData);
      }
      let barWidth = 12;
      //勿删除  柱状图粗细调整
      // if (charts.value.length == 9 || charts.value.length == 10) {
      //   barWidth = 12;
      // }
      // if (charts.value.length == 11 || charts.value.length == 12) {
      //   barWidth = 12;
      // }
      const updateEchartConfig = {
        xAxis: [{ data: lineX }],
        series: [
          {
            data: lineY,
            barWidth: barWidth,
          },
        ],
      };
      myChart.setOption(updateEchartConfig);
    };
    watch(
      charts,
      (newVal, oldVal) => {
        console.log(newVal, oldVal);
        if (newVal != oldVal) {
          updateCharts();
        }
      },
      { deep: true }
    );
    onMounted(() => {
      myChart = echarts.init(
        document.getElementById("line-item_chart" + props.index)
      );
      myChart.setOption(echartConfig);
      updateCharts();
      window.onresize = function () {
        myChart.resize();
      };
      onBeforeUnmount(() => {
        if (myChart) {
          myChart.dispose();
        }
      });
    });
    return {};
  },
});
</script>

<style scoped lang="scss">
.com-container-title {
  width: 438px;
  height: 48px;
  text-align: center;
  font-size: 18px;
  font-family: "semibold";
  font-weight: 600;
  color: #ffffff;
  line-height: 48px;
  text-shadow: 0px 0px 8px rgba(254, 238, 155, 0.3);
  background: url("@/assets/business-img/ic_jg_a_8.svg") 50% / cover no-repeat;
}
.echart {
  width: 437px;
  height: 212px;
  overflow: hidden;
  border: 1px solid #0384ec;
}
</style>
