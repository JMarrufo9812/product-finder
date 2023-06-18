<template>
    <div class="circle-icon-box clickeable">
      <i class="material-icons circle-icon">{{ props.icon }}</i>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  icon: String
})

</script>