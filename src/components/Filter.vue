<script setup>
import { ref, defineProps } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const products = ref([]);
const searchTerm = ref("");

const props = defineProps({
  filteredProducts: {
    type: Array,
    required: true,
  },
});

const getData = async () => {
  try {
    const res = await axios.get(
      `https://dummyjson.com/products/search?q=${searchTerm.value}`
    );
    console.log(res.data);
    products.value = res.data;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
getData();

// RESET FILTER
const resetFilter = () => {
  searchTerm.value = "";
};
</script>

<template>
  <div>
    <div class="mb-5">
      <div class="flex justify-between items-center h-[100px]">
        <div class="relative flex justify-center items-center">
          <input
            placeholder="Search by brand..."
            class="px-3 py-2 border-2 outline-none"
            v-model.trim="searchTerm"
            type="text"
          />
          <span
            v-if="searchTerm"
            @click="resetFilter"
            class="absolute right-2 text-gray-700 cursor-pointer"
            >X</span
          >
        </div>
      </div>
      <div>Quantity products: {{ filteredProducts.length }}</div>
    </div>
  </div>
</template>
