import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/auth/sign_up',
    name: 'signup',
    component: () => import('../views/SignUpView.vue')
  },
  {
    path: '/auth/log_in',
    name: 'login',
    component: () => import('../views/LogInView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
