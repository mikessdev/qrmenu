<script setup lang="ts">
const props = defineProps({
  maxlength: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  inputType: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  errorMessage: {
    type: String,
    default: ''
  },
  textArea: {
    type: Boolean
  }
});

const emit = defineEmits(['update:modelValue', 'validate']);

const handleInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value ?? '');
  emit('validate');
};
</script>
<template>
  <div class="mt-[10px] flex w-full flex-col">
    <label class="font-base pl-[6px] font-notosans font-bold text-qr-bit-light-gray">
      {{ props.label }}
    </label>
    <textarea
      v-if="props.textArea"
      class="font-base h-[200px] resize-none rounded-[10px] border-2 border-qr-dark-gray bg-qr-light-gray p-[10px] font-notosans font-bold text-qr-bit-light-gray focus:border-[3px] focus:border-qr-primary-orange focus-visible:outline-none"
      :type="props.inputType"
      :placeholder="props.placeholder"
      autofocus="true"
      :maxlength="maxlength"
      :value="modelValue"
      @input="(e) => handleInput(e)"
    />
    <input
      v-else
      class="font-base rounded-[10px] border-2 border-qr-dark-gray bg-qr-light-gray p-[10px] font-notosans font-bold text-qr-bit-light-gray focus:border-[3px] focus:border-qr-primary-orange focus-visible:outline-none"
      :type="props.inputType"
      :placeholder="props.placeholder"
      autofocus="true"
      :maxlength="maxlength"
      :value="modelValue"
      @input="(e) => handleInput(e)"
    />
    <label class="pl-[6px] font-notosans font-bold text-qr-primary-orange">
      {{ props.errorMessage }}
    </label>
  </div>
</template>
<style lang="scss" scoped></style>
