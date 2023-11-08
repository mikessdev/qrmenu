import type { User } from '@/utils/interfaces/User';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('userProfile', () => {
  const user = ref<User>({} as User);

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

  const getUser = async (): Promise<User> => {
    return {} as User;
  };

  const updateUser = async (): Promise<void> => {
    //...
  };
  return {
    user,
    createUser,
    getUser,
    updateUser
  };
});
