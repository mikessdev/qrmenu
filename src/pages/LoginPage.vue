<script setup lang="ts">
import ArrowBackIcon from '@/components/icons/ArrowBackIcon.vue';
import Header from '@/components/Header.vue';
</script>
<template>
  <Header :isLoginPage="true" />
    <h1>Tela de login</h1>
    
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
