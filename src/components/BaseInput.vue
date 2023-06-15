<script setup lang="ts">
const props = defineProps({
  maxlength: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  inputType: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  errorMessage: {
    type: String,
    default: "",
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
    default: "",
  },
  inputId: {
    type: String,
  },
  textArea: {
    type: Boolean,
  },
});

const emit = defineEmits(['update:modelValue', 'validate'])

const handleInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value ?? '')
  emit('validate');
}
</script>
<template>
  <div class="base-input">
    <label>
      {{ props.label }}
    </label>
      <textarea v-if="props.textArea" class="text-area" :type="props.inputType" :placeholder="props.placeholder"
        autofocus="true" :maxlength="maxlength" :value="modelValue" @input="(e) => handleInput(e)" />
      <input v-else :type="props.inputType" :placeholder="props.placeholder" autofocus="true" :maxlength="maxlength"
      :value="modelValue" @input="(e) => handleInput(e)" />
    <label v-if="props.errorMessage">
      {{ props.errorMessage }}
    </label>
  </div>
</template>
<style lang="scss" scoped>
.base-input {
  display: flex;
  flex-direction: column;

  input, textarea {
    padding: 15px;
    font-size: 14px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    margin-top: 5px;
    border-radius: 4px;
    transition: all linear 160ms;
    outline: none;
    
    &:focus {
      border: 1px solid $qrmenu-red;
    }
  }
  
  textarea{
    resize: none;
    height: 120px;
  }

  label {
    font-size: 14px;
    font-weight: 600;
  }

  @media (max-width: 300px) {
    textarea{
      height:180px;
    }
  }
}
</style>