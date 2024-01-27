<script setup lang="ts">
import Header from '@/components/Header.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import EditModal from '@/components/EditModal.vue';
import BaseInput from '@/components/BaseInput.vue';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { validateEmptyText } from '@/validators/emptyText';
import { validateSlug } from '@/validators/slug';
import { useMenuStore } from '@/store/menuStore';
import { useUserStore } from '@/store/userStore';
import type { Menu } from '@/utils/interfaces/Menu';
import { useRouter } from 'vue-router';
import { useCategoryStore } from '@/store/categoryStore';
import type { Category } from '@/utils/interfaces/Category';
import { useAuthComposable } from '@/composables/useAuthComposable';
import { useAuthStore } from '@/store/authStore';

const router = useRouter();
const { isAuthenticated } = useAuthComposable();
const authStore = useAuthStore();
const menuStore = useMenuStore();
const userStore = useUserStore();
const categoryStore = useCategoryStore();

const showEditModal = ref<boolean>(false);
const menus = ref<Menu[]>([]);

const menuState = reactive({
  name: {
    value: '',
    error: '',
    validator: () => {
      menuState.name.error = validateEmptyText(menuState.name.value);
    }
  },
  primaryColor: {
    value: '',
    error: '',
    validator: () => {
      menuState.primaryColor.error = validateEmptyText(menuState.primaryColor.value);
    }
  },
  url: {
    value: '',
    error: '',
    validator: () => {
      menuState.url.error = validateEmptyText(menuState.url.value);
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

const createMenu = () => {
  showEditModal.value = true;
};

const toggleEditModal = () => {
  showEditModal.value = !showEditModal.value;
};

const cancel = () => {
  toggleEditModal();
};

const save = async () => {
  const { id: userId, accessToken } = userStore.user;
  const { name, url, primaryColor, instagram, phoneNumber } = menuState;
  const newMenu: Menu = {
    userId,
    name: name.value,
    url: url.value,
    primaryColor: primaryColor.value,
    instagram: instagram.value,
    phoneNumber: phoneNumber.value
  } as Menu;

  await menuStore.createMenu(newMenu as Menu, accessToken);
  await menuStore.getMenus(userId, accessToken);

  await menuStore.getMenuByURL(url.value);
  await categoryStore.createCategory(
    { title: 'Pratos Principais', menuId: menuStore.menu.id } as Category,
    accessToken
  );
  toggleEditModal();
};

const navigateTo = (url: string) => {
  return router.push(`/${url}`);
};

const createMenuButtonIsDisabled = () => {
  const nameIsEmpty = !!validateEmptyText(menuState.name.value);
  const urlIsEmpty = !!validateEmptyText(menuState.url.value);
  const primaryColorIsEmpty = !!validateEmptyText(menuState.primaryColor.value);
  const phoneNumberIsEmpty = !!validateEmptyText(menuState.phoneNumber.value);
  const instagramIsEmpty = !!validateEmptyText(menuState.instagram.value);

  const nameHasError = !!menuState.name.error;
  const urlHasError = !!menuState.url.error;
  const primaryColorHasError = !!menuState.primaryColor.error;
  const phoneNumberHasError = !!menuState.phoneNumber.error;
  const instagramHasError = !!menuState.instagram.error;

  const anyFieldEmpyt =
    nameIsEmpty || urlIsEmpty || primaryColorIsEmpty || phoneNumberIsEmpty || instagramIsEmpty;
  const anyFieldHasError =
    nameHasError || urlHasError || primaryColorHasError || phoneNumberHasError || instagramHasError;

  return anyFieldEmpyt || anyFieldHasError ? true : false;
};

watch(menuState, () => {
  if (validateSlug(menuState.url.value)) {
    menuState.url.error = validateSlug(menuState.url.value);
  }
});

onMounted(async () => {
  const { id: userId, accessToken } = userStore.user;
  await menuStore.getMenus(userId, accessToken);
  menus.value = menuStore.menus;
});

const headerItens = computed(() => {
  return [
    {
      id: 1,
      text: 'Sair',
      action: async () => {
        await authStore.signOutWithFirebase();
        isAuthenticated.value = false;
      },
      show: isAuthenticated.value
    },
    {
      id: 2,
      text: 'Acessar',
      action: () => router.push('/login'),
      show: !isAuthenticated.value
    }
  ];
});
</script>

<template>
  <Header :header-itens="headerItens" />
  <main class="flex flex-col items-center pt-[60px]">
    <div class="flex flex-wrap justify-evenly gap-8">
      <ul
        class="flex cursor-pointer flex-col items-center"
        v-for="menu in menuStore.menus"
        :key="menu.id"
        @click="navigateTo(menu.url)"
      >
        <li class="flex flex-col items-center">
          <div
            class="h-[100px] w-[100px] overflow-hidden rounded-full border-[4px] border-[#DCDCDC]"
          >
            <img v-if="menu.profileImg" :src="menu.profileImg" alt="Menu image" />
            <img v-else src="@/assets/img/withoutProfile.png" alt="Menu image" />
          </div>
          <span class="relative font-notosans text-[#4E4E4E]">{{ menu.name }}</span>
        </li>
      </ul>
      <div class="flex cursor-pointer flex-col items-center" @click="createMenu()">
        <div
          class="flex h-[100px] w-[100px] items-center justify-center rounded-full border-[4px] border-[#DCDCDC] bg-qr-medium-gray"
        >
          <PlusIcon variante="02" :width="26" :height="26" color="#DCDCDC" />
        </div>
        <span class="font-notosans text-[#4E4E4E]"> Criar Novo cardápio</span>
      </div>
    </div>
  </main>
  <EditModal
    v-if="showEditModal"
    @cancel="cancel()"
    @save="save()"
    :button-is-disabled="createMenuButtonIsDisabled()"
  >
    <h1 class="font-notosans text-base font-bold text-[#4E4E4E]">
      Vamos precisar de algumas informações para montarmos o seu cardápio.
    </h1>
    <BaseInput
      maxlength="30"
      v-model="menuState.name.value"
      label="Nome de Exibição"
      :error-message="menuState.name.error"
      @validate="menuState.name.validator()"
    />

    <BaseInput
      maxlength="30"
      v-model="menuState.primaryColor.value"
      label="Cor de destaque no formato HEX"
      placeholder="#531459"
      :error-message="menuState.primaryColor.error"
      @validate="menuState.primaryColor.validator()"
    />

    <BaseInput
      maxlength="30"
      v-model="menuState.phoneNumber.value"
      label="Número de telefone"
      :error-message="menuState.phoneNumber.error"
      @validate="menuState.phoneNumber.validator()"
    />

    <BaseInput
      maxlength="30"
      v-model="menuState.instagram.value"
      label="@ do instagram"
      placeholder="@restaurant"
      :error-message="menuState.instagram.error"
      @validate="menuState.instagram.validator()"
    />

    <p class="mt-[30px] font-notosans text-[#4E4E4E]">Escolha um nome para a URL do Cardápio.</p>
    <p class="mt-[20px] font-notosans text-xs text-[#4E4E4E]">
      <strong>Obs:</strong> O nome escolhido precisa ser em letras minúscula, não deve conter
      caracteres especiais
      <strong>(ex: ç, letras acentuadas e todos os outros caracteres com exceção do hífen)</strong>
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
  </EditModal>
</template>

<style lang="scss" scoped></style>
