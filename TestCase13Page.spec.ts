import '../utils/hooks';
import { test } from '@playwright/test';
import { TestCase13Page } from '../pages/TestCase13Page';

test(
  'TC13 - Sale Terms Coupon Codes Offers and Facebook',
  async ({ page }) => {
    const testCase = new TestCase13Page(page);
    await testCase.execute();
  }
);