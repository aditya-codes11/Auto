import '../utils/hooks';
import { test } from '@playwright/test';
import { TestCase08Page } from '../pages/TestCase08Page';

test(
  'TC08 - Track Order and My Account Login Redirect',
  async ({ page }) => {
    const testCase = new TestCase08Page(page);
    await testCase.execute();
  }
);