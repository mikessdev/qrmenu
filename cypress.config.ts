import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  env: {
    email: process.env.VITE_TEST_EMAIL,
    password: process.env.VITE_TEST_PASSWORD
  },

  e2e: {
    baseUrl: 'http://localhost:5173'
  }
});
