import { test } from '@playwright/test';
import { TodoPage } from '../pages/todoPage';

test('ToDo追加', async ({ page }) => {
  const todo = new TodoPage(page);

  await todo.goto();
  await todo.addTodo('Playwright学習');
  await todo.expectTodos(['Playwright学習']);
});

test('ToDo完了', async ({ page }) => {
  const todo = new TodoPage(page);

  await todo.goto();
  await todo.addTodo('完了テスト');
  await todo.toggleFirst();
  await todo.filterCompleted();
  await todo.expectTodos(['完了テスト']);
});

test('ToDo削除', async ({ page }) => {
  const todo = new TodoPage(page);

  await todo.goto();
  await todo.addTodo('削除テスト');
  await todo.deleteFirst();
  await todo.expectCount(0);
});

test('フィルター機能', async ({ page }) => {
  const todo = new TodoPage(page);

  await todo.goto();
  await todo.addTodo('A');
  await todo.addTodo('B');

  await todo.toggleFirst(); // Aを完了

  await todo.filterActive();
  await todo.expectTodos(['B']);

  await todo.filterCompleted();
  await todo.expectTodos(['A']);
});
