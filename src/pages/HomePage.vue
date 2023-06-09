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
  //teste de background irei arrumar ainda
  main {
    background: $qrmenu-white;
    margin-top: 60px;
  }
</style>