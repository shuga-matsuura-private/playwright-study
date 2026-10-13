// pages/cart.page.ts
import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly items: Locator;
  readonly removeButtons: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator('.cart_item');
    this.removeButtons = page.locator('[data-test^="remove"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async removeItem(index: number) {
    await this.removeButtons.nth(index).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
