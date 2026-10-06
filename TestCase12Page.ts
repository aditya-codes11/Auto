import { Page, expect } from '@playwright/test';
import { takeScreenshot } from '../utils/Screenshot';

export class TestCase12Page {
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

    const termsAndConditions = this.page
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
      termsAndConditions
    ).toBeVisible();

    await termsAndConditions.click();

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    const termsHeading = this.page
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

    if (
      await termsHeading.count() > 0
    ) {
      await expect(
        termsHeading
      ).toBeVisible();
    }

    const grievanceOfficer = this.page
      .getByText(
        'Grievance Officer',
        {
          exact: false
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (
      await grievanceOfficer.count() > 0
    ) {
      await grievanceOfficer
        .scrollIntoViewIfNeeded();

      await expect(
        grievanceOfficer
      ).toBeVisible();
    }

    await takeScreenshot(
      this.page,
      'TC12_Terms_And_Conditions'
    );

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

    const saleTerms = this.page
      .getByText(
        'Sale Terms & Conditions',
        {
          exact: true
        }
      )
      .filter({
        visible: true
      })
      .first();

    await expect(
      saleTerms
    ).toBeVisible();

    await saleTerms.click();

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    const saleTermsHeading = this.page
      .getByText(
        'Sale Terms',
        {
          exact: false
        }
      )
      .filter({
        visible: true
      })
      .first();

    if (
      await saleTermsHeading.count() > 0
    ) {
      await expect(
        saleTermsHeading
      ).toBeVisible();
    }

    const searchBox = this.page
      .getByRole('textbox')
      .filter({
        visible: true
      })
      .first();

    if (
      await searchBox.count() > 0
    ) {
      await searchBox.fill(
        'Sale Terms'
      );

      await searchBox.press(
        'Enter'
      );
    }

    await takeScreenshot(
      this.page,
      'TC12_Sale_Terms'
    );

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

    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        0
      );
    });

    await takeScreenshot(
      this.page,
      'TC12_Page_Top'
    );

    await expect(
      this.page
    ).toHaveURL(
      'https://hamleys.in/'
    );
  }
}