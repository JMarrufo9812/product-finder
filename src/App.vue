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
        :fieldValue="fieldContent"
        @contentChange="handleContentChange"
        @appendHandler="handleScannerOpen(true)"
      />
      <InfoMessage
        v-if="!products || products.length === 0"
        :text="'No existen resultados para esta busqueda'" 
        :icon="'search'" 
        :color="'red'"
      />
      <ListItems :list="products">
        <template v-slot:item="{ item }">
          <Product :product="<any> item"/>
        </template>
      </ListItems>
    </div>
    <Modal v-if="isScannerOpen" @close="handleScannerOpen(false)">
      <template #header>
        <div class="flex-block">
          <span>Escanea el codigo de busqueda</span>
          <b>Manten el codigo frente a la camara hasta que el modal se cierre</b>
        </div>
      </template>
      <template #body>
        <Loader v-if="!isReadyScan"/>
        <StreamBarcodeReader
          @loaded="readyScan"
          @decode="onDecode"
        ></StreamBarcodeReader>
      </template>
      <template #footer>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import AppBar from '@/components/app-components/AppBar.vue';
import ListItems from '@/components/app-components/ListItems.vue';
import Field from '@/components/app-components/Field.vue';
import Product from '@/components/view-components/Product.vue'
import Modal from '@/components/app-components/Modal.vue'
import Loader from '@/components/app-components/Loader.vue'
import InfoMessage from '@/components/app-components/InfoMessage.vue'

import { StreamBarcodeReader } from "vue-barcode-reader";

import { ref } from 'vue';

import ProductService from '@/services/product.service'

const products = [
  // {
  //   image: 'https://source.unsplash.com/random/1',
  //   description: 'Product 1 description',
  //   name: 'Product 1',
  //   price: 10.99,
  //   discount: 0.2,
  //   colorName: 'Red',
  //   brandName: 'Brand A',
  // },
  // {
  //   image: 'https://source.unsplash.com/random/2',
  //   description: 'Product 2 description',
  //   name: 'Product 2',
  //   price: 19.99,
  //   discount: 0.1,
  //   colorName: 'Blue',
  //   brandName: 'Brand B',
  // },
  // {
  //   image: 'https://source.unsplash.com/random/3',
  //   description: 'Product 3 description',
  //   name: 'Product 3',
  //   price: 5.99,
  //   discount: 0,
  //   colorName: 'Green',
  //   brandName: 'Brand C',
  // },
];

const isScannerOpen = ref <Boolean> (false)
const isReadyScan = ref <Boolean> (false)

const readyScan = () => {
  isReadyScan.value = true
}

const onDecode = (v: string) => {
  isScannerOpen.value = false
  fieldContent.value = v
}

const handleScannerOpen = (isOpen: Boolean) => {
  isReadyScan.value = false
  isScannerOpen.value = isOpen
}

const fieldContent = ref <any>('');

const handleContentChange = (searchValue: any) => {
  ProductService.get()
  fieldContent.value = searchValue;

};
</script>