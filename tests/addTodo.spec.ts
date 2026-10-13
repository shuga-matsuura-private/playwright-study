// tests/addTodo.spec.ts
import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todoPage';

test('正常追加', async ({ page }) => {
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

test('スペースのみは追加されない', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('   ');
  await expect(todo.todoItems).toHaveCount(0);
});

test('長文でも追加される', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  const longText = 'a'.repeat(200);
  await todo.addTask(longText);
  await expect(todo.todoItems.nth(0)).toHaveText(longText);
});

test('連続追加できる', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('A');
  await todo.addTask('B');
  await todo.addTask('C');

  await expect(todo.todoItems).toHaveText(['A', 'B', 'C']);
});
