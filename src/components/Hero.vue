<script setup lang="ts">
import {
  uploadImage,
  type UploadData,
  type DownloadRef,
  donwloadImage
} from '@/firebase/cloud.storage';
import { StorageFolder } from '@/utils/enuns/firebase';
import SettingsIcon from './icons/SettingsIcon.vue';
import { reactive, ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import { useMenuStore } from '@/store/menuStore';
import EditModal from '@/components/EditModal.vue';
import SocialIcon from '@/components/icons/SocialIcon.vue';
import ClockIcon from '@/components/icons/ClockIcon.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import SpotIcon from '@/components/icons/SpotIcon.vue';
import FileInput from '@/components/FileInput.vue';
import { checkImageSize } from '@/validators/imageLimit';
import { validateEmptyText } from '@/validators/emptyText';
import type { Menu } from '@/utils/interfaces/Menu';
import BaseInput from '@/components/BaseInput.vue';

const MAX_IMAGE_SIZE_BYTES = 500000; //0.5Mb;

const userStore = useUserStore();
const menuStore = useMenuStore();

const showEditModal = ref<boolean>(false);

const props = defineProps({
  editMode: {
    type: Boolean,
    default: false
  }
});

const heroState = reactive({
  banner: {
    value: {} as File,
    error: '',
    validator: () => {
      heroState.banner.error = checkImageSize(heroState.banner.value.size, MAX_IMAGE_SIZE_BYTES);
    }
  },
  profile: {
    value: {} as File,
    error: '',
    validator: () => {
      heroState.banner.error = checkImageSize(heroState.banner.value.size, MAX_IMAGE_SIZE_BYTES);
    }
  },
  name: {
    value: '',
    error: '',
    validator: () => {
      heroState.name.error = validateEmptyText(heroState.name.value);
    }
  },
  color: {
    value: '',
    error: '',
    validator: () => {
      heroState.color.error = validateEmptyText(heroState.color.value);
    }
  },
  phoneNumber: {
    value: '',
    error: '',
    validator: () => {
      heroState.phoneNumber.error = validateEmptyText(heroState.phoneNumber.value);
    }
  },
  instagram: {
    value: '',
    error: '',
    validator: () => {
      heroState.instagram.error = validateEmptyText(heroState.instagram.value);
    }
  }
});

const setImage = async (file: File, folder: string) => {
  const { id: userId } = userStore.user;
  const { id: menuId } = menuStore.menu;

  if (folder === StorageFolder.Banner) {
    await uploadImage({
      file,
      userId,
      menuId,
      folder: StorageFolder.Banner,
      fileName: StorageFolder.Banner
    } as UploadData);

    return await donwloadImage({
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

    return await donwloadImage({
      userId,
      menuId,
      folder: StorageFolder.Profile,
      fileName: StorageFolder.Profile
    } as DownloadRef);
  }
};

const updateHero = async () => {
  const { accessToken } = userStore.user;
  const { id, userId, headerImg, profileImg, url, address, openDays } = menuStore.menu;

  const { banner, profile, name, color, instagram, phoneNumber } = heroState;

  let headerImage: string = headerImg;
  let profileImage: string = profileImg;

  const headerImgWasUpdated = banner.value.name;
  const profileImgWasUpdated = profile.value.name;

  if (headerImgWasUpdated) {
    headerImage = (await setImage(banner.value, StorageFolder.Banner)) || '';
  }

  if (profileImgWasUpdated) {
    profileImage = (await setImage(profile.value, StorageFolder.Profile)) || '';
  }
  const menu: Menu = {
    id,
    userId,
    headerImg: headerImage,
    profileImg: profileImage,
    name: name.value,
    color: color.value,
    address,
    instagram: instagram.value,
    openDays,
    phoneNumber: phoneNumber.value,
    url
  } as Menu;

  await menuStore.updateMenu(menu, accessToken);
  await menuStore.getMenuByURL(menu.url);
  showEditModal.value = false;
};

const toggleEditModal = () => {
  showEditModal.value = !showEditModal.value;
};

const cancel = () => {
  showEditModal.value = false;
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
          <div class="overflow-hidden rounded-[10px]">
            <img
              v-if="menuStore.menu.profileImg"
              :src="menuStore.menu.profileImg"
              alt="Banner image"
              width="200"
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
                <span>{{ menuStore.menu.phoneNumber }}</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="props.editMode"
      class="absolute right-[12px] z-50 mb-[12px] mt-[12px] flex h-[40px] cursor-pointer items-center justify-center gap-3 rounded-[10px] bg-qr-primary-orange px-[16px] font-notosans text-xl font-bold text-white drop-shadow-lg"
      @click="
        () => {
          heroState.name.value = menuStore.menu.name;
          heroState.color.value = menuStore.menu.color;
          heroState.phoneNumber.value = menuStore.menu.phoneNumber;
          heroState.instagram.value = menuStore.menu.instagram;
          toggleEditModal();
        }
      "
    >
      <SettingsIcon />
      <span>Editar página</span>
    </button>
  </div>
  <EditModal v-if="showEditModal" @cancel="cancel()" @save="updateHero()">
    <span>Tamanho de imagem recomendado 1200x675 </span>
    <FileInput
      label="Imagem do Banner"
      @validate="heroState.banner.validator"
      v-model="heroState.banner.value"
      :error-message="heroState.banner.error"
      :preview-by-u-r-l="menuStore.menu.headerImg"
    />
    <span>Tamanho de imagem recomendado 200x200 </span>
    <FileInput
      label="Imagem do Perfil"
      @validate="heroState.profile.validator"
      v-model="heroState.profile.value"
      :error-message="heroState.profile.error"
      :preview-by-u-r-l="menuStore.menu.profileImg"
    />
    <BaseInput
      maxlength="30"
      v-model="heroState.name.value"
      label="Nome de Exibição"
      :error-message="heroState.name.error"
      @validate="heroState.name.validator()"
    />

    <BaseInput
      maxlength="30"
      v-model="heroState.color.value"
      label="Cor de destaque no formato HEX"
      placeholder="#531459"
      :error-message="heroState.color.error"
      @validate="heroState.color.validator()"
    />

    <BaseInput
      maxlength="30"
      v-model="heroState.phoneNumber.value"
      label="Número de telefone"
      :error-message="heroState.phoneNumber.error"
      @validate="heroState.phoneNumber.validator()"
    />

    <BaseInput
      maxlength="30"
      v-model="heroState.instagram.value"
      label="@ do instagram"
      placeholder="@restaurant"
      :error-message="heroState.instagram.error"
      @validate="heroState.instagram.validator()"
    />
  </EditModal>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
export default {
  name: 'HeroItem'
};
</script>
