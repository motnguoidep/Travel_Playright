import { test, expect } from "@playwright/test";

test('multiple tabs', async ({ page }) => {
    const openTravelPage = "https://www.phptravels.net/"
    const xpathClickTab = "(//li[@role='presentation'])[2]";
    const xpathClickTab3 = "(//li[@role='presentation'])[3]";
    const xpathClickTab4 = "(//li[@role='presentation'])[4]";
    const xpathClickTab5 = "(//li[@role='presentation'])[5]";


    await page.goto(openTravelPage);
    await page.click(xpathClickTab);

    const tab2 = await page.context().newPage();
    tab2.goto(openTravelPage);
    await tab2.click(xpathClickTab);

    const tab3 = await page.context().newPage();
    tab3.goto(openTravelPage); 
    await tab3.click(xpathClickTab3)

    const tab4 = await page.context().newPage();
    tab4.goto(openTravelPage);
    await tab4.click(xpathClickTab4)

    const tab5 = await page.context().newPage();
    tab5.goto(openTravelPage);
    await tab4.click(xpathClickTab5)

})