


import { test, expect } from "@playwright/test";
import { TranslateMoney } from "../../pages/translate-money-page";

test('compare current money with money after change', async ({ page }) => {
  let translatePage = new TranslateMoney(page);

  await test.step('open translate page', async () => {
    await translatePage.openTravelPage();
    
  });

  await test.step('compare money', async () => {
    await translatePage.compareMoney();
  });
});


