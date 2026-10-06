import { Page, expect } from '@playwright/test';
import { takeScreenshot } from '../utils/Screenshot';

export class TestCase08Page {
  constructor(private page: Page) {}

  private async footer() {
    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });
  }

  async execute() {
    await this.page.goto('/');

    await this.footer();

    const trackOrder = this.page
      .getByText(
        'Track Order',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await trackOrder.click();

    const trackUrl =
      this.page.url();

    await expect(
      this.page
    ).toHaveURL(/auth|login|track/i);

    await takeScreenshot(
      this.page,
      'TC08_Track_Order'
    );

    await this.page.goto('/');

    const wishlist = this.page
      .getByText(
        'Wishlist',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (
      await wishlist.count() > 0
    ) {
      await wishlist.click();

      const mobile = this.page
        .getByRole('textbox')
        .filter({
          visible: true
        })
        .first();

      if (await mobile.count() > 0) {
        await mobile.fill(
          '9999999999'
        );
      }
    }

    await takeScreenshot(
      this.page,
      'TC08_Wishlist'
    );

    await this.page.goto('/');

    await this.footer();

    const myAccount = this.page
      .getByText(
        'My Account',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await myAccount.click();

    const accountUrl =
      this.page.url();

    expect(
      accountUrl.length
    ).toBeGreaterThan(0);

    console.log(
      `Track URL: ${trackUrl}`
    );

    console.log(
      `Account URL: ${accountUrl}`
    );

    await takeScreenshot(
      this.page,
      'TC08_My_Account'
    );

    await this.page.goto('/');

    await expect(
      this.page
    ).toHaveURL(
      /hamleys\.in\/?$/
    );
  }
}