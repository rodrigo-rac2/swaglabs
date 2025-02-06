// @ts-check
import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.page';

test('TC_CART_002: Verify adding multiple items to cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/');
  const loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.isLoginSuccessful();

  // get the value text of the item name with class 'inventory_item_name'
  const firstItemName = await page.locator('.inventory_item_name').nth(0).innerText();
  await page.locator('.btn_inventory').nth(0).click();
  await expect(page.getByRole('link', { name: '1' })).toBeVisible();

  const secondItemName = await page.locator('.inventory_item_name').nth(1).innerText();
  await page.locator('.btn_inventory').nth(1).click();
  await expect(page.getByRole('link', { name: '2' })).toBeVisible();
  await page.getByRole('link', { name: '2' }).click();

  await expect(page.getByRole('link', { name: firstItemName })).toBeVisible();
  await expect(page.getByRole('link', { name: secondItemName })).toBeVisible();
});

test('TC_CART_003: Verify cart ITEM total calculation', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/');
  const loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.isLoginSuccessful();

  const firstItemName = await page.locator('.inventory_item_name').nth(0).innerText();
  const firstItemPrice = await page.locator('.inventory_item_price').nth(0).innerText();
  await page.locator('.btn_inventory').nth(0).click();
  await expect(page.getByRole('link', { name: '1' })).toBeVisible();

  const secondItemName = await page.locator('.inventory_item_name').nth(1).innerText();
  const secondItemPrice = await page.locator('.inventory_item_price').nth(1).innerText();
  await page.locator('.btn_inventory').nth(1).click();
  await page.getByRole('link', { name: '2' }).click();
  await expect(page.getByRole('link', { name: firstItemName })).toBeVisible();
  await expect(page.getByRole('link', { name: secondItemName })).toBeVisible();

  await page.getByRole('link', { name: 'CHECKOUT' }).click();
  await page.locator('[data-test="firstName"]').fill('John');
  await page.locator('[data-test="lastName"]').fill('Doe');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.getByRole('button', { name: 'CONTINUE' }).click();

  await expect(page.getByText(firstItemPrice)).toBeVisible();
  await expect(page.getByText(secondItemPrice)).toBeVisible();

  let totalPrice = parseFloat(firstItemPrice.replace('$', '')) + parseFloat(secondItemPrice.replace('$', ''));
  // round totalPrice to 2 decimal places
  totalPrice = Math.round((totalPrice + Number.EPSILON) * 100) / 100;
  await expect(page.getByText(`${totalPrice}`)).toBeVisible();
});
