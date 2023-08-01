<script setup>
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const isLoggedIn = ref(false);
const reviews = ref([]);
const comment = ref("");
const user = ref(null);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const addComment = () => {
  if (comment.value.trim() !== "" && isLoggedIn) {
    reviews.value.push({
      id: Date.now(),
      text: comment.value,
    });
    comment.value = "";
    saveTasksToLocalStorage();
  }
};

// SAVE LOCAL STORE
onMounted(() => {
  const savedTasks = localStorage.getItem("reviews");
  if (savedTasks) {
    reviews.value = JSON.parse(savedTasks);
  }
});
const saveTasksToLocalStorage = () => {
  localStorage.setItem("reviews", JSON.stringify(reviews.value));
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
        class="border-b-2 w-[200px] px-3 py-2 outline-none"
      />
      <button
        @click="addComment"
        class="px-3 py-2 bg-green-300 hover:bg-green-500 transition-all rounded text-white cursor-pointer"
        :disabled="isLoggedIn === false"
      >
        Add
      </button>
    </div>
    <div
      class="text-black mb-5 border-2 px-3 py-2 rounded-md"
      v-for="review in reviews"
      :key="review.id"
    >
      <div class="mb-2">
        {{ auth.currentUser.email }}
      </div>
      <b>{{ review.text }}</b>
    </div>
  </div>
</template>
