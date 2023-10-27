<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const props = defineProps({
  fixed: {
    type: Boolean,
    default: false
  }
});
</script>
<template>
  <header
    :class="props.fixed ? 'fixed z-20' : ''"
    class="h-[60px] w-full bg-qr-primary-orange shadow-md"
  >
    <div
      class="mx-auto my-0 flex h-full max-w-[1200px] items-center justify-between px-2.5 font-notosans font-bold text-white"
    >
      <p>SEU CARDÁPIO</p>
      <router-link to="/login">
        <a class="cursor-pointer hover:text-qr-medium-gray">Acessar</a>
      </router-link>
    </div>
  </header>
</template>
