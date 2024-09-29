import emailVerificationMiddleware from '@/middleware/emailVerificationMiddleware';
import SingUpComplete from '@/pages/SingUp/Complete/index.vue';
import { createRouter, createWebHistory } from 'vue-router';
import authMiddleware from '@/middleware/authMiddleware';
import Select from '@/pages/Select/index.vue';
import SingUp from '@/pages/SingUp/index.vue';
import New from '@/pages/New/index.vue';
import Landing from '@/pages/Landing/index.vue';
import SingIn from '@/pages/SingIn/index.vue';
import Home from '@/pages/Home/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: Landing
    },
    {
      path: '/:url',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: SingIn,
      beforeEnter: async (to) => await authMiddleware(to)
    },
    {
      path: '/register',
      name: 'register',
      component: SingUp
    },
    {
      path: '/register-complete',
      name: 'register-complete',
      component: SingUpComplete,
      beforeEnter: async (to) => await authMiddleware(to)
    },
    {
      path: '/select-menu',
      name: 'select-menu',
      component: Select,
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
      component: New,
      beforeEnter: async (to) => await authMiddleware(to)
    }
  ]
});

export default router;
