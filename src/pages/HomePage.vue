<script setup lang="ts">
import Header from '@/components/Header.vue';
import HorizontalMenu from '@/components/HorizontalMenu.vue';
import { useUserStore } from '@/store/userStore';
import { useMenuStore } from '@/store/menuStore';
import Footer from '@/components/Footer.vue';
import Hero from '@/components/Hero.vue';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const menuStore = useMenuStore();
const route = useRoute();

const userHavePermissionToEdit = (): boolean => {
  const { user } = userStore;
  const { menu } = menuStore;
  const isAuthenticated = !!user;

  const menuBelongsToUser: boolean = menu.userId === user.id;
  const userHavePermission: boolean = isAuthenticated && menuBelongsToUser;

  return userHavePermission;
};

const loadData = async (url: string) => {
  return await menuStore.getMenuByURL(url as string);
};

onBeforeMount(async () => {
  const { url } = route.params;
  await loadData(url as string);
});
</script>

<template>
  <Header :center="false" :color="menuStore.menu.primaryColor" />
  <main>
    <Hero :edit-mode="userHavePermissionToEdit()" />

    <div class="mx-auto max-w-[1200px]">
      <div class="mx-auto my-[30px] h-[3px] bg-[#D9D9D9] xl:mt-[-106px]"></div>
      <HorizontalMenu class="mx-auto mt-[30px] px-[12px]" :edit-mode="userHavePermissionToEdit()" />
    </div>
  </main>
  <Footer class="mt-[60px]" />
</template>

<style lang="scss" scoped></style>
