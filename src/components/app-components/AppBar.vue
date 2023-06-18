<template>
    <header class="app-bar" :class="{ 'app-bar--hidden': isScrollingDown }">
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
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import CircleIcon from '@/components/app-components/CircleIcon.vue';
  
  const isScrollingDown = ref(false);
  let prevScrollPos = 0;
  
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    isScrollingDown.value = currentScrollPos > prevScrollPos;
    prevScrollPos = currentScrollPos;
  };
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>
  
  <style scoped>

  </style>