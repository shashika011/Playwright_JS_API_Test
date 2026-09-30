import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'https://playwright.dev/',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
