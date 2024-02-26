<script setup lang="ts">
import Header from '@/components/Header.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import { computed, onMounted, ref } from 'vue';
import { useMenuStore } from '@/store/menuStore';
import { useUserStore } from '@/store/userStore';
import type { Menu } from '@/utils/interfaces/Menu';
import { useRouter } from 'vue-router';
import { useAuthComposable } from '@/composables/useAuthComposable';
import { useAuthStore } from '@/store/authStore';

const router = useRouter();
const { isAuthenticated } = useAuthComposable();
const authStore = useAuthStore();
const menuStore = useMenuStore();
const userStore = useUserStore();

const menus = ref<Menu[]>([]);

const navigateTo = (url: string) => {
  return router.push(`/${url}`);
};

onMounted(async () => {
  const { id: userId, accessToken } = userStore.user;
  await menuStore.getMenus(userId, accessToken);
  menus.value = menuStore.menus;
});

const headerItens = computed(() => {
  return [
    {
      id: 1,
      text: 'Sair',
      action: async () => {
        await authStore.signOutWithFirebase();
        isAuthenticated.value = false;
      },
      show: isAuthenticated.value
    },
    {
      id: 2,
      text: 'Acessar',
      action: () => router.push('/login'),
      show: !isAuthenticated.value
    }
  ];
});
</script>

<template>
  <div>
    <Header :header-itens="headerItens" />
    <main class="flex flex-col items-center pt-[60px]">
      <div class="flex flex-wrap justify-evenly gap-8">
        <ul
          class="flex cursor-pointer flex-col items-center"
          v-for="menu in menuStore.menus"
          :key="menu.id"
          @click="navigateTo(menu.url)"
        >
          <li class="flex flex-col items-center">
            <div
              class="h-[100px] w-[100px] overflow-hidden rounded-full border-[4px] border-[#DCDCDC]"
            >
              <img v-if="menu.profileImg" :src="menu.profileImg" alt="Menu image" />
              <img v-else src="@/assets/img/withoutProfile.png" alt="Menu image" />
            </div>
            <span class="relative font-notosans text-[#4E4E4E]">{{ menu.name }}</span>
          </li>
        </ul>
        <router-link to="new">
          <div class="flex cursor-pointer flex-col items-center">
            <div
              class="flex h-[100px] w-[100px] items-center justify-center rounded-full border-[4px] border-[#DCDCDC] bg-qr-medium-gray"
            >
              <PlusIcon variante="02" :width="26" :height="26" color="#DCDCDC" />
            </div>
            <span class="font-notosans text-[#4E4E4E]"> Criar Novo cardápio</span>
          </div>
        </router-link>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: opacity 0.5s ease;
}

.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
}
</style>
