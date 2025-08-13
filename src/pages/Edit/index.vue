<script setup lang="ts">
import { useAuthComposable } from '@/composables/useAuthComposable';
import { computed, onMounted, reactive, ref } from 'vue';
import Header from '@/components/Header.vue';
import { useRoute, useRouter } from 'vue-router';
import Stepper from '../Stepper/index.vue';
import { useMenuStore } from '@/store/menuStore';

const router = useRouter();
const route = useRoute();
const menuStore = useMenuStore();
const { isAuthenticated } = useAuthComposable();

const isLoading = ref<boolean>(false);

onMounted(async () => {
  isLoading.value = true;
  const url: string = route.fullPath.slice(1);
  await loadData(url);
  isLoading.value = false;
});

const loadData = async (url: string) => {
  await menuStore.getMenuByURL(url);
};

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
