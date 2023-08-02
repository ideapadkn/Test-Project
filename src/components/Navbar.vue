<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const isLoggedIn = ref(false);
const router = useRouter();

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handlerSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
</script>

<template>
  <div class="container mx-auto">
    <nav class="flex justify-between items-center h-[80px]">
      <router-link to="/">
        <div class="flex justify-center items-center">
          <img
            class="inline-block w-[50px]"
            src="https://apelsinsalon.ru/wp-content/uploads/2021/12/cropped-fav.png"
            alt="logo"
          />
          <h1 class="inline-block text-4xl font-semibold">Apelsin</h1>
        </div>
      </router-link>
      <div class="flex gap-3">
        <router-link
          to="/product"
          class="hover:bg-yellow-400 hover:text-white hover:rounded-md px-2 py-1 transition-all"
        >
          Products
        </router-link>
        <router-link
          class="hover:bg-green-500 hover:text-white hover:rounded-md px-2 py-1 transition-all"
          to="/register"
          v-if="isLoggedIn === false"
          >Register</router-link
        >
        <router-link
          class="hover:bg-blue-500 hover:text-white hover:rounded-md px-2 py-1 transition-all"
          to="/sign-in"
          v-if="isLoggedIn === false"
          >Login</router-link
        >
        <button
          class="hover:bg-red-600 hover:text-white hover:rounded-md px-2 py-1 transition-all"
          @click="handlerSignOut"
          v-if="isLoggedIn"
        >
          Sign Out
        </button>
      </div>
    </nav>
  </div>
</template>
