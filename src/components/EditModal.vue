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
    <div class="dialog-background">
        <div class="dialog">
            <div class="img-food">
                <img 
                    src="@/assets/img/imgComida.jpg" 
                    alt="img-produto">
            </div>
            <div class="card-data">
                <BaseInput 
                    type="text" 
                    maxlength="40"
                    @validate="viewState.title.validator" 
                    label="Título" 
                    v-model="viewState.title.value" 
                    :error-message="viewState.title.error"/>
                <BaseInput 
                    type="text" 
                    maxlength="100"
                    @validate="viewState.description.validator" 
                    label="Descrição" 
                    v-model="viewState.description.value" 
                    :error-message="viewState.description.error"
                    :text-area="true"/>
                <BaseInput 
                    maxlength="10"
                    type="text" 
                    @validate="viewState.value.validator" 
                    label="Valor" 
                    v-model="viewState.value.value" 
                    :error-message="viewState.value.error"/>
                    <div class="icons">
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
        </div>
    </div>
</template>
<style scoped lang="scss">
.dialog-background{
    font-family: 'Noto Sans';
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(30px);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    z-index: 9999;

    .dialog {
        background-color: $qrmenu-white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(65, 72, 86, 0.05);
        display: flex;
        flex-direction: column;
        width: 400px;
        height: 520px;
        margin: auto auto;

        .img-food {
            display: flex;
            align-items: center;

            img {
                border: 2px solid $qrmenu-gray;
                border-radius: 100%;
                width: 80px;
                margin: 16px auto;
            }
        }

        .card-data {
            display: flex;
            flex-direction: column;
            display: flex;
            width: 90%;
            margin: 0 auto;
        }

        .icons{
            display: flex;
            justify-content: space-evenly;
            width: 80%;
            margin: 0 auto;
        }
    }
    @media (max-width: 300px) {
            .dialog  {
                height: 550px;
            }
        }
}
</style>

