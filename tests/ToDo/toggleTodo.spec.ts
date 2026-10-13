// tests/toggleTodo.spec.ts
import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/todoPage';

test('Active → Completed', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('状態遷移');
  await todo.toggleTask(0);

  await expect(todo.todoItems.nth(0)).toHaveClass(/completed/);
});

test('Completed → Active', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('戻す');
  await todo.toggleTask(0);
  await todo.untoggleTask(0);

  await expect(todo.todoItems.nth(0)).not.toHaveClass(/completed/);
});

test('複数状態変更', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('A');
  await todo.addTask('B');

  await todo.toggleTask(0);
  await todo.toggleTask(1);

  await expect(todo.todoItems.nth(0)).toHaveClass(/completed/);
  await expect(todo.todoItems.nth(1)).toHaveClass(/completed/);
});
