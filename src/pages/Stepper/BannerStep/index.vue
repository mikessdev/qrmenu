<script lang="ts" setup>
import FileInput from '@/components/FileInput.vue';
import type { PropType } from 'vue';
import type { Model } from '../index.vue';

const props = defineProps({
  banner: {
    type: Object as PropType<Model>,
    required: false,
    default: () => ({
      value: {} as File,
      error: '',
      validator: () => {}
    })
  }
});
</script>

<template>
  <FileInput label="Imagem do banner" v-model="props.banner.value"></FileInput>
</template>
