// @ts-check
import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.page';

test('TC_LOGIN_001: Verify successful login with standard user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/');
  const loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'secret_sauce');

  await loginPage.isLoginSuccessful();

  await expect(page.url()).toBe('https://www.saucedemo.com/v1/inventory.html');
});
