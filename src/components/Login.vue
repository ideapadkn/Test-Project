<script setup>
import { ref } from 'vue'

const login = ref('')
const password = ref('')

const sendForm = () => {
  console.log('ok')
  login.value = ''
  password.value = ''
}
</script>

<template>
  <div class="flex justify-center items-center h-[100vh]">
    <router-link
      to="/"
      class="absolute top-4 left-4"
    >
      back
    </router-link>
    <form class="border-2 p-5 rounded shadow-lg" action="#" @submit.prevent>
      <input 
        v-model="login"
        type="text" 
        placeholder="Login"
        class="px-3 py-2 rounded shadow-md block mb-5"
      >
      <input 
        v-model="password"
        type="password"
        placeholder="Password"
        class="px-3 py-2 rounded shadow-md block mb-5"
      >
      <button
        type="submit"
        @click="sendForm"
        class="px-3 py-2 rounded bg-green-300 hover:bg-green-400 font-semibold"
      >
        Log In
      </button>
    </form>
  </div>
</template>
