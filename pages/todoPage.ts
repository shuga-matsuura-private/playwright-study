import { expect, Page } from '@playwright/test';

export class TodoPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  async addTodo(text: string) {
    await this.page.getByPlaceholder('What needs to be done?').fill(text);
    await this.page.keyboard.press('Enter');
  }

  async toggleFirst() {
    await this.page.locator('.todo-list li .toggle').first().click();
  }

  async deleteFirst() {
    const first = this.page.locator('.todo-list li').first();
    await first.hover();
    await first.locator('.destroy').click();
  }

  async filterActive() {
    await this.page.getByRole('link', { name: 'Active' }).click();
  }

  async filterCompleted() {
    await this.page.getByRole('link', { name: 'Completed' }).click();
  }

  async expectTodos(texts: string[]) {
    await expect(this.page.locator('.todo-list li')).toHaveText(texts);
  }

  async expectCount(count: number) {
    await expect(this.page.locator('.todo-list li')).toHaveCount(count);
  }
}
