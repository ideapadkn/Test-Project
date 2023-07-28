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
      <h1 class="text-4xl font-semibold">Product List</h1>
      <div class="flex gap-3">
        <router-link to="/feed">Feed</router-link>
        <router-link to="/register">Register</router-link>
        <router-link to="/sign-in">Login</router-link>
        <button @click="handlerSignOut" v-if="isLoggedIn">Sign Out</button>
      </div>
    </nav>
  </div>
</template>
