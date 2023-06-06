<script setup lang="ts">
import SettingsIcon from '@/components/icons/SettingsIcon.vue';
import ArrowBackIcon from './icons/ArrowBackIcon.vue';
defineProps({
  isLoginPage: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
    <header>
        <p>Boteco Peace</p>
        <div v-if="isLoginPage" class="arrow-back-icon">
            <router-link to="/">
                <ArrowBackIcon :color="'white'"/>
            </router-link>
        </div>
        <div v-else class="settings-icon">
            <router-link to="/login">
                <SettingsIcon :color="'white'"/>
            </router-link>
        </div>
    </header>
</template>
<style lang="scss" scoped>
    header {
        background: $qrmenu-red;
        color: $qrmenu-white;
        font-family: 'Noto Sans';
        font-weight: bold;
        text-align: center;
        padding: 1rem 1rem;
            .arrow-back-icon{
                position: absolute;
                left: 10px;
                top: 12px;
            }
            .settings-icon{
                position: absolute;
                right: 10px;
                top: 12px;
            }
    }
</style>

