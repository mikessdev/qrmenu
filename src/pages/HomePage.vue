<script setup lang="ts">
import Header from '@/components/Header.vue';
import Hero from '@/components/Hero.vue';
import HorizontalMenu from '@/components/HorizontalMenu.vue';
import Button from '@/components/Button.vue';
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();

const toggleUserMode = () => {
  userStore.isAdmin = !userStore.isAdmin;
};
</script>

<template>
  <Header :hide-back-button="true" />
  <main>
    <div class="button-wrapper">
      <Button label="Modo Admin" @click="toggleUserMode()" />
    </div>
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
