<script setup lang="ts">
import {
  uploadImage,
  type UploadData,
  type DownloadRef,
  donwloadImage
} from '@/firebase/cloud.storage';
import { StorageFolder } from '@/utils/enuns/firebase';
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import { useMenuStore } from '@/store/menuStore';
import EditModal from '@/components/EditModal.vue';
import SocialIcon from '@/components/icons/SocialIcon.vue';
import ClockIcon from '@/components/icons/ClockIcon.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import SpotIcon from '@/components/icons/SpotIcon.vue';
import SettingsIcon from './icons/SettingsIcon.vue';

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

const changeImage = async (event: any, folder: string) => {
  const { id: userId } = userStore.user;
  const { id: menuId } = menuStore.menu;
  const file = event.target.files[0];

  if (file) {
    if (folder === StorageFolder.Banner) {
      await uploadImage({
        file,
        userId,
        menuId,
        folder: StorageFolder.Banner,
        fileName: StorageFolder.Banner
      } as UploadData);

      menuStore.menu.headerImg = await donwloadImage({
        userId,
        menuId,
        folder: StorageFolder.Banner,
        fileName: StorageFolder.Banner
      } as DownloadRef);
    }

    if (folder === StorageFolder.Profile) {
      await uploadImage({
        file,
        userId,
        menuId,
        folder: StorageFolder.Profile,
        fileName: StorageFolder.Profile
      } as UploadData);

      menuStore.menu.profileImg = await donwloadImage({
        userId,
        menuId,
        folder: StorageFolder.Profile,
        fileName: StorageFolder.Profile
      } as DownloadRef);
    }

    const { accessToken } = userStore.user;
    menuStore.updateMenu(menuStore.menu, accessToken);
  }
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
    <div class="mx-auto my-auto max-w-[1200px]">
      <div class="max-h-[400px] overflow-hidden rounded-b-lg">
        <img v-if="menuStore.menu.headerImg" :src="menuStore.menu.headerImg" alt="Banner image" />
        <img v-else src="@/assets/img/withoutBanner.png" alt="Banner image" />
      </div>
      <div class="pt-[12px]">
        <div class="flex md:items-center lg:items-center">
          <div class="max-h-[30%] max-w-[30%] overflow-hidden rounded-[10px]">
            <img
              v-if="menuStore.menu.profileImg"
              :src="menuStore.menu.profileImg"
              alt="Banner image"
            />
            <img v-else src="@/assets/img/withoutProfile.png" alt="Banner image" />
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
    </div>
    <button
      v-if="props.editMode"
      class="absolute right-[12px] z-50 mb-[12px] mt-[12px] flex h-[40px] cursor-pointer items-center justify-center gap-3 rounded-[10px] bg-qr-primary-orange px-[16px] font-notosans text-xl font-bold text-white drop-shadow-lg"
      @click="toggleEditModal()"
    >
      <SettingsIcon />
      <span>Editar página</span>
    </button>
  </div>
  <EditModal v-if="showEditModal" @cancel="cancel()" @save="cancel()">
    <input type="file" @change="(e) => changeImage(e, StorageFolder.Banner)" ref="fileInput" />
    <input type="file" @change="(e) => changeImage(e, StorageFolder.Profile)" ref="fileInput" />
  </EditModal>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
export default {
  name: 'HeroItem'
};
</script>
