import { test, expect } from "@playwright/test";
import { TranslateLanguage } from "../../pages/translate-language";


test.describe('check translate language', async() => {
    test('check English language', async ({ page }) => {
        const translateLang = new TranslateLanguage(page);
        await test.step('open travel page', async () => {
          await translateLang.openTravelPage();
        });
        await test.step('compare language', async () => {
          const actualText = await translateLang.getCurrentLanguage("English");
          expect(actualText).toBe("Flights");
        });  
    });
      
    test('check Chinese language', async ({ page }) => {
        const translateLang = new TranslateLanguage(page);
        await test.step('open travel page', async () => {
          await translateLang.openTravelPage();
        });
        await test.step('compare language', async () => {
          const actualText = await translateLang.getCurrentLanguage("Chinese");
          expect(actualText).toBe("航班");
        });
    });
      
    test('check Turkish language', async ({ page }) => {
        const translateLang = new TranslateLanguage(page);
        await test.step('open travel page', async () => {
          await translateLang.openTravelPage();
        });
        await test.step('compare language', async () => {
          const actualText = await translateLang.getCurrentLanguage("Turkish");
          expect(actualText).toBe("Uçuşlar");
        });
    });
      
    test('check Russian language', async ({ page }) => {
        const translateLang = new TranslateLanguage(page);
        await test.step('open travel page', async () => {
          await translateLang.openTravelPage();
        });
        await test.step('compare language', async () => {
          const actualText = await translateLang.getCurrentLanguage("Russian");
          expect(actualText).toBe("Полеты");
        });
      });
      
    test('check French language', async ({ page }) => {
        const translateLang = new TranslateLanguage(page);
        await test.step('open travel page', async () => {
          await translateLang.openTravelPage();
        });
        await test.step('compare language', async () => {
          const actualText = await translateLang.getCurrentLanguage("French");
          expect(actualText).toBe("Vols");
        });
    });
      
    test('check German language', async ({ page }) => {
        const translateLang = new TranslateLanguage(page);
        await test.step('open travel page', async () => {
          await translateLang.openTravelPage();
        });
        await test.step('compare language', async () => {
          const actualText = await translateLang.getCurrentLanguage("Germany");
          expect(actualText).toBe("Flüge");
        });
    });      
})