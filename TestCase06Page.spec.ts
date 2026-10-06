import '../utils/hooks';
import { test } from '@playwright/test';
import { TestCase06Page } from '../pages/TestCase06Page';

test(
  'TC06 - Most Searched Navigation and Social Media Links',
  async ({ page }) => {
    const testCase = new TestCase06Page(page);
    await testCase.execute();
  }
);