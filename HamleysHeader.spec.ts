// import { test } from '@playwright/test';

// import { TestCase01Page } from '../pages/TestCase01Page';
// import { TestCase02Page } from '../pages/TestCase02Page';
// import { TestCase03Page } from '../pages/TestCase03Page';
// import { TestCase04Page } from '../pages/TestCase04Page';
// import { TestCase05Page } from '../pages/TestCase05Page';
// import { TestCase06Page } from '../pages/TestCase06Page';
// import { TestCase07Page } from '../pages/TestCase07Page';
// import { TestCase08Page } from '../pages/TestCase08Page';
// import { TestCase09Page } from '../pages/TestCase09Page';
// import { TestCase10Page } from '../pages/TestCase10Page';
// import { TestCase11Page } from '../pages/TestCase11Page';
// import { TestCase12Page } from '../pages/TestCase12Page';
// import { TestCase13Page } from '../pages/TestCase13Page';
// import { TestCase14Page } from '../pages/TestCase14Page';
// import { TestCase15Page } from '../pages/TestCase15Page';
// import { TestCase16Page } from '../pages/TestCase16Page';
// import { TestCase17Page } from '../pages/TestCase17Page';
// import { TestCase18Page } from '../pages/TestCase18Page';
// import { TestCase19Page } from '../pages/TestCase19Page';
// import { TestCase20Page } from '../pages/TestCase20Page';

// import Logger from '../utils/Logger';
// import { takeScreenshot } from '../utils/Screenshot';

// test.beforeEach(
//   async ({}, testInfo) => {
//     Logger.info(
//       `STARTED: ${testInfo.title}`
//     );
//   }
// );

// test.afterEach(
//   async ({ page }, testInfo) => {
//     if (
//       testInfo.status ===
//       testInfo.expectedStatus
//     ) {
//       Logger.info(
//         `PASSED: ${testInfo.title}`
//       );
//     } else {
//       Logger.error(
//         `FAILED: ${testInfo.title}`
//       );

//       await takeScreenshot(
//         page,
//         testInfo.title
//       );
//     }
//   }
// );

// test.describe(
//   'Hamleys India Footer Test Cases',
//   () => {

//     test(
//       'TC01 - Ride-Ons and Cycles Listing Filters Sorting and Navigation',
//       async ({ page }) => {
//         const testCase =
//           new TestCase01Page(page);

//         await testCase.execute();
//       }
//     );

//     test(
//       'TC02 - Baby Gear Listing Cart Operations and Footer Links',
//       async ({ page }) => {
//         const testCase =
//           new TestCase02Page(page);

//         await testCase.execute();
//       }
//     );

//     test(
//       'TC03 - Toys Games School Travel and Gadgets Categories',
//       async ({ page }) => {
//         const testCase =
//           new TestCase03Page(page);

//         await testCase.execute();
//       }
//     );

//     test(
//       'TC04 - Lego Filters Product Purchase and Policy Navigation',
//       async ({ page }) => {
//         const testCase =
//           new TestCase04Page(page);

//         await testCase.execute();
//       }
//     );

//     test(
//       'TC05 - Nerf Sorting Brand Filter and Footer Navigation',
//       async ({ page }) => {
//         const testCase =
//           new TestCase05Page(page);

//         await testCase.execute();
//       }
//     );

//     test(
//       'TC06 - Most Searched Navigation and Social Media Links',
//       async ({ page }) => {
//         const testCase =
//           new TestCase06Page(page);

//         await testCase.execute();
//       }
//     );

//     test(
//       'TC07 - About Hamleys Links and Store Locator',
//       async ({ page }) => {
//         const testCase =
//           new TestCase07Page(page);

//         await testCase.execute();
//       }
//     );

//     test(
//       'TC08 - Track Order and My Account Login Redirect',
//       async ({ page }) => {
//         const testCase =
//           new TestCase08Page(page);

//         await testCase.execute();
//       }
//     );

//     test(
//       'TC09 - Customer Care Cancellation and Books Filter',
//       async ({ page }) => {
//         const testCase =
//           new TestCase09Page(page);

//         await testCase.execute();
//       }
//     );

//     test(
//       'TC10 - Newsletter Subscription Validation',
//       async ({ page }) => {
//         const testCase =
//           new TestCase10Page(page);

//         await testCase.execute();
//       }
//     );

//     test(
//       'TC11 - Privacy Cookies Policy and Twitter Link',
//       async ({ page }) => {
//         const testCase =
//           new TestCase11Page(page);

//         await testCase.execute();
//       }
//     );

//     test(
//       'TC12 - Terms and Conditions and Sale Terms Navigation',
//       async ({ page }) => {
//         const testCase =
//           new TestCase12Page(page);

//         await testCase.execute();
//       }
//     );

//     test(
//       'TC13 - Sale Terms Coupon Codes Offers and Facebook',
//       async ({ page }) => {
//         const testCase =
//           new TestCase13Page(page);

//         await testCase.execute();
//       }
//     );

//     test(
//       'TC14 - Delivery Policy and Pincode Validation',
//       async ({ page }) => {
//         const testCase =
//           new TestCase14Page(page);

//         await testCase.execute();
//       }
//     );

//     test(
//       'TC15 - Return Refund Policy and Refund Information',
//       async ({ page }) => {
//         const testCase =
//           new TestCase15Page(page);

//         await testCase.execute();
//       }
//     );

//     test(
//       'TC16 - Fees Payment Policy and Instagram Navigation',
//       async ({ page }) => {
//         const testCase =
//           new TestCase16Page(page);

//         await testCase.execute();
//       }
//     );

//     test(
//       'TC17 - SpiderMan Category Filter and Product Details',
//       async ({ page }) => {
//         const testCase =
//           new TestCase17Page(page);

//         await testCase.execute();
//       }
//     );

//     test(
//       'TC18 - Store Locations Search and Filtering',
//       async ({ page }) => {
//         const testCase =
//           new TestCase18Page(page);

//         await testCase.execute();
//       }
//     );

//     test(
//       'TC19 - Footer Social Media Links and Responsive Layout',
//       async ({ page }) => {
//         const testCase =
//           new TestCase19Page(page);

//         await testCase.execute();
//       }
//     );

//     test(
//       'TC20 - Majorette Search Homepage and Newsletter',
//       async ({ page }) => {
//         const testCase =
//           new TestCase20Page(page);

//         await testCase.execute();
//       }
//     );

//   }
// );