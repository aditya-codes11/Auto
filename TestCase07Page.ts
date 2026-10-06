// import { Page, expect } from '@playwright/test';
// import { takeScreenshot } from '../utils/Screenshot';

// export class TestCase07Page {
//   constructor(private page: Page) {}

//   async scrollFooter() {
//     await this.page.evaluate(() => {
//       window.scrollTo(
//         0,
//         document.body.scrollHeight
//       );
//     });
//   }

//   async execute() {
//     await this.page.goto('/');

//     await this.scrollFooter();

//     const about = this.page
//       .getByText(
//         'About Hamleys',
//         {
//           exact: true
//         }
//       )
//       .filter({
//         visible: true
//       })
//       .first();

//     await expect(about).toBeVisible();

//     const toyStory = this.page
//       .getByText(
//         'Our Toy Story',
//         {
//           exact: true
//         }
//       )
//       .filter({
//         visible: true
//       })
//       .first();

//     await expect(toyStory).toBeVisible();

//     await toyStory.click();

//     await expect(
//       this.page.getByText(
//         '404',
//         {
//           exact: true
//         }
//       )
//     ).toHaveCount(0);

//     await this.page.goto('/');

//     await this.scrollFooter();

//     const storeLocator = this.page
//       .getByText(
//         'Store Locator',
//         {
//           exact: true
//         }
//       )
//       .filter({
//         visible: true
//       })
//       .first();

//     await expect(
//       storeLocator
//     ).toBeVisible();

//     await storeLocator.click();

//     await this.page.waitForLoadState(
//       'domcontentloaded'
//     );

//     const textbox = this.page
//       .getByRole('textbox')
//       .filter({
//         visible: true
//       })
//       .first();

//     if (
//       await textbox.count() > 0
//     ) {
//       await textbox.fill(
//         '411001'
//       );

//       await textbox.press('Enter');
//     }

//     await this.page.goto('/');

//     await this.scrollFooter();

//     const giftCard = this.page
//       .getByText(
//         'Buy Luxe Gift Card',
//         {
//           exact: true
//         }
//       )
//       .filter({
//         visible: true
//       })
//       .first();

//     if (
//       await giftCard.count() > 0
//     ) {
//       await expect(
//         giftCard
//       ).toBeVisible();
//     }

//     const contact = this.page
//       .getByText(
//         'Get in Touch with Team Hamleys',
//         {
//           exact: true
//         }
//       )
//       .filter({
//         visible: true
//       })
//       .first();

//     if (
//       await contact.count() > 0
//     ) {
//       await contact.click();

//       await takeScreenshot(
//         this.page,
//         'TC07_Contact'
//       );
//     }

//     await this.page.goto('/');

//     await this.scrollFooter();

//     const delivery = this.page
//       .getByText(
//         'Delivery Policy',
//         {
//           exact: true
//         }
//       )
//       .filter({
//         visible: true
//       })
//       .first();

//     await expect(delivery).toBeVisible();

//     await delivery.click();

//     await this.page.goto('/');

//     await this.scrollFooter();

//     const links = this.page
//       .getByRole('link')
//       .filter({
//         visible: true
//       });

//     const linkCount =
//       await links.count();

//     let facebookFound = false;

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
//         facebookFound = true;
//         break;
//       }
//     }

//     if (facebookFound) {
//       expect(
//         facebookFound
//       ).toBeTruthy();
//     }
//   }
// }

//updated ::
import { Page, expect } from '@playwright/test';
import { takeScreenshot } from '../utils/Screenshot';

export class TestCase07Page {
  constructor(private page: Page) {}

  public async scrollFooter(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });
  }

  public async execute(): Promise<void> {
    await this.page.goto('/');

    // About Hamleys
    await this.scrollFooter();

    const about = this.page.getByText(
      'About Hamleys',
      { exact: true }
    );

    await expect(about).toBeVisible();

    // Our Toy Story
    const toyStory = this.page.getByRole(
      'link',
      {
        name: 'Our Toy Story'
      }
    );

    await expect(toyStory).toBeVisible();

    await toyStory.click();

    await expect(this.page).toHaveURL(
      /about-us/
    );

    await this.page.goBack();

    // Store Locator
    await this.scrollFooter();

    const storeLocator = this.page.getByRole(
      'link',
      {
        name: 'Store Locator'
      }
    );

    await expect(storeLocator).toBeVisible();

    const storeLocatorHref =
      await storeLocator.getAttribute(
        'href'
      );

    expect(storeLocatorHref).toBeTruthy();

    // Buy Luxe Gift Card
    const giftCard = this.page.getByRole(
      'link',
      {
        name: 'Buy Luxe Gift Card'
      }
    );

    if (await giftCard.count() > 0) {
      await expect(giftCard).toBeVisible();
    }

    // Get in Touch with Team Hamleys
    const contact = this.page.getByRole(
      'link',
      {
        name: 'Get in Touch with Team Hamleys'
      }
    );

    if (await contact.count() > 0) {
      await expect(contact).toBeVisible();

      await takeScreenshot(
        this.page,
        'TC07_Contact'
      );
    }

    // Delivery Policy
    await this.scrollFooter();

    const delivery = this.page.getByRole(
      'link',
      {
        name: 'Delivery Policy'
      }
    );

    await expect(delivery).toBeVisible();

    await delivery.click();

    await expect(this.page).toHaveURL(
      /delivery-policy/
    );

    await this.page.goBack();

    // Facebook Link Validation
    await this.scrollFooter();

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