<template>
    <header class="app-bar">
      <div class="flex align-center">
        <img src="../../assets/Logo.png" alt="ICON" class="logo-app-bar">
        <img src="../../assets/Orkestra.png" alt="ICON" class="orkestra-logo-app-bar">
      </div>
      <div class="flex align-center">
        <CircleIcon :icon="'person'" />
        <CircleIcon :icon="'shopping_cart'" />
        <CircleIcon :icon="'notifications'" />
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import CircleIcon from '@/components/app-components/CircleIcon.vue';
  
  </script>
  
  <style scoped>

  </style>