import { useUserStore } from '@/store/userStore';

export default function emailVerificationMiddleware(): boolean | object {
  const userStore = useUserStore();
  const isEmailVerified = userStore.user.emailVerified;
  const allow = true;

  if (!isEmailVerified) return { name: 'register-complete' };

  return allow;
}
