export const echartMapChinaConfig = {
  tooltip: {
    show: true,
    trigger: "item",
    alwaysShowContent: false,
    backgroundColor: "rgba(13, 38, 111, 0.5000)",
    borderColor: "#246CF9",
    hideDelay: 100,
    triggerOn: "mousemove",
    enterable: false,
    showDelay: 100,
    position: "inside",
  },
  series: [
    {
      tooltip: {
        // 显示的窗口
        trigger: "item",
        formatter: function (item) {
          let tipHtml = "";
          tipHtml = `<div style="font-size:12px;font-family:Regular;color:#FFFFFF;line-height:10px;font-weight:500;">${item.name}${item.value}人</div>`;
          return tipHtml;
        },
        borderWidth: 0,
      },
      name: "中国数据",
      type: "map",
      map: "China", // 自定义扩展图表类型
      zoom: 1, // 缩放
      showLegendSymbol: true,
      label: {
        // 文字
        show: false,
        color: "#fff",
        fontSize: 10,
      },
      itemStyle: {
        areaColor: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          global: false,
          colorStops: [
            {
              offset: 1,
              color: "rgba(62, 127, 255, 0.2300)", // 100% 处的颜色
            },
            {
              offset: 0,
              color: "rgba(0, 219, 255, 0.2000)", // 0% 处的颜色
            },
          ], //地图背景色
        },
        borderColor: "rgba(0, 219, 255, 0.2000)", //省市边界线00fcff 516a89
        borderWidth: 2,
      },
      // 选中状态下的多边形和标签样式
      emphasis: {
        itemStyle: {
          color: "rgba(19, 245, 219, 0.2900)", //地图背景色
          areaColor: "rgba(19, 245, 219, 0.2900)", //地图背景色
          borderColor: "rgba(236, 228, 198, 0.4400)", //省市边界线00fcff 516a89
          borderWidth: 2,
        },
        label: {
          show: false,
          color: "#fff",
        },
      },
      select: {
        disabled: true,
      },
      layoutCenter: ["50%", "50%"],
      layoutSize: "120%",
      data: "",
    },
  ],
};
export const echartMapQingDaoConfig = {
  tooltip: {
    show: true,
    trigger: "item",
    alwaysShowContent: false,
    backgroundColor: "rgba(13, 38, 111, 0.7000)",
    borderColor: "#246CF9",
    hideDelay: 100,
    triggerOn: "mousemove",
    enterable: true,
    showDelay: 100,
    position: "right",
  },
  series: [
    {
      tooltip: {
        // 显示的窗口
        trigger: "item",
        formatter: function (item) {
          let tipHtml = "";
          tipHtml = `<div style="font-size:14px;font-family:Regular;color:#FFFFFF;line-height:20px;font-weight:500;padding-bottom:5px">${item.name}${item.value}人</div>`;
          return tipHtml;
        },
        borderWidth: 0,
      },
      name: "青岛省数据",
      type: "map",
      map: "QingDao", // 自定义扩展图表类型
      zoom: 1, // 缩放
      showLegendSymbol: true,
      label: {
        // 文字
        show: false,
        color: "#fff",
        fontSize: 10,
      },
      itemStyle: {
        areaColor: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          global: false,
          colorStops: [
            {
              offset: 1,
              color: "rgba(62, 127, 255, 0.2300)", // 100% 处的颜色
            },
            {
              offset: 0,
              color: "rgba(0, 219, 255, 0.2000)", // 0% 处的颜色
            },
          ], //地图背景色
        },
        borderColor: "rgba(0, 219, 255, 0.2000)", //省市边界线00fcff 516a89
        borderWidth: 2,
      },
      // 选中状态下的多边形和标签样式
      emphasis: {
        itemStyle: {
          areaColor: "rgba(19, 245, 219, 0.2900)", //地图背景色
          borderColor: "rgba(236, 228, 198, 0.4400)", //省市边界线00fcff 516a89
          borderWidth: 2,
        },
        label: {
          show: false,
          color: "#fff",
        },
      },
      select: {
        disabled: true,
      },
      layoutCenter: ["50%", "50%"],
      layoutSize: "95%",
      data: "",
    },
  ],
};
