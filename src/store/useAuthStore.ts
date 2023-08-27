import type { User } from '@/utils/interfaces/User';
import { defineStore } from 'pinia';
import { ref } from 'vue';

//TODO Implement communication with the backend when the backend is available

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>({} as User);

  const setUser = (userData: any) => {
    const { accessToken, uid, displayName, email, emailVerified, phoneNumber, photoURL } = userData;

    user.value = {
      accessToken,
      uid,
      displayName,
      email,
      emailVerified,
      phoneNumber,
      photoURL
    } as User;
  };
  return {
    user,
    setUser
  };
});
