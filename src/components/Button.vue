<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { type ButtonHTMLAttributes } from 'vue';
import { type PropType } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: 'button'
  },
  variante: {
    type: String,
    default: 'primary'
  }
});
</script>
<template>
  <div>
    <button
      v-if="props.variante === 'primary'"
      :class="[
        props.isDisabled
          ? 'h-[48px] cursor-pointer rounded-[10px] bg-[#9ea3a0] px-[16px] font-notosans text-xl font-bold text-white shadow-[0_2px_4px_rgb(192,194,193,0.4),0_7px_13px_-3px_rgb(192,194,193,0.3),0_-3px_0_inset_#c0c2c1]  focus-visible:outline-none'
          : 'button-font h-[48px] cursor-pointer rounded-[10px] bg-qr-light-gray px-[16px] text-black shadow-[0_2px_4px_rgb(45,35,66,0.4),0_7px_13px_-3px_rgb(45,35,66,0.3),0_-3px_0_inset_#d6d6e7] transition-transform duration-150 hover:-translate-y-[2px] hover:shadow-[0_4px_8px_rgb(45,35,66,0.4),0_7px_13px_-3px_rgb(45,35,66,0.3),0_-3px_0_inset_#d6d6e7] focus-visible:outline-none active:-translate-y-[-2px] active:shadow-[0_3px_7px_inset_#d6d6e7]'
      ]"
      :type="props.type"
    >
      {{ props.label }}
    </button>

    <button
      v-if="props.variante === 'secundary'"
      :class="[
        props.isDisabled
          ? 'h-[48px] cursor-pointer rounded-[10px] bg-[#9ea3a0] px-[16px] font-notosans text-xl font-bold text-white shadow-[0_2px_4px_rgb(192,194,193,0.4),0_7px_13px_-3px_rgb(192,194,193,0.3),0_-3px_0_inset_#c0c2c1]  focus-visible:outline-none'
          : 'h-[48px] cursor-pointer rounded-[10px] bg-qr-primary-orange px-[16px] font-notosans text-xl font-bold text-white shadow-[0_2px_4px_rgb(246,147,124,0.4),0_7px_13px_-3px_rgb(246,147,124,0.3),0_-3px_0_inset_#f6937c] transition-transform duration-150 hover:-translate-y-[2px] hover:shadow-[0_4px_8px_rgb(246,147,124,0.4),0_7px_13px_-3px_rgb(246,147,124,0.3),0_-3px_0_inset_#f6937c] focus-visible:outline-none active:-translate-y-[-2px] active:shadow-[0_3px_7px_inset_#f6937c]'
      ]"
      :type="props.type"
    >
      {{ props.label }}
    </button>
  </div>
</template>
<style lang="scss" scoped></style>
