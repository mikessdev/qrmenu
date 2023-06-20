<script setup lang="ts">
import Button from "@/components/Button.vue";

const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    }
})


const emit = defineEmits(["Allow", "NotAllow"]);

const NotAllow = () => {
    emit("NotAllow");
}

const Allow = () => {
    emit("Allow");
}
</script>
<template>
    <div class="modal-background">
        <div class="modal">
            <span>
                Você tem certeza que deseja deletar o(a) <strong>{{ type }}</strong> de <strong>{{ name }}</strong> 
            </span>
            <div class="buttons">
                <Button 
                    @click="NotAllow" 
                    :label="'Não'" 
                    :type="'button'"/>
                <Button 
                    @click="Allow" 
                    :label="'Sim'" 
                    :type="'button'"/>
            </div>

        </div>
    </div>
</template>
<style scoped lang="scss">
.modal-background{
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
        height: 200px;
        margin: auto auto;
        padding: 32px;
        justify-content: space-between;

        span {
            text-align: center;
        }

        .buttons{
            margin: 0 auto;
            width: 80%;
            display: flex;
            justify-content: space-evenly;
        }

    @media (max-width: 300px) {
            .dialog  {
                height: 550px;
            }
        }
    }
}
</style>

