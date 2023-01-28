<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import * as echarts from "echarts";
import { provide } from "vue";
export default {
  name: "App",
  setup() {
    provide("echarts", echarts); //provide
  },
};
</script>
<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
  background-color: #020308;
  overflow: hidden;
}
</style>
