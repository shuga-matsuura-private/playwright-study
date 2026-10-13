import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todoPage';

test('タスク追加（正常系）', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('Playwright学習');
  await expect(todo.todoItems).toHaveText(['Playwright学習']);
});

test('空文字は追加されない', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('');
  await expect(todo.todoItems).toHaveCount(0);
});
