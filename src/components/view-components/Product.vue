<template>
  <div class="card flex align-center">
    <div>
      <img 
        :src="props.product.image" 
        alt="image-product" 
        class="product-image"
      >
    </div>
    <div>
      <ul class="no-bullets text-start">
        <li v-for="(key) in Object.keys(props.product)">
          <span v-if="key !== 'image'">
            {{ props.product[key] }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
 
 const props = defineProps({
    product: Object
 })

</script>