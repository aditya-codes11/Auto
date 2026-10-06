import '../utils/hooks';
import { test } from '@playwright/test';
import { TestCase18Page } from '../pages/TestCase18Page';

test(
  'TC18 - Store Locations Search and Filtering',
  async ({ page }) => {
    const testCase = new TestCase18Page(page);
    await testCase.execute();
  }
);