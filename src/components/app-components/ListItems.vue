<template>
  <div>
    <ul class="list-items-box no-bullets">
      <li v-for="item in props.list">
        <slot name="item" :item="item" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  list: Array
})

</script>