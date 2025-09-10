<template>
  <div>
    <textarea v-model="input" rows="4"
      class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter your caption or notes..."></textarea>
    <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-2" @click="append">
      Append
    </button>

    <div class="mt-4 space-y-2">
      <div v-for="(text, index) in appendedTexts" :key="index"
        class="relative p-4 bg-white shadow-md rounded-lg border">
        <span class="text-gray-800">{{ text }}</span>
        <div class="absolute bottom-2 right-2 flex space-x-2">
          <button @click="edit(index)" class="p-1 border rounded-full hover:bg-gray-100" title="Edit">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L7 21H3v-4L16.732 3.732z" />
            </svg>
          </button>
          <button @click="remove(index)" class="p-1 border rounded-full hover:bg-gray-100" title="Delete">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['text-appended'])
const input = ref('')
const appendedTexts = ref([])

function append() {
  if (input.value.trim() !== '') {
    appendedTexts.value.push(input.value)
    emit('text-appended', appendedTexts.value.join('\n'))
    input.value = ''
  }
}

function remove(index) {
  appendedTexts.value.splice(index, 1)
  emit('text-appended', appendedTexts.value.join('\n'))
}

function edit(index) {
  input.value = appendedTexts.value[index]
  appendedTexts.value.splice(index, 1)
  emit('text-appended', appendedTexts.value.join('\n'))
}
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>
