<template>
  <component 
    :is="typeField"
    :fieldValue="fieldValue"
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
import { PropType, computed } from 'vue';
import TextField from '@/components/app-components/fields/TextField.vue';

const props = defineProps({
  fieldValue: {
    type: [String, Number, Boolean, Object, Array, null] as PropType<unknown>,
    default: undefined,
  },
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
    case 'number':
      return TextField;
  }
});

const handleContentChange = (content: any) => {
  emits('contentChange', content);
};

const appendHandler = () => {
  emits('appendHandler');
}
</script>