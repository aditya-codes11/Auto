import { Page, expect } from '@playwright/test';
import { takeScreenshot } from '../utils/Screenshot';

export class TestCase09Page {
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

    const customerCare = this.page
      .getByText(
        'Customer Care',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await customerCare.click();

    const query = this.page
      .getByText(/Select Query/i)
      .filter({
        visible: true
      })
      .first();

    if (await query.count() > 0) {
      await query.click();

      const cancellation = this.page
        .getByText(
          /Online Order.*Cancellations/i
        )
        .filter({
          visible: true
        })
        .first();

      if (
        await cancellation.count() > 0
      ) {
        await cancellation.click();
      }
    }

    await this.page.goto('/');

    await this.footer();

    const cancelOrder = this.page
      .getByText(
        'Cancel/Return Order',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (
      await cancelOrder.count() > 0
    ) {
      await cancelOrder.click();
    }

    await this.page.goto('/');

    await this.footer();

    await takeScreenshot(
      this.page,
      'TC09_Newsletter'
    );

    const books = this.page
      .getByText(
        'Books',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await books.click();

    const gender = this.page
      .getByText(
        'Gender',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (await gender.count() > 0) {
      await gender.click();

      const girls = this.page
        .getByText(
          'Girls',
          {
            exact: true
          }
        )
        .filter({
          visible: true
        })
        .first();

      if (await girls.count() > 0) {
        await girls.click();
      }

      const apply = this.page
        .getByText(/Apply Filter/i)
        .filter({
          visible: true
        })
        .first();

      if (await apply.count() > 0) {
        await apply.click();
      }
    }

    await takeScreenshot(
      this.page,
      'TC09_Books_Girls'
    );
  }
}