<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeMount } from 'vue';
import { validateEmptyText } from '@/validators/emptyText';
import {
  uploadImage,
  type UploadData,
  donwloadImage,
  type DownloadRef
} from '@/firebase/cloud.storage';
import { StorageFolder } from '@/utils/enuns/firebase';
import type { Category } from '@/utils/interfaces/Category';
import type { Product } from '@/utils/interfaces/Product';
import { useCategoryStore } from '@/store/categoryStore';
import { useUserStore } from '@/store/userStore';
import { useMenuStore } from '@/store/menuStore';
import EditIcon from '@/components/icons/EditIcon.vue';
import { useProductStore } from '@/store/productStore';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import AlertDialog from '@/components/AlertDialog.vue';
import BaseInput from '@/components/BaseInput.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import EditModal from '@/components/EditModal.vue';
import CardProduct from '@/components/CardProduct.vue';
import FileInput from '@/components/FileInput.vue';
import { checkImageSize } from '@/validators/imageLimit';
import { v4 as uuidv4 } from 'uuid';

const props = defineProps({
  editMode: {
    type: Boolean,
    default: false
  }
});

const MAX_IMAGE_SIZE_BYTES = 500000; //0.5Mb;

const menuStore = useMenuStore();
const userStore = useUserStore();
const categoryStore = useCategoryStore();
const productStore = useProductStore();

const showEditCategoryModal = ref<Boolean>(false);
const showEditProductModal = ref<Boolean>(false);
const showAlertDialog = ref<Boolean>(false);

const reassembleMenu = ref<Boolean>(false);

const currentCategory = ref<Category>({} as Category);

const categorieWillBeDeleted = ref<Category>({} as Category);
const categorieWillBeEdited = ref<Category>({} as Category);

