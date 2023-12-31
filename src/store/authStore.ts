import { signInWithEmailAndPassword, type Auth, type UserCredential } from 'firebase/auth';
import { defineStore } from 'pinia';
import type { User as UserFirebase } from 'firebase/auth';
import { ref } from 'vue';

export const useAuthStore = defineStore('authManagement', () => {
  const user = ref<UserFirebase>({} as UserFirebase);

  const ISignInWithEmailAndPassword = async (
    auth: Auth,
    email: string,
    password: string
  ): Promise<void> => {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    user.value = userCredential.user;
  };

  const getAccessToken = async (): Promise<string> => {
    return user.value.getIdToken();
  };

  return {
    user,
    ISignInWithEmailAndPassword,
    getAccessToken
  };
});
