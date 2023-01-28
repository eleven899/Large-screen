import { Module } from "vuex";
import { MainDataState } from "./type";
import { IMainState } from "../type";

const mainMoudle: Module<MainDataState, IMainState> = {
  namespaced: true,
  state: {
    mainData: {},
  },
  mutations: {
    changeMainData(state, mainData) {
      state.mainData = mainData;
    },
  },
  getters: {
    getMainDataList(state) {
      return state.mainData;
    },
  },
  actions: {},
  modules: {},
};
export default mainMoudle;
