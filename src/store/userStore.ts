import { defineStore } from 'pinia';
import { ref } from 'vue';

//TODO Implement communication with the backend when the backend is available

export const useUserStore = defineStore('userProfile', () => { 
    const isAdmin = ref(false); 
    return {
        isAdmin,
    }
})