<template>
  <div id="index" ref="appRef">
    <div class="jianguan_bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <HeaderTop
          :dropdownData="dropdownData"
          :isFooterShow="false"
          :switchBg="true"
        />
        <div class="container">
          <div class="container-top">
            <div class="container-top-header">
              <div class="container-top-header_title">
                <img src="@/assets/supervise-img/ic_jg_a_a1.png" />
              </div>
              <div
                class="container-top-header_title container-top-header_titles"
              >
                <img src="@/assets/supervise-img/ic_jg_a_a2.png" />
              </div>
            </div>
            <div class="container-top-info">
              <div
                class="container-top-info_item"
                v-for="item in enterpriseList"
                :key="item.img_url"
              >
                <enterprise-item :item="item"></enterprise-item>
              </div>
            </div>
          </div>
          <div class="container-center">
            <div
              class="container-center-item"
              v-for="(item, index) in taskList"
              :key="item.img_url"
            >
              <img
                :src="
                  require('../../assets/supervise-img/ic_jg_a_a' +
                    item.img_url +
                    '.png')
                "
              />
              <div class="container-center-item_charts">
                <task-item :index="index"></task-item>
              </div>
            </div>
          </div>
          <div class="container-end">
            <div class="container-end-header">
              <div class="container-end-header_title">
                <img src="@/assets/supervise-img/ic_jg_a_a6.png" />
              </div>
              <div
                class="container-end-header_title container-end-header_titles"
              >
                <img src="@/assets/supervise-img/ic_jg_a_a7.png" />
              </div>
            </div>
            <div class="container-end-info clearfix">
              <div
                class="container-top-info_item"
                v-for="item in statisticalList"
                :key="item.img_url"
              >
                <statistical-item :item="item"></statistical-item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  onUnmounted,
  toRefs,
} from "vue";
import taskItem from "./task/task.vue";
import enterpriseItem from "./enterprise/enterprise.vue";
import statisticalItem from "./statistical/statistical.vue";
import HeaderTop from "@/components/header.vue";
import useDraw from "@/utils/useDraw";
import { useStore } from "vuex";
import { getTaskData } from "@/service/main/main";
export default defineComponent({
  name: "superviseIndex",
  components: {
    taskItem,
    enterpriseItem,
    statisticalItem,
    HeaderTop,
  },
  setup() {
    const store = useStore();
    // * 加载标识
    const loading = ref<boolean>(true);
    // 处理 loading 展示
    const cancelLoading = () => {
      setTimeout(() => {
        loading.value = false;
      }, 500);
    };
    // * 适配处理
    const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw();
    //初始数据
    let data = reactive({
      enterpriseList: [],
      statisticalList: [],
    });
    const taskList = [
      {
        img_url: "3",
      },
      {
        img_url: "4",
      },
      {
        img_url: "5",
      },
    ];
    const dropdownData = {
      current: "任务流转",
      dropdownItem: {
        one: {
          name: "首页",
          command: 0,
        },
        two: {
          name: "资金监管",
          command: 1,
        },
        three: {
          name: "税务监管",
          command: 2,
        },
      },
    };

    //请求数据
    const getsuperData = async () => {
      const res: any = await getTaskData();
      data.enterpriseList = res.data.active_data;
      data.statisticalList = res.data.statistics_data;
      console.log("任务流转页面数据:", res.data);
      store.commit("taskMoudle/changeMainData", res.data);
    };
    getsuperData();
    //定时请求数据
    // setInterval(() => {
    //   loading.value = false;
    //   getsuperData();
    // }, 60000);
    const { enterpriseList, statisticalList } = toRefs(data);
    // 生命周期
    onMounted(() => {
      cancelLoading();
      // 屏幕适应
      windowDraw();
      calcRate();
    });

    onUnmounted(() => {
      unWindowDraw();
      loading.value = true;
    });

    //测试数据
    // const enterpriseList =
    // [
    //   {
    //     img_url: "1",
    //     title: "本月发布新任务企业数量",
    //     amount: "1,205",
    //     unit: "家",
    //   },
    //   {
    //     img_url: "2",
    //     title: "本月任务进行中企业数量",
    //     amount: "1,205",
    //     unit: "家",
    //   },
    //   {
    //     img_url: "3",
    //     title: "本月承接任务个体工商户数量",
    //     amount: "1,205",
    //     unit: "户",
    //   },
    //   {
    //     img_url: "4",
    //     title: "本月执行任务个体工商户数量",
    //     amount: "1,205",
    //     unit: "户",
    //   },
    // ];
    // const statisticalList = store.state.taskMoudle.taskData.statistics_data;
    // [
    //   {
    //     img_url: "1",
    //     title: "累计发放金额 (¥)",
    //     amount: "105,660,081",
    //   },
    //   {
    //     img_url: "2",
    //     title: "本月发放金额 (¥)",
    //     amount: "15,660,081",
    //   },
    //   {
    //     img_url: "3",
    //     title: "已完成任务",
    //     amount: "2,190",
    //   },
    //   {
    //     img_url: "4",
    //     title: "已开票任务",
    //     amount: "2,190",
    //   },
    //   {
    //     img_url: "5",
    //     title: "本月开票金额 (¥)",
    //     amount: "15,660,081",
    //   },
    //   {
    //     img_url: "6",
    //     title: "累计开票金额 (¥)",
    //     amount: "105,660,081",
    //   },
    // ];
    return {
      loading,
      appRef,
      enterpriseList,
      statisticalList,
      taskList,
      dropdownData,
    };
  },
});
</script>
<style scoped lang="scss">
@import "@/assets/scss/index.scss";
//解决高度塌陷
.clearfix:before,
.clearfix:after {
  content: " ";
  display: table;
  clear: both;
}

