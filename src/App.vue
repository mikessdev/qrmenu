<script setup lang="ts">
import { useRecaptchaProvider } from 'vue-recaptcha';
import { useAuthStore } from './store/authStore';

const authStore = useAuthStore();
authStore.checkAuthState();

useRecaptchaProvider();
</script>
<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
