<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import BaseInput from '@/components/BaseInput.vue';
import Button from '@/components/Button.vue';
import LoginWithGoogle from '@/components/LoginWithGoogle.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import { validateEmptyText } from '@/validators/emptyText';
import { validateEmail } from '@/validators/email';
import { signInWithEmailAndPassword, type UserCredential } from 'firebase/auth';
import { firebaseAuth } from '@/firebase/config';
import { type HeaderLinks } from '@/components/Header.vue';
import { useUserStore } from '@/store/userStore';
import { AuthError } from '@/utils/enuns/firebase';
import type { User } from '@/utils/interfaces/User';

const router = useRouter();
const userStore = useUserStore();

const loginErrorMessage = ref<string>('');
const passwordInputType = ref<string>('password');

const headerLinks: HeaderLinks[] = [{ id: 1, name: 'Voltar', link: '/' }];

const viewState = reactive({
  email: {
    value: '',
    error: '',
    validator: () => {
      viewState.email.error = validateEmptyText(viewState.email.value);
      if (viewState.email.value) {
        viewState.email.error = validateEmail(viewState.email.value);
      }
    }
  },
  password: {
    value: '',
    error: '',
    validator: () => {
      viewState.password.error = validateEmptyText(viewState.password.value);
    }
  }
});

const validFilds = () => {
  viewState.email.validator();
  viewState.password.validator();

  const emailError = viewState.email.error;
  const nameError = viewState.password.error;
  const thereIsNoError = !nameError && !emailError;

  return thereIsNoError;
};

const submit = async (e: Event) => {
  e.preventDefault();
  const thereIsNoError = validFilds();
  if (thereIsNoError) {
    try {
      const userCredential = (await signInWithEmailAndPassword(
        firebaseAuth,
        viewState.email.value,
        viewState.password.value
      )) as UserCredential;
      const { uid: userId, emailVerified } = userCredential.user;

      if (emailVerified) {
        await userStore.getUser(userId);
        userStore.user.accessToken = await userCredential.user.getIdToken();
        userStore.userCredential = userCredential.user;
        loginErrorMessage.value = '';
        return router.push('/select-menu');
      }

      if (!emailVerified) {
        loginErrorMessage.value = '';
        return router.push('/register-complete');
      }
    } catch (error) {
      const userNotFound: string = AuthError.userNotFound;
      const wrongPassword: string = AuthError.wrongPassword;
      const invalidEmail: string = AuthError.invalidEmail;

      const userNoHaveAccount: boolean = error.code === userNotFound;
      const userHaveAccount: boolean = error.code === invalidEmail || error.code === wrongPassword;

      if (userNoHaveAccount) {
        loginErrorMessage.value = 'Nenhuma conta com esse email foi encontrada!';
      }

      if (userHaveAccount) {
        loginErrorMessage.value = 'Email ou senha inválida!';
      }
    }
  }
};

const togglePasswordVisibility = () => {
  const visible: boolean = passwordInputType.value === 'text';
  passwordInputType.value = visible ? 'password' : 'text';
};
</script>
<template>
  <Header class="top-0" :fixed="true" :links="headerLinks" />
  <div class="min-h-screen bg-qr-primary-orange px-[20px] pb-[20px] pt-[80px]">
    <div class="mx-auto max-w-[800px] rounded-[10px] bg-white px-[40px] py-[80px]">
      <form class="flex flex-col" method="POST">
        <h1 class="mb-[20px] text-center text-5xl font-bold text-qr-primary-orange">
          Entre com sua conta
        </h1>
        <BaseInput
          label="E-mail"
          inputType="email"
          placeholder="Digite seu e-mail"
          v-model="viewState.email.value"
          :error-message="viewState.email.error"
          @validate="viewState.email.validator"
        />
        <PasswordInput
          label="Senha"
          :inputType="passwordInputType"
          placeholder="Digite sua senha"
          v-model="viewState.password.value"
          :error-message="viewState.password.error"
          @validate="viewState.password.validator"
          @password-visible="togglePasswordVisibility()"
        />
        <div class="flex flex-col pb-[40px]">
          <Button
            class="mx-auto mt-[40px]"
            type="submit"
            label="Acessar"
            @click="(e) => submit(e)"
            variante="secundary"
          />
          <span
            v-if="loginErrorMessage"
            class="relative z-10 mx-auto mt-[6px] font-notosans font-bold text-qr-primary-orange"
            >{{ loginErrorMessage }}</span
          >
        </div>
      </form>
      <p class="mb-[20px] text-center font-notosans text-sm font-bold text-black">Ou entre com</p>
      <LoginWithGoogle />
      <p class="mt-[60px] text-center font-notosans text-sm">
        Não tem uma conta?
        <router-link to="/register">
          <strong class="cursor-pointer text-qr-primary-orange">Registre-se</strong>
        </router-link>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
