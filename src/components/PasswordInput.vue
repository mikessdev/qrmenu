<script setup lang="ts">
import EyesIcon from '@/components/icons/EyesIcon.vue';
import { ref } from 'vue';

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
  }
});

const emit = defineEmits(['update:modelValue', 'validate', 'passwordVisible']);

const handleInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value ?? '');
  emit('validate');
};

const passwordVisible = ref<boolean>(false);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;

  const visible: boolean = props.inputType === 'password';
  visible ? emit('passwordVisible', 'text') : emit('passwordVisible', 'password');
};
</script>
<template>
  <div class="relative mt-[10px] flex w-full flex-col">
    <label class="font-base pl-[6px] font-notosans font-bold text-qr-bit-light-gray">
      {{ props.label }}
    </label>
    <!-- <div class="relative flex w-full"> -->
    <input
      class="font-base rounded-[10px] border-2 border-qr-dark-gray bg-qr-light-gray p-[10px] font-notosans font-bold text-qr-bit-light-gray focus:border-[3px] focus:border-qr-primary-orange focus-visible:outline-none"
      :type="props.inputType"
      :placeholder="props.placeholder"
      autofocus="true"
      :maxlength="maxlength"
      :value="modelValue"
      @input="(e) => handleInput(e)"
    />
    <div
      @click="togglePasswordVisibility()"
      class="absolute right-[10px] top-[34px] cursor-pointer"
    >
      <EyesIcon :visible="passwordVisible" color="black" :height="26" :width="26" />
    </div>
    <label class="pl-[6px] font-notosans font-bold text-qr-primary-orange">
      {{ props.errorMessage }}
    </label>
  </div>
</template>
<style lang="scss" scoped></style>
