<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCategoryStore } from '@/store/categoryStore';
import { useUserStore } from '@/store/userStore';
import { type Category } from '@/utils/interfaces/Category';
import type { Product } from '@/utils/interfaces/Product';
import CardProducts from '@/components/CardProducts.vue';
import AlertDialog from '@/components/AlertDialog.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import EditIcon from '@/components/icons/EditIcon.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import EditModal from '@/components/EditModal.vue';
import { useAuthStore } from '@/store/useAuthStore';

const categoryStore = useCategoryStore();
const authStore = useAuthStore();
const userStore = useUserStore();

let menu = ref<Product[]>([] as Product[]);

const editModalData = ref<Product>({
  id: '',
  categoryId: '',
  title: '',
  description: '',
  price: ''
});

const itemToBeDeleted = ref<Product | Category>({
  id: '',
  categoryId: '',
  title: '',
  description: ''
});

const currentCategory = ref<Category>({} as Category);
const warningMessage = ref<string>('');
const showEditModal = ref<boolean>(false);
const showAlertDialog = ref<boolean>(false);
const isProduct = ref<boolean>(true);

const loadData = async () => {
  await categoryStore.getCategories();
};

onMounted(async () => {
  await loadData();
  const { id, title } = categoryStore.categories[0];
  changeMenu(id, title);
});

const openEditModalForCategory = (categoryId: string = '', categoryTitle: string = '') => {
  isProduct.value = false;
  editModalData.value.id = categoryId;
  editModalData.value.title = categoryTitle;
  showEditModal.value = !showEditModal.value;

  const editModalClosed = showEditModal.value === false;
  if (editModalClosed) clearModalData();
};

const toggleEditModal = () => {
  isProduct.value = true;
  showEditModal.value = !showEditModal.value;
  if (showEditModal.value === false) clearModalData();
};

const toggleAlertDialog = (item: Product | Category) => {
  const isProduct = 'description' in item;
  const { id, title } = item;
  itemToBeDeleted.value.title = title;
  itemToBeDeleted.value.id = id;

  // if (isProduct) {
  //   itemToBeDeleted.value = { id, categoryId, title, type: 'Produto', description };
  // }
  // if (!isProduct) {
  //   itemToBeDeleted.value = { id, title, type: 'Categoria' };
  //   warningMessage.value =
  //     'Ao deletar uma categoria, todos os produtos que estão nela também serão deletados!';
  // }
  return (showAlertDialog.value = !showAlertDialog.value);
};

const clearModalData = () => {
  return (editModalData.value = {} as Product);
};

const getEmitEditModal = (cardData: Product) => {
  editModalData.value = cardData;
  return toggleEditModal();
};

const changeMenu = async (id: string, categoryTitle: string) => {
  const { categoryWithProducts } = categoryStore;
  const categoryExist = categoryWithProducts.some((e) => e.id === id);

  if (!categoryExist) await categoryStore.getCategoryWithProducts(id);

  currentCategory.value = { id, title: categoryTitle };

  updateMenu(id);
};

const saveData = (newData: Product | Category) => {
  const isProduct: boolean = 'description' in newData && 'price' in newData;
  const { id } = newData;

  if (isProduct) {
    return !id ? addNewProduct(newData as Product) : updateProduct(newData as Product);
  }
  if (!isProduct) {
    return !id ? addNewCategory(newData as Category) : updateCategory(newData as Category);
  }
};

const updateCategory = async (newData: Category) => {
  const { accessToken } = authStore.user;
  await categoryStore.updateCategory(newData, accessToken);
  await categoryStore.getCategories();
  return toggleEditModal();
};

const addNewCategory = async (NewCategoryData: Category) => {
  const { accessToken } = authStore.user;
  await categoryStore.addNewCategory(NewCategoryData, accessToken);
  await categoryStore.getCategories();
  return toggleEditModal();
};

const deleteProduct = async (id: string, categoryId: string) => {
  const { accessToken } = authStore.user;

  await categoryStore.deleteProductById(id, accessToken);
  await categoryStore.getCategoryWithProducts(categoryId);
  updateMenu(categoryId);
};

