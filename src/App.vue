<script setup lang="ts">
import { useRecaptchaProvider } from 'vue-recaptcha';

useRecaptchaProvider();
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
