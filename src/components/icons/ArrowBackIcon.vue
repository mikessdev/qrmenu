<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: '#fff'
  }
})
</script>

<template>
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        height="30" 
        viewBox="0 -960 960 960" 
        width="30">
            <path 
            d="M655-80 255-480l400-400 56 57-343 343 343 343-56 57Z" 
            :fill="color"/>
    </svg>
</template>