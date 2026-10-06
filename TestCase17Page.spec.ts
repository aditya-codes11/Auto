import '../utils/hooks';
import { test } from '@playwright/test';
import { TestCase17Page } from '../pages/TestCase17Page';

test(
  'TC17 - SpiderMan Category Filter and Product Details',
  async ({ page }) => {
    const testCase = new TestCase17Page(page);

    await testCase.execute();
  }
);