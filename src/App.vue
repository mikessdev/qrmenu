<script setup lang="ts">
import { useRecaptchaProvider } from 'vue-recaptcha';
import { useUserStore } from './store/userStore';
import { useAuthStore } from './store/authStore';
import { getAuth, onAuthStateChanged, type UserCredential } from 'firebase/auth';
import type { User } from './utils/interfaces/User';

const auth = getAuth();
const userStore = useUserStore();
const authStore = useAuthStore();

useRecaptchaProvider();

// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     await userStore.getUser(user.uid);
//     userStore.user.accessToken = await user.getIdToken();
//   }

//   if (!user) {
//     userStore.user = {} as User;
//     authStore.userCredential = {} as UserCredential;
//   }
// });
authStore.isAuthenticated();
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
