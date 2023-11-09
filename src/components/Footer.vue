<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import InstagramIcon from '@/components/icons/InstagramIcon.vue';
import YoutubeIcon from '@/components/icons/YoutubeIcon.vue';
</script>
<template>
  <div class="relative flex h-[300px] w-full bg-qr-dark-gray">
    <div class="mx-auto my-0 flex flex-col items-center justify-center">
      <div class="flex gap-2.5">
        <InstagramIcon />
        <YoutubeIcon :width="38" />
      </div>
      <h1 class="mt-[30px] font-notosans font-bold text-white">SEU CARDÁPIO</h1>
      <p class="absolute bottom-[10px] font-notosans font-bold text-white">
        © 2023 Todos os direitos reservados
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
