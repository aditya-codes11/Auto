import '../utils/hooks';
import { test } from '@playwright/test';
import { TestCase09Page } from '../pages/TestCase09Page';

test(
  'TC09 - Customer Care Cancellation and Books Filter',
  async ({ page }) => {
    const testCase = new TestCase09Page(page);
    await testCase.execute();
  }
);