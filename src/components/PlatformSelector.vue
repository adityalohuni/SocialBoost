<template>
  <div class="flex flex-wrap gap-4">
    <label v-for="platform in platforms" :key="platform" class="flex items-center space-x-2">
      <input
        type="checkbox"
        :value="platform"
        :checked="modelValue.includes(platform)"
        @change="onCheckboxChange(platform)"
        class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <span class="text-sm font-medium text-gray-700">{{ platform }}</span>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({ modelValue: Array })
const emit = defineEmits(['update:modelValue'])

const platforms = ['Facebook', 'Instagram', 'WhatsApp']

function onCheckboxChange(platform) {
  const newValue = [...props.modelValue]
  if (newValue.includes(platform)) {
    newValue.splice(newValue.indexOf(platform), 1) // Remove the platform
  } else {
    newValue.push(platform) // Add the platform
  }
  emit('update:modelValue', newValue) // Emit the updated value
}
</script>

