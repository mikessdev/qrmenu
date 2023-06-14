<script setup lang="ts">
import { ref } from 'vue';
import EditIcon from "@/components/icons/EditIcon.vue";
import EditModal from "@/components/EditModal.vue";
import { useUserStore } from "@/store/userStore";
import { useCategoryStore } from '@/store/categoryStore';
import { Product } from "@/utils/types/Category";

const userStore = useUserStore();
const categoryStore = useCategoryStore();

const props = defineProps({
    product: {
        type: Object, 
        default: {}
    },
    menuId: {
        type: String,
        default: {}
    }
})
const showEditModal = ref(false);

const toggleEditModal = () => { 
    showEditModal.value = !showEditModal.value;
}

const updateCard = (newData: Product) => {
    let oldData: Product = props.product; 
    if(JSON.stringify(newData) == JSON.stringify(oldData)){
        toggleEditModal();
    }else{
        let menuIndex: number = findIndex(categoryStore.menus, props.menuId);
        let productIndex: number = findIndex(categoryStore.menus[menuIndex].products, newData.id);
        categoryStore.menus[menuIndex].products[productIndex] = newData;
        toggleEditModal();
    }

}

const findIndex = (array: Array<any>, id: string) => {
    let menuIndex = array.findIndex((e: any) => {
            return e.id == id;
        })
    return menuIndex;
}

</script>

<template>
    <div class="card">
        <div class="img-food">
            <img src="@/assets/img/imgComida.jpg" alt="img-produto">
        </div>
        <div class="card-data">
            <h4>{{ props.product.title }}</h4>
            <p>{{ props.product.description }}</p>
            <span>{{ props.product.value }}</span>
        </div>
        <EditIcon v-if="userStore.isAdmin" @click="toggleEditModal" :color="'black'"/>
        <EditModal v-if="showEditModal" @close-edit-modal="toggleEditModal" @save-data="(newData) => updateCard(newData)" :product="props.product"/>
    </div>
</template>

<style lang="scss" scoped>
    .card {
        width: 360px;
        height: 170px;
        display: flex;
        justify-content: space-between;
        gap: 20px;
        padding: 10px 0;

        border-bottom: 1px solid $qrmenu-gray;
        .img-food {
            display: flex;
            align-items: center;

            img {
                border: 2px solid $qrmenu-gray;
                border-radius: 100%;
                max-width: 80px;
            }
        }
        .card-data {
            display: flex;
            flex-direction: column;
            word-break: break-word;
            justify-content: space-between;

            span {
                font-weight: bold;
            }
        }
    }
    @media (max-width: 450px) {
        .card {
            width: 95vw;
        }
    }
</style>