<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import ProductItem from "./ProductItem.vue";
import Pagination from "./Pagination.vue";
import Navbar from "./Navbar.vue";
// import Filter from "./Filter.vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const products = ref([]);
const searchTerm = ref("");
const page = ref(+route.query?.page || 1);
const limit = ref(12);
const totalPages = ref(0);

// GET DATA FROM API
const getData = async () => {
  console.log("route.query?.page", page.value);
  try {
    const res = await axios.get(
      `https://dummyjson.com/products/search?q=${searchTerm.value}`,
      {
        params: {
          skip: page.value * limit.value - 13,
          limit: limit.value,
        },
      }
    );
    console.log(res.data);
    products.value = res.data;
    totalPages.value = Math.ceil(res.data?.total / limit.value); //res.data?.total
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

// FILTER BY BRAND
const filteredProducts = computed(() => {
  return (
    products.value?.products?.filter((product) =>
      product.brand.toLowerCase().includes(searchTerm.value.toLowerCase())
    ) || []
  );
});

// RESET FILTER
const resetFilter = () => {
  searchTerm.value = "";
};

// PAGINATION
const changePage = (pageNumber) => {
  page.value = pageNumber;
  getData()
  window.scrollTo(0, 0);
};

const handleSearch = () => {
  page.value = 1;
  getData()
};

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="container mx-auto px-5">
    <!-- NAVBAR -->
    <Navbar />

    <!-- FILTER  -->
    <!-- <Filter :filteredProducts="filteredProducts" /> -->
    <div class="mb-5">
      <div class="flex justify-between items-center h-[100px]">
        <div class="relative flex justify-center items-center">
          <input
            placeholder="Search by brand..."
            class="px-3 py-2 border-2 outline-none"
            v-model.trim="searchTerm"
            type="text"
            @input="handleSearch"
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

    <!-- PRODUCTS  -->
    <ProductItem :filteredProducts="filteredProducts" />

    <!-- PAGINATION -->
    <Pagination :page="page" :totalPages="totalPages" @change="changePage" />
  </div>
</template>
