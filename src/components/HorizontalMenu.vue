<script setup lang="ts">
import { ref } from "vue";
import Category from '@/utils/types/MenuItem';
import MenuItem from '@/utils/types/MenuItem';

const props = defineProps({
    menu: {
        type: Array<Category>,
        default: []
    },
    items: {
        type: Array<MenuItem>,
        default: []
    }
})

const menuHandler = ref(false);
console.log(props.menu)

</script>

<template>
        <ul>
            <li v-for="(item, index) in props.menu" :key="index">
                <h2>{{ item.title }}</h2>
                <span v-show="item.show">{{ item.title }}</span>
            </li>
        </ul>


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