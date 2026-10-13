import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todoPage';

test('リロード後も状態保持', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('永続化テスト');
  await todo.toggleTask(0);

  await todo.reload();

  await expect(todo.todoItems.nth(0)).toHaveClass(/completed/);
});
