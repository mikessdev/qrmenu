<script setup lang="ts">
import Button from '@/components/Button.vue';

const props = defineProps({
  isProduct: {
    type: Boolean,
    default: true
  },
  variant: {
    type: String,
    default: 'slot'
  },
  buttonIsDisabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['cancel', 'save']);

const cancel = () => {
  emit('cancel');
};

const save = () => {
  emit('save');
};
</script>
<template>
  <div
    v-if="variant === 'slot'"
    class="fixed left-0 top-0 z-50 flex h-[100vh] w-[100vw] backdrop-blur-[30px]"
  >
    <div
      class="mx-auto my-auto flex w-[400px] flex-col rounded-lg bg-white p-[30px] shadow-[0_10px_30px_rgb(65,72,86,0.5)]"
    >
      <slot></slot>
      <div class="mt-[30px] flex justify-evenly">
        <Button @click="cancel" variante="secundary" label="Cancelar" type="button" />
        <Button
          @click="save"
          variante="secundary"
          label="Salvar"
          type="button"
          :is-disabled="props.buttonIsDisabled"
        />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
