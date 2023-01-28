<template>
  <div id="index" ref="appRef">
    <div class="login">
      <div class="container">
        <div class="pic_login_bg">
          <img
            class="register_bg"
            src="../../assets/images/pic_login_bg.png"
            fit="cover"
          />
          <div class="title">灵活用工一站式服务平台</div>
          <div class="subtitle">共享用工·税务筹划·安全合规·精品服务</div>
        </div>
        <div class="form">
          <div class="logo"></div>
          <div class="form_box">
            <div class="regForm">
              <login-panel></login-panel>
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
  toRefs,
  onBeforeMount,
  onMounted,
  onUnmounted,
} from "vue";
import loginPanel from "./cpns/login-panel.vue";
import useDraw from "@/utils/useDraw";
interface timeOutPerson {
  setInterval: any;
  dateDay: string;
  dateYear: string;
  dateWeek: string;
}
export default defineComponent({
  name: "loginIndex",
  components: {
    loginPanel,
  },
  setup() {
    const data = reactive({});
    const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw();
    // 生命周期
    onMounted(() => {
      // todo 屏幕适应
      windowDraw();
      calcRate();
    });

    onUnmounted(() => {
      unWindowDraw();
    });
    return {
      ...toRefs(data),
      appRef,
    };
  },
});
</script>
<style scoped lang="scss">
@import "@/assets/scss/index.scss";
.app {
  background-color: #fff !important;
}
.login {
  width: 100%;
  height: 100%;
  .container {
    display: flex;
    height: 100%;
    background-color: #ffffff;
    .pic_login_bg {
      position: relative;
      .register_bg {
        height: 100%;
        min-height: 600px;
        min-width: 440px;
      }
      .title {
        position: absolute;
        top: 30%;
        width: 100%;
        text-align: center;
        font-size: 30px;
        color: #10306e;
        line-height: 36px;
        letter-spacing: 1px;
      }
      .subtitle {
        position: absolute;
        top: 35%;
        text-align: center;
        width: 100%;
        font-size: 17px;
        color: #10306e;
        line-height: 36px;
        letter-spacing: 2px;
      }
    }
    .form {
      width: 75%;
      padding: 32px 0;
      position: relative;
      display: flex;
      // justify-content: center;
      align-items: center;
      justify-content: center;
      .logo {
        position: absolute;
        top: 5%;
        left: 0;
        width: 176px;
        height: 40px;
        background: url("../../assets/images/ic_ligin_logo.png") no-repeat;
        background-size: 100% 100%;
        margin-bottom: 10%;
        margin-left: 32px;
      }
      .form_box {
        width: 100%;
        display: flex;
        // justify-content: center;
        align-items: center;
        flex-direction: column;
      }
    }
  }
}
</style>
