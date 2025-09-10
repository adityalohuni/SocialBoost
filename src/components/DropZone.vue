<template>
    <div 
        class="border border-dashed border-gray-400 p-4 text-center" 
        @drop.prevent="handleDrop" 
        @dragover.prevent
    >
        <p>Drop images here or paste them</p>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

const emit = defineEmits(['images-added'])

function handleDrop(e) {
    console.log('Files dropped:', e.dataTransfer)
    const files = [...e.dataTransfer.files].filter(f => f.type.startsWith('image/'))
    emit('images-added', files.map(f => URL.createObjectURL(f)))
}

function handlePaste(e) {
    console.log('Content pasted:', e)
    const items = [...e.clipboardData.items]
    const imageFiles = items
        .filter(item => item.type.startsWith('image/'))
        .map(item => item.getAsFile())
    if (imageFiles.length > 0) {
        emit('images-added', imageFiles.map(f => URL.createObjectURL(f)))
    }
}

// Add global paste event listener
onMounted(() => {
    window.addEventListener('paste', handlePaste)
})

// Clean up the event listener when the component is unmounted
onBeforeUnmount(() => {
    window.removeEventListener('paste', handlePaste)
})
</script>

