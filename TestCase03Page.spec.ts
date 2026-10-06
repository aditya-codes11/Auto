import '../utils/hooks';
import { test } from '@playwright/test';
import { TestCase03Page } from '../pages/TestCase03Page';

test(
  'TC03 - Toys Games School Travel and Gadgets Categories',
  async ({ page }) => {
    const testCase = new TestCase03Page(page);
    await testCase.execute();
  }
);