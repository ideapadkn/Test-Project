<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import ProductItem from "./ProductItem.vue";
import Pagination from "./Pagination.vue";
import Navbar from "./Navbar.vue";
import { useRouter, useRoute } from "vue-router";

const products = ref([]);
const searchTerm = ref("");
const limit = ref(12);
const totalPages = ref(0);
const router = useRouter();
const route = useRoute();
const page = ref(+route.query?.page || 1);

// GET DATA FROM API
const getData = async () => {
  console.log("route.query?.page", page.value);
  try {
    const res = await axios.get("https://dummyjson.com/products", {
      params: {
        limit: limit.value,
        skip: page.value,
      },
    });
    console.log(res.data);
    products.value = res.data;
    totalPages.value = Math.ceil(res.data?.total / limit.value);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
onMounted(() => {
  getData();
});

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
  getData();

  window.scrollTo(0, 0);
};
</script>

<template>
  <div class="container mx-auto px-5">
    <!-- NAVBAR -->
    <Navbar />

    <!-- FILTER  -->
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

    <!-- PRODUCTS  -->
    <ProductItem :filteredProducts="filteredProducts" />

    <!-- PAGINATION -->
    <Pagination :page="page" :totalPages="totalPages" @change="changePage" />
  </div>
</template>
