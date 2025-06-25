<script lang="ts" setup>
import type { PropType } from 'vue';
import type { Model } from '../index.vue';

const props = defineProps({
  color: {
    type: Object as PropType<Model>,
    default: '#f85d3a'
  }
});
</script>

<template>
  <div class="flex w-full justify-center">
    <v-color-picker v-model="props.color.value" />
  </div>
</template>
