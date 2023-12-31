import router from '@/router';
import { useUserStore } from '@/store/userStore';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';

export default async function authMiddleware(): Promise<boolean | void> {
  const auth = getAuth();
  const userStore = useUserStore();

  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user: User | null) => {
      const isAuthenticated = user;
      if (isAuthenticated) {
        userStore.user.accessToken = await user.getIdToken();
        userStore.user.id = user.uid;

        resolve(true);
      }
      if (!isAuthenticated) {
        router.push('/login');
      }
    });
  });
}
