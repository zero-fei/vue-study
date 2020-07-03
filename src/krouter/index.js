import Vue from "vue";

import VueRouter from "./kvue-router.js";

import Home from '../views/index.vue'
import Hello from '../views/Hello.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hello',
    name: 'Hello',
    component: Hello
  }
]

const router = new VueRouter({
  routes
})

export default router

