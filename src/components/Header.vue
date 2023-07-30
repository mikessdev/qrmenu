<script setup lang="ts">
import SettingsIcon from '@/components/icons/SettingsIcon.vue';
import LogoutIcon from '@/components/icons/LogoutIcon.vue';
import ArrowBackIcon from './icons/ArrowBackIcon.vue';
import { useUserStore } from '@/store/userStore';
import router from '@/router';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '@/firebase/config';

defineProps({
  hideBackButton: {
    type: Boolean,
    default: false
  }
})

const userStore = useUserStore();

const settings = () => {
     return userStore.isAdmin ? router.push('/userconfig') : router.push('/login');
}

const logOut = () => {
      signOut(firebaseAuth);
      return userStore.isAdmin = false;
}

</script>
<template>
    <header>
        <p>Boteco Peace</p>    
        <div v-if="!hideBackButton" class="arrow-back-icon">
            <router-link to="/">
                <ArrowBackIcon :color="'white'"/>
            </router-link>
        </div>
        <div v-else class="settings-wrapper">
            <SettingsIcon @click="settings()" :color="'white'"/>
            <LogoutIcon v-if="userStore.isAdmin" class="logout-icon" @click="logOut()" :color="'white'"/>
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
                .logout-icon{
                    margin-left: 20px;  
                }           
            }
    }
</style>

