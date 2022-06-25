import { createRouter, createWebHashHistory } from "vue-router";


const routes = [
  {
    path: "/",
    name: "home",
    component: () => require("../views/AllPosts.vue"),
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
