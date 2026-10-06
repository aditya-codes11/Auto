import '../utils/hooks';
import { test } from '@playwright/test';
import { TestCase07Page } from '../pages/TestCase07Page';

test(
  'TC07 - About Hamleys Links and Store Locator',
  async ({ page }) => {
    const testCase = new TestCase07Page(page);
    await testCase.execute();
  }
);