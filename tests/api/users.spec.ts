import { test, expect } from '@playwright/test';
import { ReqresApi } from '../../pages/api/reqresApi';

test('API-01 ユーザー情報取得', async ({ request }) => {
  const api = new ReqresApi(request);

  const response = await api.getUser(2);

  expect(response.status()).toBe(200);
});

test('API-02 id=2ユーザー取得', async ({ request }) => {
  const api = new ReqresApi(request);

  const response = await api.getUser(2);

  const body = await response.json();

  expect(body.data.id).toBe(2);
});

test('API-03 存在しないユーザー取得', async ({ request }) => {
  const api = new ReqresApi(request);

  const response = await api.getUser(999);

  expect(response.status()).toBe(404);
});

test('API-04 ユーザー一覧取得', async ({ request }) => {
  const api = new ReqresApi(request);

  const response = await api.getUsers(1);

  expect(response.status()).toBe(200);
});

test('API-05 ユーザー一覧件数確認', async ({ request }) => {
  const api = new ReqresApi(request);

  const response = await api.getUsers(1);

  const body = await response.json();

  expect(body.data.length).toBeGreaterThan(0);
});

test('API-06 ユーザー作成', async ({ request }) => {
  const api = new ReqresApi(request);

  const response = await api.createUser(
    'shuya',
    'qa'
  );

  expect(response.status()).toBe(201);
});

test('API-07 作成ユーザー名確認', async ({ request }) => {
  const api = new ReqresApi(request);

  const response = await api.createUser(
    'shuya',
    'qa'
  );

  const body = await response.json();

  expect(body.name).toBe('shuya');
});

test('API-08 作成ジョブ確認', async ({ request }) => {
  const api = new ReqresApi(request);

  const response = await api.createUser(
    'shuya',
    'qa'
  );

  const body = await response.json();

  expect(body.job).toBe('qa');
});

test('API-09 createdAt確認', async ({ request }) => {
  const api = new ReqresApi(request);

  const response = await api.createUser(
    'shuya',
    'qa'
  );

  const body = await response.json();

  expect(body.createdAt).toBeDefined();
});

test('API-10 ユーザー更新', async ({ request }) => {
  const api = new ReqresApi(request);

  const response = await api.updateUser(
    2,
    'shuya',
    'lead qa'
  );

  expect(response.status()).toBe(200);
});

test('API-11 更新内容確認', async ({ request }) => {
  const api = new ReqresApi(request);

  const response = await api.updateUser(
    2,
    'shuya',
    'lead qa'
  );

  const body = await response.json();

  expect(body.job).toBe('lead qa');
});

test('API-12 ユーザー削除', async ({ request }) => {
  const api = new ReqresApi(request);

  const response = await api.deleteUser(2);

  expect(response.status()).toBe(204);
});

test('API-13 data存在確認', async ({ request }) => {
  const api = new ReqresApi(request);

  const response = await api.getUser(2);

  const body = await response.json();

  expect(body.data).toBeDefined();
});

test('API-14 必須項目確認', async ({ request }) => {
  const api = new ReqresApi(request);

  const response = await api.getUser(2);

  const body = await response.json();

  expect(body.data).toHaveProperty('id');
  expect(body.data).toHaveProperty('email');
  expect(body.data).toHaveProperty('first_name');
  expect(body.data).toHaveProperty('last_name');
});

test('API-15 Content-Type確認', async ({ request }) => {
  const api = new ReqresApi(request);

  const response = await api.getUser(2);

  const contentType =
    response.headers()['content-type'];

  expect(contentType).toContain(
    'application/json'
  );
});