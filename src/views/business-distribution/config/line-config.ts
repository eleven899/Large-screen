export const echartConfig = {
  title: {
    show: false,
  },
  tooltip: {
    //配置提示框组件
    trigger: "item",
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
    left: 50, //---相对位置，top\bottom\left\right
    right: 60,
    top: 20,
    bottom: 0,
    tooltip: {},
  },
  // color: color,
  yAxis: [
    {
      type: "category",
      inverse: true,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        inside: false,
        color: "#ffffff",
        fontSize: 16,
        margin: 60,
      },
    },
    {
      inverse: true,
      type: "category",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        inside: false,
        padding: [0, 0, 0, 10],
        fontSize: 16,
        fontFamily: "Medium",
        fontWeight: 500,
        color: "#7DC1F5",
        formatter: function (val) {
          return `${val}%`;
        },
      },
      splitArea: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
  ],
  xAxis: {
    type: "value",
    max: 100,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
  },
  series: [
    {
      name: "",
      type: "bar",
      zlevel: 10,
      barWidth: "5",
      animationDuration: 1500,
      label: {
        show: true,
        position: ["-45px", "0px"],
        fontSize: 14,
        fontFamily: "Regular",
        fontWeight: 400,
        color: "#CAE8FF",
        formatter: function (a, b) {
          return a.name;
        },
      },
    },
    {
      name: "",
      type: "bar",
      zlevel: 2,
      barWidth: "5",
      barGap: "-100%",
      animationDuration: 1500,
      tooltip: {
        show: false,
      },
      label: {
        color: "#b3ccf8",
        show: false,
        fontSize: 16,
        formatter: function (a, b) {
          return a.name;
        },
      },
    },
  ],
  animationEasing: "cubicOut",
};
