// tests/filterTodo.spec.ts
import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todoPage';

test('All表示', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('A');
  await todo.addTask('B');
  await todo.toggleTask(1);

  await todo.filter('All');
  await expect(todo.todoItems).toHaveCount(2);
});

test('Active表示', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('A');
  await todo.addTask('B');
  await todo.toggleTask(1);

  await todo.filter('Active');
  await expect(todo.todoItems).toHaveCount(1);
});

test('Completed表示', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('A');
  await todo.addTask('B');
  await todo.toggleTask(1);

  await todo.filter('Completed');
  await expect(todo.todoItems).toHaveCount(1);
});
