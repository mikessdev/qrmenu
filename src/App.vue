<script setup lang="ts">
import { onAuthStateChanged, type User } from 'firebase/auth';
import { firebaseAuth } from './firebase/config';
import { useAuthStore } from './store/useAuthStore';
import { useUserStore } from './store/userStore';
import { useRecaptchaProvider } from 'vue-recaptcha';

useRecaptchaProvider();

const authStore = useAuthStore();
const userStore = useUserStore();

onAuthStateChanged(firebaseAuth, (user) => {
  if (user) {
    authStore.setUser(user);
    userStore.isAdmin = true;
  }

  if (!user) {
    authStore.setUser({} as User);
    userStore.isAdmin = false;
  }
});
</script>
<template>
  <router-view />
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
