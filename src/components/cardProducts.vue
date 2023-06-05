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
    <div>
        <div>
            <img src="@/assets/img/comidaTeste.jpg" alt="img-produto">
        </div>
        <div>
            <h4>{{ props.title }}</h4>
            <p>{{ props.description }}</p>
            <span>{{ props.value }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>