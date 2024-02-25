import emailVerificationMiddleware from '@/middleware/emailVerificationMiddleware';
import RegisterCompletePage from '@/pages/RegisterCompletePage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import authMiddleware from '@/middleware/authMiddleware';
import SelectMenuPage from '@/pages/SelectMenuPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import NewMenuPage from '@/pages/NewMenuPage.vue';
import LandingPage from '@/pages/LandingPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import HomePage from '@/pages/HomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingPage
    },
    {
      path: '/:url',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      beforeEnter: async (to) => await authMiddleware(to)
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/register-complete',
      name: 'register-complete',
      component: RegisterCompletePage,
      beforeEnter: async (to) => await authMiddleware(to)
    },
    {
      path: '/select-menu',
      name: 'select-menu',
      component: SelectMenuPage,
      beforeEnter: async (to) => {
        const isAuthenticated = await authMiddleware(to);

        if (isAuthenticated) {
          return emailVerificationMiddleware();
        }
        return isAuthenticated;
      }
    },
    {
      path: '/new',
      name: 'new',
      component: NewMenuPage,
      beforeEnter: async (to) => await authMiddleware(to)
    }
  ]
});

export default router;
