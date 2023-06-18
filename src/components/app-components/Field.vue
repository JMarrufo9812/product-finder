<template>
  <component 
    :is="typeField" 
    :placeholder="placeholder"
    :prependIcon="prependIcon"
    :appendIcon="appendIcon"
    :clickeableAppend="clickeableAppend"
    :clickeablePrepend="clickeablePrepend"
    @contentChange="handleContentChange"
    @appendHandler="appendHandler"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Text from '@/components/app-components/fields/Text.vue';

const props = defineProps({
  type: String,
  placeholder: String,
  prependIcon: String,
  appendIcon: String,
  clickeableAppend: Boolean,
  clickeablePrepend: Boolean,
});

const emits = defineEmits(['contentChange','appendHandler'])

const typeField = computed(() => {
  switch (props.type) {
    case 'text':
      return Text;
  }
});

const handleContentChange = (searchValue: any) => {
  emits('contentChange', searchValue);
};

const appendHandler = () => {
  emits('appendHandler');
}
</script>