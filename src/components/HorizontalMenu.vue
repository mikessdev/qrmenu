<script setup lang="ts">
import { ref, onMounted } from "vue";
import Category from '@/utils/types/Menumenu';
import MenuItem from '@/utils/types/MenuItem';
import { userCategoryStore } from '@/store/categoryStore';

const categoryStore = userCategoryStore();

const loadData = async () => {
     await categoryStore.getMenu();
     await categoryStore.getItems();
}

const menu = ref();
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
        <ul>
            <li v-for="(menu, index) in categoryStore.menu" :key="index">
                <h2 @click="getMenu(menu.id, menu.title)" >{{ menu.title }}</h2>
            </li>
        </ul>
        <h3> {{ subtitleItem }} </h3>
        <div>
            {{ menu }}
        </div>


</template>

<style lang="scss" scoped>
    ul{
        font-family: 'Noto Sans';
        list-style: none;
        display: flex;
        font-size: 10px;

        li{
            padding: 0px 10px;

            &:hover{
                background-color: $qrmenu-gray;
                color: $qrmenu-white;
                border-radius: 15px;
            }

            span{
                background-color: $qrmenu-gray;
                color: $qrmenu-white;
                padding: 10px 10px;
                font-size: 16px;
            }
        }
    }
                
            
        
    
    
</style>