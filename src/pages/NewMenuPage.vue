<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthComposable } from '@/composables/useAuthComposable';
import Header from '@/components/Header.vue';

const router = useRouter();
const { isAuthenticated } = useAuthComposable();

const headerItens = computed(() => {
  return [
    {
      id: 1,
      text: 'Voltar',
      action: () => router.back(),
      show: isAuthenticated.value
    }
  ];
});
</script>

<template>
  <div>
    <Header :header-itens="headerItens" />
    <Stepper />
  </div>
</template>
