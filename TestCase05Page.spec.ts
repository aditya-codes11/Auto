import '../utils/hooks';
import { test } from '@playwright/test';
import { TestCase05Page } from '../pages/TestCase05Page';

test(
  'TC05 - Nerf Sorting Brand Filter and Footer Navigation',
  async ({ page }) => {
    const testCase = new TestCase05Page(page);
    await testCase.execute();
  }
);