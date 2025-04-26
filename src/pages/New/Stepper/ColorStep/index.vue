<script lang="ts" setup>
const props = defineProps({
  model: {
    type: String,
    default: '#f85d3a'
  }
});
</script>

<template>
  <div class="flex w-full justify-center">
    <v-color-picker v-model="props.model" />
  </div>
</template>
