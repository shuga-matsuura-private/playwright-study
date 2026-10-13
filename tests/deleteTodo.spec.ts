import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todoPage';

test('タスク削除', async ({ page }) => {
  const todo = new TodoPage(page);
  await todo.goto();

  await todo.addTask('削除テスト');
  await todo.deleteTask(0);

  await expect(todo.todoItems).toHaveCount(0);
});
