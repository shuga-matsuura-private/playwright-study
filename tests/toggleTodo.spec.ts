import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todoPage';

test('Active → Completed', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('状態遷移テスト');
  await todo.toggleTask(0);

  await expect(todo.todoItems.nth(0)).toHaveClass(/completed/);
});

test('Completed → Active', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('状態戻しテスト');
  await todo.toggleTask(0);
  await todo.untoggleTask(0);

  await expect(todo.todoItems.nth(0)).not.toHaveClass(/completed/);
});
