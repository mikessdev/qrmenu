import { Status } from '@/utils/enuns/status';
import type { Result } from '@/utils/interfaces/Result';
import type { User } from '@/utils/interfaces/User';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('userProfile', () => {
  const user = ref<User>({} as User);
  const userBusy = ref<Boolean>(false);

  const createUser = async (userData: User, accessToken: string): Promise<void> => {
    const url: string = import.meta.env.VITE_USER_URL;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken
        },
        body: JSON.stringify(userData)
      });

      const result: Result = await response.json();
      const success = result.status === Status.SUCCESS;
      if (success) {
        user.value = result.message;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getUser = async (userId: string): Promise<void> => {
    const url: string = import.meta.env.VITE_USER_URL;
    try {
      const response = await fetch(`${url}/${userId}`);
      const result: Result = await response.json();
      const success = result.status === Status.SUCCESS;
      if (success) {
        user.value = result.message;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getUserByFirebaseId = async (firebaseId: string, accessToken: string): Promise<void> => {
    userBusy.value = true;
    const url: string = import.meta.env.VITE_USER_URL;
    try {
      const response = await fetch(`${url}?firebaseId=${firebaseId}`, {
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          "Authorization": 'Bearer ' + accessToken
        }
      });

      user.value = await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      userBusy.value = false;
    }
  };

  const updateUser = async (userData: User, accessToken: string): Promise<void> => {
    const url: string = import.meta.env.VITE_USER_URL;
    const { id } = userData;
    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          "Authorization": 'Bearer ' + accessToken
        },
        body: JSON.stringify(userData)
      });

      const result: Result = await response.json();
      const success = result.status === Status.SUCCESS;

      if (success) {
        user.value = result.message;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteUserById = async (userId: String, accessToken: string): Promise<void> => {
    const url: string = import.meta.env.VITE_USER_URL;
    try {
      await fetch(`${url}/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // prettier-ignore
          "Authorization": 'Bearer ' + accessToken
        }
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return {
    user,
    userBusy,
    createUser,
    getUser,
    getUserByFirebaseId,
    updateUser,
    deleteUserById
  };
});
