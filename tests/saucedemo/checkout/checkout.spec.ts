import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login.page';
import { InventoryPage } from '../../../pages/inventory.page';
import { CartPage } from '../../../pages/cart.page';
import { CheckoutPage } from '../../../pages/checkout.page';
import { CheckoutCompletePage } from '../../../pages/checkoutComplete.page';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  const inventory = new InventoryPage(page);
  await inventory.addItem(0);
  await inventory.gotoCart();
});

test('CH-01 Checkout開始で情報入力画面へ遷移', async ({ page }) => {
  const cart = new CartPage(page);
  await cart.checkout();
  await expect(page).toHaveURL(/checkout-step-one/);
});

test('CH-02 First Name空でエラー', async ({ page }) => {
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await cart.checkout();
  await checkout.fillInfo('', 'QA', '1500001');
  await checkout.continue();
  await expect(checkout.errorMessage).toBeVisible();
});

test('CH-03 Last Name空でエラー', async ({ page }) => {
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await cart.checkout();
  await expect(page).toHaveURL(/checkout-step-one/); 
  await checkout.fillInfo('Shuya', '', '1500001');
  await checkout.continue();
  await expect(checkout.errorMessage).toBeVisible();
});

test('CH-04 Postal Code空でエラー', async ({ page }) => {
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await cart.checkout();
  await checkout.fillInfo('Shuya', 'QA', '');
  await checkout.continue();
  await expect(checkout.errorMessage).toBeVisible();
});

test('CH-05 正常入力でOverviewへ遷移', async ({ page }) => {
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await cart.checkout();
  await checkout.fillInfo('Shuya', 'QA', '1500001');
  await checkout.continue();
  await expect(page).toHaveURL(/checkout-step-two/);
});

test('CH-06 Overviewの商品情報が正しい', async ({ page }) => {
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await cart.checkout();
  await checkout.fillInfo('Shuya', 'QA', '1500001');
  await checkout.continue();

  await expect(page.locator('.inventory_item_name')).toBeVisible();
  await expect(page.locator('.inventory_item_price')).toBeVisible();
});

test('CH-07 Finishで完了画面へ遷移', async ({ page }) => {
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await cart.checkout();
  await checkout.fillInfo('Shuya', 'QA', '1500001');
  await checkout.continue();
  await checkout.finish();

  await expect(page).toHaveURL(/checkout-complete/);
});
