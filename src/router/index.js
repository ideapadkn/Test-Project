import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import SignIn from "../views/SignIn.vue";
import ProductDetails from "../views/ProductDetails.vue";
import ProductList from "../components/ProductList.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/product/:page?",
    component: ProductList,
  },
  {
    path: "/product-details/:id",
    component: ProductDetails,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/sign-in",
    component: SignIn,
  },
];

const router = createRouter({
  history: createWebHistory("#"),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("You dont have access!");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
