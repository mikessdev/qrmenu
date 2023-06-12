<script setup lang="ts">
import Button from "@/components/Button.vue";
import { reactive } from "vue";
import { useCategoryStore } from "@/store/categoryStore"; 
import { Product } from "@/utils/types/Product";
import BaseInput from "@/components/BaseInput.vue";

const props = defineProps({
    product: {
        type: Object, 
        default: {}
    }
})

const viewState = reactive({
    id: props.product.id,
    title: props.product.title, 
    description: props.product.description,
    value: props.product.value
})

const emit = defineEmits(["closeEditModal", "saveData"]);

const cancel = () => {
    emit("closeEditModal");
}

const save = () => { 
    emit('saveData', viewState); 
}
</script>
<template>
    <div class="Dialog">
        <div class="img-food">
            <img src="@/assets/img/imgComida.jpg" alt="img-produto">
        </div>
        <div class="card-data">
            <BaseInput type="text" v-model="viewState.title"/>
            <BaseInput type="text" v-model="viewState.description"/>
            <BaseInput type="text" v-model="viewState.value"/>
        </div>
        <div>
            <Button @click="cancel" :label="'Cancelar'" :type="'button'"/>
            <Button @click="save" :label="'Salvar'" :type="'button'"/>
        </div>
    </div>

</template>
<style scoped lang="scss">
    .Dialog {
        background-color: gray;
        position: absolute;
        width: 300px;
        height: 300px;
        z-index: 99999;
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
</style>