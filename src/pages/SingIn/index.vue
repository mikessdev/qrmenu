<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import BaseInput from '@/components/BaseInput.vue';
import Button from '@/components/Button.vue';
import LoginWithGoogle from '@/components/LoginWithGoogle.vue';
import { validateEmptyText } from '@/validators/emptyText';
import { validateEmail } from '@/validators/email';
import { useUserStore } from '@/store/userStore';
import { AuthError } from '@/utils/enuns/firebase';
import { useAuthStore } from '@/store/authStore';
import ErrorText from '@/components/Typography/ErrorText.vue';
import Typography from '@/components/Typography/index.vue';

const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();

const loginErrorMessage = ref<string>('');
const loading = ref<boolean>(false);

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

const checkFieldValidation = () => {
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

  const noError = checkFieldValidation();

  if (noError) {
    loading.value = true;
    try {
      await authStore.signinWithFirebase(email, password);
      const { uid: id, emailVerified } = authStore?.userCredential?.user || {};

      if (!emailVerified) {
        loginErrorMessage.value = '';
        return router.push('/register-complete');
      }

      await userStore.getUser(id);
      userStore.user.accessToken = await authStore?.userCredential?.user?.getIdToken();
      loginErrorMessage.value = '';
      return router.push('/select-menu');
    } catch (error) {
      loginErrorMessage.value = error.code;
    } finally {
      loading.value = false;
    }
  }
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
        class="mx-auto my-[10px] flex h-[85vh] max-h-[800px] min-h-[500px] w-[96%] max-w-[600px] items-center justify-center rounded-[10px] bg-white px-[8px]"
      >
        <div class="flex h-[100%] w-[90%] flex-col justify-evenly py-[20px]">
          <h1 class="title max text-center text-qr-primary-orange">Entre com sua conta</h1>
          <div v-if="loginErrorMessage === AuthError.userNotFound" class="text-caption my-4">
            <v-alert icon="mdi-alert-circle-outline" class="" density="compact">
              <span class="text-caption">
                Não encontramos nenhuma conta com esse email. Não tem uma conta ainda?
                <a href="/register"> <Typography text="Registre-se" class="inline underline" /> </a>
              </span>
            </v-alert>
          </div>
          <ErrorText
            v-if="
              loginErrorMessage === AuthError.invalidEmail ||
              loginErrorMessage === AuthError.wrongPassword
            "
            text="Email ou senha incorreta!"
          />

          <form class="flex flex-col" method="POST">
            <div class="flex flex-col gap-2">
              <BaseInput
                label="E-mail"
                type="email"
                v-model="viewState.email.value"
                :error-messages="viewState.email.error"
              />
              <BaseInput
                label="Senha"
                type="password"
                v-model="viewState.password.value"
                :error-messages="viewState.password.error"
              />
              <div class="mt-[30px] flex flex-col">
                <Button
                  class="mx-auto"
                  color="primary"
                  type="submit"
                  @click="(e) => submit(e)"
                  :loading="loading"
                  children="Acessar"
                />
              </div>
            </div>
          </form>
          <div class="flex h-[20%] flex-col justify-evenly">
            <p class="paragraph-14px text-center text-black">Ou</p>
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
