// tests/persistTodo.spec.ts
import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/todoPage';

test('追加後の保持', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('保持');
  await todo.reload();

  await expect(todo.todoItems).toHaveText(['保持']);
});

test('状態変更後の保持', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('状態保持');
  await todo.toggleTask(0);
  await todo.reload();

  await expect(todo.todoItems.nth(0)).toHaveClass(/completed/);
});

test('削除後の保持', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('削除保持');
  await todo.deleteTask(0);
  await todo.reload();

  await expect(todo.todoItems).toHaveCount(0);
});
