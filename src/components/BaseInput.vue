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
  isRequired: {
    type: Boolean,
    default: true
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  isReadonly: {
    type: Boolean,
    default: false
  },
  auxText: {
    type: String,
    default: ''
  },
  inputId: {
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
      class="font-base h-[200px] resize-none rounded-[10px] border-2 border-qr-primary-orange bg-qr-light-gray p-[10px] font-notosans font-bold text-qr-bit-light-gray focus-visible:outline-none"
      :type="props.inputType"
      :placeholder="props.placeholder"
      autofocus="true"
      :maxlength="maxlength"
      :value="modelValue"
      @input="(e) => handleInput(e)"
    />
    <input
      v-else
      class="font-base rounded-[10px] border-2 border-qr-primary-orange bg-qr-light-gray p-[10px] font-notosans font-bold text-qr-bit-light-gray focus-visible:outline-none"
      :type="props.inputType"
      :placeholder="props.placeholder"
      autofocus="true"
      :maxlength="maxlength"
      :value="modelValue"
      @input="(e) => handleInput(e)"
    />
    <label class="error-message">
      {{ props.errorMessage }}
    </label>
  </div>
</template>
<style lang="scss" scoped>
// .base-input {
//   display: flex;
//   flex-direction: column;

//   input,
//   textarea {
//     padding: 15px;
//     font-size: 14px;
//     border: 1px solid #ccc;
//     margin-top: 5px;
//     border-radius: 4px;
//     transition: all linear 160ms;
//     outline: none;

//     &:focus {
//       border: 1px solid $qrmenu-red;
//     }
//   }

//   textarea {
//     resize: none;
//     height: 120px;
//   }

//   .label {
//     margin-top: 16px;
//     font-size: 14px;
//     font-weight: 600;
//   }
//   .error-message {
//     color: $qrmenu-red;
//     font-weight: 500;
//     font-size: 12px;
//   }

//   @media (max-width: 300px) {
//     textarea {
//       height: 180px;
//     }
//   }
// }
</style>
