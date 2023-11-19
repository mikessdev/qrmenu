<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useCategoryStore } from '@/store/categoryStore';
import { useUserStore } from '@/store/userStore';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import EditModal from '@/components/EditModal.vue';
import { validateEmptyText } from '@/validators/emptyText';
import BaseInput from '@/components/BaseInput.vue';
import type { Category } from '@/utils/interfaces/Category';
import EditIcon from '@/components/icons/EditIcon.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import AlertDialog from '@/components/AlertDialog.vue';
import { useMenuStore } from '@/store/menuStore';

// const editModalData = ref<Product>({
//   id: '',
//   categoryId: '',
//   title: '',
//   description: '',
//   price: ''
// });

// const itemToBeDeleted = ref<Product | Category>({
//   id: '',
//   categoryId: '',
//   title: '',
//   description: ''
// });

// const warningMessage = ref<string>('');
// const showEditModal = ref<boolean>(false);
// const showAlertDialog = ref<boolean>(false);
// const isProduct = ref<boolean>(true);

// const loadData = async () => {
//   await categoryStore.getCategories();
// };

// onMounted(async () => {
//   await loadData();
//   const { id, title } = categoryStore.categories[0];
//   changeMenu(id, title);
// });

// const openEditModalForCategory = (categoryId: string = '', categoryTitle: string = '') => {
//   isProduct.value = false;
//   editModalData.value.id = categoryId;
//   editModalData.value.title = categoryTitle;
//   showEditModal.value = !showEditModal.value;

//   const editModalClosed = showEditModal.value === false;
//   if (editModalClosed) clearModalData();
// };

// const toggleEditModal = () => {
//   isProduct.value = true;
//   showEditModal.value = !showEditModal.value;
//   if (showEditModal.value === false) clearModalData();
// };

// const toggleAlertDialog = (item: Product | Category) => {
//   const isProduct = 'description' in item;
//   const { id, title } = item;
//   itemToBeDeleted.value.title = title;
//   itemToBeDeleted.value.id = id;

//   // if (isProduct) {
//   //   itemToBeDeleted.value = { id, categoryId, title, type: 'Produto', description };
//   // }
//   // if (!isProduct) {
//   //   itemToBeDeleted.value = { id, title, type: 'Categoria' };
//   //   warningMessage.value =
//   //     'Ao deletar uma categoria, todos os produtos que estão nela também serão deletados!';
//   // }
//   return (showAlertDialog.value = !showAlertDialog.value);
// };

// const clearModalData = () => {
//   return (editModalData.value = {} as Product);
// };

// const getEmitEditModal = (cardData: Product) => {
//   editModalData.value = cardData;
//   return toggleEditModal();
// };

// const changeMenu = async (id: string, categoryTitle: string) => {
//   const { categoryWithProducts } = categoryStore;
//   const categoryExist = categoryWithProducts.some((e) => e.id === id);

//   if (!categoryExist) await categoryStore.getCategoryWithProducts(id);

//   currentCategory.value = { id, title: categoryTitle };

//   updateMenu(id);
// };

// const saveData = (newData: Product | Category) => {
//   const isProduct: boolean = 'description' in newData && 'price' in newData;
//   const { id } = newData;

//   if (isProduct) {
//     return !id ? addNewProduct(newData as Product) : updateProduct(newData as Product);
//   }
//   if (!isProduct) {
//     return !id ? addNewCategory(newData as Category) : updateCategory(newData as Category);
//   }
// };

// const updateCategory = async (newData: Category) => {
//   const { accessToken } = userStore.user;
//   await categoryStore.updateCategory(newData, accessToken);
//   await categoryStore.getCategories();
//   return toggleEditModal();
// };

// const addNewCategory = async (NewCategoryData: Category) => {
//   const { accessToken } = userStore.user;
//   await categoryStore.addNewCategory(NewCategoryData, accessToken);
//   await categoryStore.getCategories();
//   return toggleEditModal();
// };

// const deleteProduct = async (id: string, categoryId: string) => {
//   const { accessToken } = userStore.user;

