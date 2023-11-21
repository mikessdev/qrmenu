<script setup lang="ts">
import type { Product } from '@/utils/interfaces/Product';
import { type PropType } from 'vue';

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    default: {} as Product
  }
});
</script>

<template>
  <div class="">
    <div><img :src="props.product.productImg" alt="" /></div>
    <div>
      <div>
        <span>{{ props.product.title }}</span>
        <span>{{ props.product.likes }}</span>
      </div>
      <span>{{ props.product.description }}</span>
      <div>
        <span>{{ props.product.unit }}</span>
        <span>{{ props.product.price }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
