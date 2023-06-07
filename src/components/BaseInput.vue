<script setup lang="ts">
const props = defineProps({
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
});
</script>
<template>
  <div class="base-input">
    <label> {{ props.label }} </label>
    <input :type="props.inputType" :placeholder="props.placeholder" autofocus="true" />
  </div>
</template>
<style lang="scss" scoped>
  .base-input{
    font-family: 'Noto Sans';
    display: flex;
    flex-direction: column;
    input{
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
  
    label{
      font-size: 14px;
      font-weight: 600;
  }
}
</style>