<script lang="ts" setup>
import BaseInput from '@/components/BaseInput.vue';
</script>

<template>
  <div class="mx-auto my-0 max-w-[400px]">
    <BaseInput maxlength="30" label="Nome de Exibição" placeholder="Ex: Restaurante da Fernanda" />
    <BaseInput maxlength="30" label="Número de telefone" placeholder="Ex: 79 9 9999 9999" />
    <BaseInput maxlength="30" label="Instagram" placeholder="@restaurantedafernanda" />
  </div>
</template>
