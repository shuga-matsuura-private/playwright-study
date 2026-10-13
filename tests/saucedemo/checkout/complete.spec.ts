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

  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await cart.checkout();
  await checkout.fillInfo('Shuya', 'QA', '1500001');
  await checkout.continue();
  await checkout.finish();
});

test('CP-01 完了メッセージが表示される', async ({ page }) => {
  const complete = new CheckoutCompletePage(page);
  await expect(complete.completeHeader).toHaveText('Thank you for your order!');
});

test('CP-02 Back HomeでInventoryへ戻る', async ({ page }) => {
  const complete = new CheckoutCompletePage(page);
  await complete.backHome();
  await expect(page).toHaveURL(/inventory/);
});

test('CP-03 完了後はカートが空', async ({ page }) => {
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});
