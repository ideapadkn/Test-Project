<script setup>
import { defineEmits, defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  totalPages: {
    type: Number,
    ruquired: true,
  },
  page: {
    type: Number,
    ruquired: true,
  },
  pageNumber: {
    type: Number,
    ruquired: true,
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
      :to="`?pageNUmber=` + page"
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
