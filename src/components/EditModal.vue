<script setup lang="ts">
import { reactive, ref, watch, toRefs} from "vue";
import Button from "@/components/Button.vue";
import BaseInput from "@/components/BaseInput.vue";
import { validateEmptyText } from "@/validators/emptyText";

const props = defineProps({
    isProduct: {
        type: Boolean,
        default: true
    },
    product: {
        type: Object , 
        default: {} as Object
    }
})

const buttonIsDisabled = ref(true);

const { id, title, description, value } = toRefs(props).product.value;
const viewState = reactive({
  id: id ?? '',
  title: {
    value: title ?? '',
    error: '',
    validator: () => {
        viewState.title.error = validateEmptyText(viewState.title.value);
    }
  },
  description: {
    value: description ?? '',
    error: '',
    validator: () => {
        viewState.description.error = validateEmptyText(viewState.description.value);
    }
  },
  value: {
    value: value ?? "R$ 00,00",
    error: '',
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
    const { id, title, description, value } = viewState;
    const isProduct = props.isProduct;
    const buttonEnabled = !buttonIsDisabled.value;

    if (buttonEnabled) {
        const newData = isProduct ?
        { id, title: title.value, description: description.value, value: value.value } :
        { id, title: title.value };
        console.log('viewState.id', viewState.id)
        emit('saveData', newData);
    }
}

watch(viewState, () => {
    const { title, description, value } = viewState;
    const isTitleEmpty = !!validateEmptyText(title.value);
    const isDescriptionEmpty = !!validateEmptyText(description.value);
    const isValueEmpty = !!validateEmptyText(value.value);
    const isProduct = props.isProduct;

    buttonIsDisabled.value = isProduct ? 
    isTitleEmpty || isDescriptionEmpty || isValueEmpty : 
    isTitleEmpty
});

</script>
<template>
    <div class="modal-background">
        <div class="modal" :class="[isProduct ? 'tall-modal' : 'short-modal']">
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
                    v-if="isProduct"
                    type="text" 
                    maxlength="100"
                    @validate="viewState.description.validator" 
                    label="Descrição" 
                    v-model="viewState.description.value" 
                    :error-message="viewState.description.error"
                    :text-area="true"/>
                <BaseInput 
                    v-if="isProduct"
                    maxlength="10"
                    type="text" 
                    @validate="viewState.value.validator" 
                    label="Valor" 
                    v-model="viewState.value.value" 
                    :error-message="viewState.value.error"/>
                    <div class="buttons">
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
.modal-background {
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

    .modal {
        background-color: $qrmenu-white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(65, 72, 86, 0.05);
        display: flex;
        flex-direction: column;
        width: 400px;
        margin: auto auto;

        .img-food {
            display: flex;
            align-items: center;

            img {
                border: 2px solid $qrmenu-gray;
                border-radius: 100%;
                width: 80px;
                margin: 16px auto 0 auto;
            }
        }
        .card-data {
            display: flex;
            flex-direction: column;
            display: flex;
            width: 90%;
            margin: 0 auto;
        }

        .buttons {
            display: flex;
            justify-content: space-evenly;
            width: 80%;
            margin: 16px auto 0 auto;
        }
    }

    .tall-modal {
        height: 560px;
    }

    .short-modal {
        height: 280px;
    }

    @media (max-width: 300px) {
            .dialog  {
                height: 550px;
            }
        }
}
</style>

