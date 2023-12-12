<script setup lang="ts">
import Button from '@/components/Button.vue';
import { sendEmailVerification, type User as UserFirebase } from 'firebase/auth';
import { useUserStore } from '@/store/userStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const userStore = useUserStore();
const showInformation = ref<Boolean>(false);

const submit = async (e: Event) => {
  e.preventDefault();
  try {
    await sendEmailVerification(userStore.userCredential as UserFirebase);
    userStore.userCredential = {} as UserFirebase;
    showInformation.value = true;
  } catch (error) {
    console.error(error);
  }
};

const redirect = () => {
  return router.push('/login');
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
      label="Enviar email de confirmação"
      @click="(e) => submit(e)"
      variante="secundary"
    />

    <div v-if="showInformation" class="mt-[60px]">
      <p class="ml-[10%] text-xl">
        Um email de confirmação foi enviado para o seu endereço de email!
      </p>

      <p class="ml-[10%] mt-[60px] text-xl">Já confirmou seu email?</p>
      <Button
        class="ml-[10%] mt-[30px]"
        type="submit"
        label="Entrar"
        @click="redirect()"
        variante="secundary"
      />
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
