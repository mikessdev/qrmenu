import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/css/main.css';
import { VueRecaptchaPlugin } from 'vue-recaptcha/head';

const pinia = createPinia();
const app = createApp(App);

app.use(VueRecaptchaPlugin, {
  v2SiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY
});
app.use(router);
app.use(pinia);
app.mount('#app');

import { useUserStore } from './store/userStore';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
const auth = getAuth();
const userStore = useUserStore();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    await userStore.getUser(user.uid);
    userStore.user.accessToken = await user.getIdToken();
  }

  if (!user) {
    // router.push('/login');
  }

  console.log(userStore.user);
});
