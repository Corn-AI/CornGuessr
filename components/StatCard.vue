<!-- components/StatCard.vue -->
<template>
    <div class="bg-secondary-light rounded-2xl p-6 shadow-glow">
      <h3 class="text-gray-400 text-lg mb-3">{{ title }}</h3>
      <div class="flex items-baseline">
        <span class="text-4xl font-bold text-primary">{{ value }}</span>
        <span class="text-gray-400 ml-2 text-xl">{{ unit }}</span>
      </div>
      <p class="text-gray-400 text-sm mt-3">
        <slot></slot>
      </p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    value: [Number, String],
    unit: String
  })
  </script>
  
  <style scoped>
  .shadow-glow {
    box-shadow: 0 0 20px rgba(255, 107, 0, 0.1);
  }
  </style>