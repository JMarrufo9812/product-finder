<template>
  <AppBar />
  <div class="app-container">
    <div class="app-content">
      <Field 
        :type="'text'" 
        :placeholder="'Buscar'"
        :prependIcon="'search'"
        :appendIcon="'crop_free'"
        :clickeableAppend="true"
        @contentChange="handleContentChange"
        @appendHandler="isScannerOpen.value = new Date()"
      />
      <ListItems :list="products">
      <template v-slot:item="{ item }">
        <Product :product="item"/>
      </template>
      </ListItems>
    </div>
    <Modal />
  </div>
</template>

<script setup lang="ts">
import AppBar from '@/components/app-components/AppBar.vue';
import ListItems from '@/components/app-components/ListItems.vue';
import Field from '@/components/app-components/Field.vue';
import Product from '@/components/view-components/Product.vue'
import Modal from '@/components/app-components/Modal.vue'

import { ref } from 'vue';

// import ProductService from '@/services/product.service'

const products = [
  {
    image: 'https://source.unsplash.com/random/1',
    description: 'Product 1 description',
    name: 'Product 1',
    price: 10.99,
    discount: 0.2,
    colorName: 'Red',
    brandName: 'Brand A',
  },
  {
    image: 'https://source.unsplash.com/random/2',
    description: 'Product 2 description',
    name: 'Product 2',
    price: 19.99,
    discount: 0.1,
    colorName: 'Blue',
    brandName: 'Brand B',
  },
  {
    image: 'https://source.unsplash.com/random/3',
    description: 'Product 3 description',
    name: 'Product 3',
    price: 5.99,
    discount: 0,
    colorName: 'Green',
    brandName: 'Brand C',
  },
];

const isScannerOpen = ref(null)

const fieldContent = ref('');

const handleContentChange = (searchValue: any) => {
  // ProductService.get()
  fieldContent.value = searchValue;

};
</script>