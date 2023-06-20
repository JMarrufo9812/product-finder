<template>
  <div class="list-items-container" @scroll="handleScroll">
    <ul class="list-items-box no-bullets">
      <li v-for="item in props.list" class="flex justify-center">
        <slot name="item" :item="item" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  list: Array
})

const emits = defineEmits(['endList'])

const handleScroll = (event: any) => {

  const { scrollTop, clientHeight, scrollHeight } = event.target;
  
  const scrollPosition = scrollTop + clientHeight;
  console.log(Math.round(scrollPosition), scrollHeight)
  if (Math.round(scrollPosition + 1) === scrollHeight) {
    emits('endList')
  }
};


</script>