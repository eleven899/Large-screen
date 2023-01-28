export const echartConfig = {
  tooltip: {
    //配置提示框组件
    trigger: "axis",
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
  },
  grid: {
    show: false, //---是否显示直角坐标系网格
    left: 72, //---相对位置，top\bottom\left\right
    right: 22,
    top: 42,
    bottom: 42,
    tooltip: {},
  },
  legend: {
    right: 20,
    top: 3,
    textStyle: {
      //----图例内容样式
      color: "rgba(202, 232, 255, 1)", //---所有图例的字体颜色
    },
    icon: "circle",
    axisPointer: {
      show: false,
    },
  },
  xAxis: [
    {
      type: "category",
      axisLine: {
        show: false,
        lineStyle: {
          color: "rgba(202, 232, 255, 1)",
          type: [2, 16],
          dashOffset: 2,
        },
      },
      axisTick: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      interval: 50,
      axisLabel: {
        formatter: "{value} 万元",
      },
      axisLine: {
        lineStyle: {
          color: "rgba(36, 108, 249, 1)",
          type: [2, 16],
          dashOffset: 2,
        },
      },
      splitLine: {
        lineStyle: {
          color: "rgba(36, 108, 249, 0.6000)",
          width: 0.5,
          type: "dotted",
        },
      },
    },
  ],
  series: [
    {
      type: "bar",
      zlevel: 15,
      tooltip: {
        valueFormatter: function (value: string) {
          return value + " 万元";
        },
      },
      barWidth: 20,
      color: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "rgba(17, 202, 190, 1)", // 0% 处的颜色
          },
          {
            offset: 1,
            color: "rgba(17, 202, 190, 0)", // 100% 处的颜色
          },
        ],
        global: false, // 缺省为 false
      },
      label: {
        show: true,
        position: "top",
        color: "rgba(17, 202, 190, 0.5000)",
      },
    },
    {
      type: "bar",
      zlevel: 16,
      tooltip: {
        valueFormatter: function (value: string) {
          return value + " 万元";
        },
      },
      barWidth: 20,
      // barGap: "55%",
      color: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "rgba(54, 103, 234, 1)", // 0% 处的颜色
          },
          {
            offset: 1,
            color: "rgba(36, 108, 249, 0)", // 100% 处的颜色
          },
        ],
        global: false, // 缺省为 false
      },
      label: {
        show: true,
        position: "top",
        color: "rgba(62, 127, 255, 1)",
      },
    },
  ],
};
