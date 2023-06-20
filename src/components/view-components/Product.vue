<template>
  <div class="card flex align-center">
    <div v-if="props.product.image">
      <img
        :src="props.product.image.path" 
        alt="image-product" 
        class="product-image"
      >
    </div>
    <div v-else>
      <i class="material-icons">local_offer_icon</i>
    </div>
    <div>
      <ul class="no-bullets text-start">
        <li v-for="(key) in Object.keys(props.product)">
          <span 
            v-if="key === 'description' || 
              key === 'productName' || 
              key === 'price' ||
              key === 'priceWithDiscount' ||
              key === 'colorName' ||
              key === 'brandName'
              "
          >
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