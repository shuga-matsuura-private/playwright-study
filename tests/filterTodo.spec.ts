import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todoPage';

test('Completedのみ表示', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('Activeタスク');
  await todo.addTask('Completedタスク');

  await todo.toggleTask(1);
  await todo.filter('Completed');

  await expect(todo.todoItems).toHaveCount(1);
  await expect(todo.todoItems.nth(0)).toHaveClass(/completed/);
});
