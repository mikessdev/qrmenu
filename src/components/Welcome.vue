<script setup lang="ts">
    import { useUserStore } from '@/store/userStore';

    const userStore = useUserStore()
</script>
<template>
    <span>Olá, {{ userStore.userName }}.</span>
</template>
<style lang="scss" scoped>
    span{
        color: black;
        font-family: 'Noto Sans';
        font-weight: bold;
        margin-left: 20px;
    }
</style>