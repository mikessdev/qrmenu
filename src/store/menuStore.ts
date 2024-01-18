import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Menu } from '@/utils/interfaces/Menu';
import { v4 as uuidv4 } from 'uuid';
import type { Result } from '@/utils/interfaces/Response';
import { Status } from '@/utils/enuns/status';

export const useMenuStore = defineStore('menuManagement', () => {
  const menus = ref<Menu[]>([] as Menu[]);
  const menu = ref<Menu>({} as Menu);

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

  const getMenus = async (userId: string, accessToken: string): Promise<void> => {
    const url: string = import.meta.env.VITE_MENU_URL;
    try {
      const response = await fetch(`${url}/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          "Authorization": 'Bearer ' + accessToken
        }
      });
      const result: Result = await response.json();
      const success = result.status === Status.SUCCESS;

      if (success) {
        menus.value = result.message;
      }

      if (!success) {
        menus.value = [];
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getMenuByURL = async (menuURL: string): Promise<void> => {
    const url: string = import.meta.env.VITE_MENU_URL;
    try {
      const response = await fetch(`${url}/url/${menuURL}`);

      const result: Result = await response.json();
      const success = result.status === Status.SUCCESS;

      if (success) {
        menu.value = result.message;
      }

      if (!success) {
        menu.value = {} as Menu;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateMenu = async (newMenu: Menu, accessToken: string): Promise<void> => {
    const url: string = import.meta.env.VITE_MENU_URL;
    const { id } = newMenu;

    try {
      await fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          "Authorization": 'Bearer ' + accessToken
        },
        body: JSON.stringify(newMenu)
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMenuById = async (menuId: string, accessToken: string): Promise<void> => {
    const url: string = import.meta.env.VITE_MENU_URL;

    try {
      await fetch(`${url}/${menuId}`, {
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
    menus,
    menu,
    createMenu,
    getMenus,
    getMenuByURL,
    updateMenu,
    deleteMenuById
  };
});
