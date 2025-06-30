<script lang="ts" setup>
import BaseInput from '@/components/BaseInput.vue';
import type { PropType } from 'vue';
import type { Model } from '../index.vue';

const props = defineProps({
  url: {
    type: Object as PropType<Model>,
    required: true,
    default: () => ({
      value: '',
      error: '',
      validator: () => {}
    })
  }
});
</script>

<template>
  <div class="mx-auto my-0">
    <div class="mx-auto my-0 max-w-[400px]">
      <p class="mt-[20px] font-notosans text-xs text-[#4E4E4E]">
        <strong>Obs:</strong> O nome escolhido precisa ser em letras minúscula, não deve conter
        caracteres especiais
        <strong
          >(ex: ç, letras acentuadas e todos os outros caracteres com exceção do hífen)</strong
        >
        e as palavras devem ser separadas por hífen.
      </p>
      <p class="mt-[20px] font-notosans text-xs text-[#4E4E4E]">
        <strong>Ex:</strong> <br />
        <strong class="text-[#00c65e]">Permitido:</strong> acaiteria-da-maite. <br />
        <strong class="text-[#e81f43]">Não permitido:</strong> açaiteria-da-Maitê.
      </p>
      <div class="mt-[20px]">
        <BaseInput
          maxlength="30"
          placeholder="acaiteria-da-borcelle"
          label="URL"
          v-model="props.url.value"
          :error-message="props.url.error"
          @validate="props.url.validator()"
        />
      </div>
    </div>
  </div>
</template>
