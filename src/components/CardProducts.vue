<script setup lang="ts">
import { onMounted, ref, toRefs, type PropType } from 'vue';
import type { Product } from '@/utils/types/Product';
import EditIcon from '@/components/icons/EditIcon.vue';
import DeleteIcon from './icons/DeleteIcon.vue';
import { useUserStore } from '@/store/userStore';
import { donwloadImage } from '../firebase/cloud.storage';
import { useAuthStore } from '../store/useAuthStore';

const userStore = useUserStore();
const AuthStore = useAuthStore();

const imageUrl = ref();

const emit = defineEmits(['editCardData', 'toggleAlertDialog']);

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    default: {} as Product
  }
});

const { product } = toRefs(props);

const editCardData = () => {
  emit('editCardData', props.product);
};

const toggleAlertDialog = () => {
  emit('toggleAlertDialog', props.product);
};

onMounted(async () => {
  imageUrl.value = await donwloadImage(`${AuthStore.user.uid}/products/${props.product.id}.jpg`);
  console.log(imageUrl.value)
})
</script>

<template>
  <div class="card">
    <div class="card-information">
      <div class="img-food">
        <img :src="imageUrl" alt="product image"  />
      </div>
      <div class="card-data">
        <div>
          <h4>{{ product.title }}</h4>
          <p>{{ product.description }}</p>
        </div>
        <span>{{ product.price }}</span>
      </div>
    </div>
    <div class="icon">
      <EditIcon v-if="userStore.isAdmin" @click="editCardData" :color="'black'" />
      <DeleteIcon
        v-if="userStore.isAdmin"
        @click="toggleAlertDialog()"
        :color="'black'"
        :width="30"
        :height="30"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 400px;
  height: 200px;
  display: flex;
  border-bottom: 1px solid $qrmenu-gray;

  .card-information {
    display: flex;
    width: 100%;
  }

  .img-food {
    display: flex;
    align-items: center;

    img {
      border: 2px solid $qrmenu-gray;
      border-radius: 100%;
      width: 80px;
      margin: 0 16px 0 16px;
    }
  }

  .card-data {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    word-break: break-word;
    width: 100%;

    h4 {
      margin: 16px 0 8px 0;
    }

    p {
      text-align: justify;
    }

    span {
      font-weight: bold;
      margin: 8px 0 16px 0;
    }
  }

  .icon {
    margin: 16px 16px 0 0;
  }
}
@media (max-width: 400px) {
  .card {
    width: 100vw;
    height: 90%;
  }
}
</style>
@/utils/interfaces/Product
