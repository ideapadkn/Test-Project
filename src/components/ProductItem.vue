<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  filteredProducts: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div>
    <ul class="flex gap-5 flex-wrap">
      <li
        class="w-[350px] h-full hover:scale-105 transition-all"
        v-for="product in filteredProducts"
        :key="product.id"
      >
        <router-link :to="`product/${product.id}`">
          <div
            class="flex justify-center p-5 border-2 shadow-md gap-2 flex-wrap"
          >
            <div class="w-[200px] info-img">
              <img class="h-[200px] w-full" :src="product.images[0]" alt="" />
            </div>
            <div class="info-text">
              <div class="text-[18px] w-[300px] overflow-hidden">
                <b>{{ product.title }}</b>
              </div>
              <div>
                <span><b>Price:</b> </span> <span>{{ product.price }}</span>
              </div>
              <div>
                <span><b>Stock:</b> </span> <span>{{ product.stock }}</span>
              </div>
              <div>
                <span><b>Brand:</b> </span> <span>{{ product.brand }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
