<template>
  <AppBar />
  <div class="app-container">
    <div class="app-content">
      <div class="search-container">
        <Field 
          :type="'number'" 
          :placeholder="'Buscar'"
          :prependIcon="'search'"
          :appendIcon="'crop_free'"
          :clickeableAppend="true"
          :fieldValue="fieldContent"
          @contentChange="handleContentChange"
          @appendHandler="handleScannerOpen(true)"
        />
      </div>
      <InfoMessage
        v-if="!isLoadingProducts && (!products || products.length === 0)"
        :text="'No existen resultados para esta busqueda'" 
        :icon="'search'" 
        :color="'red'"
      />
      <loader v-if="isLoadingProducts" style="margin-top:30%" />
      <ListItems v-else :list="products" @endList="endListHandler">
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

import { ref, onMounted  } from 'vue';

import ProductService from '@/services/product.service'

const products = ref([])
const isLoadingProducts = ref(false)
const pagination = ref({
  page: 1,
  limit: 10,
})

const getProducts = (async ({ page , limit, search }: any) => {
  isLoadingProducts.value = true
  ProductService.get({ page , limit, search }).then((data) => {
    pagination.value = {
      page: 1,
      limit: 10,    
    }

    products.value = data
    
    isLoadingProducts.value = false
  })
})

const endListHandler = (async () => {
  pagination.value = {
    page: pagination.value.page + 1,
    limit: pagination.value.limit + 10,
  }

  ProductService.get({ page: pagination.value.page, limit: pagination.value.limit, search: '' })
  .then((data) => {
    data.map((product) => {
      products.value.push(product)
    })
  })
})

onMounted(() => {
  getProducts({ page: 1, limit: 10, search: '' });
});


const isScannerOpen = ref <Boolean> (false)
const isReadyScan = ref <Boolean> (false)

const readyScan = () => {
  isReadyScan.value = true
}

const onDecode = (code: string) => {
  isScannerOpen.value = false
  fieldContent.value = code
  getProducts({ page: 1, limit:10, search:code })
}

const handleScannerOpen = (isOpen: Boolean) => {
  isReadyScan.value = false
  isScannerOpen.value = isOpen
}

const fieldContent = ref <any>('');

const handleContentChange = (searchValue: any) => {
  getProducts({ page: 1, limit:10, search:searchValue })
  fieldContent.value = searchValue;

};
</script>