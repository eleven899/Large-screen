<template>
  <div ref="myChart" id="myChart" class="map"></div>
</template>
<script>
import mapChinaData from "@/common/map/china.json";
import mapQingDaoData from "@/common/map/city/qingdao.json";
import store from "@/store";
import { inject, onMounted, onBeforeUnmount, computed, watch } from "vue";
import {
  echartMapChinaConfig,
  echartMapQingDaoConfig,
} from "../config/map-config";
export default {
  name: "",
  setup() {
    let mTime = "";
    let myChart;
    let index = "";
    const echarts = inject("echarts");
    const getMainDataList = computed(
      () => store.getters["mainMoudle/getMainDataList"]
    );
    const echartMapConfig = () => {
      if (getMainDataList.value.national_business.mapName == "china") {
        myChart.setOption(echartMapChinaConfig);
      } else {
        myChart.setOption(echartMapQingDaoConfig);
      }
    };
    const getJson = () => {
      if (getMainDataList.value.national_business.mapName == "china") {
        echartMapChinaConfig.series[0].data = mapChinaData.features.map(
          (item) => {
            // 显示窗口的数据转换
            return {
              value: item.value,
              name: item.properties.name,
            };
          }
        );
      } else {
        echartMapQingDaoConfig.series[0].data =
          getMainDataList.value.national_business.mapCharts.map((item) => {
            // 显示窗口的数据转换
            return {
              value: item.value,
              name: item.name,
            };
          });
      }
    };
    const mouseEvents = () => {
      // 鼠标划入
      myChart.on("mouseover", () => {
        // 停止定时器，清除之前的高亮
        clearInterval(mTime);
        mTime = "";
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: index,
        });
      });
      // 鼠标划出重新定时器开始
      myChart.on("mouseout", () => {
        mapActive();
      });
    };
    //   // 高亮轮播
    const mapActive = () => {
      const dataLength = mapQingDaoData.features.length;
      // 用定时器控制高亮
      mTime = setInterval(() => {
        // 清除之前的高亮
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: index,
        });
        index++;
        // 当前下标高亮
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: index,
        });
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: index,
        });
        if (index > dataLength) {
          index = -1;
        }
      }, 3000);
    };
    onMounted(() => {
      if (getMainDataList.value.national_business.mapName == "china") {
        echarts.registerMap("China", mapChinaData);
      } else {
        echarts.registerMap("QingDao", mapQingDaoData);
      }
      getJson();
      myChart = echarts.init(document.getElementById("myChart"));
      echartMapConfig();
      mapActive();
      mouseEvents();
      window.onresize = function () {
        myChart.resize();
      };
    });
    onBeforeUnmount(() => {
      clearInterval(mTime);
      myChart.dispose();
    });
    watch(
      getMainDataList,
      (newVal, oldVal) => {
        if (newVal != oldVal) {
          getJson();
          echartMapConfig();
        }
      },
      { deep: true }
    );
    return {};
  },
};
</script>
<style scoped lang="scss">
.map {
  width: 417px;
  height: 300px;
  overflow: hidden;
}
</style>
