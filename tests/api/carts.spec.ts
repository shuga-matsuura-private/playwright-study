import { test, expect } from '@playwright/test';
import { CartApi } from '../../pages/api/cartApi';

test('API-08 カート取得', async ({ request }) => {
  const api = new CartApi(request);

  const response =
    await api.getCart(1);

  expect(response.status()).toBe(200);
});

test('API-09 カート商品確認', async ({ request }) => {
  const api = new CartApi(request);

  const response =
    await api.getCart(1);

  const body = await response.json();

  expect(body.products.length)
    .toBeGreaterThan(0);
});