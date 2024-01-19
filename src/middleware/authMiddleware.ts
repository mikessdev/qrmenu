import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { useUserStore } from '@/store/userStore';
import router from '@/router';
import { useAuthStore } from '@/store/authStore';

export default async function authMiddleware(): Promise<boolean | void> {
  const authStore = useAuthStore();

  const isAuthenticated = await authStore.isAuthenticated();

  if (isAuthenticated) return true;

  if (!isAuthenticated) router.push('/login');
}
