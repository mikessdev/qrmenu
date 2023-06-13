<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import Button from "@/components/Button.vue";
import BaseInput from "@/components/BaseInput.vue";
import { Product } from "@/utils/types/Product";
import { validateEmptyText } from "@/validators/emptyText";

const props = defineProps({
    product: {
        type: Object, 
        default: {}
    }
})

const buttonIsDisabled = ref(true);

const viewState = reactive({
  id: props.product.id,
  title: {
    value: props.product.title ?? "",
    error: "",
    validator: () => {
        viewState.title.error = validateEmptyText(viewState.title.value);
    }
  },
  description: {
    value: props.product.description ?? "",
    error: "",
    validator: () => {
        viewState.description.error = validateEmptyText(viewState.description.value);
    }
  },
  value: {
    value: props.product.value ?? "",
    error: "",
    validator: () => {
        viewState.value.error = validateEmptyText(viewState.value.value);
    }
  },
})

const emit = defineEmits(["closeEditModal", "saveData"]);

const cancel = () => {
    emit("closeEditModal");
}

const save = () => { 
    if(!buttonIsDisabled.value){
        let newDate = {} as Product;
        newDate.id = viewState.id; 
        newDate.title = viewState.title.value; 
        newDate.description = viewState.description.value;
        newDate.value = viewState.value.value;
        emit('saveData', newDate); 
    }
}

watch(viewState, () => {
    const isTitleEmpty = !!validateEmptyText(viewState.title.value);
    const isDescriptionEmpty = !!validateEmptyText(viewState.description.value);
    const isValueEmpty = !!validateEmptyText(viewState.value.value);
    buttonIsDisabled.value = isTitleEmpty || isDescriptionEmpty || isValueEmpty;
});

</script>
<template>
    <div class="dialog">
        <div class="img-food">
            <img 
                src="@/assets/img/imgComida.jpg" 
                alt="img-produto">
        </div>
        <div class="card-data">
            <BaseInput 
                type="text" 
                @validate="viewState.title.validator" 
                label="Título" 
                v-model="viewState.title.value" 
                :error-message="viewState.title.error"/>
            <BaseInput 
                type="text" 
                @validate="viewState.description.validator" 
                label="Descrição" 
                v-model="viewState.description.value" 
                :error-message="viewState.description.error"/>
            <BaseInput 
                type="text" 
                @validate="viewState.value.validator" 
                label="Valor" 
                v-model="viewState.value.value" 
                :error-message="viewState.value.error"/>
        </div>
        <div>
            <Button 
                @click="cancel" 
                :label="'Cancelar'" 
                :type="'button'"/>
            <Button 
                @click="save" 
                :label="'Salvar'" 
                :type="'button'"
                :is-disabled="buttonIsDisabled"/>
        </div>
    </div>

</template>
<style scoped lang="scss">
    .dialog {
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