const productWillBeDeleted = ref<Product>({} as Product);
const productWillBeEdited = ref<Product>({} as Product);

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
const actionCategory = async () => {
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

const productState = reactive({
  image: {
    value: {} as File,
    error: '',
    validator: () => {
      productState.image.error = checkImageSize(
        productState.image.value.size,
        MAX_IMAGE_SIZE_BYTES
      );
    }
  },
  title: {
    value: '',
    error: '',
    validator: () => {
      productState.title.error = validateEmptyText(productState.title.value);
    }
  },
  description: {
    value: '',
    error: '',
    validator: () => {
      productState.description.error = validateEmptyText(productState.description.value);
    }
  },
  price: {
    value: '',
    error: '',
    validator: () => {
      productState.price.error = validateEmptyText(productState.price.value);
    }
  },
  unit: {
    value: '',
    error: '',
    validator: () => {
      productState.unit.error = validateEmptyText(productState.unit.value);
    }
  }
});

const cleanCategoryState = () => {
  categoryState.title.value = '';
  categoryState.title.error = '';
};

const cleanProductState = () => {
  productWillBeEdited.value = {} as Product;
  productState.title.error = '';
  productState.description.error = '';
  productState.price.error = '';
  productState.unit.error = '';

  productState.title.value = '';
  productState.description.value = '';
  productState.price.value = '';
  productState.unit.value = '';
};

const deleteCategory = async (id: string) => {
  const { accessToken } = userStore.user;
  await categoryStore.deleteCategoryById(id, accessToken);
};

const setCategoryFocus = (categoryId: string, currentCategoryId: string) => {
  const { primaryColor: color } = menuStore.menu;
  const onFocus = categoryId === currentCategoryId;
  return onFocus ? `border-color: ${color}; color: ${color};` : '';
};

const sertCategorySeparatorFocus = (categoryId: string, currentCategoryId: string) => {
  const onFocus = categoryId === currentCategoryId;
  return onFocus
    ? `background-color: ${menuStore.menu.primaryColor}; color: #FFF`
    : `background-color: #E0E0E0; color: ${menuStore.menu.primaryColor};`;
};

const toggleProductEditModal = () => {
  showEditProductModal.value = !showEditProductModal.value;
};

const productButtonIsDisabled = (): boolean => {
  const titleIsEmpty = !!validateEmptyText(productState.title.value);
  const descriptionIsEmpty = !!validateEmptyText(productState.description.value);
  const priceIsEmpty = !!validateEmptyText(productState.price.value);
  const unitIsEmpty = !!validateEmptyText(productState.unit.value);

  const ImageHasError = !!productState.image.error;
  const titleHasError = !!productState.title.error;
  const descriptionHasError = !!productState.description.error;
  const priceHasError = !!productState.price.error;
  const unitHasError = !!productState.unit.error;

  const anyFieldEmpyt = titleIsEmpty || descriptionIsEmpty || priceIsEmpty || unitIsEmpty;
  const anyFieldHasError =
    ImageHasError || titleHasError || descriptionHasError || priceHasError || unitHasError;

  return anyFieldEmpyt || anyFieldHasError ? true : false;
};

const actionProduct = async () => {
  const { id: menuId } = menuStore.menu;

  const isToBeEdited = !!productWillBeEdited.value.id;

  if (isToBeEdited) {
    await updateProduct();
  }

  if (!isToBeEdited) {
    await createProduct();
  }

  await categoryStore.getCategories(menuId);
  toggleProductEditModal();
  cleanProductState();
};

const updateProduct = async () => {
  const { id, categoryId, likes, image: imageURL } = productWillBeEdited.value;
  const { image, description, price, unit, title } = productState;

  let newImage = imageURL;

  if (image.value.name) {
    newImage = await setImage(image.value, id);
  }

  const product = {
    id,
    categoryId,
    title: title.value,
    image: newImage,
    description: description.value,
    price: price.value,
    unit: unit.value,
    likes
  } as unknown as Product;

  const { accessToken } = userStore.user;
  await productStore.updateProduct(product, accessToken);
};

const deleteProduct = async (id: string) => {
  const { accessToken } = userStore.user;
  await productStore.deleteProductById(id, accessToken);
};

const allowAlertDialog = async () => {
  const categoryId = categorieWillBeDeleted.value.id;
  const isCategory = !!categoryId;

  const productId = productWillBeDeleted.value.id;
  const isProduct = !!productId;

  if (isCategory) {
    await deleteCategory(categoryId);
  }

  if (isProduct) {
    await deleteProduct(productId);
  }
  const { id: menuId } = menuStore.menu;
  await categoryStore.getCategories(menuId);
  toggleAlertDialog();
};

const createProduct = async () => {
  const { accessToken } = userStore.user;
  const { id: categoryId } = currentCategory.value;
  const { title, description, price, unit, image } = productState;
  const id = uuidv4();

  const product: Product = {
    id,
    categoryId,
    title: title.value,
    image: await setImage(image.value, id),
    description: description.value,
    price: price.value,
    unit: unit.value,
    likes: 0
  } as Product;
  await productStore.createProduct(product, accessToken);
  await menuStore.updateMenu(menuStore.menu, accessToken);
};

const setImage = async (file: File, productId: string): Promise<string> => {
  const { id: userId } = userStore.user;
  const { id: menuId } = menuStore.menu;
  const { id: categorId } = currentCategory.value;

  await uploadImage({
    file,
    userId,
    menuId,
    categorId,
    folder: StorageFolder.Products,
    fileName: productId
  } as UploadData);

  return await donwloadImage({
    userId,
    menuId,
    categorId,
    folder: StorageFolder.Products,
    fileName: productId
  } as DownloadRef);
};

const scrollCategoryAnimation = (e: Event, selector: string) => {
  e.preventDefault();
  const element = document.querySelector(selector);
  let headerHeight: number = 60;
  if (element instanceof HTMLElement) {
    if (!reassembleMenu.value) headerHeight = 120;

    window.scrollTo({
      top: element.offsetTop - headerHeight,
      behavior: 'smooth'
    });
  }
};

const setupHorizontalMenu = async () => {
  const { id: menuId } = menuStore.menu;
  await categoryStore.getCategories(menuId);
  const firstCategory: Category = categoryStore.categories[0];
  currentCategory.value = firstCategory;
  setCategoryFocus(firstCategory.id, firstCategory.id);
};

onMounted(async () => {
  await setupHorizontalMenu();
  window.addEventListener('scroll', handleScroll);
});

onBeforeMount(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  reassembleMenuNavigation(window.scrollY);
};

const reassembleMenuNavigation = (scrollY: number) => {
  const yLimit = 680;
  return (reassembleMenu.value = scrollY >= yLimit);
};
</script>

<template>
  <div class="flex flex-col">
    <div
      :class="[
        reassembleMenu
          ? 'no-scrollbar fixed left-0 top-0 z-50 flex min-h-[60px] w-[100%] items-center justify-center overflow-auto shadow-sm backdrop-blur-xl'
          : 'no-scrollbar mx-auto flex w-[max-content] max-w-[90%] items-center overflow-auto '
      ]"
    >
      <div class="cursor-pointer p-[12px]" v-if="props.editMode" @click="toggleCategoryEditModal()">
        <PlusIcon :color="menuStore.menu.primaryColor" :width="24" :height="24" />
      </div>
      <nav class="flex">
        <ul v-for="category in categoryStore.categories" :key="category.id">
          <li
            :style="setCategoryFocus(category.id, currentCategory.id)"
            class="flex min-w-max gap-4 border-b-4 p-[12px] font-notosans font-bold text-[#5F5F5F] focus-visible:outline-none"
          >
            <a
              :href="`#${category.title.replace(' ', '')}`"
              @click="
                (e) => {
                  scrollCategoryAnimation(e, `#${category.title.replace(' ', '')}`);
                  currentCategory = category;
                }
              "
            >
              {{ category.title }}
            </a>
            <div v-if="props.editMode" class="flex items-center">
              <EditIcon
                class="mr-[6px]"
                @click="
                  () => {
                    categorieWillBeEdited = category;
                    categoryState.title.value = category.title;
                    toggleCategoryEditModal();
                  }
                "
                :color="menuStore.menu.primaryColor"
                :width="20"
                :height="20"
              />
              <DeleteIcon
                :color="menuStore.menu.primaryColor"
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
          </li>
        </ul>
      </nav>
    </div>
    <div v-for="category in categoryStore.categories" :key="category.id">
      <a :id="category.title.replace(' ', '')" :name="category.title.replace(' ', '')">
        <div
          :style="sertCategorySeparatorFocus(category.id, currentCategory.id)"
          class="my-[30px] rounded-lg pl-[5%]"
        >
          <p class="p-[12px] font-notosans font-bold uppercase">
            {{ category.title }}
          </p>
        </div>
      </a>

      <div class="flex">
        <ul class="flex flex-wrap gap-2">
          <li
            class="flex h-[200px] w-[400px] cursor-pointer items-center justify-center"
            v-if="props.editMode"
            @click="
              () => {
                currentCategory = category;
                toggleProductEditModal();
              }
            "
          >
            <PlusIcon :color="menuStore.menu.primaryColor" :width="30" :height="30" />
          </li>
          <li v-for="product in category.products" :key="product.id">
            <div class="flex flex-col-reverse">
              <CardProduct :product="product" />
              <div class="relative bottom-[6px] left-[350px] flex">
                <EditIcon
                  class="mr-[6px]"
                  v-if="props.editMode"
                  @click="
                    () => {
                      productWillBeEdited = product;
                      productState.title.value = product.title;
                      productState.description.value = product.description;
                      productState.price.value = product.price;
                      productState.unit.value = product.unit;
                      categoryState.title.value = category.title;
                      toggleProductEditModal();
                    }
                  "
                  :color="menuStore.menu.primaryColor"
                  :width="20"
                  :height="20"
                />
                <DeleteIcon
                  v-if="props.editMode"
                  :color="menuStore.menu.primaryColor"
                  @click="
                    () => {
                      productWillBeDeleted = product;
                      toggleAlertDialog();
                    }
                  "
                  :width="20"
                  :height="20"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <EditModal
        v-if="showEditProductModal"
        @cancel="
          () => {
            cleanProductState();
            toggleProductEditModal();
          }
        "
        @save="actionProduct"
        :button-is-disabled="productButtonIsDisabled()"
      >
        <FileInput
          label="Imagem do produto"
          @validate="productState.image.validator"
          v-model="productState.image.value"
          :error-message="productState.image.error"
          :preview-by-u-r-l="productWillBeEdited.image"
        />
        <BaseInput
          type="text"
          maxlength="30"
          @validate="productState.title.validator"
          label="Nome do Produto"
          v-model="productState.title.value"
          :error-message="productState.title.error"
        />
        <BaseInput
          type="text"
          maxlength="30"
          @validate="productState.description.validator"
          label="Descrição do Produto"
          v-model="productState.description.value"
          :error-message="productState.description.error"
        />
        <BaseInput
          type="text"
          maxlength="30"
          @validate="productState.price.validator"
          label="Valor do Produto"
          v-model="productState.price.value"
          :error-message="productState.price.error"
        />
        <BaseInput
          type="text"
          maxlength="30"
          @validate="productState.unit.validator"
          label="O valor se refere a qual quantidade?"
          placeholder="Ex: 1 unidade ou 500g"
          v-model="productState.unit.value"
          :error-message="productState.unit.error"
        />
      </EditModal>

      <EditModal
        v-if="showEditCategoryModal"
        @cancel="
          () => {
            cleanCategoryState();
            toggleCategoryEditModal();
          }
        "
        @save="actionCategory()"
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
        @allow="allowAlertDialog()"
        @not-allow="toggleAlertDialog()"
      />
    </div>
  </div>
</template>
