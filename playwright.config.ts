import {
  defineConfig,
  devices
} from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  globalSetup: require.resolve(
    './utils/globalSetup'
  ),

  timeout: 60000,

  expect: {
    timeout: 10000
  },

  fullyParallel: false,

  workers: 1,

  reporter: [
    ['list'],

    [
      'html',
      {
        open: 'never'
      }
    ]
  ],

  use: {
    baseURL: 'https://hamleys.in/',

    headless: false,

    launchOptions: {
      slowMo: 300
    },

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',

      use: {
        ...devices[
          'Desktop Chrome'
        ]
      }
    }
  ]
});