// tests/deleteTodo.spec.ts
import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/todoPage';

test('単体削除', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('削除');
  await todo.deleteTask(0);

  await expect(todo.todoItems).toHaveCount(0);
});

test('複数削除', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('A');
  await todo.addTask('B');

  await todo.deleteTask(0);
  await todo.deleteTask(0);

  await expect(todo.todoItems).toHaveCount(0);
});

test('Completed削除', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('完了タスク');
  await todo.toggleTask(0);
  await todo.deleteTask(0);

  await expect(todo.todoItems).toHaveCount(0);
});
