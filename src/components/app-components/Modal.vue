<template>
 <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header" />
        </div>  
        <div class="modal-body">
          <slot name="body" />
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button class="btn-style" @click="emits('close')">
              Cerrar
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  const emits = defineEmits(['close'])
</script>