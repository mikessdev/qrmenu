<script setup lang="ts">
import { ref, onMounted } from "vue";
import CardProducts from "@/components/CardProducts.vue";
import AlertDialog from "@/components/AlertDialog.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue"
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
} as Menu);

const editModalData = ref({
    id: '',
    title: '', 
    description: '',  
    value: ''
})

const categoryToBeDeleted = ref({
    id: '',
    type: '',
    name: ''
})

const categoryNameSelected = ref('');
const showEditModal = ref(false);
const showAlertDialog = ref(false);
const currentCategoryId = ref('');
const isProduct = ref(true);

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

const openEditModalForCategory = (categoryId: string, categoryTitle: string) => {
    isProduct.value = false; 
    editModalData.value.id = categoryId;
    editModalData.value.title = categoryTitle;
    showEditModal.value = !showEditModal.value;
    if(showEditModal.value === false) clearModalData();
    
}

const toggleEditModal = () => { 
    isProduct.value = true; 
    showEditModal.value = !showEditModal.value;
    if(showEditModal.value === false) clearModalData();
}

const toggleAlertDialog = (category: Category) => { 
    categoryToBeDeleted.value.id = category.id;
    categoryToBeDeleted.value.name = category.title;
    categoryToBeDeleted.value.type = 'Categoria';
    return showAlertDialog.value = !showAlertDialog.value;
}

const clearModalData = () => { 
    return editModalData.value = {} as Product;
}

const getEmitEditModal = (cardData: Product) => {
    editModalData.value = cardData;
    return toggleEditModal();
}

const getMenu = (id: string, categoryName: string) => { 
    currentCategoryId.value = id;
    categoryNameSelected.value = categoryName;
    for(let e of categoryStore.menus){
        if(id == e.id) return menu.value = e;
    }
}

const saveData = (newData: any) => {
    if(newData.description && newData.value){
        return !newData.id ? addNewCard(newData) : updateCard(newData);
    }else{
        return !newData.id ? addNewCategory(newData) : updateCategory(newData);
    }
}

const updateCategory = (NewCategoryData: Category) => {
    categoryStore.updateCategory(NewCategoryData);
    return toggleEditModal();
}

const addNewCategory = (NewCategoryData: Product) => { 
    categoryStore.addNewCategory(NewCategoryData);
    return toggleEditModal();
}

const deleteCategory = () => {
    let category: Category;
    category = {
        id: categoryToBeDeleted.value.id,
        title: categoryToBeDeleted.value.name
    } as Category
    categoryStore.deleteCategory(category);
    return toggleAlertDialog({});
}

const addNewCard = (NewCardData: Product) => { 
    categoryStore.addNewProduct(NewCardData, menu.value);
    return toggleEditModal();
}

const updateCard = (newData: Product) => {
    categoryStore.updateProduct(newData, menu.value.id);
    toggleEditModal();
    return editModalData.value = {} as Product;
}

</script>

<template>
    <div class="menu-horizontal">
        <div class="menus" v-for="(category, index) in categoryStore.categorys" :key="index">
            <button @click="getMenu(category.id, category.title)" autofocus>{{ category.title }}</button>
            <div class="icons">
            <EditIcon 
                v-if="userStore.isAdmin" 
                @click="openEditModalForCategory(category.id, category.title)" 
                :color="'black'"
                :width="20"
                :height="20"/>
            <DeleteIcon
                v-if="userStore.isAdmin" 
                @click="toggleAlertDialog(category)" 
                :color="'black'"
                :width="20"
                :height="20"/>
        </div>
        </div>
        <div class="add-menu" v-if="userStore.isAdmin">
            <PlusIcon @click="openEditModalForCategory" :color="'black'" :width="30" :height="30"/>
        </div>
    </div>
    <h3> {{ categoryNameSelected }} </h3>
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
            :is-product="isProduct"
            :product="editModalData"
            @close-edit-modal="toggleEditModal" 
            @save-data="(newData) => saveData(newData)"/>
        <AlertDialog
            v-if="showAlertDialog"
            :name="categoryToBeDeleted.name"
            :type="categoryToBeDeleted.type"
            @allow="deleteCategory"
            @not-allow="toggleAlertDialog"/>
</template>

<style lang="scss" scoped>
    .menu-horizontal{
        width: 100vw;
        margin: 0 auto;
        display: flex;
        align-items: center;
        overflow-x: auto;
        
        .menus{
            min-height: 2.2rem;
            padding: 0 3px;
            display: flex;

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
                
                &:focus-visible{
                    outline: none;

                }
            }

            .icons{
                display: flex;
                flex-direction: column;
            }
        }
    }

    h3{
        font-family: 'Noto Sans';
        font-size: 16px;
        color: $qrmenu-white;
        background: $qrmenu-gray;
        margin: 10px 0;
        padding: 7px 10px;
    }    

    ul{
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

        @media(max-width: 799px){
            .add-card {
                justify-content: center;
                width: 400px;
                height: 100px;
            }
        }
        
    }
    
    @media(min-width: 585px){
        .menu-horizontal {
            justify-content: center;
        }
    
    }
</style>