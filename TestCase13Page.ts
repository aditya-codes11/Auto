// import { Page, expect } from '@playwright/test';
// import { takeScreenshot } from '../utils/Screenshot';

// export class TestCase13Page {
//   constructor(private page: Page) {}

//   async execute() {
//     await this.page.goto('/');

//     await this.page.waitForLoadState(
//       'domcontentloaded'
//     );

//     await this.page.evaluate(() => {
//       window.scrollTo(
//         0,
//         document.body.scrollHeight
//       );
//     });

//     const saleTerms = this.page
//       .getByText(
//         'Sale Terms & Conditions',
//         {
//           exact: true
//         }
//       )
//       .filter({
//         visible: true
//       })
//       .first();

//     await expect(
//       saleTerms
//     ).toBeVisible();

//     await saleTerms.click();

//     await this.page.waitForLoadState(
//       'domcontentloaded'
//     );

//     const heading = this.page
//       .getByText(
//         'Sale Terms',
//         {
//           exact: false
//         }
//       )
//       .filter({
//         visible: true
//       })
//       .first();

//     if (
//       await heading.count() > 0
//     ) {
//       await expect(
//         heading
//       ).toBeVisible();
//     }

//     const ham5 = this.page
//       .getByText(
//         'HAM5',
//         {
//           exact: false
//         }
//       )
//       .filter({
//         visible: true
//       })
//       .first();

//     if (
//       await ham5.count() > 0
//     ) {
//       await ham5
//         .scrollIntoViewIfNeeded();

//       await expect(
//         ham5
//       ).toBeVisible();
//     }

//     await takeScreenshot(
//       this.page,
//       'TC13_Sale_Terms'
//     );

//     const ham10 = this.page
//       .getByText(
//         'HAM10',
//         {
//           exact: false
//         }
//       )
//       .filter({
//         visible: true
//       })
//       .first();

//     if (
//       await ham10.count() > 0
//     ) {
//       await expect(
//         ham10
//       ).toBeVisible();
//     }

//     await this.page.goto('/');

//     const searchBox = this.page
//       .getByRole('textbox')
//       .filter({
//         visible: true
//       })
//       .first();

//     if (
//       await searchBox.count() > 0
//     ) {
//       await searchBox.fill(
//         'MobiKwik Offer'
//       );

//       await searchBox.press(
//         'Enter'
//       );
//     }

//     await takeScreenshot(
//       this.page,
//       'TC13_MobiKwik'
//     );

//     await this.page.goto('/');

//     await this.page.evaluate(() => {
//       window.scrollTo(
//         0,
//         document.body.scrollHeight
//       );
//     });

//     const links = this.page
//       .getByRole('link')
//       .filter({
//         visible: true
//       });

//     const linkCount =
//       await links.count();

//     for (
//       let index = 0;
//       index < linkCount;
//       index++
//     ) {
//       const href =
//         await links
//           .nth(index)
//           .getAttribute('href');

//       if (
//         href &&
//         href.toLowerCase()
//           .includes('facebook')
//       ) {
//         const facebookPromise =
//           this.page
//             .context()
//             .waitForEvent('page')
//             .catch(() => null);

//         await links
//           .nth(index)
//           .click();

//         const facebookPage =
//           await facebookPromise;

//         if (facebookPage) {
//           await facebookPage
//             .waitForLoadState(
//               'domcontentloaded'
//             )
//             .catch(() => {});

//           await takeScreenshot(
//             facebookPage,
//             'TC13_Facebook'
//           );

//           await facebookPage.close();
//         }

//         break;
//       }
//     }
//   }
// }

//updated:
import { Page, expect } from '@playwright/test';
import { takeScreenshot } from '../utils/Screenshot';

export class TestCase13Page {
  constructor(private page: Page) {}

  public async execute(): Promise<void> {
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
      .first();

    await expect(
      saleTerms
    ).toBeVisible();

    await saleTerms.click();

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    const heading = this.page
      .getByText(
        'Sale Terms',
        {
          exact: false
        }
      )
      .first();

    if (await heading.count() > 0) {
      await expect(
        heading
      ).toBeVisible();
    }

    const ham5 = this.page
      .getByText('HAM5', {
        exact: false
      })
      .first();

    if (await ham5.count() > 0) {
      await ham5.scrollIntoViewIfNeeded();

      await expect(
        ham5
      ).toBeVisible();
    }

    const ham10 = this.page
      .getByText('HAM10', {
        exact: false
      })
      .first();

    if (await ham10.count() > 0) {
      await expect(
        ham10
      ).toBeVisible();
    }

    await takeScreenshot(
      this.page,
      'TC13_Sale_Terms'
    );

    await this.page.goto('/');

    const searchBox = this.page
      .getByRole('textbox')
      .first();

    if (await searchBox.count() > 0) {
      await searchBox.fill(
        'MobiKwik Offer'
      );

      await searchBox.press('Enter');
    }

    await takeScreenshot(
      this.page,
      'TC13_MobiKwik'
    );

    await this.page.goto('/');

    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });

    // Facebook Validation
    const facebookLink =
      this.page.locator(
        'a[href*="facebook"]'
      );

    await expect(
      facebookLink.first()
    ).toBeVisible();

    const facebookHref =
      await facebookLink
        .first()
        .getAttribute('href');

    expect(facebookHref).toContain(
      'facebook'
    );
  }
}