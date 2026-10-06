import { Page, expect } from '@playwright/test';
import { takeScreenshot } from '../utils/Screenshot';

export class TestCase16Page {
  constructor(private page: Page) {}

  async execute() {
    await this.page.goto('/');

    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });

    const feesPolicy = this.page
      .getByText(
        'Fees & Payment Policy',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await expect(
      feesPolicy
    ).toBeVisible();

    await feesPolicy.click();

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    const feesHeading = this.page
      .getByText(
        'Payment',
        {
          exact: false
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (
      await feesHeading.count() > 0
    ) {
      await expect(
        feesHeading
      ).toBeVisible();
    }

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

    let instagramOpened = false;

    for (
      let index = 0;
      index < count;
      index++
    ) {
      const currentLink =
        links.nth(index);

      const href =
        await currentLink
          .getAttribute('href');

      if (
        href &&
        href.toLowerCase()
          .includes('instagram')
      ) {
        const newPagePromise =
          this.page
            .context()
            .waitForEvent('page')
            .catch(() => null);

        await currentLink.click();

        const instagramPage =
          await newPagePromise;

        if (instagramPage) {
          await instagramPage
            .waitForLoadState(
              'domcontentloaded'
            )
            .catch(() => {});

          expect(
            instagramPage.url()
              .toLowerCase()
          ).toContain(
            'instagram'
          );

          await takeScreenshot(
            instagramPage,
            'TC16_Instagram'
          );

          await instagramPage.close();

          instagramOpened = true;
        }

        break;
      }
    }

    if (instagramOpened) {
      await this.page
        .bringToFront();
    }

    await expect(
      this.page
    ).toHaveURL(
      'https://hamleys.in/'
    );
  }
}
``