// import { Page, expect } from '@playwright/test';
// import { takeScreenshot } from '../utils/Screenshot';

// export class TestCase19Page {
//   constructor(private page: Page) {}

//   async execute() {
//     // Step 1: Launch Hamleys website
//     await this.page.goto('/');

//     await this.page.waitForLoadState(
//       'domcontentloaded'
//     );

//     // Step 2: Scroll to footer
//     await this.page.evaluate(() => {
//       window.scrollTo(
//         0,
//         document.body.scrollHeight
//       );
//     });

//     // Step 3: Verify footer is displayed
//     const mostSearched = this.page
//       .getByText(
//         'Most Searched',
//         {
//           exact: true
//         }
//       )
//       .filter({
//         visible: true
//       })
//       .first();

//     await expect(
//       mostSearched
//     ).toBeVisible();

//     // Step 4: Verify FREE RETURNS text
//     const freeReturns = this.page
//       .getByText(
//         'Free Returns',
//         {
//           exact: false
//         }
//       )
//       .filter({
//         visible: true
//       })
//       .first();

//     if (
//       await freeReturns.count() > 0
//     ) {
//       await expect(
//         freeReturns
//       ).toBeVisible();
//     }

//     // Step 5: Get all links from page
//     const allLinks = this.page
//       .getByRole('link');

//     const linkCount =
//       await allLinks.count();

//     let instagramUrl = '';
//     let twitterUrl = '';
//     let youtubeUrl = '';
//     let facebookUrl = '';

//     // Step 6:
//     // Find social media URLs and verify
//     // new-tab security attribute.
//     for (
//       let index = 0;
//       index < linkCount;
//       index++
//     ) {
//       const currentLink =
//         allLinks.nth(index);

//       const href =
//         await currentLink.getAttribute(
//           'href'
//         );

//       if (!href) {
//         continue;
//       }

//       const lowerHref =
//         href.toLowerCase();

//       if (
//         lowerHref.includes(
//           'instagram'
//         )
//       ) {
//         instagramUrl = href;
//       }

//       if (
//         lowerHref.includes(
//           'twitter'
//         ) ||
//         lowerHref.includes(
//           'x.com'
//         )
//       ) {
//         twitterUrl = href;
//       }

//       if (
//         lowerHref.includes(
//           'youtube'
//         )
//       ) {
//         youtubeUrl = href;
//       }

//       if (
//         lowerHref.includes(
//           'facebook'
//         )
//       ) {
//         facebookUrl = href;
//       }

//       const isSocialLink =
//         lowerHref.includes(
//           'instagram'
//         ) ||
//         lowerHref.includes(
//           'twitter'
//         ) ||
//         lowerHref.includes(
//           'x.com'
//         ) ||
//         lowerHref.includes(
//           'youtube'
//         ) ||
//         lowerHref.includes(
//           'facebook'
//         );

//       if (isSocialLink) {
//         console.log(
//           `Social URL: ${href}`
//         );

//         const target =
//           await currentLink.getAttribute(
//             'target'
//           );

//         if (target === '_blank') {
//           const rel =
//             await currentLink.getAttribute(
//               'rel'
//             );

//           if (rel) {
//             expect(
//               rel.toLowerCase()
//             ).toContain(
//               'noopener'
//             );
//           }
//         }
//       }
//     }

//     // Step 7: Log detected social links
//     if (instagramUrl) {
//       console.log(
//         `Instagram URL: ${instagramUrl}`
//       );
//     }

//     if (twitterUrl) {
//       console.log(
//         `Twitter URL: ${twitterUrl}`
//       );
//     }

//     if (youtubeUrl) {
//       console.log(
//         `YouTube URL: ${youtubeUrl}`
//       );
//     }

//     if (facebookUrl) {
//       console.log(
//         `Facebook URL: ${facebookUrl}`
//       );
//     }

//     // Step 8:
//     // Click Instagram if available.
//     if (instagramUrl) {
//       const instagramLink =
//         this.page
//           .getByRole('link')
//           .filter({
//             visible: true
//           });

//       const instagramLinkCount =
//         await instagramLink.count();

//       for (
//         let index = 0;
//         index < instagramLinkCount;
//         index++
//       ) {
//         const href =
//           await instagramLink
//             .nth(index)
//             .getAttribute('href');

//         if (
//           href &&
//           href.toLowerCase()
//             .includes('instagram')
//         ) {
//           const pagePromise =
//             this.page
//               .context()
//               .waitForEvent('page')
//               .catch(() => null);

//           await instagramLink
//             .nth(index)
//             .click();

//           const instagramPage =
//             await pagePromise;

//           if (instagramPage) {
//             await instagramPage
//               .waitForLoadState(
//                 'domcontentloaded'
//               )
//               .catch(() => {});

//             await instagramPage.close();
//           }

//           break;
//         }
//       }

//       await this.page.bringToFront();
//     }

//     // Step 9: Return to Hamleys homepage
//     await this.page.goto('/');

//     await this.page.waitForLoadState(
//       'domcontentloaded'
//     );

