<script setup lang="ts">
import Header from '@/components/Header.vue';
import BaseInput from '@/components/BaseInput.vue';
import Button from '@/components/Button.vue';
import { reactive, ref, watch } from 'vue';
import { validateEmptyText } from '@/validators/emptyText';

//TODO: Write validation for email and for password

const buttonIsDisabled = ref(true);

const viewState = reactive({
  email: {
    value: "",
    error: "",
    validator: () => {
        viewState.email.error = validateEmptyText(viewState.email.value);
    }
  },
  password: {
    value: "",
    error: "",
    validator: () => {
        viewState.password.error = validateEmptyText(viewState.password.value);
    }
  },
})

const submit = (e: any) => {
  e.preventDefault();
}

watch(viewState, () => {
    const isEmailEmpty = !!validateEmptyText(viewState.email.value);
    const isPasswordEmpty = !!validateEmptyText(viewState.password.value);
    buttonIsDisabled.value = isEmailEmpty || isPasswordEmpty;
});

</script>
<template>
  <div class="login-page">
    <Header :isLoginPage="true"/>
        <form method="POST">
            <h1>Login</h1>
            <BaseInput 
              :label="'E-mail'" 
              :inputType="'email'" 
              :placeholder="'Digite seu e-mail'" 
              v-model="viewState.email.value" 
              :error-message="viewState.email.error" 
              @validate="viewState.email.validator" />
            <BaseInput 
              :label="'Senha'" 
              :inputType="'password'" 
              :placeholder="'Digite sua senha'"
              v-model="viewState.password.value" 
              :error-message="viewState.password.error" 
              @validate="viewState.password.validator" />
            <Button 
              :type="'submit'" 
              :label="'Acessar'" 
              @click="(e) => submit(e)" 
              :is-disabled="buttonIsDisabled"/>
        </form>
    </div>
    
</template>

<style lang="scss" scoped>
.login-page{
    font-family: 'Noto Sans';
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    height: 100vh;
    background-color: $qrmenu-gray;
    
    form{
      width: 100%;
      max-width: 800px;
      display: flex;
      flex-direction: column;
      background-color: $qrmenu-white;
      border-radius: 7px;
      padding: 40px;
      box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.4);
      gap: 5px;

      h1{
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
        &focus{
          border: 1px solid $qrmenu-red;
        }
    }
    }
}
</style>
