import type { QuasarPluginOptions } from 'quasar/dist/types/plugin';
import './styles/quasar.scss';
import '@quasar/extras/material-icons/material-icons.css';
import { Notify } from 'quasar';

export const quasarOptions: Partial<QuasarPluginOptions> = {
  // Quasar plugins
  plugins: {
    Notify
  },
  config: {
    /* Notify defaults */
    notify: {
      position: 'top',
      timeout: 2500
    }
  }
};
