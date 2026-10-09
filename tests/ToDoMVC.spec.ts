import { test, expect } from '@playwright/test';

test('ToDoを追加できる', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  await page.getByPlaceholder('What needs to be done?').fill('Playwright学習');
  await page.keyboard.press('Enter');

  await expect(page.locator('.todo-list li')).toHaveText(['Playwright学習']);
});

test('ToDoを完了状態にできる', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  // 追加
  await page.getByPlaceholder('What needs to be done?').fill('完了テスト');
  await page.keyboard.press('Enter');

  // チェックボックスをクリック（完了状態にする）
  await page.locator('.todo-list li .toggle').click();

  // 完了状態は li に "completed" クラスが付く
  await expect(page.locator('.todo-list li')).toHaveClass(/completed/);
});

test('ToDoを削除できる', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  // 追加
  await page.getByPlaceholder('What needs to be done?').fill('削除テスト');
  await page.keyboard.press('Enter');

  const todo = page.locator('.todo-list li');

  // ホバーしないと削除ボタンが出ない
  await todo.hover();

  // 削除ボタン（.destroy）をクリック
  await page.locator('.todo-list li .destroy').click();

  // ToDoが0件になっていることを確認
  await expect(page.locator('.todo-list li')).toHaveCount(0);
});

test('フィルターが機能する', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  // 2つ追加
  await page.getByPlaceholder('What needs to be done?').fill('A');
  await page.keyboard.press('Enter');
  await page.getByPlaceholder('What needs to be done?').fill('B');
  await page.keyboard.press('Enter');

  // A を完了状態にする
  await page.locator('.todo-list li .toggle').first().click();

  // Active（未完了）をクリック
  await page.getByRole('link', { name: 'Active' }).click();

  // B だけが表示される
  await expect(page.locator('.todo-list li')).toHaveText(['B']);

  // Completed（完了済み）をクリック
  await page.getByRole('link', { name: 'Completed' }).click();

  // A だけが表示される
  await expect(page.locator('.todo-list li')).toHaveText(['A']);
});
