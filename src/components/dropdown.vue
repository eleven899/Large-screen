<template>
  <div class="box">
    <el-dropdown popper-class="custom" @command="handleCommand">
      <span class="el-dropdown-link">
        <div>{{ item.current }}</div>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :command="item.dropdownItem.one.command">{{
            item.dropdownItem.one.name
          }}</el-dropdown-item>
          <el-dropdown-item :command="item.dropdownItem.two.command">{{
            item.dropdownItem.two.name
          }}</el-dropdown-item>
          <el-dropdown-item :command="item.dropdownItem.three.command">{{
            item.dropdownItem.three.name
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Dropdown",
  props: {
    item: {
      type: Object,
      default: function () {
        return {
          current: "首页",
          dropdownItem: {
            one: {
              name: "资金监管",
              command: 1,
            },
            two: {
              name: "税务监管",
              command: 2,
            },
            three: {
              name: "任务流转",
              command: 3,
            },
          },
        };
      },
    },
  },
  setup() {
    const router = useRouter();
    const handleCommand = (command: string | number | object) => {
      if (command == 0) {
        router.push({
          name: "Index",
        });
      } else if (command == 1) {
        router.push({
          name: "regulatory",
        });
      } else if (command == 2) {
        router.push({
          name: "bill",
        });
      } else {
        router.push({
          name: "supervise",
        });
      }
    };
    return {
      handleCommand,
    };
  },
});
</script>
<style scoped lang="scss">
.box {
  margin-left: 40px;
}
.el-dropdown-link {
  margin-top: 6px;
  width: 89px;
  height: 55px;
  margin-left: 20px;
  display: block;
  box-sizing: border-box;
  font-size: 16px;
  color: #40fff4;
  line-height: 55px;
  text-align: center;
  background: url("@/assets/business-img/tab_1@2x.png") 50% / cover no-repeat;
}
</style>
<style>
.custom {
  background-color: #294890 !important;
}
.custom ul {
  background-color: #294890;
}
/* .custom .el-scrollbar {
  margin-top: 0px;
} */
.el-dropdown__popper.el-popper {
  border: 0px solid transparent !important;
}
.custom ul li {
  font-size: 10px;
  padding: 0 13px;
  color: white;
}
.custom .el-popper__arrow {
  background-color: #294890 !important;
}
.el-popper.is-light {
  background-color: transparent !important;
}
.el-dropdown__popper.el-popper {
  background-color: transparent !important;
}
.el-popper .el-popper__arrow {
  display: none !important;
}
.custom .el-dropdown-menu__item:not(.is-disabled):focus {
  background-color: transparent;
  color: #40fff4;
}
</style>