//   await categoryStore.deleteProductById(id, accessToken);
//   await categoryStore.getCategoryWithProducts(categoryId);
//   updateMenu(categoryId);
// };

// const deleteCategory = async (id: string) => {
//   const { accessToken } = userStore.user;
//   await categoryStore.deleteCategoryById(id, accessToken);
//   await categoryStore.getCategories();
// };

// const deleteItem = async () => {
//   // const { id, categoryId, description } = itemToBeDeleted.value;

//   // const isProduct = !!description;
//   // if (isProduct) await deleteProduct(id, categoryId);
//   // if (!isProduct) await deleteCategory(id);

//   const nextCategoryId = categoryStore.categories[0].id;
//   const nextCategoryTitle = categoryStore.categories[0].title;
//   changeMenu(nextCategoryId, nextCategoryTitle);

//   return toggleAlertDialog({} as Category | Product);
// };

// const addNewProduct = async (NewProduct: Product) => {
//   const { accessToken } = userStore.user;
//   const categoryId = currentCategory.value.id;

//   NewProduct.categoryId = categoryId;

//   await categoryStore.addNewProduct(NewProduct, accessToken);
//   await categoryStore.getCategoryWithProducts(categoryId);

//   updateMenu(categoryId);
//   toggleEditModal();
// };

// const updateProduct = async (product: Product) => {
//   const { accessToken } = userStore.user;
//   const { categoryId } = product;

//   await categoryStore.updateProduct(product, accessToken);
//   await categoryStore.getCategoryWithProducts(categoryId);

//   updateMenu(categoryId);
//   toggleEditModal();
//   clearModalData();
// };

// const updateMenu = (categoryId: string) => {
//   const { categoryWithProducts } = categoryStore;
//   categoryWithProducts.forEach((e) => {
//     if (categoryId === e.id) return (menu.value = e.product);
//   });
// };

const props = defineProps({
  editMode: {
    type: Boolean,
    default: false
  }
});

const categoryStore = useCategoryStore();
const menuStore = useMenuStore();
const userStore = useUserStore();

const showEditCategoryModal = ref<Boolean>(false);
const showAlertDialog = ref<Boolean>(false);
const currentCategory = ref<Category>({} as Category);
const categorieWillBeDeleted = ref<Category>({} as Category);
const categorieWillBeEdited = ref<Category>({} as Category);

const toggleCategoryEditModal = () => {
  showEditCategoryModal.value = !showEditCategoryModal.value;
};

const toggleAlertDialog = () => {
  showAlertDialog.value = !showAlertDialog.value;
};

const updateCategory = async (category: Category, accessToken: string) => {
  const { id: menuId } = menuStore.menu;
  await categoryStore.updateCategory(category, accessToken);
  await categoryStore.getCategories(menuId);
  categorieWillBeEdited.value = {} as Category;
  categoryState.title.value = '';
  toggleCategoryEditModal();
};

const createCategory = async (category: Category, accessToken: string) => {
  const hasError = !!categoryState.title.error;
  if (!hasError) {
    const { id: menuId } = menuStore.menu;
    await categoryStore.createCategory(category, accessToken);
    await categoryStore.getCategories(menuId);
    categoryState.title.value = '';
    toggleCategoryEditModal();
  }
};
const functionCategory = async () => {
  const { accessToken } = userStore.user;

  const isToBeEdited = !!categorieWillBeEdited.value.id;

  if (isToBeEdited) {
    const { value: title } = categoryState.title;
    const { id, menuId } = categorieWillBeEdited.value;
    await updateCategory({ id, menuId, title } as Category, accessToken);
    categorieWillBeEdited.value = {} as Category;
  }

  if (!isToBeEdited) {
    const { id: menuId } = menuStore.menu;
    const { value: title } = categoryState.title;
    await createCategory({ menuId, title } as Category, accessToken);
  }
};

const categoryState = reactive({
  title: {
    value: '',
    error: '',
    validator: () => {
      categoryState.title.error = validateEmptyText(categoryState.title.value);
    }
  }
});

const deleteCategory = async (category: Category) => {
  const { accessToken } = userStore.user;
  const { id: menuId } = menuStore.menu;
  await categoryStore.deleteCategoryById(category.id, accessToken);
  await categoryStore.getCategories(menuId);
  toggleAlertDialog();
};

