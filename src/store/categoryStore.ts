import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCategoryStore = defineStore('categoryManagement', () => { 
    const menus = ref(); 
    const categorys = ref();

    const getMenus = async (): Promise<any> => {
        const response = await fetch("http://localhost:3000/menus");
        // const response = await fetch("https://d21f-45-238-202-134.sa.ngrok.io/items");
        const jsonData = await response.json();
        menus.value = await jsonData;  
        return jsonData; 
    }

    const getCategorys = async (): Promise<any> => {
        const response = await fetch("http://localhost:3000/categorys");
        // const response = await fetch("https://d21f-45-238-202-134.sa.ngrok.io/menu");
        const jsonData = await response.json();
        categorys.value = await jsonData;  
        return jsonData; 
    }

    return {
        menus,
        categorys,
        getCategorys,
        getMenus
    }
})