<template>
  <div class="input-field">
    <i :class="{ 'clickeable':clickeablePrepend }" class="icon prepend-icon material-icons">{{ props.prependIcon }}</i>
    <input 
      v-model="content" 
      @input="updateContent" 
      type="text" 
      :placeholder="props.placeholder"
    />
    <i 
      v-if="!content"
      :class="{ 'clickeable':clickeableAppend }"
      @click="appendHandler"
      class="icon append-icon material-icons"
    >
      {{ props.appendIcon }}
    </i>
    <i 
      v-if="content"
      class="icon clickeable append-icon material-icons" 
      @click="clearHandler"
    >
      clear
    </i>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  placeholder: String,
  prependIcon: String,
  appendIcon: String,
  clickeableAppend: Boolean,
  clickeablePrepend: Boolean,
});

const emits = defineEmits(['contentChange', 'appendHandler'])

const content = ref('');

const updateContent = () => {
  emits('contentChange', content.value);
};

const appendHandler = () => {
  emits('appendHandler', content.value);
}

const clearHandler = () => {
  content.value = ''
};
</script>