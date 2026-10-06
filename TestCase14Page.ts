import { Page, expect } from '@playwright/test';
import { takeScreenshot } from '../utils/Screenshot';

export class TestCase14Page {
  constructor(private page: Page) {}

  async execute() {
    await this.page.goto('/');

    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });

    const delivery = this.page
      .getByText(
        'Delivery Policy',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await expect(delivery).toBeVisible();

    await delivery.click();

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    const minimum = this.page
      .getByText(
        'Minimum Threshold',
        {
          exact: false
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (
      await minimum.count() > 0
    ) {
      await minimum
        .scrollIntoViewIfNeeded();
    }

    const charges = this.page
      .getByText(
        'Shipping and Delivery Charges',
        {
          exact: false
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (
      await charges.count() > 0
    ) {
      await expect(
        charges
      ).toBeVisible();
    }

    await takeScreenshot(
      this.page,
      'TC14_Delivery'
    );

    await this.page.reload();

    await takeScreenshot(
      this.page,
      'TC14_Delivery_Reload'
    );

    await this.page.goto(
      '/product/jaspo-cricket-ball-for-practice-training-matches-for-all-age-group-t20-soft-ball-1-pc-red-pvc-standard-size-red-6y-492336663'
    );

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    await expect(
      this.page
    ).toHaveURL(/jaspo/i);

    const pincode = this.page
      .getByPlaceholder(
        'pincode',
        {
          exact: false
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (
      await pincode.count() > 0
    ) {
      const check = this.page
        .getByText(
          'Check',
          {
            exact: true
          }
        )
        .filter({
          visible: true
        })
        .first();

      await pincode.fill(
        '411001'
      );

      if (await check.count() > 0) {
        await check.click();

        await pincode.fill(
          '000000'
        );

        await check.click();

        await pincode.fill('');

        await check.click();
      }
    }

    await takeScreenshot(
      this.page,
      'TC14_Pincode'
    );
  }
}