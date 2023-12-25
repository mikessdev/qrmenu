<script setup lang="ts">
import type { Product } from '@/utils/interfaces/Product';
import { type PropType } from 'vue';
import HeartIcon from '@/components/icons/HeartIcon.vue';

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    default: {} as Product
  }
});
</script>

<template>
  <div class="flex h-[200px] w-[400px] overflow-hidden rounded-lg shadow-lg">
    <img class="h-full w-[180px] object-cover" :src="props.product.productImg" alt="" />
    <div class="p-[16px] font-notosans">
      <div class="flex justify-between">
        <span class="text-base font-bold">{{ props.product.title }}</span>
        <div class="relative right-[-108px] flex flex-col text-center">
          <HeartIcon class="mx-auto" />
          <span class="text-sm">{{ props.product.likes }}</span>
        </div>
      </div>
      <p class="text-sm leading-tight text-[#514E4E]">{{ props.product.description }}</p>
      <div class="">
        <span>{{ props.product.unit }}</span>
        <span>{{ props.product.price }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
