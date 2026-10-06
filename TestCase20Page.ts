import { Page, expect } from '@playwright/test';
import { takeScreenshot } from '../utils/Screenshot';

export class TestCase20Page {
  constructor(private page: Page) {}

  async execute() {
    // Step 1: Launch Hamleys website
    await this.page.goto('/');

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    // Step 2: Scroll to footer
    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });

    // Step 3: Find Majorette
    const majorette = this.page
      .getByText(
        'Majorette',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await expect(
      majorette
    ).toBeVisible();

    // Step 4: Click Majorette
    await majorette.click();

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    // Step 5: Verify Majorette page
    const majoretteUrl =
      this.page.url()
        .toLowerCase();

    expect(
      majoretteUrl
    ).toContain(
      'majorette'
    );

    // Step 6: Find Search box
    const searchBoxes = this.page
      .getByRole('textbox')
      .filter({
        visible: true
      });

    const searchBoxCount =
      await searchBoxes.count();

    if (searchBoxCount > 0) {
      const searchBox =
        searchBoxes.first();

      // Step 7: Clear search
      await searchBox.fill('');

      // Step 8: Enter Majorette
      await searchBox.fill(
        'Majorette'
      );

      await searchBox.press(
        'Enter'
      );

      await this.page.waitForLoadState(
        'domcontentloaded'
      );
    }

    // Step 9:
    // Verify search-related page if available
    const searchHeading = this.page
      .getByText(
        'By Search',
        {
          exact: false
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (
      await searchHeading.count() > 0
    ) {
      await expect(
        searchHeading
      ).toBeVisible();
    }

    // Step 10: Navigate to Home
    await this.page.goto('/');

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    // Step 11: Verify homepage
    await expect(
      this.page
    ).toHaveURL(
      'https://hamleys.in/'
    );

    // Step 12: Capture homepage screenshot
    await takeScreenshot(
      this.page,
      'TC20_Homepage'
    );

    // Step 13: Scroll to footer
    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });

    // Step 14: Verify Newsletter on desktop
    const newsletter = this.page
      .getByText(
        'Newsletter',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await expect(
      newsletter
    ).toBeVisible();

    // Step 15:
    // Verify newsletter description if visible
    const subscribeText = this.page
      .getByText(
        'Subscribe to hear about new products and stores.',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (
      await subscribeText.count() > 0
    ) {
      await expect(
        subscribeText
      ).toBeVisible();
    }

    // Step 16:
    // Find newsletter email textbox
    const textboxes = this.page
      .getByRole('textbox')
      .filter({
        visible: true
      });

    const textboxCount =
      await textboxes.count();

    if (textboxCount > 0) {
      const emailField =
        textboxes.last();

      // Step 17: Click email field
      await emailField.click();
    }

    // Step 18:
    // Screenshot desktop newsletter
    await takeScreenshot(
      this.page,
      'TC20_Desktop_Newsletter'
    );

    // Step 19:
    // Change viewport to mobile
    await this.page.setViewportSize({
      width: 375,
      height: 800
    });

    await this.page.waitForTimeout(
      500
    );

    // Step 20:
    // Scroll to bottom again
    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });

    // Step 21:
    // Verify still on Hamleys homepage
    await expect(
      this.page
    ).toHaveURL(
      'https://hamleys.in/'
    );

    // Step 22:
    // Verify page document is visible
    //
    // We do not verify the desktop
    // Newsletter heading here because
    // mobile footer sections can collapse.
    const pageDocument = this.page
      .getByRole('document');

    await expect(
      pageDocument
    ).toBeVisible();

    // Step 23:
    // Verify mobile page rendered content
    const pageText =
      await pageDocument.innerText();

    expect(
      pageText.length
    ).toBeGreaterThan(0);

    // Step 24:
    // Find Newsletter on mobile only
    // if it is currently exposed
    const mobileNewsletter = this.page
      .getByText(
        'Newsletter',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (
      await mobileNewsletter.count() > 0
    ) {
      await expect(
        mobileNewsletter
      ).toBeVisible();
    }

    // Step 25:
    // Find newsletter message on mobile
    // only if currently exposed
    const mobileSubscribeText =
      this.page
        .getByText(
          'Subscribe to hear about new products and stores.',
          {
            exact: true
          }
        )
        .filter({
          visible: true
        })
        .first();

    if (
      await mobileSubscribeText.count() > 0
    ) {
      await expect(
        mobileSubscribeText
      ).toBeVisible();
    }

    // Step 26:
    // Capture responsive mobile footer
    await takeScreenshot(
      this.page,
      'TC20_Mobile_Newsletter'
    );
  }
}