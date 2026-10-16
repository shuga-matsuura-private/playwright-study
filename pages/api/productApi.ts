import { APIRequestContext } from '@playwright/test';

export class ProductApi {
  constructor(
    private request: APIRequestContext
  ) {}

  async getProducts() {
    return await this.request.get(
      'https://dummyjson.com/products'
    );
  }

  async getProduct(id: number) {
    return await this.request.get(
      `https://dummyjson.com/products/${id}`
    );
  }

  async createProduct() {
    return await this.request.post(
      'https://dummyjson.com/products/add',
      {
        data: {
          title: 'Playwright Product'
        }
      }
    );
  }

  async updateProduct(id: number) {
    return await this.request.put(
      `https://dummyjson.com/products/${id}`,
      {
        data: {
          title: 'Updated Product'
        }
      }
    );
  }
}