<script setup lang="ts">
import Header from "@/components/Header.vue";
import Hero from "@/components/Hero.vue";
import HorizontalMenu from "@/components/HorizontalMenu.vue";
import Welcome from "@/components/Welcome.vue"

import { useUserStore } from '@/store/userStore';

const userStore = useUserStore()
</script>

<template>
  <Header :hide-back-button="true"/>
  <main>
    <Welcome v-if="userStore.isAdmin"/>
    <Hero/>
    <HorizontalMenu />
  </main>
</template>

<style lang="scss" scoped>
  main {
    background: $qrmenu-grayish-white;
    margin-top: 60px;
    padding-top: 20px;
  }
</style>