<script setup lang="ts">
import Header from '../components/Header.vue';
import Button from '../components/Button.vue';
import router from '@/router';

const navigateToRegister = () => {
  return router.push('/register');
};
</script>

<template>
  <Header />
  <div class="h-[600px] w-full overflow-hidden bg-qr-primary-orange">
    <div class="relative mx-auto my-0 flex max-w-[1200px]">
      <div class="absolute left-0 z-10 mt-[60px] max-w-[600px] px-[20px] font-notosans text-white">
        <h1 class="text-5xl font-bold">Crie o seu cardápio personalizado de forma gratuita</h1>
        <p class="mb-[60px] mt-[40px] max-w-[380px] text-xl">
          Nós entendemos o quanto um cardápio bem elaborado pode fazer a diferença no seu negócio ou
          na sua experiência culinária, e é por isso que estamos aqui para ajudar.
        </p>
        <Button @click="navigateToRegister()" :label="'Cadastre-se Grátis'"></Button>
      </div>
      <img class="absolute right-[-80px] top-[-50px]" src="../assets/img/hero.png" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
