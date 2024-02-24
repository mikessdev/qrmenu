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
import { useUserStore } from '@/store/userStore';
import { AuthError } from '@/utils/enuns/firebase';
import { useAuthStore } from '@/store/authStore';

const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();

const loginErrorMessage = ref<string>('');
const passwordInputType = ref<string>('password');

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

  const email: string = viewState.email.value;
  const password: string = viewState.password.value;

  const thereIsNoError = validFilds();
  if (thereIsNoError) {
    try {
      await authStore.signinWithFirebase(email, password);
      const { uid: id, emailVerified } = authStore.userCredential.user;

      if (emailVerified) {
        await userStore.getUser(id);
        userStore.user.accessToken = await authStore.userCredential.user.getIdToken();
        loginErrorMessage.value = '';
        return router.push('/select-menu');
      }

      loginErrorMessage.value = '';
      return router.push('/register-complete');
    } catch (error) {
      const userNoHaveAccount: boolean = error.code === AuthError.userNotFound;
      const userHaveAccount: boolean =
        error.code === AuthError.invalidEmail || error.code === AuthError.wrongPassword;

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

const headerItens = [
  {
    id: 1,
    text: 'Voltar',
    action: () => router.back(),
    show: true
  }
];
</script>
<template>
  <div>
    <Header :fixed="true" :header-itens="headerItens" />
    <div class="flex min-h-screen bg-qr-primary-orange pt-[80px]">
      <div
        class="mx-auto my-[10px] flex h-[90vh] max-h-[800px] min-h-[500px] w-[96%] max-w-[800px] items-center justify-center rounded-[10px] bg-white px-[8px]"
      >
        <div class="flex h-[100%] w-[90%] flex-col justify-evenly py-[20px]">
          <h1 class="title max text-center text-qr-primary-orange">Entre com sua conta</h1>
          <form class="flex flex-col" method="POST">
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
            <div class="mt-[30px] flex flex-col">
              <Button
                class="mx-auto"
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
          <div class="flex h-[20%] flex-col justify-evenly">
            <p class="paragraph-14px text-center text-black">Ou entre com</p>
            <LoginWithGoogle />
            <p class="paragraph-14px text-center">
              Não tem uma conta?
              <router-link to="/register">
                <strong class="cursor-pointer text-qr-primary-orange">Registre-se</strong>
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
