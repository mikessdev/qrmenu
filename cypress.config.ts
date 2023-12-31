import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 8000,
  pageLoadTimeout: 10000,
  env: {
    email: 'mike100.boy@gmail.com',
    password: 'dd@22DD'
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
