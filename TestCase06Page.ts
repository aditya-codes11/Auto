import { Page, expect } from '@playwright/test';
import { takeScreenshot } from '../utils/Screenshot';

export class TestCase06Page {
  constructor(private page: Page) {}

  private async footer() {
    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });
  }

  private async openFooterItem(
    item: string
  ) {
    await this.footer();

    const link = this.page
      .getByText(
        item,
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await expect(link).toBeVisible();

    await link.click();
  }

  async execute() {
    await this.page.goto('/');

    await this.openFooterItem(
      'Hot Wheels'
    );

    console.log(
      `Hot Wheels: ${this.page.url()}`
    );

    await this.page.goto('/');

    await this.openFooterItem(
      'SpiderMan'
    );

    console.log(
      `SpiderMan: ${this.page.url()}`
    );

    await this.page.goto('/');

    await this.openFooterItem(
      'Paw Patrol'
    );

    console.log(
      `Paw Patrol: ${this.page.url()}`
    );

    await this.page.goto('/');

    await this.openFooterItem(
      'Majorette'
    );

    console.log(
      `Majorette: ${this.page.url()}`
    );

    await this.footer();

    const youtube = this.page
      .getByText(/YouTube/i)
      .filter({
        visible: true
      })
      .first();

    if (await youtube.count() > 0) {
      const newPagePromise =
        this.page.context()
          .waitForEvent('page');

      await youtube.click();

      const youtubePage =
        await newPagePromise;

      await youtubePage.waitForLoadState(
        'domcontentloaded'
      );

      await takeScreenshot(
        youtubePage,
        'TC06_YouTube'
      );

      await youtubePage.close();
    }

    await this.page.bringToFront();

    await this.footer();

    const instagram = this.page
      .getByText(/Instagram/i)
      .filter({
        visible: true
      })
      .first();

    if (
      await instagram.count() > 0
    ) {
      await expect(
        instagram
      ).toBeVisible();
    }

    await takeScreenshot(
      this.page,
      'TC06_Footer'
    );
  }
}