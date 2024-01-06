import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    email: 'mike100.boy@gmail.com',
    password: 'ddDD@22'
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
