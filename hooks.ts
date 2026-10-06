import { test } from '@playwright/test';
import Logger from '../utils/Logger';
import { takeScreenshot } from '../utils/Screenshot';

test.beforeEach(async ({}, testInfo) => {
  Logger.info(`STARTED: ${testInfo.title}`);
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === testInfo.expectedStatus) {
    Logger.info(`PASSED: ${testInfo.title}`);
  } else {
    Logger.error(`FAILED: ${testInfo.title}`);
    await takeScreenshot(page, testInfo.title);
  }
});