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

const userStore = useUserStore();
const menuStore = useMenuStore();

const fileInput = ref();
const selectedFile = ref();

const handleFileChange = async (event: any) => {
  const { id: userId } = userStore.user;
  const { id: menuId } = menuStore.menu;
  const file = event.target.files[0];

  if (file) {
    selectedFile.value = file;

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

const openFileInput = () => {
  fileInput.value.click();
};
</script>
<template>
  <div class="flex h-[400px] w-[100%]">
    <div class="mx-auto my-auto h-[100%] max-w-[1200px]">
      <input class="input-img" type="file" @change="handleFileChange" ref="fileInput" />
      <img :src="menuStore.menu.headerImg" @click="openFileInput" alt="product image" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
export default {
  name: 'HeroItem'
};
</script>
