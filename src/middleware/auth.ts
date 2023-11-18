import router from '@/router';
import { useUserStore } from '@/store/userStore';

export default function authMiddleware(): void | boolean {
  const userStore = useUserStore();

  if (userStore.isAuthenticated()) {
    return true;
  }

  if (!userStore.isAuthenticated()) {
    router.push('/login');
  }
}
