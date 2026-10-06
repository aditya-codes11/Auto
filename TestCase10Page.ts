import { Page, expect } from '@playwright/test';
import { takeScreenshot } from '../utils/Screenshot';

export class TestCase10Page {
  constructor(private page: Page) {}

  async execute() {
    await this.page.goto('/');

    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.body.scrollHeight
      );
    });

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

    const email = this.page
      .getByPlaceholder(/email/i)
      .filter({
        visible: true
      })
      .first();

    await expect(email).toBeVisible();

    const subscribe = this.page
      .getByText(/Subscribe/i)
      .filter({
        visible: true
      })
      .first();

    await expect(
      subscribe
    ).toBeVisible();

    await takeScreenshot(
      this.page,
      'TC10_Newsletter_Initial'
    );

    await subscribe.click();

    const invalidEmails = [
      'abc',
      'abc@domain',
      'test user@example.com'
    ];

    for (
      const invalidEmail
      of invalidEmails
    ) {
      await email.fill('');

      await email.fill(
        invalidEmail
      );

      await subscribe.click();
    }

    await takeScreenshot(
      this.page,
      'TC10_Invalid_Email'
    );

    await email.fill('');

    await email.fill(
      'hamleys.test@example.com'
    );

    await subscribe.click();

    await takeScreenshot(
      this.page,
      'TC10_Subscription'
    );

    await email.fill(
      'hamleys.test@example.com'
    );

    await email.press('Tab');

    await this.page.keyboard.press(
      'Enter'
    );

    await this.page.reload();
  }
}