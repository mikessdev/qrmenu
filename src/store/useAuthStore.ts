import type { User } from '@/utils/interfaces/User';
import { defineStore } from 'pinia';
import { ref } from 'vue';

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
