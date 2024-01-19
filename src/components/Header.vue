<script setup lang="ts">
import { useAuthStore } from '@/store/authStore';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();

const isAuthenticated = ref<boolean>(false);

const props = defineProps({
  fixed: {
    type: Boolean,
    default: false
  },
  center: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#f85d3a'
  }
});

onMounted(async () => {
  isAuthenticated.value = await authStore.isAuthenticated();
});
</script>

<template>
  <header
    :style="`background-color: ${props.color}`"
    :class="props.fixed ? 'fixed z-20' : ''"
    class="h-[60px] w-full shadow-md"
  >
    <div
      v-if="props.center"
      class="mx-auto my-0 flex h-full max-w-[1200px] items-center px-2.5 font-notosans font-bold text-white"
    >
      <p class="mx-auto">LOGO</p>
    </div>
    <div
      v-if="!props.center"
      class="mx-auto my-0 flex h-full max-w-[1200px] items-center justify-between px-2.5 font-notosans font-bold text-white"
    >
      <p>LOGO</p>

      <ul>
        <li
          v-if="isAuthenticated"
          @click="
            () => {
              authStore.signOutWithFirebase();
              isAuthenticated = false;
            }
          "
        >
          <a class="cursor-pointer hover:text-qr-medium-gray">Sair</a>
        </li>
        <li v-else>
          <router-link to="/login">
            <a class="cursor-pointer hover:text-qr-medium-gray">Acessar</a>
          </router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts">
export default {
  name: 'HeaderItem'
};
</script>
