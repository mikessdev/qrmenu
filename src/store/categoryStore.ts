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
        const EMPTY = 0; 
        let products: Product[] = menu.products;
        let newProductId: string = '1';

        if(products.length != EMPTY){
            let lastProductId: number = parseInt(products[products.length -1].id);
            newProductId = `${++lastProductId}`;
        }

        for(let item of menus.value){
            if(menu.id == item.id){
                console.log("dsadas")
                newCardData.id = newProductId;
                menu.products.push(newCardData);
                console.table(menu.products)
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
        let lastId: number = parseInt(categorys.value[categorys.value.length -1].id); 
        let newId = `${++lastId}`;
        let newMenu = {id: newId, products: []} as Menu;
        newCategoryData.id = newId;
        categorys.value.push(newCategoryData);
        menus.value.push(newMenu);
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