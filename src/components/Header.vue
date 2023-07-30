<script setup lang="ts">
import SettingsIcon from '@/components/icons/SettingsIcon.vue';
import ArrowBackIcon from './icons/ArrowBackIcon.vue';
import { useUserStore } from '@/store/userStore';

defineProps({
  isLoginPage: {
    type: Boolean,
    default: false
  }
})

const userStore = useUserStore();

</script>
<template>
    <header>
        <p>Boteco Peace</p>    
        <div v-if="isLoginPage" class="arrow-back-icon">
            <router-link to="/">
                <ArrowBackIcon :color="'white'"/>
            </router-link>
        </div>
        <div v-else class="settings-wrapper">
            <router-link class="settings-icon" to="/login">
                <SettingsIcon :color="'white'"/>
            </router-link>
        </div>
    </header>
</template>
<style lang="scss" scoped>
    header {
        width: 100%;
        height: 60px;
        position: absolute;
        top: 0;
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
            .settings-wrapper{
                position: absolute;
                display: flex;  
                right: 10px;
                top: 0px; 
                align-items: center;
                height: 60px;
                .settings-icon{
                    display: flex;   
                }           
            }
    }
</style>

