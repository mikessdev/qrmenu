<script setup lang="ts">
import Header from '@/components/Header.vue';
import HorizontalMenu from '@/components/HorizontalMenu.vue';
import { useUserStore } from '@/store/userStore';
import { useMenuStore } from '@/store/menuStore';
import Footer from '@/components/Footer.vue';
import Hero from '@/components/Hero.vue';
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCategoryStore } from '@/store/categoryStore';
import { useAuthComposable } from '@/composables/useAuthComposable';
import { useAuthStore } from '@/store/authStore';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const menuStore = useMenuStore();
const authStore = useAuthStore();
const categoryStore = useCategoryStore();
const { isAuthenticated } = useAuthComposable();

const userHavePermission = ref<boolean>(false);

const setPermissionToEdit = (): boolean => {
  const { user } = userStore;
  const { menu } = menuStore;

  const menuBelongsToUser: boolean = menu.userId === user.id;
  const userHavePermission: boolean = isAuthenticated.value && menuBelongsToUser;

  return userHavePermission;
};

const loadData = async (url: string) => {
  await menuStore.getMenuByURL(url);
  await categoryStore.getCategories(menuStore.menu?.id);
};

onMounted(async () => {
  userHavePermission.value = setPermissionToEdit();
});

onBeforeMount(async () => {
  const url: string = route.fullPath.slice(1);
  return await loadData(url);
});

const headerItens = computed(() => {
  return [
    {
      id: 1,
      text: 'Cardápios',
      action: () => router.push('/select-menu'),
      show: isAuthenticated.value
    },
    {
      id: 2,
      text: 'Sair',
      action: async () => {
        await authStore.signOutWithFirebase();
        isAuthenticated.value = false;
      },
      show: isAuthenticated.value
    },
    {
      id: 3,
      text: 'Acessar',
      action: () => router.push('/login'),
      show: !isAuthenticated.value
    }
  ];
});
</script>

<template>
  <div>
    <Header :center="false" :color="menuStore.menu.color" :header-itens="headerItens" />
    <main>
      <Hero :edit-mode="userHavePermission" />

      <div class="mx-auto max-w-[1200px]">
        <div class="mx-auto my-[30px] h-[3px] bg-[#D9D9D9] xl:mt-[-106px]"></div>
        <HorizontalMenu class="mx-auto mt-[30px] px-[12px]" :edit-mode="userHavePermission" />
      </div>
    </main>
    <Footer class="mt-[60px]" />
  </div>
</template>

<style lang="scss" scoped></style>
