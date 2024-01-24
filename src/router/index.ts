import { createRouter, createWebHistory, type NavigationGuardNext } from 'vue-router';
import LandingPage from '@/pages/LandingPage.vue';
import HomePage from '@/pages/HomePage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import RegisterCompletePage from '@/pages/RegisterCompletePage.vue';
import SelectMenuPage from '@/pages/SelectMenuPage.vue';
import authMiddleware from '@/middleware/authMiddleware';
import menuRoutesMiddleware from '@/middleware/menuRoutesMiddleware';
import emailVerificationMiddleware from '@/middleware/emailVerificationMiddleware';

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
      component: HomePage,
      beforeEnter: (to) => menuRoutesMiddleware(to)
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
    }
  ]
});

export default router;
