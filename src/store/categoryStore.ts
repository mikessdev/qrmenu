import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCategoryStore = defineStore('categoryManagement', () => { 
    const product = ref(); 
    const menu = ref();

    const getProduct = async (): Promise<any> => {
        const response = await fetch("http://localhost:3000/items");
        // const response = await fetch("https://d21f-45-238-202-134.sa.ngrok.io/items");
        const jsonData = await response.json();
        product.value = await jsonData;  
        return jsonData; 
    }

    const getMenu = async (): Promise<any> => {
        const response = await fetch("http://localhost:3000/menu");
        // const response = await fetch("https://d21f-45-238-202-134.sa.ngrok.io/menu");
        const jsonData = await response.json();
        menu.value = await jsonData;  
        return jsonData; 
    }

    return {
        product,
        menu,
        getProduct,
        getMenu
    }
})