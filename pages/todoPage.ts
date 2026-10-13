// pages/todoPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly input: Locator;
  readonly todoItems: Locator;
  readonly toggle: Locator;
  readonly destroy: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.locator('.todo-list li');
    this.toggle = page.locator('.toggle');
    this.destroy = page.locator('.destroy');
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  async addTask(text: string) {
    await this.input.fill(text);
    await this.page.keyboard.press('Enter');
  }

  async getTaskText(index: number) {
    return await this.todoItems.nth(index).innerText();
  }

  async toggleTask(index: number) {
    await this.toggle.nth(index).check();
  }

  async untoggleTask(index: number) {
    await this.toggle.nth(index).uncheck();
  }

  async deleteTask(index: number) {
    await this.todoItems.nth(index).hover();
    await this.destroy.nth(index).click();
  }

  async filter(type: 'All' | 'Active' | 'Completed') {
    await this.page.getByText(type).click();
  }

  async reload() {
    await this.page.reload();
  }
}
