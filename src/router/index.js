import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Test from "../views/Test.vue";
import Login from '../components/Login.vue'

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/product/:rid",
    component: Test,
  },
  {
    path: "/login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
