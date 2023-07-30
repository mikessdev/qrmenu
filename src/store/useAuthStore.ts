import { defineStore } from 'pinia';
import { ref } from 'vue';

//TODO Implement communication with the backend when the backend is available

export const useAuthStore = defineStore('auth', () => { 
    const user = ref(null); 

    const setUser = (user: any) => { 
        user.value = user
    }
    return {
        user,
        setUser,
    }
})