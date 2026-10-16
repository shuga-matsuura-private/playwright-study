import { APIRequestContext } from '@playwright/test';

export class ReqresApi {
  constructor(
    private request: APIRequestContext
  ) {}

  async getUser(id: number) {
    return await this.request.get(
      `https://reqres.in/api/users/${id}`
    );
  }

  async getUsers(page: number) {
    return await this.request.get(
      `https://reqres.in/api/users?page=${page}`
    );
  }

  async createUser(
    name: string,
    job: string
  ) {
    return await this.request.post(
      'https://reqres.in/api/users',
      {
        data: {
          name,
          job
        }
      }
    );
  }

  async updateUser(
    id: number,
    name: string,
    job: string
  ) {
    return await this.request.put(
      `https://reqres.in/api/users/${id}`,
      {
        data: {
          name,
          job
        }
      }
    );
  }

  async deleteUser(id: number) {
    return await this.request.delete(
      `https://reqres.in/api/users/${id}`
    );
  }
}