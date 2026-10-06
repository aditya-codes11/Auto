import '../utils/hooks';
import { test } from '@playwright/test';
import { TestCase19Page } from '../pages/TestCase19Page';

test(
  'TC19 - Footer Social Media Links and Responsive Layout',
  async ({ page }) => {
    const testCase = new TestCase19Page(page);
    await testCase.execute();
  }
);