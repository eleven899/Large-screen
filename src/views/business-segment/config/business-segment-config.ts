export const echartConfig = {
  legend: {
    orient: "horization", // 垂直排列
    top: 20,
    right: 50,
    itemGap: 14, // 调整每项之前的间距
    textStyle: {
      color: "#7DC1F5",
      fontSize: 15, // 文本颜色
    },
  },
  tooltip: {
    show: false,
  },
  series: [
    {
      name: "",
      type: "pie",
      emphasis: {
        label: {
          show: false,
        },
      },
      left: 73,
      top: 40,
      color: [
        "rgba(17, 202, 190, 1)",
        "rgba(36, 160, 249, 1)",
        "rgba(36, 108, 249, 1)",
        "rgba(92, 76, 186, 1)",
        "rgba(17, 202, 190, 0.5000)",
        "rgba(40,84,187,1)",
      ],
      roseType: "radius",
      radius: ["56%", "82%"], // 饼图的半径
      avoidLabelOverlap: false, // 防止标签重叠，默认开启
      center: [40, 62], // 饼图的中心（圆心）坐标
      label: {
        // 文本标签
        show: false,
        color: "rgba(255, 255, 255, 1)",
        fontSize: 15,
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
