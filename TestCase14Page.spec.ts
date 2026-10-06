import '../utils/hooks';
import { test } from '@playwright/test';
import { TestCase14Page } from '../pages/TestCase14Page';

test(
  'TC14 - Delivery Policy and Pincode Validation',
  async ({ page }) => {
    const testCase = new TestCase14Page(page);
    await testCase.execute();
  }
);