//     // Step 10: Scroll to footer again
//     await this.page.evaluate(() => {
//       window.scrollTo(
//         0,
//         document.body.scrollHeight
//       );
//     });

//     // Step 11:
//     // Recheck footer before desktop screenshot
//     const footerBeforeScreenshot =
//       this.page
//         .getByText(
//           'Most Searched',
//           {
//             exact: true
//           }
//         )
//         .filter({
//           visible: true
//         })
//         .first();

//     await expect(
//       footerBeforeScreenshot
//     ).toBeVisible();

//     // Step 12: Capture desktop footer
//     await takeScreenshot(
//       this.page,
//       'TC19_Desktop_Footer'
//     );

//     // Step 13:
//     // Change viewport to mobile width
//     await this.page.setViewportSize({
//       width: 375,
//       height: 800
//     });

//     await this.page.waitForTimeout(
//       500
//     );

//     // Step 14:
//     // Scroll to bottom at mobile viewport
//     await this.page.evaluate(() => {
//       window.scrollTo(
//         0,
//         document.body.scrollHeight
//       );
//     });

//     // Step 15:
//     // Verify page still remains on Hamleys
//     await expect(
//       this.page
//     ).toHaveURL(
//       'https://hamleys.in/'
//     );

//     // Step 16:
//     // Verify the document itself remains visible
//     // because mobile footer sections may collapse.
//     const pageDocument = this.page
//       .getByRole('document');

//     await expect(
//       pageDocument
//     ).toBeVisible();

//     // Step 17:
//     // Verify mobile page has rendered content.
//     const pageText =
//       await this.page
//         .getByRole('document')
//         .innerText();

//     expect(
//       pageText.length
//     ).toBeGreaterThan(0);

//     // Step 18:
//     // Capture mobile responsive footer screenshot.
//     await takeScreenshot(
//       this.page,
//       'TC19_Mobile_Footer'
//     );
//   }
// }

//updated:
import { Page, expect } from '@playwright/test';
import { takeScreenshot } from '../utils/Screenshot';

export class TestCase19Page {
  constructor(private page: Page) {}

  public async execute(): Promise<void> {
  // Step 1
  await this.page.goto('/');

  await this.page.waitForLoadState(
    'domcontentloaded'
  );

  // Step 2
  await this.page.evaluate(() => {
    window.scrollTo(
      0,
      document.body.scrollHeight
    );
  });

  // Step 3
  const footerSection =
    this.page
      .getByText(
        'Most Searched',
        {
          exact: true
        }
      )
      .first();

  await expect(
    footerSection
  ).toBeVisible();

  // Step 4
  const socialLinks =
    this.page.locator(
      'a[href*="instagram"], a[href*="facebook"], a[href*="youtube"], a[href*="x.com"]'
    );

  const socialCount =
    await socialLinks.count();

  expect(
    socialCount
  ).toBeGreaterThan(0);

  let instagramFound = false;
  let twitterFound = false;
  let facebookFound = false;
  let youtubeFound = false;

  // Step 5
  for (
    let index = 0;
    index < socialCount;
    index++
  ) {
    const link =
      socialLinks.nth(index);

    const href =
      await link.getAttribute(
        'href'
      );

    if (!href) {
      continue;
    }

    console.log(
      `Social URL: ${href}`
    );

    const lowerHref =
      href.toLowerCase();

    if (
      lowerHref.includes(
        'instagram'
      )
    ) {
      instagramFound = true;
    }

    if (
      lowerHref.includes(
        'x.com'
      )
    ) {
      twitterFound = true;
    }

    if (
      lowerHref.includes(
        'facebook'
      )
    ) {
      facebookFound = true;
    }

    if (
      lowerHref.includes(
        'youtube'
      )
    ) {
      youtubeFound = true;
    }

    const target =
      await link.getAttribute(
        'target'
      );

    if (target === '_blank') {
      const rel =
        await link.getAttribute(
          'rel'
        );

      expect(
        rel?.toLowerCase()
      ).toContain(
        'noopener'
      );
    }
  }

  // Step 6
  expect(
    instagramFound
  ).toBeTruthy();

  expect(
    twitterFound
  ).toBeTruthy();

  expect(
    facebookFound
  ).toBeTruthy();

  expect(
    youtubeFound
  ).toBeTruthy();

  // Step 7
  await takeScreenshot(
    this.page,
    'TC19_Desktop_Footer'
  );

  // Step 8
  await this.page.setViewportSize({
    width: 375,
    height: 800
  });

  // Step 9
  await this.page.reload();

  await this.page.waitForLoadState(
    'domcontentloaded'
  );

  // Step 10
  await this.page.evaluate(() => {
    window.scrollTo(
      0,
      document.body.scrollHeight
    );
  });

  // Step 11
  await expect(
    this.page
  ).toHaveURL(
    /hamleys\.in/
  );

  // Step 12
  const body =
    this.page.locator(
      'body'
    );

  await expect(
    body
  ).toBeVisible();

  // Step 13
  const pageText =
    await body.innerText();

  expect(
    pageText.length
  ).toBeGreaterThan(0);

  // Step 14
  await takeScreenshot(
    this.page,
    'TC19_Mobile_Footer'
  );
}
}