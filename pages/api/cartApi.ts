import { APIRequestContext } from '@playwright/test';

export class CartApi {
  constructor(
    private request: APIRequestContext
  ) {}

  async getCart(id: number) {
    return await this.request.get(
      `https://dummyjson.com/carts/${id}`
    );
  }
}