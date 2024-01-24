import { useAuthStore } from '@/store/authStore';
import { type RouteLocationNormalized } from 'vue-router';

export default async function authMiddleware(to: RouteLocationNormalized): Promise<any> {
  const authStore = useAuthStore();
  const isAuthenticated = await authStore.isAuthenticated();
  const isLoginPage = to.name === 'login';

  if (!isAuthenticated && isLoginPage) return true;
  if (isAuthenticated && isLoginPage) return { name: 'landingPage' };
  if (!isAuthenticated) return { name: 'login' };
  return true;
}
