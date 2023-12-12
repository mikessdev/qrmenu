<script setup lang="ts">
import Header from '@/components/Header.vue';
import BaseInput from '@/components/BaseInput.vue';
import Button from '@/components/Button.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import LoginWithGoogle from '@/components/LoginWithGoogle.vue';
import { reactive, ref } from 'vue';
import { validateEmptyText } from '@/validators/emptyText';
import { createUserWithEmailAndPassword, type UserCredential } from 'firebase/auth';
import { firebaseAuth } from '@/firebase/config';
import { useRouter } from 'vue-router';
import { type HeaderLinks } from '../components/Header.vue';
import { validateEmail } from '@/validators/email';
import { validateConfirmPassword, validatePassword } from '@/validators/password';
import { useUserStore } from '@/store/userStore';
import type { User } from '@/utils/interfaces/User';

const router = useRouter();
const userStore = useUserStore();
const loginErrorMessage = ref<string>('');
const passwordInputType = ref<string>('password');
const confirmPasswordInputType = ref<string>('password');
const sendButtonIsClicked = ref<Boolean>(false);

const viewState = reactive({
  name: {
    value: '',
    error: '',
    validator: () => {
      viewState.name.error = validateEmptyText(viewState.name.value)
        ? 'Você precisa preencher o campo do seu nome!'
        : '';
    }
  },
  lastName: {
    value: '',
    error: '',
    validator: () => {
      viewState.lastName.error = validateEmptyText(viewState.lastName.value)
        ? 'Você precisa preencher o campo do seu sobre nome!'
        : '';
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

  sendButtonIsClicked.value = true;
  const thereIsNoError = validFilds();

  if (thereIsNoError) {
    try {
      const UserCredentialImpl = await createUserWithEmailAndPassword(
        firebaseAuth,
        viewState.email.value,
        viewState.password.value
      );
      userStore.userCredential = UserCredentialImpl.user;
      const { uid } = UserCredentialImpl.user;

      await userStore.createUser({
        id: uid,
        name: viewState.name.value,
        lastName: viewState.lastName.value,
        email: viewState.email.value,
        emailVerified: false
      } as User);

      loginErrorMessage.value = '';
      router.push('/register-complete');
    } catch (error) {
      const emailError: string = 'auth/email-already-in-use';
      const emailAlreadyInUse: boolean = error.code === emailError;
      if (emailAlreadyInUse) {
        loginErrorMessage.value = 'Já existe uma conta cadastrada com esse email.';
      }
    }
  }
};

const headerLinks: HeaderLinks[] = [{ id: 1, name: 'Voltar', link: '/' }];

const togglePasswordVisibility = () => {
  const visible: boolean = passwordInputType.value === 'text';
  passwordInputType.value = visible ? 'password' : 'text';
};

const toggleconfirmPasswordVisibility = () => {
  const visible: boolean = confirmPasswordInputType.value === 'text';
  confirmPasswordInputType.value = visible ? 'password' : 'text';
};
</script>
<template>
  <Header :fixed="true" :links="headerLinks" />
  <div class="min-h-screen bg-qr-primary-orange px-[20px] pb-[20px] pt-[80px]">
    <div class="mx-auto max-w-[800px] rounded-[10px] bg-white px-[40px] py-[80px]">
      <form class="flex flex-col" method="POST">
        <h1 class="mb-[20px] text-center text-5xl font-bold text-qr-primary-orange">
          Crie sua conta
        </h1>
        <BaseInput
          label="Nome"
          inputType="text"
          placeholder="Digite seu nome"
          v-model="viewState.name.value"
          @validate="viewState.name.validator"
          :error-message="viewState.name.error"
        />
        <BaseInput
          label="Sobre nome"
          inputType="text"
          placeholder="Digite seu sobre nome"
          v-model="viewState.lastName.value"
          @validate="viewState.lastName.validator"
          :error-message="viewState.lastName.error"
        />
        <BaseInput
          label="E-mail"
          inputType="email"
          placeholder="Digite seu e-mail"
          v-model="viewState.email.value"
          @validate="viewState.email.validator"
          :error-message="viewState.email.error"
        />
        <PasswordInput
          label="Senha"
          :inputType="passwordInputType"
          placeholder="Digite sua senha"
          v-model="viewState.password.value"
          @validate="viewState.password.validator"
          :error-message="viewState.password.error"
          @password-visible="togglePasswordVisibility()"
        />
        <PasswordInput
          label="Confirme sua Senha"
          :inputType="confirmPasswordInputType"
          placeholder="Digite sua senha novamente"
          v-model="viewState.confirmPassword.value"
          @validate="viewState.confirmPassword.validator"
          :error-message="viewState.confirmPassword.error"
          @password-visible="toggleconfirmPasswordVisibility()"
        />
        <div class="flex flex-col pb-[40px]">
          <Button
            class="mx-auto mt-[40px]"
            type="submit"
            label="Criar conta"
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
      <p class="mb-[20px] text-center font-notosans text-sm font-bold text-black">
        Ou crie uma conta com
      </p>
      <LoginWithGoogle class="mb-[20px]" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
