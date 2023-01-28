<template>
  <div class="wrapper">
    <img class="wrapper-img" src="@/assets/icon/ic_data_ia.svg" />
    <div class="wrapper-case">
      <div class="wrapper-case_echart">
        <indicatorsOne />
      </div>
      <div class="wrapper-case_echart">
        <indicatorsTWO />
      </div>
    </div>
    <div class="wrapper-box">
      <indicatorsThree />
    </div>
    <div class="wrapper-box">
      <indicatorsFour />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import indicatorsOne from "./indicators-one.vue";
import indicatorsTWO from "./indicators-two.vue";
import indicatorsThree from "./indicators-three.vue";
import indicatorsFour from "./indicators-four.vue";
export default defineComponent({
  name: "indicatorsIndex",
  components: {
    indicatorsOne,
    indicatorsTWO,
    indicatorsThree,
    indicatorsFour,
  },
  setup() {
    return {};
  },
});
</script>
<style scoped lang="scss">
@keyframes moves {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(10px);
  }
}
.wrapper {
  display: flex;
  align-items: center;
  &-img {
    display: block;
    width: 72px;
    height: 152px;
    margin-left: 23px;
    animation: moves 1.3s ease-in-out 2.7s infinite alternate;
  }
  &-case {
    width: 270px;
    height: 152px;
    margin-left: 14px;
    &_echart {
      width: 300px;
      height: 60px;
      box-sizing: border-box;
    }
  }
  &-box {
    width: 255px;
    height: 152px;
  }
}
</style>
