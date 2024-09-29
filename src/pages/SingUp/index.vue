<script setup lang="ts">
import Header from '@/components/Header.vue';
import BaseInput from '@/components/BaseInput.vue';
import Button from '@/components/Button.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import LoginWithGoogle from '@/components/LoginWithGoogle.vue';
import { reactive, ref } from 'vue';
import { validateEmptyText } from '@/validators/emptyText';
import { useRouter } from 'vue-router';
import { validateEmail } from '@/validators/email';
import { validateConfirmPassword, validatePassword } from '@/validators/password';
import { useUserStore } from '@/store/userStore';
import type { User } from '@/utils/interfaces/User';
import { useAuthStore } from '@/store/authStore';

const router = useRouter();

const userStore = useUserStore();
const authStore = useAuthStore();

const loginErrorMessage = ref<string>('');
const passwordInputType = ref<string>('password');
const confirmPasswordInputType = ref<string>('password');
const sendButtonIsClicked = ref<Boolean>(false);
const loading = ref<boolean>(false);

const viewState = reactive({
  name: {
    value: '',
    error: '',
    validator: () => {
      viewState.name.error = validateEmptyText(viewState.name.value);
    }
  },
  lastName: {
    value: '',
    error: '',
    validator: () => {
      viewState.lastName.error = validateEmptyText(viewState.lastName.value);
    }
  },
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
      if (!viewState.password.error) {
        viewState.password.error = validatePassword(viewState.password.value);
      }
    }
  },
  confirmPassword: {
    value: '',
    error: '',
    validator: () => {
      viewState.confirmPassword.error = validateEmptyText(viewState.confirmPassword.value);
      if (!viewState.confirmPassword.error) {
        viewState.confirmPassword.error = validateConfirmPassword(
          viewState.password.value,
          viewState.confirmPassword.value
        );
      }
    }
  }
});

const validFilds = () => {
  viewState.name.validator();
  viewState.lastName.validator();
  viewState.email.validator();
  viewState.password.validator();
  viewState.confirmPassword.validator();

  const nameError = viewState.name.error;
  const lastNameError = viewState.lastName.error;
  const emailError = viewState.email.error;
  const passwordError = viewState.password.error;
  const confirmPasswordError = viewState.confirmPassword.error;

  const thereIsNoError =
    !nameError && !emailError && !lastNameError && !passwordError && !confirmPasswordError;

  return thereIsNoError;
};

const submit = async (e: Event) => {
  e.preventDefault();
  const email: string = viewState.email.value;
  const password: string = viewState.password.value;

  sendButtonIsClicked.value = true;
  const noError = validFilds();

  if (noError) {
    loading.value = true;
    try {
      await authStore.signUpWithFirebase(email, password);
      const { uid } = authStore?.userCredential?.user || {};
      const accessToken = await authStore?.userCredential?.user?.getIdToken();
      await userStore.createUser(
        {
          id: uid,
          name: viewState.name.value,
          lastName: viewState.lastName.value,
          email: viewState.email.value,
          emailVerified: false
        } as User,
        accessToken
      );

      loginErrorMessage.value = '';
      router.push('/register-complete');
    } catch (error) {
      const emailError: string = 'auth/email-already-in-use';
      const emailAlreadyInUse: boolean = error.code === emailError;
      if (emailAlreadyInUse) {
        loginErrorMessage.value = 'Já existe uma conta cadastrada com este email.';
      }
    } finally {
      loading.value = false;
    }
  }
};

const headerItens = [
  {
    id: 1,
    text: 'Já tem uma conta?',
    action: () => router.push('/login'),
    show: true
  },
  {
    id: 2,
    text: 'Entrar',
    action: () => router.push('/login'),
    show: true
  }
];
</script>
<template>
  <div>
    <Header :fixed="true" :header-itens="headerItens" />
    <div class="min-h-screen bg-qr-primary-orange px-[20px] pb-[20px] pt-[80px]">
      <div class="mx-auto max-w-[600px] rounded-[10px] bg-white px-[40px] py-[80px]">
        <h1 class="mb-[20px] text-center text-5xl font-bold text-qr-primary-orange">
          Crie sua conta
        </h1>

        <form class="flex flex-col" method="POST">
          <div class="flex flex-col gap-2">
            <BaseInput
              label="Nome"
              type="text"
              v-model="viewState.name.value"
              :error-messages="viewState.name.error"
            />
            <BaseInput
              label="Sobrenome"
              type="text"
              v-model="viewState.lastName.value"
              :error-messages="viewState.lastName.error"
            />
            <BaseInput
              label="E-mail"
              type="email"
              v-model="viewState.email.value"
              :error-messages="viewState.email.error"
            />
            <BaseInput
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              v-model="viewState.password.value"
              :error-messages="viewState.password.error"
            />
            <BaseInput
              label="Confirme sua senha"
              type="password"
              v-model="viewState.confirmPassword.value"
              :error-messages="viewState.confirmPassword.error"
            />
          </div>
          <div v-if="loginErrorMessage" class="text-caption my-4">
            <v-alert icon="mdi-alert-circle-outline" class="" density="compact">
              <span class="text-caption"> Já existe uma conta cadastrada com este email. </span>
            </v-alert>
          </div>
          <div class="flex flex-col pb-[40px]">
            <Button
              class="mx-auto"
              color="primary"
              type="submit"
              @click="(e) => submit(e)"
              :loading="loading"
              children="Criar conta"
            />
          </div>
        </form>
        <p class="mb-[20px] text-center font-notosans text-sm font-bold text-black">Ou</p>
        <LoginWithGoogle class="mb-[20px]" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
