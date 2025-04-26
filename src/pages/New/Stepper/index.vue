<script lang="ts" setup>
import Stepper from '@/components/organisms/Stepper/index.vue';
import type { Menu } from '@/utils/interfaces/Menu';
import { validateEmptyText } from '@/validators/emptyText';
import { validateSlug } from '@/validators/slug';
import { Status } from '@/utils/enuns/status';
import { useMenuStore } from '@/store/menuStore';
import { useUserStore } from '@/store/userStore';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import InformationStep from './InformationStep/index.vue';
import ColorStep from './ColorStep/index.vue';
import URLStep from './URLStep/index.vue';

const menuStore = useMenuStore();
const userStore = useUserStore();
const router = useRouter();

const emit = defineEmits(['createSuccess', 'createFailed']);

export interface Model {
  value: string;
  error: string;
  validator: () => void;
}

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
    errorCreatingMenuNotify();
  }

  createMenuNotify();
  await menuStore.getMenus(userId, accessToken);
};

const createMenuNotify = () => {
  emit('createSuccess');
};

const errorCreatingMenuNotify = () => {
  emit('createFailed');
};

const generateId = () => {
  let numbers = '';
  for (let i = 0; i < 4; i++) {
    numbers = numbers + Math.floor(Math.random() * 9);
  }
  return numbers;
};

const sections = [
  {
    title: 'Informações',
    subTitle: 'Vamos precisar de algumas informações para montarmos o seu cardápio',
    Component: InformationStep,
    ok: true,
    model: {
      name: menuState.name,
      phoneNumber: menuState.phoneNumber,
      instagram: menuState.instagram
    }
  },
  {
    title: 'Cores',
    subTitle: 'Escolha uma cor de destaque para o seu cardápio',
    Component: ColorStep,
    ok: true,
    model: {
      color: menuState.color.value
    }
  },
  {
    title: 'URL',
    subTitle: 'Escolha um nome para a URL do Cardápio',
    Component: URLStep,
    ok: true,
    model: {
      url: menuState.url
    }
  }
];
</script>
<template>
  <Stepper :sections="sections" @finish="createMenu()"> </Stepper>
</template>
<style scoped lang="scss"></style>
