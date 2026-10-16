import { APIRequestContext } from '@playwright/test';

export class UserApi {
  constructor(
    private request: APIRequestContext
  ) {}

  async getUser(id: number) {
    return await this.request.get(
      `https://dummyjson.com/users/${id}`
    );
  }

  async getUsers() {
    return await this.request.get(
      'https://dummyjson.com/users'
    );
  }
}
