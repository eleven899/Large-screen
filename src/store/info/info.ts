import { Module } from "vuex";
import { InfoDataState } from "./type";
import { IMainState } from "../type";

const infoMoudle: Module<InfoDataState, IMainState> = {
  namespaced: true,
  state: {
    infoData: {},
  },
  mutations: {
    changeMainData(state, infoData) {
      state.infoData = infoData;
    },
  },
  getters: {},
  actions: {},
  modules: {},
};
export default infoMoudle;
