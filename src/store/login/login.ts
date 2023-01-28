import { Module } from "vuex";
import { IRootStore } from "../type";
import { ILoginState } from "./types";
import { accountLoginRequest, menuList } from "@/service/login/login";
import { IAccount } from "@/service/login/type";
import router from "@/router";
import localCache from "@/utils/cache";

const loginModule: Module<ILoginState, IRootStore> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      menuList: [],
    };
  },
  getters: {},
  mutations: {},
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      console.log("执行accountloginAction", payload);
      // const loginResult: any = await accountLoginRequest(payload)
      // localCache.setCache('token', loginResult.data.token)
      // console.log(loginResult)

      // const menuLists = await menuList()
      // console.log(menuLists)

      // 跳转首页
      router.push("/main");
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache("token");
      if (token) {
        commit("changeToken", token);
      }
    },
  },
};
export default loginModule;
