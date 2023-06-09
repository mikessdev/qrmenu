<script setup lang="ts">
    const props = defineProps({
        title: {
            type: String, 
            default: ""
        },
        description: {
            type: String, 
            default: ""
        },
        value: {
            type: String, 
            default: "0,00"
        }
    })
</script>

<template>
    <div class="card">
        <div class="img-food">
            <img src="@/assets/img/imgComida.jpg" alt="img-produto">
        </div>
        <div class="card-data">
            <h4>{{ props.title }}</h4>
            <p>{{ props.description }}</p>
            <span>{{ props.value }}</span>
        </div>
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