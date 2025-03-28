import { test, expect } from "@playwright/test"

test('Login test', async ({ page }) => {
    await page.goto('https://www.phptravels.net/')
    await page.locator("//a[contains(., 'Customer')]").click();
    await page.locator("(//li/a[contains(., 'Login')])[2]").click();
    await page.locator("//input[@id='email']").fill('thuongngo09072003@gmail.com');
    await page.locator("//input[@id='password']").fill('Motnguoidep190723.');
    await page.locator("//input[@id='rememberchb']").check();

    await page.locator("//button[@id='submitBTN']").click();

    

})