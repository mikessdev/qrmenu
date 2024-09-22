import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/css/main.css';
import { VueRecaptchaPlugin } from 'vue-recaptcha/head';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { light, dark } from './themes/vuetify';

const pinia = createPinia();
const app = createApp(App);

const vuetify = createVuetify({
  ssr: true,
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: { light, dark }
  }
});

app.use(VueRecaptchaPlugin, {
  v2SiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY
});

app.use(vuetify);
app.use(router);
app.use(pinia);
app.mount('#app');
