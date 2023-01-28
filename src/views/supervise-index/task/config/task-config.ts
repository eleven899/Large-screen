export const echartConfig = {
  legend: {
    orient: "horization", // 垂直排列
    top: 20,
    right: 50,
    itemGap: 14, // 调整每项之前的间距
    textStyle: {
      color: "#808080", // 文本颜色
    },
  },
  tooltip: {
    show: false,
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      emphasis: {
        label: {
          show: false,
          // fontSize: "12",
          // color: "rgba(255, 255, 255, 1)",
          // lineHeight: 20,
          // padding: [0, 35, 0, 0],
          // formatter: (params: any) => {
          //   console.log(params);
          //   return `
          //   业务分类
          //   占比${params?.percent}%`;
          // },
        },
      },
      left: 73,
      top: 40,
      color: [
        "rgba(48, 224, 161, 0.6000)",
        "rgba(52, 167, 255, 0.6000)",
        "rgba(232, 206, 121, 0.6000)",
        "rgba(255, 69, 69, 0.6000)",
        "rgba(255, 149, 69, 0.6000)",
      ],
      roseType: "area",
      radius: ["56%", "82%"], // 饼图的半径
      avoidLabelOverlap: false, // 防止标签重叠，默认开启
      center: [40, 62], // 饼图的中心（圆心）坐标
      label: {
        // 文本标签
        show: true,
        color: "rgba(255, 255, 255, 1)",
        fontSize: 14,
        lineHeight: 20,
        position: "center", // 文本标签位置,
        padding: [0, 0, 0, 0],
        formatter: (params: any) => {
          return `{a|业务分类}\n{b|占比}`;
        },
        rich: {
          a: {
            fontSize: "14px",
            fontFamily: "Regular",
            fontWeight: 500,
            color: "#FFFFFF",
            textShadow: "0px 0px 10px rgba(125,193,245,0.7000)",
          },
          b: {
            fontSize: "14px",
            fontFamily: "Medium",
            fontWeight: 500,
            color: "#7DC1F5",
          },
        },
      },
      labelLine: {
        // 引导线
        show: false,
      },
      itemStyle: {},
    },
  ],
};
