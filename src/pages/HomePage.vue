<script setup lang="ts">
import Header, { type HeaderLinks } from '@/components/Header.vue';
import Hero from '@/components/Hero.vue';
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import { useMenuStore } from '@/store/menuStore';
import HorizontalMenu from '@/components/HorizontalMenu.vue';
import Footer from '@/components/Footer.vue';

const userStore = useUserStore();
const menuStore = useMenuStore();

const headerLinks = ref<HeaderLinks[]>([{ id: 1, name: 'Accesar', link: '/login' }]);

const userHavePermissionToEdit = (): boolean => {
  const { isAuthenticated, user } = userStore;
  const { menu } = menuStore;

  const menuBelongsToTheUser: boolean = menu.userId === user.id;
  const userHavePermission: boolean = isAuthenticated() && menuBelongsToTheUser;

  return userHavePermission ? true : false;
};
</script>

<template>
  <Header :center="false" :color="menuStore.menu.primaryColor" :links="headerLinks" />
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
