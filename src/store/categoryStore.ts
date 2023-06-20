import type { Menu } from '@/utils/types/Menu';
import type { Product } from '@/utils/types/Product';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCategoryStore = defineStore('categoryManagement', () => { 
    const menus = ref({} as Menu[]); 
    const categorys = ref({} as Category[]);

    const getMenus = async (): Promise<void> => {
        const response = await fetch("http://localhost:3000/menus");
        // const response = await fetch("https://d21f-45-238-202-134.sa.ngrok.io/items");
        const jsonData = await response.json();
        menus.value = await jsonData;  
    }

    const getCategorys = async (): Promise<void> => {
        const response = await fetch("http://localhost:3000/categorys");
        // const response = await fetch("https://d21f-45-238-202-134.sa.ngrok.io/menu");
        const jsonData = await response.json();
        categorys.value = await jsonData;  
    }

    const addNewProduct = async (newCardData: Product, menu: Menu): Promise<void> => {
        let products: Product[] = menu.products; 
        let lastProductId: number = parseInt(products[products.length -1].id);

        for(let menu of menus.value){
            if(menu.id == menu.id){
                newCardData.id = `${++lastProductId}`;
                menu.products.push(newCardData);
                break;
            }
        }
    }

    const updateProduct = async (newCardData: Product, categoryId: String): Promise<void> => {
    let menuIndex: number = menus.value.findIndex((e: any)=>{
            return e.id == categoryId;
        })

    let products: Product[] = menus.value[menuIndex].products;
    let productIndex: number = products.findIndex((e: any)=>{
            return e.id == newCardData.id;
        })
    
    menus.value[menuIndex].products[productIndex] = newCardData;
    }

    const updateCategory = async (newCategoryData: Category): Promise<void> => {
        let categoryIndex: number = categorys.value.findIndex((e: any)=>{
            return e.id == newCategoryData.id;
        })
        categorys.value[categoryIndex] = newCategoryData;
    }

    const deleteCategory = async (newCategoryData: Category): Promise<void> => {
        let categoryIndex: number = categorys.value.findIndex((e: any)=>{
            return e.id == newCategoryData.id;
        })
        categorys.value.splice(categoryIndex, 1);
    }

    const addNewCategory = async (newCategoryData: Category):Promise<void> => {
        categorys.value.push(newCategoryData);
    }

    return {
        menus,
        categorys,
        getCategorys,
        getMenus,
        updateProduct,
        addNewProduct,
        addNewCategory,
        updateCategory,
        deleteCategory
    }
})