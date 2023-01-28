import { Module } from "vuex";
import { BillDataState } from "./type";
import { IMainState } from "../type";

const billMoudle: Module<BillDataState, IMainState> = {
  namespaced: true,
  state: {
    billData: {},
  },
  mutations: {
    changeBillData(state, billData) {
      state.billData = billData;
      // console.log(billData);
    },
  },
  getters: {},
  actions: {},
  modules: {},
};
export default billMoudle;
