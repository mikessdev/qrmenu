<script setup lang="ts">
import { ref, onMounted } from "vue";
import CardProducts from "@/components/CardProducts.vue";
import AlertDialog from "@/components/AlertDialog.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue"
import type { Category } from "@/utils/types/Category";
import type { Product } from "@/utils/types/Product";
import EditModal from "@/components/EditModal.vue";
import { useCategoryStore } from '@/store/categoryStore';
import { useUserStore } from "@/store/userStore";
import type { Menu } from "@/utils/types/Menu";

const categoryStore = useCategoryStore();
const userStore = useUserStore();

export interface productOrMenu {
    id: string,
    type: string, 
    name: string,
    description: string,  
}

const menu = ref<Menu>({
    id: '',
    products: []
});

const editModalData = ref<Product>({
    id: '',
    title: '', 
    description: '',  
    value: ''
})

const itemToBeDeleted = ref<productOrMenu>({
    id: '',
    type: '',
    name: '',
    description: ''
})


const showEditModal = ref<boolean>(false);
const showAlertDialog = ref<boolean>(false);
const isProduct = ref<boolean>(true);

const loadData = async () => {
    await categoryStore.getCategorys();
    await categoryStore.getMenus();
}

onMounted(async () => {
    await loadData();
    const { id, title } = categoryStore.categorys[0];

    categoryStore.currentCategoryId =  id;
    getMenu(id, title);
})

const openEditModalForCategory = (categoryId: string = '', categoryTitle: string = '') => {
    isProduct.value = false; 
    editModalData.value.id = categoryId;
    editModalData.value.title = categoryTitle;
    showEditModal.value = !showEditModal.value;

    const editModalClosed = showEditModal.value === false;
    if (editModalClosed) clearModalData();
}

const toggleEditModal = () => { 
    isProduct.value = true; 
    showEditModal.value = !showEditModal.value;
    if(showEditModal.value === false) clearModalData();
}

const toggleAlertDialog = (item: Product | Category) => { 
    const isProduct = 'description' in item; 
    const { id, title} = item;
    itemToBeDeleted.value.name = title;
    itemToBeDeleted.value.id = id;
    
    if(isProduct){
        itemToBeDeleted.value.type = 'Produto';
        itemToBeDeleted.value.description = item.description;
    } 
    if (!isProduct) {
        itemToBeDeleted.value.type = 'Categoria';
    }
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
    categoryStore.currentCategoryId = id;
    categoryStore.currentCategoryTitle = categoryName;
    for(let e of categoryStore.menus){
        if(id == e.id) return menu.value = e;
    }
}

const saveData = (newData: Product | Category) => {
    const isProduct: boolean = 'description' in newData && 'value' in newData; 
    const { id } = newData;
    
    if (isProduct) {
        return !id ? addNewCard(newData as Product) : updateCard(newData as Product);
    }
    if (!isProduct) {
        return !id ? addNewCategory(newData as Category) : updateCategory(newData as Category);
    }
}

const updateCategory = (NewCategoryData: Category) => {
    categoryStore.updateCategory(NewCategoryData);
    return toggleEditModal();
}

const addNewCategory = (NewCategoryData: Category) => { 
    categoryStore.addNewCategory(NewCategoryData);
    return toggleEditModal();
}

const deleteItem = () => {
    const { id, description } = itemToBeDeleted.value;
    const { currentCategoryId } = categoryStore;
    const isProduct = !!description;

    isProduct ?
    categoryStore.deleteProductById(id, currentCategoryId) :
    categoryStore.deleteCategoryById(id);

    return toggleAlertDialog({} as Category | Product);
}

const addNewCard = (NewCardData: Product) => { 
    categoryStore.addNewProduct(NewCardData, menu.value);
    return toggleEditModal();
}

const updateCard = (newData: Product) => {
    const { id } = menu.value;
    categoryStore.updateProduct(newData, id);
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
            <PlusIcon 
                @click="openEditModalForCategory()" 
                :color="'black'" 
                :width="30" 
                :height="30"/>
        </div>
    </div>
    <h3> {{ categoryStore.currentCategoryTitle }} </h3>
    <ul>
        <li class="add-card" v-if="userStore.isAdmin">
            <PlusIcon 
                @click="toggleEditModal" 
                :color="'black'"/>
        </li>
        <li class="cards" v-for="(product, index) in menu.products" :key="index">
            <CardProducts 
                :menuId="menu.id" 
                :product="product" 
                @edit-card-data="(cardData) => getEmitEditModal(cardData)"
                @toggle-alert-dialog="(e) => toggleAlertDialog(e)"/>
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
            :name="itemToBeDeleted.name"
            :type="itemToBeDeleted.type"
            @allow="deleteItem"
            @not-allow="toggleAlertDialog({} as Category | Product)"/>
</template>

<style lang="scss" scoped>
    .menu-horizontal{
        width: 100%;
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
        justify-content: space-between;

        .add-card{
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 20px 0 20px;
            width: 400px
        }
    }
 
    @media(min-width: 585px){
        .menu-horizontal {
            justify-content: center;
        }
    }
</style>