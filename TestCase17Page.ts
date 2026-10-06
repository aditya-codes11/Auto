import { Page, expect } from '@playwright/test';
import { takeScreenshot } from '../utils/Screenshot';

export class TestCase17Page {
  constructor(private page: Page) {}

  async execute() {
    await this.page.goto(
      '/collection/spiderman'
    );

    await expect(
      this.page
    ).toHaveURL(/spiderman/i);

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

      const boys = this.page
        .getByText(
          'Boys',
          {
            exact: true
          }
        )
        .filter({
          visible: true
        })
        .first();

      if (await boys.count() > 0) {
        await boys.click();
      }

      const apply = this.page
        .getByText(
          'Apply Filter',
          {
            exact: false
          }
        )
        .filter({
          visible: true
        })
        .first();

      if (await apply.count() > 0) {
        await apply.click();
      }
    }

    const links = this.page
      .getByRole('link')
      .filter({
        visible: true
      });

    const linkCount =
      await links.count();

    let selectedIndex = -1;

    for (
      let index = 0;
      index < linkCount;
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
        selectedIndex = index;
        break;
      }
    }

    expect(
      selectedIndex
    ).toBeGreaterThanOrEqual(0);

    await links
      .nth(selectedIndex)
      .click();

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    const specifications =
      this.page
        .getByText(
          'Specifications',
          {
            exact: true
          }
        )
        .filter({
          visible: true
        })
        .first();

    if (
      await specifications.count() > 0
    ) {
      await specifications
        .scrollIntoViewIfNeeded();

      await specifications.click();
    }

    const material = this.page
      .getByText(
        'Material',
        {
          exact: false
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (
      await material.count() > 0
    ) {
      await expect(
        material
      ).toBeVisible();
    }

    await this.page.goBack();

    await expect(
      this.page
    ).toHaveURL(/spiderman/i);

    await takeScreenshot(
      this.page,
      'TC17_SpiderMan'
    );
  }
}