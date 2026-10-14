// pages/inventory.page.ts
import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly items: Locator;
  readonly addToCartButtons: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator('.inventory_item');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async addItem(index: number) {
    await this.addToCartButtons.nth(index).click();
  }

  async gotoCart() {
    const cartLink = this.page.locator('.shopping_cart_link');
    await cartLink.waitFor({ state: 'visible' });   // ← 追加
    await cartLink.click();                         // ← これが確実に押される
    await this.page.waitForURL(/cart\.html/);       // ← 追加（最重要）
  }
}
