import '../utils/hooks';
import { test } from '@playwright/test';
import { TestCase10Page } from '../pages/TestCase10Page';

test(
  'TC10 - Newsletter Subscription Validation',
  async ({ page }) => {
    const testCase = new TestCase10Page(page);
    await testCase.execute();
  }
);