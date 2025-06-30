<script setup lang="ts">
import SettingsIcon from '@/components/icons/SettingsIcon.vue';
import { ref } from 'vue';
import { useMenuStore } from '@/store/menuStore';
import SocialIcon from '@/components/icons/SocialIcon.vue';
import ClockIcon from '@/components/icons/ClockIcon.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import SpotIcon from '@/components/icons/SpotIcon.vue';
import { useRouter } from 'vue-router';

const menuStore = useMenuStore();
const router = useRouter();

const props = defineProps({
  editMode: {
    type: Boolean,
    default: false
  }
});

const redirectToEditPage = () => {
  router.push('/edit');
};
</script>
<template>
  <div class="flex w-[100%]">
    <div class="mx-auto my-auto max-w-[1200px]">
      <div class="h-80 rounded-b-lg sm:h-48 md:h-64">
        <img v-if="menuStore.menu.headerImg" :src="menuStore.menu.headerImg" alt="Banner image" />
        <img v-else src="@/assets/img/withoutBanner.png" alt="Banner image" />
      </div>
      <div class="pt-[12px]">
        <div class="flex md:items-center lg:items-center">
          <div class="overflow-hidden rounded-[10px]">
            <img
              v-if="menuStore.menu.profileImg"
              :src="menuStore.menu.profileImg"
              alt="Profile image"
              width="200"
            />
            <img v-else src="@/assets/img/withoutProfile.png" alt="Profile image" />
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
      @click="redirectToEditPage"
    >
      <SettingsIcon />
      <span>Editar página</span>
    </button>
  </div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
export default {
  name: 'Hero'
};
</script>
