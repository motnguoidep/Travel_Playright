import { test } from "@playwright/test";

test.describe("Multiple tab", async () => {
    test('Handle multiple tap showed randomly', async({ page }) => {
        //đi đến trang web
        await page.goto(`https://www.phptravels.net/tours/Jeddah/jeddah/31-03-2025/1/0/`)

        //đợi page mở ra
        const newPage = await page.waitForEvent("popup");
        await newPage.click(``)
    })
})