const deleteCategory = async (id: string) => {
  const { accessToken } = authStore.user;
  await categoryStore.deleteCategoryById(id, accessToken);
  await categoryStore.getCategories();
};

const deleteItem = async () => {
  // const { id, categoryId, description } = itemToBeDeleted.value;

  // const isProduct = !!description;
  // if (isProduct) await deleteProduct(id, categoryId);
  // if (!isProduct) await deleteCategory(id);

  const nextCategoryId = categoryStore.categories[0].id;
  const nextCategoryTitle = categoryStore.categories[0].title;
  changeMenu(nextCategoryId, nextCategoryTitle);

  return toggleAlertDialog({} as Category | Product);
};

const addNewProduct = async (NewProduct: Product) => {
  const { accessToken } = authStore.user;
  const categoryId = currentCategory.value.id;

  NewProduct.categoryId = categoryId;

  await categoryStore.addNewProduct(NewProduct, accessToken);
  await categoryStore.getCategoryWithProducts(categoryId);

  updateMenu(categoryId);
  toggleEditModal();
};

const updateProduct = async (product: Product) => {
  const { accessToken } = authStore.user;
  const { categoryId } = product;

  await categoryStore.updateProduct(product, accessToken);
  await categoryStore.getCategoryWithProducts(categoryId);

  updateMenu(categoryId);
  toggleEditModal();
  clearModalData();
};

const updateMenu = (categoryId: string) => {
  const { categoryWithProducts } = categoryStore;
  categoryWithProducts.forEach((e) => {
    if (categoryId === e.id) return (menu.value = e.product);
  });
};
</script>

<template>
  <div class="menu-horizontal">
    <div class="menus" v-for="(category, index) in categoryStore.categories" :key="index">
      <button @click="changeMenu(category.id, category.title)" autofocus>
        {{ category.title }}
      </button>
      <div class="icons">
        <EditIcon
          v-if="userStore.isAdmin"
          @click="openEditModalForCategory(category.id, category.title)"
          :color="'black'"
          :width="20"
          :height="20"
        />
        <DeleteIcon
          v-if="userStore.isAdmin"
          @click="toggleAlertDialog(category)"
          :color="'black'"
          :width="20"
          :height="20"
        />
      </div>
    </div>
    <div class="add-menu" v-if="userStore.isAdmin">
      <PlusIcon @click="openEditModalForCategory()" :color="'black'" :width="30" :height="30" />
    </div>
  </div>
  <h3>{{ currentCategory.title }}</h3>
  <ul>
    <li class="add-card" v-if="userStore.isAdmin">
      <PlusIcon @click="toggleEditModal" :color="'black'" />
    </li>
    <li class="cards" v-for="(product, index) in menu" :key="index">
      <CardProducts
        :menuId="product.categoryId"
        :product="product"
        @edit-card-data="(cardData) => getEmitEditModal(cardData)"
        @toggle-alert-dialog="(product) => toggleAlertDialog(product)"
      />
    </li>
  </ul>
  <EditModal
    v-if="showEditModal"
    :is-product="isProduct"
    :product="editModalData"
    @close-edit-modal="toggleEditModal"
    @save-data="(newData) => saveData(newData)"
  />
  <AlertDialog
    v-if="showAlertDialog"
    :name="itemToBeDeleted.title"
    :message="warningMessage"
    @allow="deleteItem"
  />
</template>

<style lang="scss" scoped>
.menu-horizontal {
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  overflow-x: auto;

  .menus {
    min-height: 2.2rem;
    padding: 0 3px;
    display: flex;

    button {
      white-space: nowrap;
      border: none;
      background: none;
      font-size: 1rem;
      font-weight: bold;
      padding: 5px 10px;

      &:hover,
      &:focus {
        background-color: $qrmenu-gray;
        color: $qrmenu-white;
        border-radius: 15px;
        cursor: pointer;
      }

      &:focus-visible {
        outline: none;
      }
    }

    .icons {
      display: flex;
      flex-direction: column;
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
  justify-content: space-between;

  .add-card {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 20px 0 20px;
    width: 400px;
  }
}

@media (min-width: 585px) {
  .menu-horizontal {
    justify-content: center;
  }
}
</style>
@/utils/interfaces/Category@/utils/interfaces/Product@/utils/interfaces/Menu
