<template>
  <div
    class="com-container"
    style="position: relative; display: flex; justify-content: center"
  >
    <div class="com-container_img"></div>
    <!-- <div class="com-container_img_vice"></div> -->
    <img
      class="com-container_img_vice"
      src="@/assets/supervise-img/ani_z1.png"
      alt=""
    />
    <div class="text-box">
      <div class="amount">{{ sum / 10 }}</div>
      <div class="text">总计</div>
    </div>
    <div class="com-container-echart" :id="'task_chart_' + index"></div>
  </div>
</template>
<script>
import { inject, ref, onMounted, onBeforeUnmount } from "vue";
import "echarts-gl";
import { useStore } from "vuex";
export default {
  name: "pieChart",
  props: {
    index: Number,
  },
  setup(props) {
    const store = useStore();
    const echarts = inject("echarts");
    const optionData =
      store.state.taskMoudle.taskData.task_status_data[props.index];
    let sum = ref(0);
    optionData.forEach((item) => {
      item.value = item.value * 10;
      sum.value += item.value;
    });
    let option = {};
    let myChart;
    onMounted(() => {
      myChart = echarts.init(
        document.getElementById("task_chart_" + props.index)
      );
      option = getPie3D(optionData, 0.8);
      myChart.setOption(option);
      bindListen(myChart);
    });
    onBeforeUnmount(() => {
      if (myChart) {
        myChart.dispose();
      }
    });
    // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
    function getParametricEquation(
      startRatio,
      endRatio,
      isSelected,
      isHovered,
      k,
      h
    ) {
      // 计算
      let midRatio = (startRatio + endRatio) / 2;
      let startRadian = startRatio * Math.PI * 2;
      let endRadian = endRatio * Math.PI * 2;
      let midRadian = midRatio * Math.PI * 2;
      // 如果只有一个扇形，则不实现选中效果。
      if (startRatio === 0 && endRatio === 1) {
        isSelected = false;
      }
      // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
      k = typeof k !== "undefined" ? k : 1 / 3;
      // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
      let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
      let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
      // 计算高亮效果的放大比例（未高亮，则比例为 1）
      let hoverRate = isHovered ? 1.05 : 1;
      // 返回曲面参数方程
      return {
        u: {
          min: -Math.PI,
          max: Math.PI * 3,
          step: Math.PI / 32,
        },
        v: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20,
        },
        x: function (u, v) {
          if (u < startRadian) {
            return (
              offsetX +
              Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          if (u > endRadian) {
            return (
              offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        y: function (u, v) {
          if (u < startRadian) {
            return (
              offsetY +
              Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          if (u > endRadian) {
            return (
              offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        z: function (u, v) {
          if (u < -Math.PI * 0.5) {
            return Math.sin(u);
          }
          if (u > Math.PI * 2.5) {
            return Math.sin(u) * h * 0.1;
          }
          return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
        },
      };
    }

    function fomatFloat(num, n) {
      var f = parseFloat(num);
      if (isNaN(f)) {
        return false;
      }
      f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); // n 幂
      var s = f.toString();
      var rs = s.indexOf(".");
      //判定如果是整数，增加小数点再补0
      if (rs < 0) {
        rs = s.length;
        s += ".";
      }
      while (s.length <= rs + n) {
        s += "0";
      }
      return s;
    }

    function bindListen(myChart) {
      // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
      let selectedIndex = "";
      let hoveredIndex = "";

      // 监听 mouseover，近似实现高亮（放大）效果
      myChart.on("mouseover", function (params) {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === params.seriesIndex) {
          return;
          // 否则进行高亮及必要的取消高亮操作
        } else {
          // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
          if (hoveredIndex !== "") {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
            isSelected = option.series[hoveredIndex].pieStatus.selected;
            isHovered = false;
            startRatio = option.series[hoveredIndex].pieData.startRatio;
            endRatio = option.series[hoveredIndex].pieData.endRatio;
            k = option.series[hoveredIndex].pieStatus.k;
            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            option.series[hoveredIndex].parametricEquation =
              getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                option.series[hoveredIndex].pieData.value
              );
            option.series[hoveredIndex].pieStatus.hovered = isHovered;
            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = "";
          }
          // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
          if (
            params.seriesName !== "mouseoutSeries" &&
            params.seriesName !== "pie2d"
          ) {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            isSelected = option.series[params.seriesIndex].pieStatus.selected;
            isHovered = true;
            startRatio = option.series[params.seriesIndex].pieData.startRatio;
            endRatio = option.series[params.seriesIndex].pieData.endRatio;
            k = option.series[params.seriesIndex].pieStatus.k;
            // 对当前点击的扇形，执行高亮操作（对 option 更新）
            option.series[params.seriesIndex].parametricEquation =
              getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                option.series[params.seriesIndex].pieData.value + 5
              );
            option.series[params.seriesIndex].pieStatus.hovered = isHovered;
            // 记录上次高亮的扇形对应的系列号 seriesIndex
            hoveredIndex = params.seriesIndex;
          }
          // 使用更新后的 option，渲染图表
          myChart.setOption(option);
        }
      });
      // 修正取消高亮失败的 bug
      myChart.on("globalout", function () {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        if (hoveredIndex !== "") {
          // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
          isSelected = option.series[hoveredIndex].pieStatus.selected;
          isHovered = false;
          k = option.series[hoveredIndex].pieStatus.k;
          startRatio = option.series[hoveredIndex].pieData.startRatio;
          endRatio = option.series[hoveredIndex].pieData.endRatio;
          // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
          option.series[hoveredIndex].parametricEquation =
            getParametricEquation(
              startRatio,
              endRatio,
              isSelected,
              isHovered,
              k,
              option.series[hoveredIndex].pieData.value
            );
          option.series[hoveredIndex].pieStatus.hovered = isHovered;
          // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
          hoveredIndex = "";
        }
        // 使用更新后的 option，渲染图表
        myChart.setOption(option);
      });
    }
    //获取3d丙图的最高扇区的高度
    function getHeight3D(series, height) {
      series.sort((a, b) => {
        return b.pieData.value - a.pieData.value;
      });
      return (height * 25) / series[0].pieData.value;
    }
    // 生成模拟3d饼图的配置项
    function getPie3D(pieData, internalDiameterRatio) {
      //internalDiameterRatio:透明的空心占比
      let series = [];
      let sumValue = 0;
      let startValue = 0;
      let endValue = 0;
      let legendData = [];
      let legendBfb = [];
      let k = 1 - internalDiameterRatio;
      pieData.sort((a, b) => {
        return b.value - a.value;
      });
      // 为每一个饼图数据，生成一个 series-surface 配置
      for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value;
        let seriesItem = {
          name:
            typeof pieData[i].name === "undefined"
              ? `series${i}`
              : pieData[i].name,
          type: "surface",
          parametric: true,
          wireframe: {
            show: false,
          },
          pieData: pieData[i],
          pieStatus: {
            selected: false,
            hovered: false,
            k: k,
          },
          label: {
            // 文本标签
            show: true,
            color: "rgba(255, 255, 255, 1)",
            fontSize: 14,
            lineHeight: 20,
            position: "center", // 文本标签位置,
            padding: [0, 0, 0, 0],
          },
        };

        if (typeof pieData[i].itemStyle != "undefined") {
          let itemStyle = {};
          typeof pieData[i].itemStyle.color != "undefined"
            ? (itemStyle.color = pieData[i].itemStyle.color)
            : null;
          typeof pieData[i].itemStyle.opacity != "undefined"
            ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
            : null;
          seriesItem.itemStyle = itemStyle;
        }
        series.push(seriesItem);
      }

      // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
      // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
      legendData = [];
      legendBfb = [];
      for (let i = 0; i < series.length; i++) {
        endValue = startValue + series[i].pieData.value;
        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        series[i].parametricEquation = getParametricEquation(
          series[i].pieData.startRatio,
          series[i].pieData.endRatio,
          false,
          false,
          k,
          series[i].pieData.value
        );
        startValue = endValue;
        let bfb = fomatFloat(series[i].pieData.value / sumValue, 4);
        legendData.push({
          name: series[i].name,
          value: bfb,
        });
        legendBfb.push({
          name: series[i].name,
          value: bfb,
        });
      }
      let boxHeight = getHeight3D(series, 3); //通过传参设定3d饼/环的高度，26代表26px
      // 准备待返回的配置项，把准备好的 legendData、series 传入。
      let option = {
        color: [
          "rgba(48, 224, 161, 0.6000)",
          "rgba(52, 167, 255, 0.6000)",
          "rgba(232, 206, 121, 0.6000)",
          "rgba(255, 149, 69, 0.6000)",
          "rgba(255, 69, 69, 0.6000)",
        ],
        legend: {
          data: legendData,
          orient: "horization",
          top: 20,
          right: 10,
          itemGap: 14, // 调整每项之前的间距
          textStyle: {
            color: "rgba(125, 193, 245, 1)", // 文本颜色
          },
          show: true,
          icon: "circle",
          formatter: function (param) {
            let item = legendBfb.filter((item) => item.name == param)[0];
            let bfs = fomatFloat(item.value * 100, 2) + "%";
            return `${item.name}  ${bfs}`;
          },
        },
        labelLine: {
          show: false,
          lineStyle: {
            color: "#7BC0CB",
          },
        },
        label: {
          show: true,
          position: "outside",
          rich: {
            b: {
              color: "#7BC0CB",
              fontSize: 12,
              lineHeight: 20,
            },
            c: {
              fontSize: 16,
            },
          },
          formatter: "{b|{b} \n}{c|{c}}{b|  亩}",
        },
        tooltip: {
          //配置提示框组件
          trigger: "item",
          axisPointer: {
            type: "shadow",
            color: "rgba(63, 114, 223, 0.2)",
          },
          showDelay: 0,
          hideDelay: 0,
          transitionDuration: 0,
          backgroundColor: "rgba(13, 38, 111, 0.7000)",
          borderColor: "#246CF9",
          borderRadius: 2,
          borderWidth: 1,
          padding: 10,
          textStyle: {
            color: "rgba(255, 255, 255, 1)",
            decoration: "none",
            fontFamily: "Regular",
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: 400,
          },
          //   show: false,
          formatter: (params) => {
            if (
              params.seriesName !== "mouseoutSeries" &&
              params.seriesName !== "pie2d"
            ) {
              let bfb = (
                (option.series[params.seriesIndex].pieData.endRatio -
                  option.series[params.seriesIndex].pieData.startRatio) *
                100
              ).toFixed(2);
              return (
                `${params.seriesName}<br/>` +
                `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` +
                `${bfb}%`
              );
            }
          },
        },
        xAxis3D: {
          min: -1,
          max: 1,
        },
        yAxis3D: {
          min: -1,
          max: 1,
        },
        zAxis3D: {
          min: -1,
          max: 1,
        },
        grid3D: {
          show: false,
          boxHeight: boxHeight, //圆环的高度

          viewControl: {
            //3d效果可以放大、旋转等，请自己去查看官方配置
            alpha: 25, //角度
            distance: 120, //调整视角到主体的距离，类似调整zoom
            rotateSensitivity: 0, //设置为0无法旋转
            zoomSensitivity: 0, //设置为0无法缩放
            panSensitivity: 0, //设置为0无法平移
            autoRotate: true, //自动旋转
          },
        },
        series: series,
      };
      return option;
    }
    return {
      sum,
    };
  },
};
</script>
<style scoped lang="scss">
.com-container_img {
  position: absolute;
  bottom: -10px;
  width: 303px;
  height: 149px;
  background: url("@/assets/supervise-img/pic_jxpx_jdbg.png") center no-repeat;
}
.com-container_img_vice {
  position: absolute;
  bottom: 20px;
  width: 280px;
  height: 120px;
  transform-origin: center center;
  // background: url("@/assets/supervise-img/ani_z1.png") center no-repeat;
  // background-clip: cover;
}
.com-container-echart {
  padding: 0 0 30px 0;
}
.text-box {
  position: absolute;
  top: 0;
  z-index: 111111;
  text-align: center;
  cursor: pointer;
  .amount {
    font-size: 40px;
    font-family: "Medium";
    font-weight: 500;
    color: #ffffff;
    line-height: 54px;
    text-shadow: 0px 0px 15px rgba(125, 193, 245, 0.7);
  }
  .text {
    font-size: 24px;
    font-family: "Semibold";
    font-weight: 600;
    color: #b6dfff;
    line-height: 30px;
    letter-spacing: 1px;
  }
}
</style>