onMounted(async () => {
  const { id: menuId } = menuStore.menu;
  await categoryStore.getCategories(menuId);
  const firstCategory: Category = categoryStore.categories[0];
  currentCategory.value = firstCategory;
  setCategoryFocus(firstCategory.id, firstCategory.id);
});

const setCategoryFocus = (categoryId: string, currentCategoryId: string) => {
  const onFocus = categoryId === currentCategoryId;
  return onFocus ? 'border-[#67177b] text-[#67177b]' : '';
};
</script>

<template>
  <div class="flex flex-col">
    <div class="no-scrollbar mx-auto flex w-[max-content] max-w-[90%] items-center overflow-auto">
      <div class="cursor-pointer p-[12px]" v-if="props.editMode" @click="toggleCategoryEditModal()">
        <PlusIcon color="#FF393A" :width="24" :height="24" />
      </div>
      <div class="flex" v-for="category in categoryStore.categories" :key="category.id">
        <button
          :class="setCategoryFocus(category.id, currentCategory.id)"
          class="min-w-max border-b-4 p-[12px] font-notosans font-bold text-[#5F5F5F] focus-visible:outline-none"
          @click="currentCategory = category"
          autofocus
        >
          {{ category.title }}
        </button>
        <div class="flex">
          <EditIcon
            class="mr-[6px]"
            v-if="props.editMode"
            @click="
              () => {
                categorieWillBeEdited = category;
                categoryState.title.value = category.title;
                toggleCategoryEditModal();
              }
            "
            color="#FF393A"
            :width="20"
            :height="20"
          />
          <DeleteIcon
            v-if="props.editMode"
            color="#FF393A"
            @click="
              () => {
                categorieWillBeDeleted = category;
                toggleAlertDialog();
              }
            "
            :width="20"
            :height="20"
          />
        </div>
      </div>
    </div>
    <div v-for="category in categoryStore.categories" :key="category.id">
      <div class="my-[30px] rounded-lg bg-[#67177b] pl-[5%]">
        <p class="p-[12px] font-notosans font-bold uppercase text-white">
          {{ category.title }}
        </p>
      </div>
    </div>
    <div>
      <EditModal
        v-if="showEditCategoryModal"
        @cancel="
          () => {
            categoryState.title.value = '';
            toggleCategoryEditModal();
          }
        "
        @save="functionCategory()"
        :button-is-disabled="!!validateEmptyText(categoryState.title.value)"
      >
        <BaseInput
          type="text"
          maxlength="30"
          @validate="categoryState.title.validator"
          label="Nome da Categoria"
          v-model="categoryState.title.value"
          :error-message="categoryState.title.error"
        />
      </EditModal>
      <AlertDialog
        v-if="showAlertDialog"
        :name="categorieWillBeDeleted.title"
        @allow="deleteCategory(categorieWillBeDeleted)"
        @not-allow="toggleAlertDialog()"
      />
    </div>
  </div>

  <!-- <div class="menu-horizontal">
    <div class="menus" v-for="(category, index) in categoryStore.categories" :key="index">
      <button @click="changeMenu(category.id, category.title)" autofocus>
        {{ category.title }}
      </button>
      <div class="icons">
        <EditIcon
          v-if="props.editMode"
          @click="openEditModalForCategory(category.id, category.title)"
          color="black"
          :width="20"
          :height="20"
        />
        <DeleteIcon
          v-if="props.editMode"
          @click="toggleAlertDialog(category)"
          color="black'"
          :width="20"
          :height="20"
        />
      </div>
    </div>
    <div class="add-menu" v-if="props.editMode">
      <PlusIcon @click="openEditModalForCategory()" color="black" :width="30" :height="30" />
    </div>
  </div>
  <h3>{{ currentCategory.title }}</h3>
  <ul>
    <li class="add-card" v-if="props.editMode">
      <PlusIcon @click="toggleEditModal" color="black" />
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
  /> -->
</template>

<!-- <style lang="scss" scoped>
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
</style> -->
