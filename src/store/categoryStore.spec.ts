import { setActivePinia, createPinia } from 'pinia';
import { useCategoryStore } from '@/store/categoryStore';
import { beforeEach, expect, test, describe, beforeAll, afterAll } from 'vitest';
import type { User } from '@/utils/interfaces/User';
import type { Category } from '@/utils/interfaces/Category';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from './userStore';
import { useMenuStore } from './menuStore';
import type { Menu } from '@/utils/interfaces/Menu';

const loadUser = async () => {
  const email = import.meta.env.VITE_TEST_EMAIL;
  const password = import.meta.env.VITE_TEST_PASSWORD;

  const userStore = useUserStore();
  const authStore = useAuthStore();
  await authStore.signinWithFirebase(email, password);

  const { uid: id } = authStore.userCredential.user;

  const user = {
    email: 'test@example.com',
    id,
    name: 'test',
    lastName: 'test',
    emailVerified: true,
    phoneNumber: '1234567890'
  } as User;

  await userStore.createUser(user);

  return {
    accessToken: await authStore.userCredential.user.getIdToken(),
    id
  };
};

const loadMenu = async (accessToken: string, userId: string) => {
  const menuStore = useMenuStore();
  const menu = {
    userId,
    address: '',
    headerImg: '',
    instagram: '',
    name: '',
    openDays: '',
    phoneNumber: '',
    profileImg: '',
    url: 'test'
  } as Menu;
  await menuStore.createMenu(menu, accessToken);

  await menuStore.getMenuByURL('test');

  return menuStore.menu.id;
};

const deleteuUser = async (accessToken: string, id: string) => {
  const userStore = useUserStore();
  await userStore.deleteUserById(id, accessToken);
};

describe('Category Store', async () => {
  let categoryStore: any;
  let accessToken: string;

  let userId: string;
  let menuId: string;
  let categoryId: string;

  beforeEach(() => {});

  beforeAll(async () => {
    setActivePinia(createPinia());
    categoryStore = useCategoryStore();

    //createUser
    const { accessToken: token, id } = await loadUser();
    userId = id;
    accessToken = token;

    //createMenu
    menuId = await loadMenu(accessToken, userId);
  });

  afterAll(async () => {
    await deleteuUser(accessToken, userId);
  });

  test('should create category with data and accessToken', async () => {
    const newCategory = { menuId, title: '' } as Category;

    await expect(categoryStore.createCategory(newCategory, accessToken)).resolves.not.toThrow();
    await expect(categoryStore.getCategories(menuId)).resolves.not.toThrow();

    expect(categoryStore.categories.length).toBe(1);

    //needed for other tests
    categoryId = categoryStore.categories[0].id;
  });

  test('should not create category without data', async () => {
    const newCategory = {} as Category;

    expect(categoryStore.createCategory(newCategory, accessToken)).resolves.toThrowError;
  });

  test('should update a category', async () => {
    const category = { id: categoryId, menuId, title: 'Pizza' } as Category;

    await expect(categoryStore.updateCategory(category, accessToken)).resolves.not.toThrow();
    await expect(categoryStore.getCategories(menuId)).resolves.not.toThrow();

    expect(categoryStore.categories[0].title).toBe('Pizza');
  });

  test('should delete a category by id', async () => {
    await expect(categoryStore.deleteCategoryById(categoryId, accessToken)).resolves.not.toThrow();
    await expect(categoryStore.getCategories(menuId)).resolves.not.toThrow();

    expect(categoryStore.categories.length).toBe(0);
  });
});
