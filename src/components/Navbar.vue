<script setup>

</script>

<template>
  <div>
    <nav class="flex justify-between items-center h-[80px]">
      <router-link to="/" class="text-4xl font-semibold">Product List</router-link>
      <div class="btns">
        <router-link 
        to="/login"
        class="bg-green-300 hover:bg-green-400 px-3 py-2 flex justify-center items-center rounded font-semibold" 
        >
          Log In
        </router-link>
      </div>
    </nav>
  </div>
</template>