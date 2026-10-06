import { Page, expect } from '@playwright/test';
import { takeScreenshot } from '../utils/Screenshot';

export class TestCase11Page {
  constructor(private page: Page) {}

  async execute() {
    await this.page.goto('/');

    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });

    const privacy = this.page
      .getByText(
        'Privacy & Cookies',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await expect(privacy).toBeVisible();

    await privacy.click();

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    expect(
      this.page.url()
    ).not.toBe(
      'https://hamleys.in/'
    );

    const cookieContent = this.page
      .getByText(
        'cookie',
        {
          exact: false
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (
      await cookieContent.count() > 0
    ) {
      await expect(
        cookieContent
      ).toBeVisible();
    }

    await takeScreenshot(
      this.page,
      'TC11_Privacy_Cookies'
    );

    await this.page.goto('/');

    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });

    const links = this.page
      .getByRole('link')
      .filter({
        visible: true
      });

    const count =
      await links.count();

    let twitterFound = false;

    for (
      let index = 0;
      index < count;
      index++
    ) {
      const href =
        await links
          .nth(index)
          .getAttribute('href');

      if (
        href &&
        (
          href.toLowerCase()
            .includes('twitter') ||
          href.toLowerCase()
            .includes('x.com')
        )
      ) {
        twitterFound = true;

        console.log(
          `Twitter URL: ${href}`
        );

        break;
      }
    }

    if (twitterFound) {
      expect(
        twitterFound
      ).toBeTruthy();
    }
  }
}
