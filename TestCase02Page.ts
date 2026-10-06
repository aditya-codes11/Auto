import { Page, expect } from '@playwright/test';

export class TestCase02Page {
  constructor(private page: Page) {}

  async execute() {
    await this.page.goto('/');

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });

    const babyGear = this.page
      .getByText(
        'Baby Gear & Utility',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await expect(
      babyGear
    ).toBeVisible();

    await babyGear.click();

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    const productCount = this.page
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

    if (
      await productCount.count() > 0
    ) {
      await expect(
        productCount
      ).toBeVisible();
    }

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

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    let productAdded = false;

    const listingAddToBag =
      this.page
        .getByText(
          'Addto bag',
          {
            exact: false
          }
        )
        .filter({
          visible: true
        })
        .first();

    if (
      await listingAddToBag.count() > 0
    ) {
      await listingAddToBag.click();

      productAdded = true;
    }

    if (!productAdded) {
      const price = this.page
        .getByText(
          '₹',
          {
            exact: false
          }
        )
        .filter({
          visible: true
        })
        .first();

      if (
        await price.count() > 0
      ) {
        await price.click();

        await this.page.waitForLoadState(
          'domcontentloaded'
        );
      }

      const productAddToBag =
        this.page
          .getByText(
            'Add to bag',
            {
              exact: true
            }
          )
          .filter({
            visible: true
          })
          .first();

      if (
        await productAddToBag.count() > 0
      ) {
        await productAddToBag.click();

        productAdded = true;
      }
    }

    const myBag = this.page
      .getByText(
        'My bag',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await expect(
      myBag
    ).toBeVisible();

    await myBag.click();

    await expect(
      this.page
    ).toHaveURL(/cart\/bag/i);

    const increaseButtons =
      this.page
        .getByRole('button')
        .filter({
          visible: true
        });

    const buttonCount =
      await increaseButtons.count();

    for (
      let index = 0;
      index < buttonCount;
      index++
    ) {
      const text =
        await increaseButtons
          .nth(index)
          .innerText()
          .catch(() => '');

      const accessibleName =
        await increaseButtons
          .nth(index)
          .getAttribute(
            'aria-label'
          );

      if (
        text.trim() === '+' ||
        accessibleName
          ?.toLowerCase()
          .includes('increase')
      ) {
        await increaseButtons
          .nth(index)
          .click();

        break;
      }
    }

    const remove = this.page
      .getByText(
        'Remove',
        {
          exact: false
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (
      await remove.count() > 0
    ) {
      await remove.click();
    }

    await this.page.goto('/');

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });

    const terms = this.page
      .getByText(
        'Terms And Conditions',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await expect(
      terms
    ).toBeVisible();

    await terms.click();

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

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

    await expect(
      privacy
    ).toBeVisible();

    await privacy.click();
  }
}