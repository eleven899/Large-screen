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
    // * ????????????
    const loading = ref<boolean>(true);
    // ?????? loading ??????
    const cancelLoading = () => {
      setTimeout(() => {
        loading.value = false;
      }, 500);
    };
    // * ????????????
    const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw();
    //????????????
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
      current: "????????????",
      dropdownItem: {
        one: {
          name: "??????",
          command: 0,
        },
        two: {
          name: "????????????",
          command: 1,
        },
        three: {
          name: "????????????",
          command: 2,
        },
      },
    };

    //????????????
    const getsuperData = async () => {
      const res: any = await getTaskData();
      data.enterpriseList = res.data.active_data;
      data.statisticalList = res.data.statistics_data;
      console.log("????????????????????????:", res.data);
      store.commit("taskMoudle/changeMainData", res.data);
    };
    getsuperData();
    //??????????????????
    // setInterval(() => {
    //   loading.value = false;
    //   getsuperData();
    // }, 60000);
    const { enterpriseList, statisticalList } = toRefs(data);
    // ????????????
    onMounted(() => {
      cancelLoading();
      // ????????????
      windowDraw();
      calcRate();
    });

    onUnmounted(() => {
      unWindowDraw();
      loading.value = true;
    });

    //????????????
    // const enterpriseList =
    // [
    //   {
    //     img_url: "1",
    //     title: "?????????????????????????????????",
    //     amount: "1,205",
    //     unit: "???",
    //   },
    //   {
    //     img_url: "2",
    //     title: "?????????????????????????????????",
    //     amount: "1,205",
    //     unit: "???",
    //   },
    //   {
    //     img_url: "3",
    //     title: "???????????????????????????????????????",
    //     amount: "1,205",
    //     unit: "???",
    //   },
    //   {
    //     img_url: "4",
    //     title: "???????????????????????????????????????",
    //     amount: "1,205",
    //     unit: "???",
    //   },
    // ];
    // const statisticalList = store.state.taskMoudle.taskData.statistics_data;
    // [
    //   {
    //     img_url: "1",
    //     title: "?????????????????? (??)",
    //     amount: "105,660,081",
    //   },
    //   {
    //     img_url: "2",
    //     title: "?????????????????? (??)",
    //     amount: "15,660,081",
    //   },
    //   {
    //     img_url: "3",
    //     title: "???????????????",
    //     amount: "2,190",
    //   },
    //   {
    //     img_url: "4",
    //     title: "???????????????",
    //     amount: "2,190",
    //   },
    //   {
    //     img_url: "5",
    //     title: "?????????????????? (??)",
    //     amount: "15,660,081",
    //   },
    //   {
    //     img_url: "6",
    //     title: "?????????????????? (??)",
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
//??????????????????
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
