<script lang="ts" setup>
import BaseInput from '@/components/BaseInput.vue';
import type { Menu } from '@/utils/interfaces/Menu';
import { validateEmptyText } from '@/validators/emptyText';
import Button from '@/components/Button.vue';
import { validateSlug } from '@/validators/slug';
import { Status } from '@/utils/enuns/status';
import { useMenuStore } from '@/store/menuStore';
import { useUserStore } from '@/store/userStore';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const menuStore = useMenuStore();
const userStore = useUserStore();
const router = useRouter();

const menuState = reactive({
  name: {
    value: '',
    error: '',
    validator: () => {
      menuState.name.error = validateEmptyText(menuState.name.value);
    }
  },
  color: {
    value: '#f85d3a'
  },
  url: {
    value: '',
    error: '',
    validator: () => {
      menuState.url.error =
        validateEmptyText(menuState.url.value) || validateSlug(menuState.url.value);
    }
  },
  phoneNumber: {
    value: '',
    error: '',
    validator: () => {
      menuState.phoneNumber.error = validateEmptyText(menuState.phoneNumber.value);
    }
  },
  instagram: {
    value: '',
    error: '',
    validator: () => {
      menuState.instagram.error = validateEmptyText(menuState.instagram.value);
    }
  }
});

const loading = ref(false);

const next = async () => {
  if (!nextButtonIsDisabled()) {
    if (step.value < 3) step.value++;
  }

  if (!nextButtonIsDisabled() && step.value == 3) {
    loading.value = true;
    try {
      await createMenu();
    } catch (error) {
      console.error('Erro ao criar menu: ', error);
    } finally {
      loading.value = false;
    }
    return router.push(`/select-menu`);
  }
};

const step = ref(1);

const previous = () => {
  if (step.value > 1) step.value--;
};

const nextButtonIsDisabled = () => {
  const firstForm = step.value == 1;
  const thirdForm = step.value == 3;

  if (firstForm) {
    const nameIsEmpty = !!validateEmptyText(menuState.name.value);
    const phoneNumberIsEmpty = !!validateEmptyText(menuState.phoneNumber.value);
    const instagramIsEmpty = !!validateEmptyText(menuState.instagram.value);

    const nameHasError = !!menuState.name.error;
    const phoneNumberHasError = !!menuState.phoneNumber.error;
    const instagramHasError = !!menuState.instagram.error;

    const hasEmpytField = nameIsEmpty || phoneNumberIsEmpty || instagramIsEmpty;
    const hasErrorField = nameHasError || phoneNumberHasError || instagramHasError;

    return hasEmpytField || hasErrorField;
  }

  if (thirdForm) {
    const urlIsEmpty = !!validateEmptyText(menuState.url.value);
    const urlHasError = !!menuState.url.error;

    return urlIsEmpty || urlHasError;
  }
};

const createMenu = async () => {
  const { id: userId, accessToken } = userStore.user;
  const { name, url, color, instagram, phoneNumber } = menuState;

  const newMenu: Menu = {
    userId,
    name: name.value,
    url: url.value + generateId(),
    color: color.value,
    instagram: instagram.value,
    phoneNumber: phoneNumber.value
  } as Menu;

  const result = await menuStore.createMenu(newMenu as Menu, accessToken);

  if (result != Status.SUCCESS) {
    return errorCreatingMenuNotify();
  }

  createMenuNotify();
  await menuStore.getMenus(userId, accessToken);
};

const createMenuNotify = () => {
  alert('Menu criado com sucesso');
  // quasar.notify({
  //   spinner: false,
  //   color: 'primary',
  //   message: 'Menu criado com sucesso!',
  //   timeout: 2000
  // });
};

const errorCreatingMenuNotify = () => {
  alert('Não foi possível criar o cardápio! Por favor, tente novamente mais tarde.');
  // quasar.notify({
  //   spinner: false,
  //   color: 'primary',
  //   message: 'Não foi possível criar o cardápio! Por favor, tente novamente mais tarde.',
  //   timeout: 2000
  // });
};

const generateId = () => {
  let numbers = '';
  for (let i = 0; i < 4; i++) {
    numbers = numbers + Math.floor(Math.random() * 9);
  }
  return numbers;
};
</script>
<template>
  <v-stepper
    v-model="step"
    class="remove-shadow"
    alt-labels
    Editable
    :items="['Informações', 'Cor', 'URL']"
  >
    <template v-slot:item.1>
      <p class="text-center font-notosans text-base font-bold text-[#4E4E4E]">
        Vamos precisar de algumas informações para montarmos o seu cardápio.
      </p>
      <div class="mx-auto my-0 max-w-[400px]">
        <BaseInput
          maxlength="30"
          v-model="menuState.name.value"
          label="Nome de Exibição"
          placeholder="Ex: Restaurante da Fernanda"
          :error-message="menuState.name.error"
          @validate="menuState.name.validator()"
        />
        <BaseInput
          maxlength="30"
          v-model="menuState.phoneNumber.value"
          label="Número de telefone"
          placeholder="Ex: 79 9 9999 9999"
          :error-message="menuState.phoneNumber.error"
          @validate="menuState.phoneNumber.validator()"
        />
        <BaseInput
          maxlength="30"
          v-model="menuState.instagram.value"
          label="Instagram"
          placeholder="@restaurantedafernanda"
          :error-message="menuState.instagram.error"
          @validate="menuState.instagram.validator()"
        />
      </div>
    </template>

    <template v-slot:item.2>
      <p class="text-center font-notosans text-base font-bold text-[#4E4E4E]">
        Escolha uma cor de destaque para o seu cardápio.
      </p>
      <v-color-picker v-model="menuState.color.value"></v-color-picker>
    </template>

    <template v-slot:item.3>
      <div class="mx-auto my-0 max-w-[400px]">
        <p class="text-center font-notosans text-base font-bold text-[#4E4E4E]">
          Escolha um nome para a URL do Cardápio.
        </p>
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
        <BaseInput
          maxlength="30"
          placeholder="acaiteria-da-borcelle"
          v-model="menuState.url.value"
          :error-message="menuState.url.error"
          @validate="menuState.url.validator()"
        />
      </div>
    </template>
    <template v-slot:next>
      <v-btn
        class="mt-10"
        color="primary"
        variant="outlined"
        @click="next()"
        :loading="loading"
        :disabled="nextButtonIsDisabled()"
        >Próximo</v-btn
      >
    </template>
    <template v-slot:prev>
      <v-btn class="mt-10" color="primary" variant="outlined" @click="previous()">Voltar</v-btn>
    </template>
  </v-stepper>
</template>
<style>
.remove-shadow {
  box-shadow: none !important;
}
</style>
