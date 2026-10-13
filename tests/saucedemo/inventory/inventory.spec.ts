import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('standard_user', 'secret_sauce');
});

test('I-01 商品一覧が6件表示される', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await expect(inventory.items).toHaveCount(6);
});

test('I-02 商品名が正しく表示される', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await expect(inventory.items.first().locator('.inventory_item_name')).toBeVisible();
});

test('I-03 商品価格が正しく表示される', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await expect(inventory.items.first().locator('.inventory_item_price')).toBeVisible();
});

test('I-04 商品詳細へ遷移できる', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.items.first().locator('.inventory_item_name').click();
  await expect(page).toHaveURL(/inventory-item/);
});

test('I-05 商品詳細から戻れる', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.items.first().locator('.inventory_item_name').click();
  await page.locator('[data-test="back-to-products"]').click();
  await expect(page).toHaveURL(/inventory/);
});
