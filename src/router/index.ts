import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/index/index.vue"),
  },
  {
    path: "/regulatory",
    name: "regulatory",
    component: () => import("../views/regulatory-index/regulatory-index.vue"),
  },
  {
    path: "/bill",
    name: "bill",
    component: () => import("../views/bill-index/index.vue"),
  },
  {
    path: "/supervise",
    name: "supervise",
    component: () => import("../views/supervise-index/supervise.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
