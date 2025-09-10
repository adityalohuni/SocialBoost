<template>
  <div>
    <input type="datetime-local" v-model="datetime" class="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 mr-2" />
    <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" @click="emit('schedule', datetime)">Schedule</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const datetime = ref('')
const emit = defineEmits(['schedule'])
</script>
