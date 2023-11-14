<script setup lang="ts">
import Header from '@/components/Header.vue';
import Hero from '@/components/Hero.vue';
import HorizontalMenu from '@/components/HorizontalMenu.vue';
import { ref } from 'vue';

const background = ref('bg-[#67177b]');
</script>

<template>
  <Header :center="true" color="#67177b" />
  <main>
    <Hero />
    <HorizontalMenu />
  </main>
</template>

<style lang="scss" scoped></style>
