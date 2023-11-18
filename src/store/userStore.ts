import type { User } from '@/utils/interfaces/User';
import type { User as UserFirebase } from 'firebase/auth';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('userProfile', () => {
  const user = ref<User>({} as User);
  const userCredential = ref<UserFirebase>({} as UserFirebase);

  const isAuthenticated = (): boolean => {
    return user.value.id ? true : false;
  };

  const createUser = async (userData: User): Promise<void> => {
    const url: string = import.meta.env.VITE_USER_URL;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      user.value = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async (userId: string): Promise<void> => {
    const url: string = import.meta.env.VITE_USER_URL;
    try {
      const response = await fetch(`${url}/${userId}`);
      user.value = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (userData: User, accessToken: string): Promise<void> => {
    const url: string = import.meta.env.VITE_USER_URL;
    const { id } = userData;
    try {
      await fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          "Authorization": 'Bearer ' + accessToken
        },
        body: JSON.stringify(userData)
      });
    } catch (error) {
      console.error(error);
    }
  };
  return {
    user,
    userCredential,
    isAuthenticated,
    createUser,
    getUser,
    updateUser
  };
});
