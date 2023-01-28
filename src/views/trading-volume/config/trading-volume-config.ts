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
    top: 10,
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
    {
      type: "value",
      name: "环比去年",
      show: false,
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        formatter: "{value} %",
      },
      axisLine: {
        lineStyle: {
          color: "rgba(48, 224, 161, 1)",
          type: [2, 16],
          dashOffset: 2,
        },
      },
    },
  ],
  series: [
    {
      type: "pictorialBar",
      zlevel: 3,
      barCategoryGap: "5%",
      labelLine: {
        show: true,
        showAbove: true,
        lineStyle: {
          type: "dashed",
          color: "#fff",
        },
      },
      tooltip: {
        valueFormatter: function (value: string) {
          return value + " 万元";
        },
      },
      barWidth: 24,
      symbol:
        "path://M16.6587 31.1983C28.4114 17.0864 31.6843 0.582123 38.3821 0.0108708C45.0799 -0.560382 53.1128 21.5391 59.9953 29.3446C66.8778 37.1501 79 38.9999 79 38.9999H0C0 38.9999 10.0613 39.1201 16.6587 31.1983Z",
      symbolOffset: [-8, 0],
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
    },
    {
      type: "pictorialBar",
      zlevel: 4,
      barCategoryGap: "5%",
      labelLine: {
        show: true,
        showAbove: true,
        lineStyle: {
          type: "dashed",
          color: "#fff",
        },
      },
      tooltip: {
        valueFormatter: function (value: string) {
          return value + " 万元";
        },
      },
      symbol:
        "path://M16.6587 31.1983C28.4114 17.0864 31.6843 0.582123 38.3821 0.0108708C45.0799 -0.560382 53.1128 21.5391 59.9953 29.3446C66.8778 37.1501 79 38.9999 79 38.9999H0C0 38.9999 10.0613 39.1201 16.6587 31.1983Z",
      symbolOffset: [8, 0],
      barWidth: 24,
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
    },
  ],
};
