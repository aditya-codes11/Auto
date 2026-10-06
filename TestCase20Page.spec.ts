import '../utils/hooks';
import { test } from '@playwright/test';
import { TestCase20Page } from '../pages/TestCase20Page';

test(
  'TC20 - Majorette Search Homepage and Newsletter',
  async ({ page }) => {
    const testCase = new TestCase20Page(page);
    await testCase.execute();
  }
);