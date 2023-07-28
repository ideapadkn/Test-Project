<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

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
  <div class="container mx-auto px-5">
    <!-- FILTER  -->
    <div class="mb-5">
      <div class="flex justify-between items-center h-[100px]">
        <div>
          <input class="px-3 py-2 border-2" v-model="searchTerm" type="text" />
        </div>
        <button
          @click="resetFilter"
          class="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold"
        >
          Reset
        </button>
      </div>
      <div>Quantity products: {{ filteredProducts.length }}</div>
    </div>
    <!-- PRODUCTS  -->
    <ul>
      <li v-for="product in filteredProducts" :key="product.id">
        <div
          class="flex justify-between p-5 border-2 mb-2 shadow-md gap-2 info"
        >
          <div class="info-text">
            <div class="text-[24px]">
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
          <div class="w-[150px] info-img">
            <img :src="product.images[0]" alt="" />
          </div>
        </div>
      </li>
    </ul>
    <!-- PAGINATION -->
    <div class="flex justify-center gap-3 items-center h-[100px]">
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
    </div>
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
