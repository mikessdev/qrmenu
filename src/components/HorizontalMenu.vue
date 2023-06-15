<script setup lang="ts">
import { ref, onMounted } from "vue";
import CardProducts from "@/components/CardProducts.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import { Category } from "@/utils/types/Category";
import { Product } from "@/utils/types/Product";
import EditModal from "@/components/EditModal.vue";
import { useCategoryStore } from '@/store/categoryStore';
import { useUserStore } from "@/store/userStore";
import type { Menu } from "@/utils/types/Menu";

const categoryStore = useCategoryStore();
const userStore = useUserStore();

const menu = ref({
    id: "",
    products: []
});

const editModalData = ref({
    id: '',
    title: '', 
    description: '',  
    value: ''
})

const subTitle = ref('');
const showEditModal = ref(false);
const currentCategoryId = ref('');

const loadData = async () => {
    await categoryStore.getCategorys();
    await categoryStore.getMenus();
}

onMounted(async () => {
    await loadData();
    const firstMenu: Category  = categoryStore.categorys[0];
    currentCategoryId.value =  firstMenu.id;
    const title = firstMenu.title;
    getMenu(currentCategoryId.value, title);
});

const toggleEditModal = () => { 
    showEditModal.value = !showEditModal.value;
}

const getEmitEditModal = (cardData: Product) => {
    editModalData.value = cardData;
    return toggleEditModal();
}

const getMenu = (id: string, subtitle: string) => { 
    currentCategoryId.value = id;
    subTitle.value = subtitle;
    for(let e of categoryStore.menus){
        if(id == e.id) return menu.value = e;
    }
}

const saveData = (newData: Product) => {
    return !newData.id ? addNewCard(newData) : updateCard(newData);
}

const addNewCard = (NewCardData: Product) => { 
    let products: Product[] = menu.value.products; 
    let lastProductId: number = parseInt(products[products.length -1].id);

    for(let menu of categoryStore.menus){
        if(menu.id == currentCategoryId.value){
            NewCardData.id = `${++lastProductId}`;
            menu.products.push(NewCardData);
            return toggleEditModal();
        }
    }
}

const updateCard = (newData: Product) => {
    let menus: Menu[] = categoryStore.menus;
    let menuIndex: number = menus.findIndex((e: any)=>{
        return e.id == menu.value.id
    })

    let products: Product[] = categoryStore.menus[menuIndex].products;
    let productIndex: number = products.findIndex((e: any)=>{
        return e.id == newData.id
    })

    categoryStore.menus[menuIndex].products[productIndex] = newData;
    toggleEditModal();
    editModalData.value = {} as Product;
}

</script>

<template>
    <div class="menu-horizontal">
        <div v-for="(category, index) in categoryStore.categorys" :key="index">
            <button @click="getMenu(category.id, category.title)">{{ category.title }}</button>
        </div>
    </div>
    <h3> {{ subTitle }} </h3>
        <ul>
            <li class="cards" v-for="(product, index) in menu.products" :key="index">
                <CardProducts 
                    :menuId="menu.id" 
                    :product="product" 
                    @edit-card-data="(cardData) => getEmitEditModal(cardData)"/>
            </li>
            <li class="add-card" v-if="userStore.isAdmin">
                <PlusIcon @click="toggleEditModal" :color="'black'"/>
            </li>
        </ul>
        <EditModal 
            v-if="showEditModal" 
            :product="editModalData"
            @close-edit-modal="toggleEditModal" 
            @save-data="(newData) => saveData(newData)"/>
</template>

<style lang="scss" scoped>
    .menu-horizontal{
        width: 95vw;
        margin: 0 auto;
        display: flex;
        overflow-x: auto;
        
        div {
            min-height: 2.2rem;
            padding: 0 3px;
            button{
                white-space: nowrap;
                border: none;
                background: none;
                font-size: 1rem;
                font-weight: bold;
                padding: 5px 10px;
                
                &:hover, &:focus{
                    background-color: $qrmenu-gray;
                    color: $qrmenu-white;
                    border-radius: 15px;
                    cursor: pointer;
                }
            }
        }
    }
    h3 {
        font-family: 'Noto Sans';
        font-size: 16px;
        color: $qrmenu-white;
        background: $qrmenu-gray;
        margin: 10px 0;
        padding: 7px 10px;
    }       
    ul {
        font-family: 'Noto Sans';
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;

        .add-card{
            display: flex;
            align-items: center;
            width: 400px;
            height: 200px;
            // margin-left: 40px;
        }

        @media (max-width: 799px) {
            .add-card {
                justify-content: center;
                width: 400px;
                height: 100px;
            }
        }
        
    }
    
    @media (min-width: 585px) {
        .menu-horizontal {
            justify-content: center;
        }
    
    }
</style>