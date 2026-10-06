import '../utils/hooks';
import { test } from '@playwright/test';
import { TestCase15Page } from '../pages/TestCase15Page';

test(
  'TC15 - Return Refund Policy and Refund Information',
  async ({ page }) => {
    const testCase = new TestCase15Page(page);
    await testCase.execute();
  }
);