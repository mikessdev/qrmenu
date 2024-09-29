<script setup lang="ts">
import Button from '@/components/Button.vue';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';
import { sendEmailVerification, type UserCredential, type User } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();

const showInformation = ref<Boolean>(false);
const loading = ref<boolean>(false);
const emailSent = ref<boolean>(false);

const submit = async (e: Event) => {
  loading.value = true;
  e.preventDefault();
  console.log('user: ', authStore.userCredential.user);
  const user: User = authStore?.userCredential?.user;
  try {
    if (!user) throw new Error('User not authenticated');
    await sendEmailVerification(user);
    authStore.userCredential = {} as UserCredential;
    showInformation.value = true;
    emailSent.value = true;
  } catch (error) {
    //Error page redirect
    console.error(error);
  } finally {
    loading.value = false;
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
    <div class="mx-[10%] mt-10">
      <p class="text-base">
        {{ `Olá, ${userStore.user.name}, seu cadastro está quase pronto.` }}
      </p>
      <p class="mt-10 text-base">
        Vamos apenas precisar confirmar seu endereço de email. <br />
        Para isto, basta clicar no botão abaixo que enviaremos um email de confirmação.
      </p>
      <Button
        class="mt-10"
        color="primary"
        type="submit"
        @click="(e) => submit(e)"
        :loading="loading"
        :disabled="emailSent || !authStore.userCredential.user"
        children="Confirmar email"
      />

      <div v-if="showInformation" class="mt-[60px]">
        <p class="mt-10 text-base">
          Email de confirmação enviado com sucesso. Verifique seu email para confirmar seu cadastro.
        </p>

        <div class="flex items-baseline gap-2">
          <p class="text-base">Já confirmou seu email?</p>
          <v-btn class="mt-[30px]" variant="text" type="submit" color="primary" @click="redirect()"
            >Entrar
          </v-btn>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
