<template>
  <div class="flex-block align-center" style="margin-top:6em">
    <div>
      <i 
        :class="`text-color-${ color }`" 
        class="material-icons"
      >
        search_off
      </i>
    </div>
    <span :class="`text-color-${ color }`">
      {{ text }}
    </span>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    text: String,
    icon: String,
    color: String
})
</script>