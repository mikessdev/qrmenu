import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/css/main.css';
import { VueRecaptchaPlugin } from 'vue-recaptcha/head';
import { Quasar } from 'quasar';
import { quasarOptions } from './quasar-user-options';

const pinia = createPinia();
const app = createApp(App);

app.use(VueRecaptchaPlugin, {
  v2SiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY
});

app.use(Quasar, quasarOptions);
app.use(router);
app.use(pinia);
app.mount('#app');
