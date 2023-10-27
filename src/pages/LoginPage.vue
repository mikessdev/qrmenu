<script setup lang="ts">
import Header from '@/components/Header.vue';
import BaseInput from '@/components/BaseInput.vue';
import Button from '@/components/Button.vue';
import { reactive, ref, watch } from 'vue';
import { validateEmptyText } from '@/validators/emptyText';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '@/firebase/config';
import router from '@/router';
import { useUserStore } from '@/store/userStore';
import { HeaderLinks } from '../components/Header.vue';

//TODO: Write validation for email and for password
const userStore = useUserStore();

const buttonIsDisabled = ref(true);

const viewState = reactive({
  email: {
    value: '',
    error: '',
    validator: () => {
      viewState.email.error = validateEmptyText(viewState.email.value);
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

const submit = async (e: any) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(firebaseAuth, viewState.email.value, viewState.password.value);
    userStore.isAdmin = true;
    router.push('/');
  } catch (error) {
    console.log(error);
    // switch (error.code) {
    //       case 'auth/invalid-email':
    //           viewState.email.value = 'Invalid email'
    //           break
    //       case 'auth/user-not-found':
    //           alert('No account with that email was found');
    //           break
    //       case 'auth/wrong-password':
    //           viewState.password.value = 'Incorrect password';
    //           break
    //       default:
    //           viewState.password.value = 'Email or password was incorrect';
    //           viewState.email.value = 'Email or password was incorrect';
    //           break
    //     }
  }
};

watch(viewState, () => {
  const isEmailEmpty = !!validateEmptyText(viewState.email.value);
  const isPasswordEmpty = !!validateEmptyText(viewState.password.value);
  buttonIsDisabled.value = isEmailEmpty || isPasswordEmpty;
});

const headerLinks: HeaderLinks[] = [{ id: 1, name: 'Voltar', link: '/' }];
</script>
<template>
  <Header :links="headerLinks" />
  <form method="POST">
    <h1>Login</h1>
    <BaseInput
      :label="'E-mail'"
      :inputType="'email'"
      :placeholder="'Digite seu e-mail'"
      v-model="viewState.email.value"
      :error-message="viewState.email.error"
      @validate="viewState.email.validator"
    />
    <BaseInput
      :label="'Senha'"
      :inputType="'password'"
      :placeholder="'Digite sua senha'"
      v-model="viewState.password.value"
      :error-message="viewState.password.error"
      @validate="viewState.password.validator"
    />
    <Button
      :type="'submit'"
      :label="'Acessar'"
      @click="(e) => submit(e)"
      :is-disabled="buttonIsDisabled"
    />
  </form>
</template>

<style lang="scss" scoped></style>
