import { Page, expect } from '@playwright/test';
import { takeScreenshot } from '../utils/Screenshot';

export class TestCase01Page {
  constructor(private page: Page) {}

  async execute() {
    await this.page.goto('/');

    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });

    const rideOns = this.page
      .getByText(
        'Ride-Ons and Cycles',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await expect(rideOns).toBeVisible();

    await rideOns.click();

    await expect(
      this.page
    ).toHaveURL(/ride|cycle/i);

    const heading = this.page
      .getByText(
        /Ride-Ons|Cycles/i
      )
      .filter({
        visible: true
      })
      .first();

    if (await heading.count() > 0) {
      await expect(heading).toBeVisible();
    }

    const urlBeforeSort =
      this.page.url();

    const sortBy = this.page
      .getByText(/Sort By/i)
      .filter({
        visible: true
      })
      .first();

    if (await sortBy.count() > 0) {
      await sortBy.hover();

      const lowToHigh = this.page
        .getByText(
          'Price Low to High',
          {
            exact: true
          }
        )
        .filter({
          visible: true
        })
        .first();

      if (await lowToHigh.count() > 0) {
        await lowToHigh.click();
      }
    }

    const urlAfterSort =
      this.page.url();

    if (
      urlAfterSort !== urlBeforeSort
    ) {
      expect(
        urlAfterSort
      ).not.toBe(urlBeforeSort);
    }

    const ageGroup = this.page
      .getByText(
        'Age Group',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (await ageGroup.count() > 0) {
      await ageGroup.click();

      const age = this.page
        .getByText(/3-5 years/i)
        .filter({
          visible: true
        })
        .first();

      if (await age.count() > 0) {
        await age.click();
      }

      const applyFilters =
        this.page
          .getByText(/Apply Filter/i)
          .filter({
            visible: true
          })
          .first();

      if (
        await applyFilters.count() > 0
      ) {
        await applyFilters.click();
      }
    }

    const productCount = this.page
      .getByText(/products/i)
      .filter({
        visible: true
      })
      .first();

    if (
      await productCount.count() > 0
    ) {
      await expect(
        productCount
      ).toBeVisible();
    }

    await takeScreenshot(
      this.page,
      'TC01_Ride_Ons_Filter'
    );

    const clearAll = this.page
      .getByText(
        'Clear all',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (await clearAll.count() > 0) {
      await clearAll.click();
    }

    if (await sortBy.count() > 0) {
      await sortBy.hover();

      const discount = this.page
        .getByText(
          'Discount',
          {
            exact: true
          }
        )
        .filter({
          visible: true
        })
        .first();

      if (
        await discount.count() > 0
      ) {
        await discount.click();
      }
    }

    const products = this.page
      .getByRole('link')
      .filter({
        visible: true
      });

    const count =
      await products.count();

    if (count > 0) {
      for (
        let index = 0;
        index < count;
        index++
      ) {
        const href =
          await products
            .nth(index)
            .getAttribute('href');

        if (
          href &&
          href.includes('/product/')
        ) {
          await products
            .nth(index)
            .click();

          break;
        }
      }
    }

    await this.page.goBack();

    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });

    const sports = this.page
      .getByText(
        'Sports & Outdoor',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (await sports.count() > 0) {
      await sports.click();
    }
  }
}