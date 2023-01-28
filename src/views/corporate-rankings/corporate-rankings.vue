<template>
  <div class="com-container">
    <div
      class="com-container-box"
      v-for="(item, index) in corporateData"
      :key="index"
    >
      <img
        class="com-container-box_img"
        :src="require('@/assets/icon/pic_top3_' + item.ranking + '.svg')"
      />
      <span class="com-container-box_span">{{ item.company__name }}</span>
      <el-progress :stroke-width="5" :percentage="item.percent"
        >{{ item.sum_total }}万</el-progress
      >
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
export default {
  name: "corporate-rankings",
  setup() {
    const store = useStore();
    const getIndexDataState = computed(() => store.state.mainMoudle.mainData);
    const corporateData = ref([]);
    corporateData.value = getIndexDataState.value.top_three;
    watch(
      getIndexDataState,
      (newVal, oldVal) => {
        if (newVal != oldVal) {
          corporateData.value = newVal.top_three;
        }
      },
      { deep: true }
    );
    return { corporateData };
  },
};
</script>
<style scoped lang="scss">
.com-container {
  width: 100%;
  height: 100%;
  padding: 10px 0px 0 10px;
  box-sizing: border-box;
  &-box {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    &_img {
      width: 48px;
      height: 64px;
    }
    &_span {
      width: 140px;
      display: -webkit-box; //特别显示模式
      margin: 0 10px 0 10px;
      text-overflow: -o-ellipsis-lastline;
      -webkit-box-orient: vertical; //盒子中内容竖直排列
      -webkit-line-clamp: 2; //行数
      line-clamp: 2;
      // white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 13px;
      // text-align: center;
      margin-top: 3px;
    }
  }
}
.com-container ::v-deep .el-progress-bar {
  width: 155px;
}
.com-container ::v-deep .el-progress__text {
  margin-left: 10px;
  color: rgba(17, 202, 190, 1);
  font-size: 16px !important;
  font-family: DINPro-Regular, DINPro;
  font-weight: 400;
}
.com-container ::v-deep .el-progress__text span {
  display: inline-block;
  margin-left: 10px;
  color: rgba(85, 142, 255, 1);
}
::v-deep .el-progress-bar__outer {
  background-color: #246cf9;
}
::v-deep .el-progress-bar__inner {
  background-color: #11cabe;
}
</style>
