<script setup>
import { ref } from "vue";

const reviews = ref([]);
const comment = ref("");

const addComment = () => {
  // reviews.push(comment.value)
  comment.value = "";
};
</script>

<template>
  <div>
    <h3 class="text-2xl font-semibold mb-5">Reviews...</h3>
    <div class="mb-8 flex justify-between items-center">
      <input
        v-model="comment"
        type="text"
        placeholder="Your comment..."
        class="border-b-2 w-[300px] px-3 py-2 outline-none"
      />
      <button
        @click="addComment"
        class="px-3 py-2 bg-green-300 hover:bg-green-500 transition-all rounded text-white"
      >
        Add
      </button>
    </div>
    <div>
      {{ reviews }}
    </div>
  </div>
</template>
