<template>
  <div class="flex gap-2 overflow-auto">
    <img v-for="(src, idx) in images" :key="idx" :src="src" class="w-24 h-24 object-cover rounded" />
  </div>
</template>

<script setup>
defineProps({ images: Array })
</script>

