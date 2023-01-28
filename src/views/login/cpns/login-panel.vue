<template>
  <div class="panel">
    <div class="title">欢迎使用民联灵工</div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="ruleForm"
      :size="formSize"
    >
      <el-form-item prop="account">
        <el-input placeholder="请输入您的手机号" v-model="ruleForm.account" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="请输入密码"
          show-password
          v-model="ruleForm.password"
        />
      </el-form-item>
      <el-form-item prop="code">
        <el-input placeholder="请输入验证码" v-model="ruleForm.code">
          <template #append>
            <el-button class="btn">获取验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <div class="additional_box">
        <!-- <div class="register">立即注册</div> -->
        <div class="forget">忘记密码？</div>
      </div>
      <el-form-item>
        <el-button
          class="el_button_login"
          type="primary"
          @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import type { FormInstance } from "element-plus";
import { rules } from "../config/login-config";
export default defineComponent({
  name: "loginPanel",
  setup() {
    const store = useStore();
    const formSize = ref<string>("default");
    const ruleFormRef = ref<FormInstance>();
    const ruleForm = reactive({
      account: "zhangjiacheng",
      password: "111111",
      code: "1111",
    });
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          store.dispatch("login/accountLoginAction", { ...ruleForm });
        } else {
          console.log("error submit!", fields);
        }
      });
    };
    return {
      ruleForm,
      rules,
      submitForm,
      ruleFormRef,
      formSize,
    };
  },
});
</script>
<style scoped lang="scss">
.panel {
  width: 100%;
  padding: 60px 50px 40px 50px;
  background: #ffffff;
  box-shadow: 0px 12px 36px 0px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  border: 1px solid #d5e3f0;
  .title {
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #04174b;
    line-height: 24px;
    padding-bottom: 40px;
  }
  .ruleForm {
    ::v-deep .el-form-item {
      margin-bottom: 20px;
      .el-input__inner {
        height: 48px;
        line-height: 48px;
        border-radius: 2px;
        // border: 1px solid rgba(0, 0, 0, 0.15);
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.45);
        line-height: 14px;
      }
    }
    .btn {
      height: 48px;
      background: none;
      border: 0px;
    }
    ::v-deep .el_button_login {
      width: 100%;
      height: 48px;
      background: #3a75ff;
      border-radius: 2px;
    }
    .additional_box {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      line-height: 14px;
      .register,
      .forget {
        cursor: pointer;
      }
    }
  }
}
</style>
