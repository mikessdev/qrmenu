import type { User } from '@/utils/interfaces/User';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('userProfile', () => {
  const user = ref<User>({} as User);
  const userCredential = ref<any>({} as any);

  const createUser = async (user: User): Promise<void> => {
    const url: string = import.meta.env.VITE_USER_URL;
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
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

  const updateUser = async (): Promise<void> => {
    //...
  };
  return {
    user,
    userCredential,
    createUser,
    getUser
  };
});
