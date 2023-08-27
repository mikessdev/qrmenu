import type { Category, CategoryWithProducts } from '@/utils/interfaces/Category';
import type { Menu } from '@/utils/interfaces/Menu';
import type { Product } from '@/utils/interfaces/Product';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export const useCategoryStore = defineStore('categoryManagement', () => {
  const categories = ref<Category[]>([] as Category[]);
  const categoryWithProducts = ref<CategoryWithProducts[]>([] as CategoryWithProducts[]);

  const getCategoryWithProducts = async (categoryId: string): Promise<void> => {
    const url: string = import.meta.env.VITE_CATEGORY_URL;
    const response = await fetch(url + categoryId);
    categoryWithProducts.value.push(await response.json());
  };

  const getCategories = async (): Promise<void> => {
    const url: string = import.meta.env.VITE_CATEGORY_URL;
    const response = await fetch(url);
    categories.value = await response.json();
  };

  const addNewProduct = async (newProduct: Product, accessToken: string): Promise<void> => {
    const url: string = import.meta.env.VITE_PRODUCT_URL;
    newProduct.id = uuidv4();
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // prettier-ignore
        "Authorization": 'Bearer ' + accessToken
      },
      body: JSON.stringify(newProduct)
    });
  };

  const updateProduct = async (newProduct: Product, accessToken: string): Promise<void> => {
    const url: string = import.meta.env.VITE_PRODUCT_URL;
    const { id } = newProduct;

    await fetch(url + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // prettier-ignore
        "Authorization": 'Bearer ' + accessToken
      },
      body: JSON.stringify(newProduct)
    });
  };

  const deleteProductById = async (id: string, accessToken: string): Promise<void> => {
    const url: string = import.meta.env.VITE_PRODUCT_URL;

    await fetch(url + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // prettier-ignore
        "Authorization": 'Bearer ' + accessToken
      }
    });
  };

  const updateCategory = async (newCategory: Category, accessToken: string): Promise<void> => {
    const url: string = import.meta.env.VITE_CATEGORY_URL;
    const { id } = newCategory;

    await fetch(url + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // prettier-ignore
        "Authorization": 'Bearer ' + accessToken
      },
      body: JSON.stringify(newCategory)
    });
  };

  const deleteCategoryById = async (id: string, accessToken: string): Promise<void> => {
    const url: string = import.meta.env.VITE_CATEGORY_URL;

    await fetch(url + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // prettier-ignore
        "Authorization": 'Bearer ' + accessToken
      }
    });
  };

  const addNewCategory = async (newCategory: Category, accessToken: string): Promise<void> => {
    const url: string = import.meta.env.VITE_CATEGORY_URL;
    newCategory.id = uuidv4();
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // prettier-ignore
        "Authorization": 'Bearer ' + accessToken
      },
      body: JSON.stringify(newCategory)
    });
  };

  return {
    categories,
    categoryWithProducts,
    getCategories,
    getCategoryWithProducts,
    addNewProduct,
    addNewCategory,
    updateProduct,
    updateCategory,
    deleteProductById,
    deleteCategoryById
  };
});
