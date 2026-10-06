import { Page, expect } from '@playwright/test';
import { takeScreenshot } from '../utils/Screenshot';

export class TestCase18Page {
  constructor(private page: Page) {}

  async execute() {
    await this.page.goto('/');

    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });

    const storeLocations = this.page
      .getByText(
        'Store Locator',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await expect(
      storeLocations
    ).toBeVisible();

    await storeLocations.click();

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    const textboxes = this.page
      .getByRole('textbox')
      .filter({
        visible: true
      });

    const textboxCount =
      await textboxes.count();

    if (textboxCount > 0) {
      const searchBox =
        textboxes.first();

      await searchBox.fill(
        'Pune'
      );

      await searchBox.press(
        'Enter'
      );

      await searchBox.fill('');

      await searchBox.fill(
        'zzzzz'
      );

      await searchBox.press(
        'Enter'
      );

      await searchBox.fill('');
    }

    const assam = this.page
      .getByText(
        'Assam',
        {
          exact: false
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (
      await assam.count() > 0
    ) {
      await assam.click();
    }

    const searchButton = this.page
      .getByText(
        'Search',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (
      await searchButton.count() > 0
    ) {
      await searchButton.click();
    }

    await takeScreenshot(
      this.page,
      'TC18_Store_Locations'
    );
  }
}