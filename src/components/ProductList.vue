<script setup>
import { ref, computed } from "vue";
import axios from "axios";
// import ProductItem from "./ProductItem.vue";
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

    console.log(totalPages);
    console.log(res.data);
    products.value = res.data;
    totalPages = Math.ceil(res.data?.total / 12);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
getData();

// filter by brand
const filteredProducts = computed(() => {
  return (
    products.value?.products?.filter((product) =>
      product.brand.toLowerCase().includes(searchTerm.value.toLowerCase())
    ) || []
  );
});

// reset filter
const resetFilter = () => {
  searchTerm.value = "";
};

// pagination
const changePage = (pageNumber) => {
  page.value = pageNumber;
  getData();

  window.scrollTo(0, 0);
};
</script>

<template>
  <div>
    <!-- FILTER  -->
    <div class="mb-5">
      <div class="flex justify-between items-center h-[100px]">
        <div>
          <input placeholder="Search by brand" class="px-3 py-2 border-2" v-model="searchTerm" type="text" />
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
    <!-- <ProductItem :filteredProducts="filteredProducts" /> -->
    <router-link to="product/products.id">
      <ul class="flex gap-5 flex-wrap">
        <li
          class="w-[350px] h-full hover:scale-105 transition-all"
          v-for="product in filteredProducts"
          :key="product.id"
        >
          <div
            class="flex justify-center p-5 border-2 shadow-md gap-2 flex-wrap"
          >
            <div class="w-[200px] info-img">
              <img class="h-[200px] w-full" :src="product.images[0]" alt="" />
            </div>
            <div class="info-text">
              <div class="text-[24px] overflow-hidden">
                <b>{{ product.title }}</b>
              </div>
              <div>
                <span><b>Description:</b> </span>
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
          </div>
        </li>
      </ul>
    </router-link>

    <!-- PAGINATION -->
    <Pagination
      :page="page"
      :totalPages="totalPages"
      @update:page="changePage"
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
