import { test, expect } from '@playwright/test';
import { UserApi } from '../../pages/api/userApi';

test('API-06 ユーザー取得', async ({ request }) => {
  const api = new UserApi(request);

  const response =
    await api.getUser(1);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(1);
});

test('API-07 ユーザー一覧取得', async ({ request }) => {
  const api = new UserApi(request);

  const response =
    await api.getUsers();

  const body = await response.json();

  expect(body.users.length)
    .toBeGreaterThan(0);
});