import type { Product } from '@/utils/interfaces/Product';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProductStore = defineStore('productManagement', () => {
  const products = ref<Product[]>([] as Product[]);

  const createProduct = async (newProduct: Product, accessToken: string): Promise<Product> => {
    const url: string = import.meta.env.VITE_PRODUCT_URL;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          "Authorization": 'Bearer ' + accessToken
        },
        body: JSON.stringify(newProduct)
      });

      const product = await response.json();
      products.value.push(product);

      return product;
    } catch (error) {
      console.error(error);
      return {} as Product;
    }
  };

  const updateProduct = async (
    newProduct: Partial<Product>,
    accessToken: string
  ): Promise<void> => {
    const url: string = import.meta.env.VITE_PRODUCT_URL;
    const { id } = newProduct;

    try {
      const response = await fetch(url + '/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          "Authorization": 'Bearer ' + accessToken
        },
        body: JSON.stringify(newProduct)
      });
      const product = await response.json();

      products.value = products.value.map((item) => (item.id === product.id ? product : item));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProductById = async (id: number, accessToken: string): Promise<void> => {
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
