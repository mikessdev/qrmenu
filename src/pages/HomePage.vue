<script setup lang="ts">
import Header from '@/components/Header.vue';
import Hero from '@/components/Hero.vue';
import HorizontalMenu from '@/components/HorizontalMenu.vue';
import { onMounted } from 'vue';
import { useMenuStore } from '@/store/menuStore';
import { Folder, type DownloadRef, donwloadImage } from '@/firebase/cloud.storage';

const menuStore = useMenuStore();
</script>

<template>
  <Header :center="true" />
  <main>
    <Hero />
    <HorizontalMenu />
  </main>
</template>

<style lang="scss" scoped>
main {
  background: $qrmenu-grayish-white;
  margin-top: 60px;
  padding-top: 20px;
  .button-wrapper {
    position: absolute;
    right: 10px;
  }
}
</style>
