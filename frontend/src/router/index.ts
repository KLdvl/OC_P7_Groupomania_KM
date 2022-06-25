import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";


const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/auth/sign_up",
    name: "signup",
    component: () => require("../views/SignUpView.vue"),
  },
  {
    path: "/auth/log_in",
    name: "login",
    component: () => require("../views/LogInView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
