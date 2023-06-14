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
        <div class="card-information">
            <div class="img-food">
                <img src="@/assets/img/imgComida.jpg" alt="img-produto">
            </div>
            <div class="card-data">
                <div>
                    <h4>{{ props.product.title }}</h4>
                    <p>{{ props.product.description }}</p>
                </div>
                <span>{{ props.product.value }}</span>
            </div>
        </div>
        <div class="icon">
            <EditIcon 
                v-if="userStore.isAdmin" 
                @click="toggleEditModal" 
                :color="'black'"/>
            <EditModal 
                v-if="showEditModal" 
                @close-edit-modal="toggleEditModal" 
                @save-data="(newData) => updateCard(newData)" 
                :product="props.product"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .card {
        width: 400px;
        height: 200px;
        display: flex;
        border-bottom: 1px solid $qrmenu-gray;

        .card-information{
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

            h4{
                margin: 16px 0 8px 0;
            }

            p{                
                text-align: justify;
            }

            span {
                font-weight: bold;
                margin: 8px 0 16px 0;
            }
        }

        .icon{
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