import { test, expect } from '@playwright/test';

test('商品をカートに追加できる', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByText('B').click();
  //await page.getByText('Sauce Labs Backpack').click();
  await page.getByRole('button', { name: 'Add to cart' }).click();

  await expect(page.getByText('1')).toBeVisible(); // カートの数字
});
