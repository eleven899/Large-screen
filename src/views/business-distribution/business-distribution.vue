<template>
  <div class="com-container">
    <!-- <div class="com-container-echart" id="business_chart"></div> -->
    <mapChart></mapChart>
    <div class="line">
      <lineChart />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import mapChart from "./map-chart/map-chart.vue";
import lineChart from "./line/line-chart.vue";
export default defineComponent({
  name: "business-distribution",
  components: {
    mapChart,
    lineChart,
  },
  setup() {
    return {};
  },
});
</script>
<style scoped lang="scss"></style>
