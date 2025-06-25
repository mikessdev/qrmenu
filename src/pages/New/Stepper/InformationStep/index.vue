<script lang="ts" setup>
import BaseInput from '@/components/BaseInput.vue';
import type { PropType } from 'vue';
import type { Model } from '../index.vue';

const props = defineProps({
  name: {
    type: Object as PropType<Model>,
    required: true
  },
  phoneNumber: {
    type: Object as PropType<Model>,
    required: true
  },
  instagram: {
    type: Object as PropType<Model>,
    required: true
  }
});
</script>

<template>
  <div class="mx-auto my-0 max-w-[400px]">
    <BaseInput
      maxlength="30"
      v-model="props.name.value"
      label="Nome de Exibição"
      placeholder="Ex: Restaurante da Fernanda"
      :error-message="props.name.error"
      @validate="props.name.validator()"
    />
    <BaseInput
      maxlength="30"
      v-model="props.phoneNumber.value"
      label="Número de telefone"
      placeholder="Ex: 79 9 9999 9999"
      :error-message="props.phoneNumber.error"
      @validate="props.phoneNumber.validator()"
    />
    <BaseInput
      maxlength="30"
      v-model="props.instagram.value"
      label="Instagram"
      placeholder="@restaurantedafernanda"
      :error-message="props.instagram.error"
      @validate="props.instagram.validator()"
    />
  </div>
</template>
