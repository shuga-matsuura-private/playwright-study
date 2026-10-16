import { test, expect } from '@playwright/test';
import { ProductApi } from '../../pages/api/productApi';

test('API-01 商品一覧取得', async ({ request }) => {
  const api = new ProductApi(request);

  const response = await api.getProducts();

  expect(response.status()).toBe(200);
});

test('API-02 商品一覧件数確認', async ({ request }) => {
  const api = new ProductApi(request);

  const response = await api.getProducts();

  const body = await response.json();

  expect(body.products.length)
    .toBeGreaterThan(0);
});

test('API-03 商品詳細取得', async ({ request }) => {
  const api = new ProductApi(request);

  const response = await api.getProduct(1);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(1);
});

test('API-04 商品登録', async ({ request }) => {
  const api = new ProductApi(request);

  const response =
    await api.createProduct();

  expect(response.status()).toBe(201);
});

test('API-05 商品更新', async ({ request }) => {
  const api = new ProductApi(request);

  const response =
    await api.updateProduct(1);

  expect(response.status()).toBe(200);
});

test('API-10 商品登録成功', async ({ request }) => {
  const api = new ProductApi(request);

  const response =
    await api.createProduct();

  expect(response.status()).toBe(201);
});

test('API-11 登録商品名確認', async ({ request }) => {
  const api = new ProductApi(request);

  const response =
    await api.createProduct();

  const body = await response.json();

  expect(body.title)
    .toBe('Playwright Product');
});

test('API-12 商品更新成功', async ({ request }) => {
  const api = new ProductApi(request);

  const response =
    await api.updateProduct(1);

  expect(response.status()).toBe(200);
});

test('API-13 更新内容確認', async ({ request }) => {
  const api = new ProductApi(request);

  const response =
    await api.updateProduct(1);

  const body = await response.json();

  expect(body.title)
    .toBe('Updated Product');
});

test('API-14 レスポンス形式確認', async ({ request }) => {
  const api = new ProductApi(request);

  const response =
    await api.getProduct(1);

  const body = await response.json();

  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('title');
  expect(body).toHaveProperty('price');
});

test('API-15 Content-Type確認', async ({ request }) => {
  const api = new ProductApi(request);

  const response =
    await api.getProduct(1);

  const contentType =
    response.headers()['content-type'];

  expect(contentType)
    .toContain('application/json');
});