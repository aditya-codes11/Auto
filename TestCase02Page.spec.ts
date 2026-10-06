import '../utils/hooks';
import { test } from '@playwright/test';
import { TestCase02Page } from '../pages/TestCase02Page';

test(
  'TC02 - Baby Gear Listing Cart Operations and Footer Links',
  async ({ page }) => {
    const testCase = new TestCase02Page(page);
    await testCase.execute();
  }
);