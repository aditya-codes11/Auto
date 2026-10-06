import { Page } from '@playwright/test';
import fs from 'fs';
import Logger from './Logger';

export async function takeScreenshot(
  page: Page,
  screenshotName: string
) {
  const screenshotDirectory = 'screenshots';

  if (!fs.existsSync(screenshotDirectory)) {
    fs.mkdirSync(screenshotDirectory);
  }

  const cleanName = screenshotName.replace(
    /[^a-zA-Z0-9]/g,
    '_'
  );

  const screenshotPath =
    `${screenshotDirectory}/${cleanName}_${Date.now()}.png`;

  await page.screenshot({
    path: screenshotPath,
    fullPage: true
  });

  Logger.info(
    `Screenshot captured: ${screenshotPath}`
  );

  return screenshotPath;
}