<script setup lang="ts">
import Button from '@/components/Button.vue';
import { sendEmailVerification, type User as UserFirebase } from 'firebase/auth';
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();

const submit = async (e: Event) => {
  e.preventDefault();
  try {
    await sendEmailVerification(userStore.userCredential as UserFirebase);
    userStore.userCredential = {} as UserFirebase;
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <main>
    <div class="flex h-[26vh] w-[100%] bg-qr-primary-orange">
      <p class="mx-auto my-auto text-5xl font-bold">LOGO</p>
    </div>
    <h1 class="my-[30px] ml-[10%] text-5xl font-bold">Verifique o seu email!</h1>
    <p class="ml-[10%] text-xl">
      {{ `Olá, ${userStore.user.name}. Para confirmar seu email clique no botão abaixo.` }}
    </p>
    <Button
      class="ml-[10%] mt-[30px]"
      type="submit"
      label="Confirmar email"
      @click="(e) => submit(e)"
      variante="secundary"
    />
  </main>
</template>

<style lang="scss" scoped></style>
