<script setup lang="ts">
import { useAuthStore } from '@/store/authStore';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

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
        <li v-for="item in headerItens" :key="item.id">
          <a
            v-if="item.show"
            @click="item.action"
            class="cursor-pointer hover:text-qr-medium-gray"
            >{{ item.text }}</a
          >
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
