import type { Product } from '@/utils/interfaces/Product';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export const useProductStore = defineStore('productManagement', () => {
  const products = ref<Product[]>([] as Product[]);

  const createProduct = async (newProduct: Product, accessToken: string): Promise<void> => {
    const url: string = import.meta.env.VITE_PRODUCT_URL;
    newProduct.id = uuidv4();
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          "Authorization": 'Bearer ' + accessToken
        },
        body: JSON.stringify(newProduct)
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async (newProduct: Product, accessToken: string): Promise<void> => {
    const url: string = import.meta.env.VITE_PRODUCT_URL;
    const { id } = newProduct;

    try {
      await fetch(url + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          "Authorization": 'Bearer ' + accessToken
        },
        body: JSON.stringify(newProduct)
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProductById = async (id: string, accessToken: string): Promise<void> => {
    const url: string = import.meta.env.VITE_PRODUCT_URL;
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

  return {
    products,
    createProduct,
    updateProduct,
    deleteProductById
  };
});
