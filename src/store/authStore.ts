import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  type UserCredential
} from 'firebase/auth';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { firebaseAuth } from '@/firebase/config';

export const useAuthStore = defineStore('authManagement', () => {
  const userCredential = ref<UserCredential>({} as UserCredential);

  const signinWithFirebase = async (email: string, password: string): Promise<void> => {
    try {
      userCredential.value = await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const signUpWithFirebase = async (email: string, password: string) => {
    try {
      userCredential.value = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      userCredential.value = await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
    } catch (error) {
      console.error(error);
    }
  };

  return {
    userCredential,
    signinWithFirebase,
    signUpWithFirebase,
    signInWithGoogle
  };
});
