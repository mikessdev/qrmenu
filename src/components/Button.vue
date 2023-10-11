<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
});
</script>
<template>
  <button
    class="button h-[48px] cursor-pointer rounded-[10px] bg-qr-light-gray px-[16px] font-notosans text-xl font-bold text-black shadow-[0_2px_4px_rgb(45,35,66,0.4),0_7px_13px_-3px_rgb(45,35,66,0.3),0_-3px_0_inset_#d6d6e7] transition-transform duration-150 hover:-translate-y-[2px] hover:shadow-[0_4px_8px_rgb(45,35,66,0.4),0_7px_13px_-3px_rgb(45,35,66,0.3),0_-3px_0_inset_#d6d6e7] focus-visible:outline-none active:-translate-y-[-2px] active:shadow-[0_3px_7px_inset_#d6d6e7]"
    :class="[props.isDisabled ? 'isDisabled' : 'isEnabled']"
  >
    {{ props.label }}
  </button>
</template>
<style lang="scss" scoped></style>
