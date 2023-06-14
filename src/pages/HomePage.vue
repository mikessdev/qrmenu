<script setup lang="ts">
import Header from "@/components/Header.vue";
import Hero from "@/components/Hero.vue";
import HorizontalMenu from "@/components/HorizontalMenu.vue";

</script>

<template>
  <Header />
  <main>
    <Hero/>
    <HorizontalMenu />
  </main>
</template>

<style lang="scss" scoped>
  main {
    background: $qrmenu-grayish-white;
    padding-top: 60px;
  }
</style>