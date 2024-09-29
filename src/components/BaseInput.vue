<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  props: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  textArea: {
    type: Boolean as PropType<Boolean>,
    default: () => false
  }
});
</script>
<template>
  <v-textarea v-if="textArea" variant="outlined" color="primary" v-bind:props="props" />
  <v-text-field v-else variant="outlined" color="primary" v-bind:props="props" />
</template>
<style lang="scss" scoped></style>
