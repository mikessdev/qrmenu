<script setup lang="ts">
import Header from "@/components/Header.vue";
import Hero from "@/components/Hero.vue";
import HorizontalMenu from "@/components/HorizontalMenu.vue";
import Category from "@/utils/types/Category";

</script>

<template>
    <Header />
  <main>
    <Hero/>
    <HorizontalMenu />
  </main>
</template>

<style lang="scss">
  //teste de background irei arrumar ainda
  main {
    background: #F7F7F7;
  }
</style>