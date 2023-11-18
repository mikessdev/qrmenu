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
import SocialIcon from '@/components/icons/SocialIcon.vue';
import ClockIcon from '@/components/icons/ClockIcon.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import SpotIcon from '@/components/icons/SpotIcon.vue';

const userStore = useUserStore();
const menuStore = useMenuStore();

const fileInput = ref();
const showEditModal = ref<boolean>(false);

const props = defineProps({
  editMode: {
    type: Boolean,
    default: false
  }
});

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

const toggleEditModal = () => {
  showEditModal.value = !showEditModal.value;
};

const cancel = () => {
  showEditModal.value = false;
};

const formatWhastappNumber = (phoneNumber: string): string => {
  if (phoneNumber.length === 11) {
    return (
      '(' +
      menuStore.menu.phoneNumber.slice(0, 2) +
      ') ' +
      menuStore.menu.phoneNumber.slice(2, -4) +
      ' ' +
      menuStore.menu.phoneNumber.slice(7)
    );
  }

  return phoneNumber;
};
</script>
<template>
  <div class="flex w-[100%]">
    <div class="mx-auto my-auto max-h-[400px] max-w-[1200px] rounded-b-lg">
      <div class="overflow-hidden">
        <img :src="menuStore.menu.headerImg" @click="openFileInput" alt="Banner image" />
      </div>
      <div class="px-[12px]">
        <div class="flex md:items-center lg:items-center">
          <div class="mt-[6px] max-h-[30%] max-w-[30%] overflow-hidden rounded-[10px]">
            <img :src="menuStore.menu.profileImg" @click="openFileInput" alt="Profile image" />
          </div>
          <h1
            class="text-center font-notosans text-[2rem] font-bold uppercase text-[#5F5F5F] md:mx-auto md:px-[20px] lg:mx-auto lg:px-[20px] xl:ml-[6px]"
          >
            {{ menuStore.menu.name }}
          </h1>
        </div>

        <div
          class="mt-[30px] lg:flex lg:flex-row-reverse lg:justify-between xl:relative xl:top-[-170px] xl:flex xl:flex-row-reverse xl:justify-between"
        >
          <div
            class="lg:flex lg:flex-col-reverse lg:items-end xl:flex xl:flex-col-reverse xl:items-end"
          >
            <button
              class="mb-[12px] flex h-[40px] w-[max-content] cursor-pointer items-center justify-center gap-3 rounded-[10px] bg-[#F8F8F8] px-[16px] font-notosans text-xl font-bold text-[#5F5F5F] drop-shadow-lg md:w-[100%]"
            >
              <ClockIcon color="black" />
              <div class="flex items-center">
                <span class="">QUA 11:00 - 14:00</span>
                <div class="mx-[12px] h-[12px] w-[12px] rounded-full bg-[#40C351]"></div>
                <ArrowIcon color="black" :width="16" :height="16" />
              </div>
            </button>
            <button
              class="flex h-[40px] w-[max-content] cursor-pointer items-center justify-center gap-3 rounded-[10px] bg-[#F8F8F8] px-[16px] font-notosans text-xl font-bold text-[#5F5F5F] drop-shadow-lg md:w-[100%] lg:mb-[12px] xl:mb-[12px]"
            >
              <SpotIcon color="black" />
              <span>Av. Brasil. 833. São Paulo</span>
            </button>
          </div>
          <div class="xl:relative xl:left-[202px]">
            <button
              class="flex h-[40px] cursor-pointer items-center justify-center gap-3 rounded-[10px] bg-[#EB4967] px-[16px] font-notosans text-xl font-bold text-white drop-shadow-lg md:mt-[12px] md:w-[100%]"
            >
              <SocialIcon title="instagram" />
              <span>{{ menuStore.menu.instagram }}</span>
            </button>
            <a :href="`https://wa.me/55${menuStore.menu.phoneNumber}`" target="_blank">
              <button
                class="mb-[12px] mt-[12px] flex h-[40px] cursor-pointer items-center justify-center gap-3 rounded-[10px] bg-[#40C351] px-[16px] font-notosans text-xl font-bold text-white drop-shadow-lg md:w-[100%]"
              >
                <SocialIcon title="whatsapp" />
                <span>{{ formatWhastappNumber(menuStore.menu.phoneNumber) }}</span>
              </button>
            </a>
          </div>
        </div>
      </div>
      <input v-if="props.editMode" type="file" @change="changeBannerImage" ref="fileInput" />
      <input v-if="props.editMode" type="file" @change="changeProfileImage" ref="fileInput" />
    </div>
  </div>
  <EditModal v-if="showEditModal" @cancel="cancel()" @save="() => {}">
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
