<script setup>
import { ref, watch, computed } from "vue";
import axios from "axios";
import Paginate from 'vuejs-paginate'

let products = ref([]);
let searchTerm = ref("");
const currentPage = ref(1);
const pageSize = ref(12);

const getData = async () => {
  try {
    const res = await axios.get("https://dummyjson.com/products");
    console.log(res);
    products.value = res.data;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
getData();

watch(searchTerm, () => {
  products.value = products.value.products.filter((product) =>
    product.brand.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

// reset filter
const resetFilter = () => {
  searchTerm.value = "";
};

// const search = () => {
//   if (!searchTerm.value) {
//     get();
//   } else {
//     const filteredProducts = products.value.products.filter((product) =>
//       product.brand.toLowerCase().includes(searchTerm.value.toLowerCase())
//     );
//     products.value = filteredProducts;
//   }
// };

// pages

</script>

<template>
  <div class="container mx-auto px-5">
    <!-- FILTER  -->
    <div>
      <div class="flex justify-between items-center h-[100px]">
        <div>
          <input
            class="px-3 py-2 border-2"
            v-model.trim="searchTerm"
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
      <li v-for="product in products.products" :key="product.id">
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
    <!-- <div class="flex justify-between items-center h-[100px]" v-if="totalPages > 1">
      <button 
        class="px-3 py-2 bg-slate-300 rounded-lg font-semibold" 
        @click="previousPage" 
        :disabled="page === 1"
      >
        Previous
      </button>
      <button 
        class="px-3 py-2 bg-slate-300 rounded-lg font-semibold" 
        @click="nextPage" 
        :disabled="page === totalPages"
      >
        Next
      </button>
    </div> -->
    <Paginate
      :pageCount="20"
      :clickHandler="functionName"
      :prevText="'Prev'"
      :nextText="'Next'"
      :containerClass="'className'">
    />
  </div>
</template>
