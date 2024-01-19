import type { Category } from '@/utils/interfaces/Category';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { Status } from '@/utils/enuns/status';
import type { Result } from '@/utils/interfaces/Result';

export const useCategoryStore = defineStore('categoryManagement', () => {
  const categories = ref<Category[]>([] as Category[]);

  const getCategories = async (menuId: string): Promise<void> => {
    const url: string = import.meta.env.VITE_CATEGORY_URL;
    try {
      const response = await fetch(url + '?menuId=' + menuId);
      const result: Result = await response.json();
      const success = result.status === Status.SUCCESS;
      if (success) {
        categories.value = result.message;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateCategory = async (newCategory: Category, accessToken: string): Promise<void> => {
    const url: string = import.meta.env.VITE_CATEGORY_URL;
    const { id } = newCategory;
    try {
      await fetch(url + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          "Authorization": 'Bearer ' + accessToken
        },
        body: JSON.stringify(newCategory)
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategoryById = async (id: string, accessToken: string): Promise<void> => {
    const url: string = import.meta.env.VITE_CATEGORY_URL;
    try {
      await fetch(url + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          "Authorization": 'Bearer ' + accessToken
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createCategory = async (newCategory: Category, accessToken: string): Promise<void> => {
    const url: string = import.meta.env.VITE_CATEGORY_URL;
    newCategory.id = uuidv4();
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          "Authorization": 'Bearer ' + accessToken
        },
        body: JSON.stringify(newCategory)
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    categories,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategoryById
  };
});
