<script setup lang="ts">
import Header from '@/components/Header.vue';
import HorizontalMenu from '@/components/HorizontalMenu.vue';
import { useUserStore } from '@/store/userStore';
import { useMenuStore } from '@/store/menuStore';
import Footer from '@/components/Footer.vue';
import Hero from '@/components/Hero.vue';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCategoryStore } from '@/store/categoryStore';
import { useAuthComposable } from '@/composables/useAuthComposable';

const userStore = useUserStore();
const menuStore = useMenuStore();
const categoryStore = useCategoryStore();
const route = useRoute();
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
  await menuStore.getMenuByURL(url as string);
  await categoryStore.getCategories(menuStore.menu.id);
};

onMounted(async () => {
  // const { url } = route.params;
  // return await loadData(`${url}`);
  userHavePermission.value = setPermissionToEdit();
});

onBeforeMount(async () => {
  const { url } = route.params;
  return await loadData(`${url}`);
});
</script>

<template>
  <Header :center="false" :color="menuStore.menu.primaryColor" />
  <main>
    <Hero :edit-mode="userHavePermission" />

    <div class="mx-auto max-w-[1200px]">
      <div class="mx-auto my-[30px] h-[3px] bg-[#D9D9D9] xl:mt-[-106px]"></div>
      <HorizontalMenu class="mx-auto mt-[30px] px-[12px]" :edit-mode="userHavePermission" />
    </div>
  </main>
  <Footer class="mt-[60px]" />
</template>

<style lang="scss" scoped></style>
