import { Page, expect } from '@playwright/test';
import { takeScreenshot } from '../utils/Screenshot';

export class TestCase15Page {
  constructor(private page: Page) {}

  async execute() {
    await this.page.goto('/');

    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });

    const returnPolicy = this.page
      .getByText(
        'Return/Refunds Policy',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await expect(
      returnPolicy
    ).toBeVisible();

    await returnPolicy.click();

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    const policyHeading = this.page
      .getByText(
        'Return',
        {
          exact: false
        }
      )
      .filter({
        visible: true
      })
      .first();

    await expect(
      policyHeading
    ).toBeVisible();

    const returnTerms = this.page
      .getByText(
        'Terms of Return and Refund',
        {
          exact: false
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (
      await returnTerms.count() > 0
    ) {
      await returnTerms
        .scrollIntoViewIfNeeded();

      await expect(
        returnTerms
      ).toBeVisible();
    }

    const refundInformation =
      this.page
        .getByText(
          'refund',
          {
            exact: false
          }
        )
        .filter({
          visible: true
        })
        .first();

    if (
      await refundInformation.count() > 0
    ) {
      await expect(
        refundInformation
      ).toBeVisible();
    }

    await takeScreenshot(
      this.page,
      'TC15_Return_Refund'
    );

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

    const cashRefund = this.page
      .getByText(
        'Cash on Delivery',
        {
          exact: false
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (
      await cashRefund.count() > 0
    ) {
      await expect(
        cashRefund
      ).toBeVisible();
    }

    await this.page.goBack();

    await this.page.goBack();

    await this.page.setViewportSize({
      width: 375,
      height: 800
    });

    await takeScreenshot(
      this.page,
      'TC15_Mobile_Viewport'
    );
  }
}