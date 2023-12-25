import { useMenuStore } from '@/store/menuStore';
import type { RouteLocationNormalized } from 'vue-router';

export default async function menuRoutesMiddleware(
  to: RouteLocationNormalized
): Promise<void | boolean> {
  const { url } = to.params;
  const menuStore = useMenuStore();
  await menuStore.getMenuByURL(url as string);

  return true;
}
