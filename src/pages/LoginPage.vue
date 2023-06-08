<script setup lang="ts">
import ArrowBackIcon from '@/components/icons/ArrowBackIcon.vue';
import Header from '@/components/Header.vue';
import BaseInput from '@/components/BaseInput.vue';
import Button from '@/components/Button.vue';

</script>
<template>
  <div class="login-page">
    <Header :isLoginPage="true"/>
        <form method="POST">
            <h1>Login</h1>
            <BaseInput :label="'E-mail'" :inputType="'email'" :placeholder="'Digite seu e-mail'" />
            <BaseInput :label="'Senha'" :inputType="'password'" :placeholder="'Digite sua senha'" />
            <Button :type="'submit'" :label="'Acessar'" />
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
