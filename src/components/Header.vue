<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import SettingsIcon from '@/components/icons/SettingsIcon.vue';
import LogoutIcon from '@/components/icons/LogoutIcon.vue';
import ArrowBackIcon from './icons/ArrowBackIcon.vue';
import { useUserStore } from '@/store/userStore';
import router from '@/router';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '@/firebase/config';

defineProps({
  hideBackButton: {
    type: Boolean,
    default: false
  }
});

const userStore = useUserStore();

const settings = () => {
  return userStore.isAdmin ? router.push('/userconfig') : router.push('/login');
};

const logOut = () => {
  signOut(firebaseAuth);
  return (userStore.isAdmin = false);
};
</script>
<template>
  <header class="h-[60px] w-full bg-orange-500">
    <p>Logo</p>
    <p>Boteco Peace</p>
  </header>
</template>
