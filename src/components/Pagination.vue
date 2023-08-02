<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits("change");

const changePage = (page) => {
  emit("change", page);
};

</script>

<template>
  <div class="flex justify-center gap-3 items-center h-[100px]">
    <router-link
      class="flex justify-center gap-3 items-center h-[100px]"
      :to="`?page=` + page"
    >
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
    </router-link>
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
