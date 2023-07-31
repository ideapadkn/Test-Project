<script setup>
import { ref, computed, watchEffect } from "vue";
import axios from "axios";
import ProductItem from "./ProductItem.vue";
import Pagination from "./Pagination.vue";

let products = ref([]);
let searchTerm = ref("");
let page = ref(1);
let limit = ref(12);
let totalPages = ref(0);

const getData = async () => {
  try {
    const res = await axios.get("https://dummyjson.com/products", {
      params: {
        limit: limit.value,
        skip: page.value,
      },
    });
    console.log(res.data);
    products.value = res.data;
    totalPages = Math.ceil(res.data?.total / 12);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
getData();

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

// SAVE DATA
page.value = parseInt(sessionStorage.getItem("page") || "1");
const storedData = JSON.parse(sessionStorage.getItem("products") || "[]");
products.value = storedData.data || [];
watchEffect(() => {
  sessionStorage.setItem("page", page.value.toString());
  sessionStorage.setItem("products", JSON.stringify({ data: products.value }));
});
</script>

<template>
  <div>
    <!-- FILTER  -->
    <div class="mb-5">
      <div class="flex justify-between items-center h-[100px]">
        <div>
          <input
            placeholder="Search by brand..."
            class="px-3 py-2 border-2 outline-none"
            v-model="searchTerm"
            type="text"
          />
        </div>
        <button
          @click="resetFilter"
          class="px-3 py-2 bg-red-300 rounded-lg hover:bg-red-500 hover:text-white font-semibold transition-all"
        >
          Reset
        </button>
      </div>
      <div>Quantity products: {{ filteredProducts.length }}</div>
    </div>

    <!-- PRODUCTS  -->
    <ProductItem :filteredProducts="filteredProducts" />

    <!-- <ul class="flex gap-5 flex-wrap">
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
    </ul> -->

    <!-- PAGINATION -->
    <Pagination
      :page="page"
      :totalPages="totalPages"
      @change="changePage"
    />
    <!-- <div class="flex justify-center gap-3 items-center h-[100px]">
      <div
        class="text-black border-2 w-[40px] h-[40px] flex justify-center items-center cursor-pointer"
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        :class="{
          'current-page': page === pageNumber,
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
  </div>
</template>

<style>
.current-page {
  border: 2px solid #000;
}
@media (max-width: 600px) {
  .info {
    flex-wrap: wrap;
  }
  .info-img {
    margin-top: 20px;
    width: 100%;
  }
}
</style>
