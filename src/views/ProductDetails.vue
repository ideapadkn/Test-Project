<script setup>
import { ref } from "vue";
import axios from "axios";
import Reviews from "./Reviews.vue";
import { useRoute } from "vue-router";

let route = useRoute();
let products = ref([]);

const getData = async () => {
  try {
    const res = await axios.get(
      `https://dummyjson.com/products/${route.params.id}`
    );
    console.log(res.data);
    products.value = res.data;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
getData();
</script>

<template>
  <div class="container mx-auto px-5">
    <div class="mb-5 py-5">
      <button
        class="px-3 py-1 rounded-md bg-red-400 hover:bg-red-600 hover:text-white transition-all"
        @click="$router.back()"
      >
        Go Back
      </button>
    </div>
    <!-- PRODUCT -->
    <div class="mb-8">
      <div class="flex justify-center gap-8">
        <div class="mb-5">
          <img :src="products.images[0]" alt="product image" />
        </div>
        <div class="">
          <div class="text-3xl font-semibold mb-5">
            {{ products.title }}
          </div>
          <div class="mb-5">
            {{ products.description }}
          </div>
          <div class="flex justify-between items-center">
            <div><b>Price:</b> {{ products.price }}</div>
            <div><b>Stock:</b> {{ products.stock }}</div>
            <div><b>Rating:</b> {{ products.rating }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- REVIEWS -->
    <Reviews />
  </div>
</template>
