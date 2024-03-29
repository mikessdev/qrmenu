import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  type UserCredential,
  signOut,
  onAuthStateChanged,
  type User,
  getAuth
} from 'firebase/auth';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { firebaseAuth } from '@/firebase/config';
import { useUserStore } from './userStore';
import { type User as CustomUser } from '@/utils/interfaces/User';

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

  const signOutWithFirebase = async () => {
    const userStore = useUserStore();

    try {
      await signOut(firebaseAuth);
      userCredential.value = {} as UserCredential;
      userStore.user = {} as CustomUser;
    } catch (error) {
      console.error('Erro durante o logout:', error);
    }
  };

  const isAuthenticated = async (): Promise<boolean> => {
    const auth = getAuth();
    const userStore = useUserStore();
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user: User | null) => {
        const isAuthenticated = user;
        if (isAuthenticated) {
          await userStore.getUser(user.uid);
          userStore.user.accessToken = await user.getIdToken();
          resolve(true);
        }

        if (!isAuthenticated) {
          userStore.user = {} as CustomUser;
          userCredential.value = {} as UserCredential;
          resolve(false);
        }
      });
    });
  };

  return {
    userCredential,
    isAuthenticated,
    signinWithFirebase,
    signUpWithFirebase,
    signInWithGoogle,
    signOutWithFirebase
  };
});
