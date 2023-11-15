import router from '@/router';
import { useUserStore } from '@/store/userStore';

export default function authMiddleware(): void | boolean {
  const userStore = useUserStore();

  const user = userStore.user;
  if (!user.id) {
    router.push('/login');
  }

  if (user.id) {
    return true;
  }
}
