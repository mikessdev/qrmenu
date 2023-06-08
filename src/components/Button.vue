<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  submit: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
    <input :type="props.type" :value="$props.label"/>
</template>
<style lang="scss" scoped>
input {
    background-color: $qrmenu-red;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    border: none !important;
    transition: all linear 160ms;
    cursor: pointer;
    margin: 0 !important;

    &hover {
        transform: scale(1.05);
        background-color: $qrmenu-red;
    }

}
</style>
