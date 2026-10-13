import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login.page';
import { InventoryPage } from '../../../pages/inventory.page';
import { CartPage } from '../../../pages/cart.page';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('standard_user', 'secret_sauce');
});

test('C-01 商品を1つ追加するとバッジが1になる', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.addItem(0);
  await expect(inventory.cartBadge).toHaveText('1');
});

test('C-02 商品を2つ追加するとバッジが2になる', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.addItem(0);
  await inventory.addItem(1);
  await expect(inventory.cartBadge).toHaveText('2');
});

test('C-03 Inventoryで商品削除するとバッジが減る', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.addItem(0);
  await inventory.addItem(1);
  await inventory.page.locator('[data-test^="remove"]').nth(0).click();
  await expect(inventory.cartBadge).toHaveText('1');
});

test('C-04 カート画面へ遷移できる', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.addItem(0);
  await inventory.gotoCart();
  await expect(page).toHaveURL(/cart/);
});

test('C-05 カート内の商品を削除できる', async ({ page }) => {
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);

  await inventory.addItem(0);
  await inventory.gotoCart();

  await cart.removeItem(0);
  await expect(cart.items).toHaveCount(0);
});

test('C-06 カート内の商品名・価格が正しい', async ({ page }) => {
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);

  await inventory.addItem(0);
  await inventory.gotoCart();

  await expect(cart.items.first().locator('.inventory_item_name')).toBeVisible();
  await expect(cart.items.first().locator('.inventory_item_price')).toBeVisible();
});
