<script setup lang="ts">
import Button from "@/components/Button.vue";
import { reactive } from "vue";
import { useCategoryStore } from "@/store/categoryStore"; 

const categoryStore = useCategoryStore();

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

const emit = defineEmits(["showEditModal"]);

const sendEmit = () => {
    let oldValue = props.product; 
    let newValue = viewState;

    if(JSON.stringify(newValue) == JSON.stringify(oldValue)){
        emit("showEditModal", false);
    }else{
        saveData(newValue);
        emit("showEditModal", false);
    }

}

const saveData = (newValue: object) => {
    let productIndex = categoryStore.product.findIndex((e)=>{
        return e.id === newValue.id
    })
    
    categoryStore.product[productIndex] = newValue;
}

</script>
<template>
    <div class="Dialog">
        <div class="img-food">
            <img src="@/assets/img/imgComida.jpg" alt="img-produto">
        </div>
        <div class="card-data">
            <input type="text" v-model="viewState.title">
            <input type="text" v-model="viewState.description">
            <input type="text" v-model="viewState.value">
        </div>
        <div>
            <Button @click="sendEmit" :label="'Cancelar'" :type="'button'"/>
            <Button @click="sendEmit" :label="'Salvar'" :type="'button'"/>
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