<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  props: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  text: {
    type: String,
    default: ''
  }
});
</script>
<template>
  <div :props="props">{{ text }}</div>
</template>
