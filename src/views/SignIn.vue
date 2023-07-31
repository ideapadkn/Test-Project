<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errMsg = ref();
const router = useRouter();

let auth;
const register = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      alert("Successfully signed in!");
      console.log(auth.currentUser.email);
      router.push("/");
    })
    .catch((err) => {
      console.log(err.code);
      switch (err.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found!";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
    });
};

const signInWithGoogle = () => {};
</script>

<template>
  <div class="flex justify-center items-center flex-col h-[100vh]">
    <h1 class="text-2xl font-semibold mb-5">Sign In to an Acount</h1>
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
    <p v-if="errMsg">
      {{ errMsg }}
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
      <button @click="signInWithGoogle">Sign In With Google</button>
    </p>
  </div>
</template>
