import '../utils/hooks';
import { test } from '@playwright/test';
import { TestCase04Page } from '../pages/TestCase04Page';

test(
  'TC04 - Lego Filters Product Purchase and Policy Navigation',
  async ({ page }) => {
    const testCase = new TestCase04Page(page);
    await testCase.execute();
  }
);