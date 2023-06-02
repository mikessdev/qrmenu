<script setup lang="ts">
import { ref } from "vue";
import Category from "@/utils/types/Category";

type MenuItem = {
    title: string, 
    description: string, 
    valor: string
}

const props = defineProps({
    categorys: {
        type: Array<Category>,
        default: []
    }
})

</script>

<template>
        <ul>
            <li v-for="item in props.categorys" :key="item">
                {{ item.title }}
            </li>
        </ul>
</template>

<style lang="scss" scoped>
    ul{
        font-family: 'Noto Sans';
        list-style: none;
        display: flex;
    }
        li {
            margin-right: 10px;
            &:hover{

                background-color: $qrmenu-gray;
            }

        }
                
            
        
    
    
</style>