<script setup lang="ts">
import { ref } from 'vue';
import EditIcon from "@/components/icons/EditIcon.vue";
import EditModal from "@/components/EditModal.vue";
import { useUserStore } from "@/store/userStore";

const userStore = useUserStore();

const props = defineProps({
    product: {
        type: Object, 
        default: {}
    }
})

const showEditModal = ref(false);

const toggleEditModal = () => { 
    showEditModal.value = !showEditModal.value;
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
        <EditModal v-if="showEditModal" @show-edit-modal="toggleEditModal" :product="props.product"/>
    </div>
</template>

<style lang="scss" scoped>
    .card {
        display: flex;
        max-width: 300px;
        justify-content: center;
        gap: 20px;
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid $qrmenu-gray;
        .img-food img {
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 2px solid $qrmenu-gray;
            max-width: 80px;
            border-radius: 100%;
        }
        .card-data {
            display: flex;
            justify-content: center;
            flex-direction: column;
        }
    }
    @media (max-width: 450px) {
        .card {
            width: 100vw;
        }
    }
</style>