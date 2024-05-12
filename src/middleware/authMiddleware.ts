import { useAuthComposable } from '@/composables/useAuthComposable';
import { useAuthStore } from '@/store/authStore';
import { type RouteLocationNormalized } from 'vue-router';

export default async function authMiddleware(
  to: RouteLocationNormalized
): Promise<boolean | object> {
  const authStore = useAuthStore();
  const { isAuthenticated } = useAuthComposable();

  await authStore.checkAuthState();
  const isLoginPage = to.name === 'login';
  const allow = true;

  if (!isAuthenticated.value && isLoginPage) return allow;
  if (isAuthenticated.value && isLoginPage) return { name: 'landingPage' };
  if (!isAuthenticated.value) return { name: 'login' };

  return allow;
}
