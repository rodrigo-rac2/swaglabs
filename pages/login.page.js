import { expect } from '@playwright/test';

export default class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async login(username, password) {
        await this.page.locator('[data-test="username"]').fill(username);
        await this.page.locator('[data-test="password"]').fill(password);
        await this.page.getByRole('button', { name: 'LOGIN' }).click();
    }

    async isLoginSuccessful() {
        return await expect(this.page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
    }

    async isLoginFailed() {
        return this.page.isVisible('text=Invalid username or password');
    }
}