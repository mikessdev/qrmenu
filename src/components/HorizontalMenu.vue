<script setup lang="ts">
import { ref, onMounted } from "vue";
import Category from '@/utils/types/Menumenu';
import MenuItem from '@/utils/types/MenuItem';
import { userCategoryStore } from '@/store/categoryStore';
import CardProducts from "@/components/CardProducts.vue";

const categoryStore = userCategoryStore();

const loadData = async () => {
     await categoryStore.getMenu();
     await categoryStore.getItems();
}

const menu = ref({
      id: "0",
      items: []
    });
    
const subtitleItem = ref('');

const getMenu = (id: string, subtitle: string) => { 
    subtitleItem.value = subtitle;
    categoryStore.items.forEach(element => {
        if(id == element.id){
            menu.value = element; 
            return  
        }
    });
}

onMounted(async () => {
    await loadData();
    const firstMenu = categoryStore.menu[0];
    const Id =  firstMenu.id;
    const title = firstMenu.title;
    getMenu(Id, title);
});
</script>

<template>
    <div class="menu-horizontal">
        <div v-for="(menu, index) in categoryStore.menu" :key="index">
            <button @click="getMenu(menu.id, menu.title)">{{ menu.title }}</button>
        </div>
    </div>
    <h3> {{ subtitleItem }} </h3>
    <div>
        <ul class="card-product">
            <li v-for="(element, index) in menu.items" :key="index">
                <card-products :title="element.title" :description="element.description" :value="element.value" />
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    .menu-horizontal{
        width: 100vw;
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
    .card-product {
        font-family: 'Noto Sans';
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    @media (min-width: 585px) {
        .menu-horizontal {
            justify-content: center;
        }
    }
</style>