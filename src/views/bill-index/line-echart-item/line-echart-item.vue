<template>
  <div class="com-container">
    <div class="com-container-title">{{ item }}</div>
    <div class="echart" :id="'line-item_chart' + index"></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  onMounted,
  ref,
  onBeforeUnmount,
  watch,
  computed,
} from "vue";
import { echartConfig } from "../config/line-item-config";
import { useStore } from "vuex";
export default defineComponent({
  name: "line-echart-item",
  props: {
    index: Number,
    config: Object,
    item: String,
  },
  setup(props: any) {
    let store = useStore();
    const echarts: any = inject("echarts");
    const charts = computed(() => {
      //返回的是ref对象
      return store.state.billMoudle.billData.chart_data[props.index];
    });
    let myChart;
    const updateCharts = () => {
      const lineY = [];
      const lineX = [];
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
              shadowBlur: 15,
              shadowColor: "rgba(0, 0, 0, 0.1)",
            },
          },
        };
        lineX.push(charts.value[i].name);
        lineY.push(data);
      }
      let axLabel = "{value}万元";
      if (props.index > 0) {
        axLabel = "{value}个";
      }
      let barWidth = 12;
      //勿删除  柱状图粗细调整
      // if (charts.value.length == 9 || charts.value.length == 10) {
      //   barWidth = 12;
      // }
      // if (charts.value.length == 11 || charts.value.length == 12) {
      //   barWidth = 12;
      // }
      let unit = "万元";
      if (props.index > 0) {
        unit = "个";
      }
      let name = "销售额";
      if (props.index == 1) {
        name = "数量";
      }
      if (props.index > 1) {
        name = "总数";
      }
      const updateEchartConfig = {
        xAxis: [{ data: lineX }],
        yAxis: [
          {
            axisLabel: {
              formatter: `${axLabel}`,
            },
          },
        ],
        series: [
          {
            name: name,
            data: lineY,
            barWidth: barWidth,
            tooltip: {
              valueFormatter: function (value: string) {
                return value + `${unit}`;
              },
            },
          },
        ],
      };
      myChart.setOption(updateEchartConfig);
    };
    watch(
      charts,
      (newVal, oldVal) => {
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
    });
    onBeforeUnmount(() => {
      if (myChart) {
        myChart.clear();
        myChart.dispose();
      }
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
  height: 210px;
  overflow: hidden;
  border: 1px solid #0464c2;
}
</style>
