<script setup>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      router.back();
      alert("Successfully registered!");
      console.log(auth.currentUser);
    })
    .catch((err) => {
      console.log(err.code);
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <div class="flex justify-center items-center flex-col h-[100vh]">
    <h1 class="text-2xl font-semibold mb-5">Creating an Acount</h1>
    <p>
      <input
        type="email"
        placeholder="Email"
        v-model="email"
        class="px-3 py-2 rounded shadow-md block mb-5 outline-none"
      />
    </p>
    <p>
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        class="px-3 py-2 rounded shadow-md block mb-5 outline-none"
      />
    </p>
    <p>
      <button
        @click="register"
        class="px-3 py-2 rounded bg-green-300 hover:bg-green-400 font-semibold mb-5"
      >
        Submit
      </button>
    </p>
    <p>
      <!-- <button @click="signInWithGoogle">Sign In With Google</button> -->
    </p>
  </div>
</template>
