<script setup lang="ts">
import { useRecaptchaProvider } from 'vue-recaptcha';
import { useUserStore } from './store/userStore';
import { useAuthStore } from './store/authStore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();
const userStore = useUserStore();
const authStore = useAuthStore();

useRecaptchaProvider();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    authStore.user = user;
    await userStore.getUser(user.uid);

    userStore.user.accessToken = await user.getIdToken();
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
