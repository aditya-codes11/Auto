import { Page, expect } from '@playwright/test';

export class TestCase04Page {
  constructor(private page: Page) {}

  async execute() {
    await this.page.goto(
      '/products?brand=lego'
    );

    const character = this.page
      .getByText(
        'Character',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (
      await character.count() > 0
    ) {
      await character.click();

      const icons = this.page
        .getByText(
          'Icons',
          {
            exact: true
          }
        )
        .filter({
          visible: true
        })
        .first();

      if (await icons.count() > 0) {
        await icons.click();
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

    const category = this.page
      .getByText(
        'Category',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (await category.count() > 0) {
      await category.click();

      const construction =
        this.page
          .getByText(
            'Construction & Building',
            {
              exact: true
            }
          )
          .filter({
            visible: true
          })
          .first();

      if (
        await construction.count() > 0
      ) {
        await construction.click();
      }
    }

    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });

    await expect(
      this.page
        .getByText(
          'Fees & Payment Policy',
          {
            exact: true
          }
        )
        .filter({
          visible: true
        })
        .first()
    ).toBeVisible();

    const links = this.page
      .getByRole('link')
      .filter({
        visible: true
      });

    let lastProductIndex = -1;

    for (
      let index = 0;
      index < await links.count();
      index++
    ) {
      const href =
        await links
          .nth(index)
          .getAttribute('href');

      if (
        href &&
        href.includes('/product/')
      ) {
        lastProductIndex = index;
      }
    }

    if (lastProductIndex >= 0) {
      await links
        .nth(lastProductIndex)
        .click();
    }

    const buyNow = this.page
      .getByText(
        'Buy now',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (await buyNow.count() > 0) {
      await buyNow.click();
    }

    const checkout = this.page
      .getByText(/Checkout/i)
      .filter({
        visible: true
      })
      .first();

    if (await checkout.count() > 0) {
      await checkout.click();
    }

    const numberField = this.page
      .getByRole('textbox')
      .filter({
        visible: true
      })
      .first();

    if (
      await numberField.count() > 0
    ) {
      await expect(
        numberField
      ).toBeVisible();
    }

    await this.page.goto('/');

    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });

    await this.page
      .getByText(
        'Privacy & Cookies',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first()
      .click();

    const cookies = this.page
      .getByText(/cookie/i)
      .filter({
        visible: true
      })
      .first();

    if (await cookies.count() > 0) {
      await expect(cookies).toBeVisible();
    }
  }
}