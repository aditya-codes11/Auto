import '../utils/hooks';
import { test } from '@playwright/test';
import { TestCase12Page } from '../pages/TestCase12Page';

test(
  'TC12 - Terms and Conditions and Sale Terms Navigation',
  async ({ page }) => {
    const testCase = new TestCase12Page(page);
    await testCase.execute();
  }
);