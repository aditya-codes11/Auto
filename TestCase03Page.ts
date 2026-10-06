import { Page, expect } from '@playwright/test';
import { takeScreenshot } from '../utils/Screenshot';

export class TestCase03Page {
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

    const toysGames = this.page
      .getByText(
        'Toys and Games',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await expect(
      toysGames
    ).toBeVisible();

    await toysGames.click();

    await expect(
      this.page
        .getByText(/404/i)
    ).toHaveCount(0);

    const brand = this.page
      .getByText(
        'Brand',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (await brand.count() > 0) {
      await brand.click();

      const adidas = this.page
        .getByText(
          'Adidas KIDS',
          {
            exact: true
          }
        )
        .filter({
          visible: true
        })
        .first();

      if (await adidas.count() > 0) {
        await adidas.click();
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

    await this.page.goto('/');

    await this.footer();

    const schoolTravel = this.page
      .getByText(
        'School & Travel',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await expect(
      schoolTravel
    ).toBeVisible();

    await schoolTravel.click();

    const country = this.page
      .getByText(
        'Country of Origin',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (await country.count() > 0) {
      await country.click();

      const india = this.page
        .getByText(
          'India',
          {
            exact: true
          }
        )
        .filter({
          visible: true
        })
        .first();

      if (await india.count() > 0) {
        await india.click();
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

    const productLinks = this.page
      .getByRole('link')
      .filter({
        visible: true
      });

    let productsFound = 0;

    for (
      let index = 0;
      index < await productLinks.count();
      index++
    ) {
      const href =
        await productLinks
          .nth(index)
          .getAttribute('href');

      if (
        href &&
        href.includes('/product/')
      ) {
        productsFound++;

        if (productsFound === 3) {
          await productLinks
            .nth(index)
            .click();

          break;
        }
      }
    }

    await this.page.goto('/');

    await this.footer();

    const gadgets = this.page
      .getByText(
        'Gadgets',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await gadgets.click();

    const sortBy = this.page
      .getByText(/Sort By/i)
      .filter({
        visible: true
      })
      .first();

    if (await sortBy.count() > 0) {
      await sortBy.hover();

      const highLow = this.page
        .getByText(
          'Price High to Low',
          {
            exact: true
          }
        )
        .filter({
          visible: true
        })
        .first();

      if (
        await highLow.count() > 0
      ) {
        await highLow.click();
      }
    }

    await takeScreenshot(
      this.page,
      'TC03_Gadgets'
    );
  }
}