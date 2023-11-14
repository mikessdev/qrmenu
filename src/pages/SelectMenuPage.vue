<script setup lang="ts">
import Header from '@/components/Header.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
</script>

<template>
  <Header :center="true" />
  <main class="flex flex-col items-center pt-[60px]">
    <p class="mb-[60px] font-notosans text-xl text-[#4E4E4E]">
      Selecione o botão abaixo para criar um novo cardápio.
    </p>
    <router-link to="/create-menu">
      <div
        class="flex h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-full border-[4px] border-[#DCDCDC] bg-qr-medium-gray"
      >
        <PlusIcon variante="02" :width="26" :height="26" color="#DCDCDC" />
      </div>
    </router-link>
  </main>
</template>

<style lang="scss" scoped></style>
