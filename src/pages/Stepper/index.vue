<script lang="ts" setup>
import Stepper from '@/components/organisms/Stepper/index.vue';
import type { Menu } from '@/utils/interfaces/Menu';
import { validateEmptyText } from '@/validators/emptyText';
import { validateSlug } from '@/validators/slug';
import { useMenuStore } from '@/store/menuStore';
import { useUserStore } from '@/store/userStore';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import InformationStep from './InformationStep/index.vue';
import ColorStep from './ColorStep/index.vue';
import URLStep from './URLStep/index.vue';
import BannerStep from './BannerStep/index.vue';
import { checkImageSize } from '@/validators/imageLimit';

const MAX_IMAGE_SIZE_BYTES = 5000000; // 5MB

const menuStore = useMenuStore();
const userStore = useUserStore();
const createMenuBusy = ref(false);
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
    value: '',
    error: '',
    validator: () => {}
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
  },
  banner: {
    value: {} as File,
    error: '',
    validator: () => {
      menuState.banner.error = checkImageSize(menuState.banner.value.size, MAX_IMAGE_SIZE_BYTES);
    }
  }
});

const informationIsInvalid = () => {
  const nameIsEmpty = !!validateEmptyText(menuState.name.value);
  const phoneNumberIsEmpty = !!validateEmptyText(menuState.phoneNumber.value);
  const instagramIsEmpty = !!validateEmptyText(menuState.instagram.value);

  const nameHasError = !!menuState.name.error;
  const phoneNumberHasError = !!menuState.phoneNumber.error;
  const instagramHasError = !!menuState.instagram.error;

  const hasEmpytField = nameIsEmpty || phoneNumberIsEmpty || instagramIsEmpty;
  const hasErrorField = nameHasError || phoneNumberHasError || instagramHasError;

  return hasEmpytField || hasErrorField;
};

const urlIsInvalid = () => {
  const urlIsEmpty = !!validateEmptyText(menuState.url.value);
  const urlHasError = !!menuState.url.error;

  return urlIsEmpty || urlHasError;
};

const createMenu = async () => {
  createMenuBusy.value = true;
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

  try {
    const menu = await menuStore.createMenu(newMenu as Menu, accessToken);
    createMenuNotify();
    createMenuBusy.value = false;
    router.push(`/${menu.url}`);
  } catch (error) {
    errorCreatingMenuNotify();
  }

  createMenuBusy.value = false;
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
    checkValidation: informationIsInvalid,
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
    checkValidation: () => false,
    model: {
      color: menuState.color
    }
  },
  {
    title: 'URL',
    subTitle: 'Escolha um nome para a URL do Cardápio',
    Component: URLStep,
    checkValidation: urlIsInvalid,
    model: {
      url: menuState.url
    }
  },
  {
    title: 'Banner',
    subTitle: 'Escolha uma imagem para o banner do seu cardápio',
    Component: BannerStep,
    checkValidation: () => false,
    model: {
      banner: menuState.banner
    }
  }
];
</script>
<template>
  <Stepper :sections="sections" @finish="createMenu" :busy="createMenuBusy"> </Stepper>
</template>
<style scoped lang="scss"></style>
