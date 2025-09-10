<template>
  <div class="p-4 max-w-3xl mx-auto space-y-4">
    <h1 class="text-2xl font-bold">AI Social Scheduler</h1>
    <DropZone @images-added="handleImages" />
    <TextInput @text-appended="handleText" />
    <button
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      @click="enhanceWithAI"
    >
      Enhance with AI
    </button>

    <!-- Enhanced Post Preview -->
    <div v-if="enhancedText" class="mt-6">
      <h2 class="text-xl font-semibold mb-4">Enhanced Post Preview</h2>
      <PostPreview :text="enhancedText" :images="images" />
    </div>

    <ImagePreview :images="images" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import DropZone from "./components/DropZone.vue";
import TextInput from "./components/TextInput.vue";
import ImagePreview from "./components/ImagePreview.vue";
import PlatformSelector from "./components/PlatformSelector.vue";
import ScheduleDialog from "./components/ScheduleDialog.vue";
import PostPreview from "./components/PostPreview.vue";

import { google_llm } from "./providers/google_generative_api";
import { enhanceTextPrompt } from "./llm/enhance_text_promp";
import { imageURLToBase64 } from "./utils/images";

const images = ref([]);
const rawText = ref("");
const enhancedText = ref(""); // New state for enhanced text
const selectedPlatforms = ref([]);

function handleImages(newImgs) {
  images.value.push(...newImgs);
}

function handleText(text) {
  rawText.value = `\n${text}`;
}

async function enhanceWithAI() {
  const imageData = await Promise.all(
    images.value.map(async (img, index) => ({
      inlineData: await imageURLToBase64(img),
    })),
  );
  console.log(imageData);
  const body = {
    contents: [
      {
        parts: [enhanceTextPrompt, ...imageData, { text: rawText.value }],
      },
    ],
  };
  const result = await google_llm.generateContent(body);
  enhancedText.value = result.response.text();
}

function postNow() {
  console.log("Posting to:", selectedPlatforms.value);
  console.log("Text:", rawText.value);
  console.log("Images:", images.value);
  // Post to APIs here
}

function schedulePost(datetime) {
  console.log("Scheduled for", datetime);
  // Save schedule locally or use background job
}
</script>
