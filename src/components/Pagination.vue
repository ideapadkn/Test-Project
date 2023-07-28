<script setup>
import { defineProps } from "vue";

const page = defineProps({
  type: Number,
  required: true,
  totalPages: {
    type: Number,
    required: true,
  },
});

const changePage = (pageNumber) => {
  page.value = pageNumber;
  getData();

  window.scrollTo(0, 0);
};
</script>

<template>
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
</template>
