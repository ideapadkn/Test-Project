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
  <div>
    <nav class="flex justify-between items-center h-[80px]">
      <div class="flex justify-center items-center">
        <img class="inline-block w-[50px]" src="https://apelsinsalon.ru/wp-content/uploads/2021/12/cropped-fav.png" alt="">
        <h1 class="inline-block text-4xl font-semibold">
          Apelsin
        </h1>
      </div>
      <div class="flex gap-3">
        <!-- <router-link class="hover:bg-blue-400 hover:text-white hover:rounded-md px-2 py-1 transition-all" to="/feed">Feed</router-link> -->
        <router-link class="hover:bg-green-400 hover:text-white hover:rounded-md px-2 py-1 transition-all" to="/register" v-if="isLoggedIn === false">Register</router-link>
        <router-link class="hover:bg-yellow-400 hover:text-white hover:rounded-md px-2 py-1 transition-all" to="/sign-in" v-if="isLoggedIn === false">Login</router-link>
        <button class="hover:bg-red-400 hover:text-white hover:rounded-md px-2 py-1 transition-all" @click="handlerSignOut" v-if="isLoggedIn">Sign Out</button>
      </div>
    </nav>
  </div>
</template>
