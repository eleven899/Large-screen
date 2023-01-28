export const echartConfig = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      color: 'rgba(63, 114, 223, 0.2)'
    }
  },
  legend: {
    data: ['实际', '计划'],
    right: 20,
    top: 20,
    textStyle: {
      //----图例内容样式
      color: 'rgba(202, 232, 255, 1)' //---所有图例的字体颜色
    },
    icon: 'circle',
    axisPointer: {
      show: false
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    nameLocation: 'center',
    axisTick: {
      show: false
    },
    axisLabel: {
      formatter: ''
    },
    axisLine: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(36, 108, 249, 0.6000)',
        width: 0.5,
        type: 'dotted'
      }
    }
  },
  yAxis: {
    type: 'category',
    axisTick: {
      show: false
    },
    data: ['A品牌', 'B品牌', 'C品牌'],
    axisLine: {
      show: false,
      lineStyle: {
        width: 0,
        color: 'rgba(36, 108, 249, 1)',
        type: [2, 16],
        dashOffset: 2
      }
    },
    splitLine: {
      lineStyle: {
        color: 'white',
        width: 0.5,
        type: 'dotted'
      }
    }
  },
  series: [
    {
      name: '实际',
      type: 'bar',
      data: [345, 375, 362],
      barWidth: 5,
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(17, 202, 190, 1)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(17, 202, 190, 0.5000)' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      },
      label: {
        show: true,
        position: 'right',
        textStyle: {
          color: 'rgba(17, 202, 190, 1)'
        },
        // distance: 45,
        formatter: '{@score}万'
      }
    },
    {
      name: '计划',
      type: 'bar',
      data: [500, 475, 425],
      barWidth: 5,
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(36, 108, 249, 1)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(36, 108, 249, 0.5000)' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      },
      z: '-1',
      barGap: '-100%',
      label: {
        show: true,
        position: 'right',
        textStyle: {
          color: 'rgba(85, 142, 255, 1)'
        },
        // distance: 30，
        formatter: '{@score}万'
      }
    }
  ]
}
