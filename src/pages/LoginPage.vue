<script setup lang="ts">
import Header from '@/components/Header.vue'
import BaseInput from '@/components/BaseInput.vue'
import Button from '@/components/Button.vue'
import { reactive, ref, watch } from 'vue'
import { validateEmptyText } from '@/validators/emptyText'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '@/firebase/config'
import router from '@/router'
import { useUserStore } from '@/store/userStore'

//TODO: Write validation for email and for password
const userStore = useUserStore()

const buttonIsDisabled = ref(true)

const viewState = reactive({
  email: {
    value: '',
    error: '',
    validator: () => {
      viewState.email.error = validateEmptyText(viewState.email.value)
    }
  },
  password: {
    value: '',
    error: '',
    validator: () => {
      viewState.password.error = validateEmptyText(viewState.password.value)
    }
  }
})

const submit = async (e: any) => {
  e.preventDefault()
  try {
    await signInWithEmailAndPassword(firebaseAuth, viewState.email.value, viewState.password.value)
    userStore.isAdmin = true
    router.push('/')
  } catch (error) {
    console.log(error)
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
}

watch(viewState, () => {
  const isEmailEmpty = !!validateEmptyText(viewState.email.value)
  const isPasswordEmpty = !!validateEmptyText(viewState.password.value)
  buttonIsDisabled.value = isEmailEmpty || isPasswordEmpty
})
</script>
<template>
  <div class="login-page">
    <Header />
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
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  font-family: 'Noto Sans';
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: 100vh;
  background-color: $qrmenu-gray;

  form {
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    background-color: $qrmenu-white;
    border-radius: 7px;
    padding: 40px;
    box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.4);
    gap: 5px;

    h1 {
      padding: 0;
      margin: 0;
      font-weight: 500;
      font-size: 2.3em;
    }

    input {
      padding: 15px;
      font-size: 14px;
      border: 1px solid #ccc;
      margin-bottom: 20px;
      margin-top: 5px;
      border-radius: 4px;
      transition: all linear 160ms;
      outline: none;
      &focus {
        border: 1px solid $qrmenu-red;
      }
    }
  }
}
</style>
