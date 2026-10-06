import { Page, expect } from '@playwright/test';

export class TestCase05Page {
  constructor(private page: Page) {}

  async execute() {
    await this.page.goto(
      '/products?brand=nerf'
    );

    await expect(
      this.page
    ).toHaveURL(/nerf/i);

    const sortBy = this.page
      .getByText(
        'Sort By',
        {
          exact: false
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (
      await sortBy.count() > 0
    ) {
      await sortBy.hover();

      const arrival = this.page
        .getByText(
          'New Arrival',
          {
            exact: true
          }
        )
        .filter({
          visible: true
        })
        .first();

      if (
        await arrival.count() > 0
      ) {
        await arrival.click();
      }
    }

    const count = this.page
      .getByText(
        'products',
        {
          exact: false
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (await count.count() > 0) {
      await expect(count).toBeVisible();
    }

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

      const textbox = this.page
        .getByRole('textbox')
        .filter({
          visible: true
        })
        .first();

      if (
        await textbox.count() > 0
      ) {
        await textbox.fill(
          '9999999999'
        );
      }
    }

    await this.page.goto('/');

    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });

    const hotWheels = this.page
      .getByText(
        'Hot Wheels',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await expect(
      hotWheels
    ).toBeVisible();

    await hotWheels.click();

    await expect(
      this.page
    ).toHaveURL(/hot-wheels/i);

    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });

    const mostSearched = this.page
      .getByText(
        'Most Searched',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await expect(
      mostSearched
    ).toBeVisible();
  }
}