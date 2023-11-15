import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Menu } from '@/utils/interfaces/Menu';
import { v4 as uuidv4 } from 'uuid';

export const useMenuStore = defineStore('menuManagement', () => {
  const menus = ref<Menu[]>([] as Menu[]);

  const createMenu = async (menu: Menu, accessToken: string): Promise<void> => {
    const url: string = import.meta.env.VITE_MENU_URL;
    menu.id = uuidv4();
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          "Authorization": 'Bearer ' + accessToken
        },
        body: JSON.stringify(menu)
      });
    } catch (error) {
      console.error(error);
    }
  };
  return {
    menus,
    createMenu
  };
});
