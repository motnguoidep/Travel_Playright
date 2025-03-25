import { test, expect } from "@playwright/test"

test('Register test', async ({ page }) => {
    await page.goto('https://www.phptravels.net/')

    await page.locator("//a[contains(., 'Customer')]").click();
    await page.locator("(//li/a[contains(., 'Signup')])[2]").click();
    await page.locator("//input[@id='firstname']").fill('Tana');
    await page.locator("//input[@id='last_name']").fill('Ngo');
    await page.locator("//div[@class='filter-option']").click();
    await page.locator("//span[@class='text']//span[contains(text(), 'Viet Nam')]").click();
    await page.locator("//input[@id='phone']").fill('0398321759');
    await page.locator("//input[@id='user_email']").fill('thuongngo09072003@gmail.com');
    await page.locator("//input[@id='password']").fill('Motnguoidep190723.')
    await page.locator("//div[@id='checkbox']").check();

    await page.locator("//button[@id='submitBTN']").click();
})