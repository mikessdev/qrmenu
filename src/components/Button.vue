<script setup lang="ts">
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
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

</script>
<template>
    <input class="button" :class="[props.isDisabled ? 'isDisabled' : 'isEnabled']" :type="props.type" :value="$props.label"/>
</template>
<style lang="scss" scoped>
.button{
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  border: none;
  transition: all linear 160ms;
  cursor: pointer;
  margin: 0;
  padding: 10px 0;
  border-radius: 4px;
  display: flex;

}
.isEnabled {
    background-color: $qrmenu-red;
    color: $qrmenu-white;
    
    &hover {
      transform: scale(1.05);
      background-color: $qrmenu-red;
    }
    
  }
  
  .isDisabled {
    background-color: $qrmenu-gray;
    color: $qrmenu-white;
  }
</style>
