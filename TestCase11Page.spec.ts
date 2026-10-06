import '../utils/hooks';
import { test } from '@playwright/test';
import { TestCase11Page } from '../pages/TestCase11Page';

test(
  'TC11 - Privacy Cookies Policy and Twitter Link',
  async ({ page }) => {
    const testCase = new TestCase11Page(page);
    await testCase.execute();
  }
);