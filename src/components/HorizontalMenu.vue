<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCategoryStore } from '@/store/categoryStore';
import { useUserStore } from "@/store/userStore";
import CardProducts from "@/components/CardProducts.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import { Category } from "@/utils/types/Category";

const categoryStore = useCategoryStore();
const userStore = useUserStore();


const menu = ref({
    id: "",
    products: []
});

const subTitle = ref('');

const loadData = async () => {
     await categoryStore.getCategorys();
     await categoryStore.getMenus();
}

onMounted(async () => {
    await loadData();
    const firstMenu: Category  = categoryStore.categorys[0];
    console.log("teste", JSON.stringify(firstMenu))
    const Id =  firstMenu.id;
    const title = firstMenu.title;
    getMenu(Id, title);
});


const getMenu = (id: string, subtitle: string) => { 
    subTitle.value = subtitle;
    categoryStore.menus.forEach( (e: any) => {
        if(id == e.id) menu.value = e;
    });
}
</script>

<template>
    <div class="menu-horizontal">
        <div v-for="(category, index) in categoryStore.categorys" :key="index">
            <button @click="getMenu(category.id, category.title)">{{ category.title }}</button>
        </div>
    </div>
    <h3> {{ subTitle }} </h3>
    <div>
        <ul class="card-product">
            <li v-if="userStore.isAdmin">
                <PlusIcon :color="'black'"/>
            </li>
            <li v-for="(product, index) in menu.products" :key="index">
                <card-products :menuId="menu.id" :product="product"/>
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