import { defineStore } from 'pinia';
import { ref } from 'vue';

export const userCategoryStore = defineStore('storeID', () => { 
    const items = ref(); 
    const menu = ref();

    const getItems = async (): Promise<any> => {
        // const response = await fetch("http://localhost:3004/items");
        const response = await fetch("https://d21f-45-238-202-134.sa.ngrok.io/items");
        const jsonData = await response.json();
        items.value = await jsonData;  
        return jsonData; 
    }

    const getMenu = async (): Promise<any> => {
        // const response = await fetch("http://localhost:3000/menu");
        const response = await fetch("https://d21f-45-238-202-134.sa.ngrok.io/menu");
        const jsonData = await response.json();
        menu.value = await jsonData;  
        return jsonData; 
    }

    return {
        items,
        menu,
        getItems,
        getMenu
    }
})