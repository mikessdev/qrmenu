<script setup lang="ts">
import { useAuthComposable } from '@/composables/useAuthComposable';
import { computed, reactive } from 'vue';
import Header from '@/components/Header.vue';
import { useRouter } from 'vue-router';
import Stepper from '../Stepper/index.vue';

const router = useRouter();
const { isAuthenticated } = useAuthComposable();

const snackbar = reactive({
  show: false,
  type: 'success',
  message: ''
});

const createMenuNotify = () => {
  snackbar.show = true;
  snackbar.type = 'success';
  snackbar.message = 'Menu criado com sucesso';
};

const errorCreatingMenuNotify = () => {
  snackbar.show = true;
  snackbar.type = 'error';
  snackbar.message = 'Não foi possível criar o cardápio! Por favor, tente novamente mais tarde.';
};

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
      <div class="mx-auto my-0 mt-10 w-[90%] max-w-[1200px]">
        <Stepper @createSuccess="createMenuNotify" @createFailed="errorCreatingMenuNotify" />
      </div>
    </div>
  </div>
</template>
