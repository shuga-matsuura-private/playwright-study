import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test('L-01 標準ユーザーでログインできる', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});

test('L-02 パスワード誤りでログイン失敗', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('standard_user', 'wrong');
  await expect(login.errorMessage).toBeVisible();
});

test('L-03 ユーザー名空でログイン失敗', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('', 'secret_sauce');
  await expect(login.errorMessage).toBeVisible();
});

test('L-04 ロックユーザーはログインできない', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('locked_out_user', 'secret_sauce');
  await expect(login.errorMessage).toBeVisible();
});

test('L-05 パスワード空でログイン失敗', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('standard_user', '');
  await expect(login.errorMessage).toBeVisible();
});
