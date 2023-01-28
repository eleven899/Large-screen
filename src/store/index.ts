import { createStore } from "vuex";
import infoMoudle from "./info/info";
import mainMoudle from "./main/main";
import billMoudle from "./bill/info";
import taskMoudle from "./supervise/info";
import { IRootStore } from "./type";
export default createStore<IRootStore>({
  state() {
    return {
      name: "",
      age: 18,
    };
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    mainMoudle,
    infoMoudle,
    billMoudle,
    taskMoudle,
  },
});
