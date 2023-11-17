<script setup lang="ts">
import Header, { type HeaderLinks } from '@/components/Header.vue';
import Hero from '@/components/Hero.vue';
import { ref } from 'vue';

const headerLinks = ref<HeaderLinks[]>([{ id: 1, name: 'Accesar', link: '/login' }]);
</script>

<template>
  <Header :center="false" color="#67177b" :links="headerLinks" />
  <main>
    <Hero />
  </main>
</template>

<style lang="scss" scoped></style>
