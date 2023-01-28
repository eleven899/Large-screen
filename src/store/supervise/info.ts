import { Module } from "vuex";
import { InfoDataState } from "./type";
import { IMainState } from "../type";

const taskMoudle: Module<InfoDataState, IMainState> = {
  namespaced: true,
  state: {
    taskData: {},
  },
  mutations: {
    changeMainData(state, taskData) {
      state.taskData = taskData;
      // console.log("taskData:", taskData);
    },
  },
  getters: {},
  actions: {},
  modules: {},
};
export default taskMoudle;
