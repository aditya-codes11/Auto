import '../utils/hooks';
import { test } from '@playwright/test';
import { TestCase16Page } from '../pages/TestCase16Page';

test(
  'TC16 - Fees Payment Policy and Instagram Navigation',
  async ({ page }) => {
    const testCase = new TestCase16Page(page);
    await testCase.execute();
  }
);