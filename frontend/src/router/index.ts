import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => require("../views/posts/AllPosts.vue"),
  },
  {
    path: "/:id",
    name: "post",
    component: () => require("../views/posts/SinglePost.vue")
  },
  {
    path: "/auth/sign_up",
    name: "signup",
    component: () => require("../views/auth/SignUpView.vue"),
  },
  {
    path: "/auth/log_in",
    name: "login",
    component: () => require("../views/auth/LogInView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
