import router from '@/router';
import { useUserStore } from '@/store/userStore';

export default function emailVerificationMiddleware(): boolean | object {
  const userStore = useUserStore();
  const isEmailVerified = userStore.user.emailVerified;

  if (!isEmailVerified) return { name: 'register-complete' };

  return true;
}
