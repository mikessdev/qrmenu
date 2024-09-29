<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { type ButtonHTMLAttributes, type VNode } from 'vue';
import { type PropType } from 'vue';

const props = defineProps({
  props: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  children: {
    type: String as PropType<String | VNode>,
    default: () => []
  }
});
</script>
<template>
  <v-btn
    class="hover:-translate-y-[4px] hover:shadow-[0_4px_8px_rgb(45,35,66,0.4),0_7px_13px_-3px_rgb(45,35,66,0.3),0_-3px_0_inset_#f6937c] active:-translate-y-[-4px] active:shadow-[0_3px_7px_inset_#f6937c]"
    v-bind:props="props"
  >
    {{ children }}
  </v-btn>
</template>
