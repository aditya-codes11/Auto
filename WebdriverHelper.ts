import { Page, expect } from '@playwright/test';
import Logger from './Logger';

export class WebdriverHelper {
  constructor(private page: Page) {}

  async launchApplication() {
    Logger.info('Launching Hamleys website');

    await this.page.goto('/');

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    Logger.info('Hamleys website opened');
  }

  async navigateBack() {
    Logger.info('Navigating back');

    await this.page.goBack();
  }

  async refreshPage() {
    Logger.info('Refreshing browser');

    await this.page.reload();
  }

  async scrollDown() {
    Logger.info('Scrolling down');

    await this.page.mouse.wheel(
      0,
      800
    );
  }

  async scrollUp() {
    Logger.info('Scrolling up');

    await this.page.mouse.wheel(
      0,
      -800
    );
  }

  async verifyUrl(
    expectedUrl: RegExp
  ) {
    Logger.info(
      `Verifying URL: ${expectedUrl}`
    );

    await expect(
      this.page
    ).toHaveURL(expectedUrl);
  }

  async getCurrentUrl() {
    const currentUrl =
      this.page.url();

    Logger.info(
      `Current URL: ${currentUrl}`
    );

    return currentUrl;
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState(
      'domcontentloaded'
    );
  }
}