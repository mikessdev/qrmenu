<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import router from '@/router';

const navigateToLogin = () => {
  return router.push('/login');
};
</script>
<template>
  <header class="relative h-[60px] w-full bg-qr-primary-orange shadow-md">
    <div
      class="mx-auto my-0 flex h-full max-w-[1200px] items-center justify-between px-2.5 font-notosans font-bold text-white"
    >
      <p>SEU CARDÁPIO</p>
      <a class="cursor-pointer hover:text-qr-medium-gray" @click="navigateToLogin()">Acessar</a>
    </div>
  </header>
</template>
