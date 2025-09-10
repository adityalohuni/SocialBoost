<template>
  <div class="post-preview bg-white rounded-2xl shadow-md p-6 max-w-3xl mx-auto">
    <!-- Text Section -->
    <div class="post-text text-gray-800 text-lg leading-relaxed mb-6">
      <p>{{ text }}</p>
    </div>

    <!-- Images Section -->
    <div class="post-images grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="['overflow-hidden rounded-xl', { 'sm:col-span-2': index % 2 === 0 }]"
      >
        <img
          :src="image"
          :alt="'Image ' + (index + 1)"
          class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  text: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
/* Additional custom styles if needed */
</style>