export const echartConfig = {
  title: {
    textStyle: {
      fontSize: "14px",
      fontFamily: "Regular",
      fontWeight: "400",
      color: "#B6DFFF",
    },
    left: "0",
    top: 28,
  },
  tooltip: {
    show: false,
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    containLabel: true,
    top: 75,
    left: 0,
    bottom: 0,
  },
  xAxis: {
    show: false,
    type: "value",
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    type: "category",
    data: [""],
    splitLine: {
      show: false,
    },
    axisLabel: {
      color: "#fff",
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    offset: 30,
    max: 3,
  },
  series: [
    {
      name: "",
      zlevel: 30,
      type: "bar",
      barWidth: 10,
      barGap: "-100%",
      itemStyle: {
        color: "#0C196B",
      },
    },
    {
      name: "",
      zlevel: 31,
      type: "bar",
      barWidth: 10,
      smooth: true,
      label: {
        show: false,
      },
      color: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "rgba(162, 118, 255, 1)", // 0% 处的颜色
          },
          {
            offset: 1,
            color: "rgba(162, 118, 255, .5)", // 100% 处的颜色
          },
        ],
        global: false, // 缺省为 false
      },
    },
  ],
};
export const echartConfig_ = {
  title: {
    textStyle: {
      fontSize: "14px",
      fontFamily: "Regular",
      fontWeight: "400",
      color: "#B6DFFF",
    },
    left: "0",
    top: 28,
  },
  tooltip: {
    show: false,
    /*trigger: 'axis',*/
    axisPointer: {
      type: "shadow",
    },
    /* formatter:'{b}<br>{c}元',*/
  },
  grid: {
    containLabel: true,
    top: 75,
    left: 0,
    bottom: 0,
  },
  xAxis: {
    show: false,
    type: "value",
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    type: "category",
    data: [""],
    splitLine: {
      show: false,
    },
    axisLabel: {
      color: "#fff",
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    offset: 30,
    max: 3,
  },
  series: [
    {
      name: "",
      z: 1,
      type: "bar",
      barWidth: 10,
      barGap: "-100%",
      itemStyle: {
        color: "#0C196B",
      },
    },
    {
      name: "",
      type: "bar",
      barWidth: 10,
      smooth: true,
      label: {
        show: false,
      },
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
            color: "rgba(17, 202, 190, 0.5000)", // 100% 处的颜色
          },
        ],
        global: false, // 缺省为 false
      },
    },
  ],
};

export const echartTimeConfig = {
  title: [
    {
      text: "",
      x: "50%",
      y: "65%",
      textAlign: "center",
      textStyle: {
        fontSize: "14px",
        fontFamily: "Regular",
        fontWeight: 400,
        color: "#7DC1F5",
      },
    },
  ],
  //第一个图表
  series: [
    {
      type: "pie",
      animation: false, //鼠标经过的特效
      radius: ["110%", "120%"], // 饼图的半径
      center: ["50%", "74%"],
      startAngle: 180,
      labelLine: {
        show: false,
      },
      label: {
        show: false,
        position: "center",
      },
      data: [
        {
          itemStyle: {
            color: "#161E5A",
          },
        },
      ],
    },
    //上层环形配置
    {
      type: "pie",
      animation: false, //鼠标经过的特效
      radius: ["110%", "120%"], // 饼图的半径
      center: ["50%", "74%"],
      startAngle: 180,
      labelLine: {
        show: false,
      },
      emphasis: {
        label: {
          show: false,
        },
      },
      label: {
        show: true,
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
        position: "center",
        padding: [0, 0, 40, 0],
        fontSize: "14px",
        fontFamily: "Regular",
        fontWeight: 400,
      },
      data: [
        {
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(162, 118, 255, 1)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(162, 118, 255, .5)", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
    },
  ],
};
