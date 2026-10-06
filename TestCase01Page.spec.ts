import '../utils/hooks';
import { test } from '@playwright/test';
import { TestCase01Page } from '../pages/TestCase01Page';

test(
  'TC01 - Ride-Ons and Cycles Listing Filters Sorting and Navigation',
  async ({ page }) => {
    const testCase = new TestCase01Page(page);
    await testCase.execute();
  }
);