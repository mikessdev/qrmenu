<script setup lang="ts">
import Header from '@/components/Header.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import EditModal from '@/components/EditModal.vue';
import BaseInput from '@/components/BaseInput.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import { validateEmptyText } from '@/validators/emptyText';
import { validateSlug } from '@/validators/slug';
import { useMenuStore } from '@/store/menuStore';
import { useUserStore } from '@/store/userStore';
import type { Menu } from '@/utils/interfaces/Menu';

const menuStore = useMenuStore();
const userStore = useUserStore();

const showEditModal = ref<boolean>(false);
const menus = ref<Menu[]>([]);

const viewState = reactive({
  menuName: {
    value: '',
    error: '',
    validator: () => {
      viewState.menuName.error = validateEmptyText(viewState.menuName.value);
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
  if (!viewState.menuName.value) {
    viewState.menuName.validator();
  }
  if (!viewState.menuName.error) {
    const { id: userId, accessToken } = userStore.user;
    const { value: url } = viewState.menuName;
    await menuStore.createMenu({ userId, url } as Menu, accessToken);
    await menuStore.getMenus(userId, accessToken);
    toggleEditModal();
  }
};

watch(viewState, () => {
  if (validateSlug(viewState.menuName.value)) {
    viewState.menuName.error = validateSlug(viewState.menuName.value);
  }
});

onMounted(async () => {
  const { id: userId, accessToken } = userStore.user;
  await menuStore.getMenus(userId, accessToken);
  menus.value = menuStore.menus;
  console.log(menus.value);
});
</script>

<template>
  <Header :center="true" />
  <main class="flex flex-col items-center pt-[60px]">
    <ul class="flex flex-wrap justify-evenly gap-8">
      <li
        class="flex cursor-pointer flex-col items-center"
        v-for="menu in menuStore.menus"
        :key="menu.id"
      >
        <div
          class="flex h-[100px] w-[100px] items-center justify-center rounded-full border-[4px] border-[#DCDCDC] bg-qr-primary-orange"
        ></div>
        <span class="font-notosans text-[#4E4E4E]">{{ menu.url }}</span>
      </li>
      <li class="flex cursor-pointer flex-col items-center" @click="createMenu()">
        <div
          class="flex h-[100px] w-[100px] items-center justify-center rounded-full border-[4px] border-[#DCDCDC] bg-qr-medium-gray"
        >
          <PlusIcon variante="02" :width="26" :height="26" color="#DCDCDC" />
        </div>
        <span class="font-notosans text-[#4E4E4E]"> Criar Novo cardápio</span>
      </li>
    </ul>
  </main>
  <EditModal v-if="showEditModal" @cancel="cancel()" @save="save()">
    <p class="font-notosans text-[#4E4E4E]">Escolha um nome para a URL do Cardápio.</p>
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
      v-model="viewState.menuName.value"
      :error-message="viewState.menuName.error"
      @validate="viewState.menuName.validator()"
    />
  </EditModal>
</template>

<style lang="scss" scoped></style>