.host-body {
  width: 100%;
  height: 100%;
  padding: 20px 0 0 0;
}
.container {
  width: 1920px;
  height: calc(100% - 70px);
  margin-top: 70px;
  background-size: cover;
  background: url("../../assets/supervise-img/bg_le.png") no-repeat 100% center;
  &-top {
    &-header {
      display: flex;
      justify-content: center;
      &_title {
        width: 662px;
        height: 68px;
        margin-right: 129px;
      }
      &_titles {
        margin-right: 0;
      }
    }
    &-info {
      width: 100%;
      padding: 14px 190px 0 253px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: nowrap;
      box-sizing: border-box;
    }
  }
  &-center {
    width: 100%;
    height: 270px;
    margin: 90px 0 40px 0;
    display: flex;
    &-item {
      width: 505px;
      box-sizing: border-box;
      &_charts {
        width: 100%;
        height: 200px;
      }
    }
  }
  &-end {
    &-header {
      display: flex;
      justify-content: center;
      &_title {
        width: 662px;
        height: 68px;
        margin-right: 129px;
      }
      &_titles {
        margin-right: 0;
      }
    }
    &-info {
      width: 100%;
      padding: 45px 0px 0 0px;
      display: flex;
      justify-content: start;
      align-items: center;
      flex-wrap: nowrap;
      box-sizing: border-box;
    }
  }
}
.container-center-item:nth-child(1) {
  margin-left: 198px;
}
.container-center-item:nth-child(2) {
  margin: 0 18px;
}
.container-end-info {
  .container-top-info_item:nth-child(1) {
    margin-left: 105px;
  }
  .container-top-info_item:nth-child(2) {
    margin-left: 22px;
  }
  .container-top-info_item:nth-child(3) {
    width: 235px;
    margin-left: 20px;
  }
  .container-top-info_item:nth-child(4) {
    width: 235px;
    margin-left: 30px;
  }
  .container-top-info_item:nth-child(5) {
    margin-left: 20px;
  }
  .container-top-info_item:nth-child(6) {
    margin-left: 20px;
  }
}
</style>
