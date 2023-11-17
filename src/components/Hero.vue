<script setup lang="ts">
import {
  uploadImage,
  Folder,
  type UploadData,
  type DownloadRef,
  donwloadImage
} from '@/firebase/cloud.storage';
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import { useMenuStore } from '@/store/menuStore';
import EditModal from '@/components/EditModal.vue';

const userStore = useUserStore();
const menuStore = useMenuStore();

const fileInput = ref();
const showEditModal = ref<boolean>(false);

const changeBannerImage = async (event: any) => {
  const { id: userId } = userStore.user;
  const { id: menuId } = menuStore.menu;
  const file = event.target.files[0];

  if (file) {
    await uploadImage({
      file,
      userId,
      menuId,
      folder: Folder.Banner,
      fileName: 'banner'
    } as UploadData);

    menuStore.menu.headerImg = await donwloadImage({
      userId,
      menuId,
      folder: Folder.Banner,
      fileName: 'banner'
    } as DownloadRef);

    const { accessToken } = userStore.user;
    menuStore.updateMenu(menuStore.menu, accessToken);
  }
};

const changeProfileImage = async (event: any) => {
  const { id: userId } = userStore.user;
  const { id: menuId } = menuStore.menu;
  const file = event.target.files[0];

  if (file) {
    await uploadImage({
      file,
      userId,
      menuId,
      folder: Folder.Profile,
      fileName: 'profile'
    } as UploadData);

    menuStore.menu.profileImg = await donwloadImage({
      userId,
      menuId,
      folder: Folder.Profile,
      fileName: 'profile'
    } as DownloadRef);

    const { accessToken } = userStore.user;
    menuStore.updateMenu(menuStore.menu, accessToken);
  }
};

const openFileInput = () => {
  fileInput.value.click();
};
</script>
<template>
  <div>
    <div class="flex h-[400px] w-[100%]">
      <div class="mx-auto my-auto max-w-[1200px] rounded-b-lg">
        <div class="h-[400px] w-[100%] overflow-hidden">
          <img :src="menuStore.menu.headerImg" @click="openFileInput" alt="Banner image" />
        </div>
        <input type="file" @change="changeBannerImage" ref="fileInput" />
        <div class="flex">
          <div class="mt-[12px] h-[196px] w-[196px] overflow-hidden rounded-[10px] bg-slate-500">
            <img :src="menuStore.menu.profileImg" @click="openFileInput" alt="Profile image" />
          </div>
          <h1 class="ml-[10px] mt-[16px] font-notosans text-xl font-bold uppercase text-[#5F5F5F]">
            {{ menuStore.menu.name }}
          </h1>
        </div>
        <input type="file" @change="changeProfileImage" ref="fileInput" />
      </div>
    </div>
  </div>
  <EditModal v-if="showEditModal" @cancel="() => {}" @save="() => {}">
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
  </EditModal>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
export default {
  name: 'HeroItem'
};
</script>
