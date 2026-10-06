import { Page, expect } from '@playwright/test';
import Logger from './Logger';

export class Keywords {
  constructor(private page: Page) {}

  async clickText(
    text: string
  ) {
    Logger.info(
      `Clicking text: ${text}`
    );

    const element = this.page
      .getByText(text, {
        exact: true
      })
      .filter({
        visible: true
      })
      .first();

    await expect(element).toBeVisible();

    await element.click();
  }

  async hoverText(
    text: string
  ) {
    Logger.info(
      `Hovering text: ${text}`
    );

    const element = this.page
      .getByText(text, {
        exact: true
      })
      .filter({
        visible: true
      })
      .first();

    await expect(element).toBeVisible();

    await element.hover();
  }

  async clickLink(
    linkName: string
  ) {
    Logger.info(
      `Clicking link: ${linkName}`
    );

    const link = this.page
      .getByRole('link', {
        name: linkName,
        exact: true
      })
      .filter({
        visible: true
      })
      .first();

    await expect(link).toBeVisible();

    await link.click();
  }

  async hoverLink(
    linkName: string
  ) {
    Logger.info(
      `Hovering link: ${linkName}`
    );

    const link = this.page
      .getByRole('link', {
        name: linkName,
        exact: true
      })
      .filter({
        visible: true
      })
      .first();

    await expect(link).toBeVisible();

    await link.hover();
  }

  async verifyText(
    text: string
  ) {
    Logger.info(
      `Verifying text: ${text}`
    );

    const element = this.page
      .getByText(text, {
        exact: true
      })
      .filter({
        visible: true
      })
      .first();

    await expect(element).toBeVisible();
  }

  async clickButton(
    buttonName: string
  ) {
    Logger.info(
      `Clicking button: ${buttonName}`
    );

    const button = this.page
      .getByRole('button', {
        name: buttonName,
        exact: true
      })
      .filter({
        visible: true
      })
      .first();

    await expect(button).toBeVisible();

    await button.click();
  }
}