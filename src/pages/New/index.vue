<script setup lang="ts">
import { useAuthComposable } from '@/composables/useAuthComposable';
import { computed } from 'vue';
import Header from '@/components/Header.vue';
import { useRouter } from 'vue-router';
import Stepper from './Stepper/index.vue';

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
    <div class="flex">
      <div class="mx-auto my-0 mt-10 w-[90%] max-w-[800px]">
        <Stepper />
      </div>
    </div>
  </div>
</template>
