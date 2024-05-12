<script setup lang="ts">
import { useAuthComposable } from '@/composables/useAuthComposable';
import type { Menu } from '@/utils/interfaces/Menu';
import { validateEmptyText } from '@/validators/emptyText';
import { useMenuStore } from '@/store/menuStore';
import { useUserStore } from '@/store/userStore';
import { computed, reactive, ref } from 'vue';
import BaseInput from '@/components/BaseInput.vue';
import Header from '@/components/Header.vue';
import Button from '@/components/Button.vue';
import { useRouter } from 'vue-router';
import { validateSlug } from '@/validators/slug';
import { useQuasar } from 'quasar';
import { Status } from '@/utils/enuns/status';

const menuStore = useMenuStore();
const userStore = useUserStore();
const quasar = useQuasar();
const router = useRouter();
const { isAuthenticated } = useAuthComposable();

const step = ref(1);

const next = async () => {
  if (!nextButtonIsDisabled()) {
    if (step.value < 3) step.value++;
  }

  if (!nextButtonIsDisabled() && step.value == 3) {
    await createMenu();
    return router.push(`/select-menu`);
  }
};

const previous = () => {
  if (step.value > 1) step.value--;
};

const headerItens = computed(() => {
  return [
    {
      id: 1,
      text: 'Voltar',
      action: () => router.back(),
      show: isAuthenticated.value
    }
  ];
});

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
  quasar.notify({
    spinner: false,
    color: 'primary',
    message: 'Menu criado com sucesso!',
    timeout: 2000
  });
};

const errorCreatingMenuNotify = () => {
  quasar.notify({
    spinner: false,
    color: 'primary',
    message: 'Não foi possível criar o cardápio! Por favor, tente novamente mais tarde.',
    timeout: 2000
  });
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
  <div>
    <Header :header-itens="headerItens" />
    <div class="mx-auto my-0">
      <div>
        <q-stepper v-model="step" ref="stepper" alternative-labels :flat="true" animated>
          <q-step
            :name="1"
            done-color="primary"
            title="Informações"
            icon="description"
            :done="step > 1"
          >
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
          </q-step>

          <q-step :name="2" title="Cor" icon="color_lens" :done="step > 2">
            <p class="text-center font-notosans text-base font-bold text-[#4E4E4E]">
              Escolha uma cor de destaque para o seu cardápio.
            </p>
            <div class="flex w-full justify-center">
              <q-color
                v-model="menuState.color.value"
                default-value="#f85d3a"
                style="max-width: 250px"
                :no-footer="true"
                :no-header="false"
              />
            </div>
          </q-step>

          <q-step :name="3" title="URL" icon="link">
            <div class="mx-auto my-0 max-w-[400px]">
              <p class="text-center font-notosans text-base font-bold text-[#4E4E4E]">
                Escolha um nome para a URL do Cardápio.
              </p>
              <p class="mt-[20px] font-notosans text-xs text-[#4E4E4E]">
                <strong>Obs:</strong> O nome escolhido precisa ser em letras minúscula, não deve
                conter caracteres especiais
                <strong
                  >(ex: ç, letras acentuadas e todos os outros caracteres com exceção do
                  hífen)</strong
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
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <div class="mx-auto my-0 flex w-full justify-center gap-10">
                <Button
                  v-if="step > 1"
                  flat
                  color="secondary"
                  variante="primary"
                  @click="previous()"
                  label="Voltar"
                />
                <Button
                  @click="next()"
                  variante="secundary"
                  :is-disabled="nextButtonIsDisabled()"
                  :label="step === 3 ? 'Criar cardápio' : 'Continuar'"
                />
              </div>
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </div>
  </div>
</template>
