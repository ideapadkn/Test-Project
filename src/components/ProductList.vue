<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";

let products = ref([]);
let searchTerm = ref("");
const currentPage = ref(1);
const itemsPerPage = 12;

const getData = async () => {
  try {
    const res = await axios.get("https://dummyjson.com/products");
    console.log(res);
    products.value = res.data;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
onMounted(getData);


// filter by brand
const filteredProducts = computed(() =>{
  return products.value?.products?.filter((product) =>
    product.brand.toLowerCase().includes(searchTerm.value.toLowerCase())
  ) || [];
})

// reset filter
const resetFilter = () => {
  searchTerm.value = "";
};


// pages

const totalItems = computed(() => products.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() =>
  Math.min(startIndex.value + itemsPerPage, totalItems.value)
);
const paginatedData = computed(() =>
  products.value.slice(startIndex.value, endIndex.value)
);


const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    console.log("work");
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<template>
  <div class="container mx-auto px-5">
    <!-- FILTER  -->
    <div>
      <div class="flex justify-between items-center h-[100px]">
        <div>
          <input
            class="px-3 py-2 border-2"
            v-model="searchTerm"
            type="text"
          />
          <!-- <button 
            @click="search"
            class="ml-5 px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold"  
          >
            Search
          </button> -->
        </div>
        <button
          @click="resetFilter"
          class="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold"
        >
          Filter Reset
        </button>
      </div>
    </div>
    <!-- PRODUCTS  -->
    <ul>
      <li v-for="product in filteredProducts" :key="product.id">
        <div class="flex justify-between p-5 border-2 mb-2 shadow-md">
          <div>
            <div class="text-[24px]">
              <b>{{ product.title }}</b>
            </div>
            <div>
              <span><b>Description:</b></span>
              <span>{{ product.description }}</span>
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
          <div class="w-[100px]">
            <img :src="product.images[0]" alt="" />
          </div>
        </div>
      </li>
    </ul>
    <!-- PAGES -->
    <!-- <div class="flex justify-between items-center h-[100px]">
      <button
        class="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold"
        @click="previousPage"
        :disabled="currentPage === 1"
      >
        Previous
      </button>
      <span>{{ currentPage }}</span>
      <button
        class="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div> -->
  </div>
</template>
