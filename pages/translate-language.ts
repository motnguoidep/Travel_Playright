import { Page } from "@playwright/test";
import { TravelPage } from "./travel-page";

export class TranslateLanguage extends TravelPage {
  constructor(page: Page) {
    super(page);
  }
  async getCurrentLanguage(language: "Chinese" | "English" | "Turkish" | "Russian" | "French" | "Germany"): Promise<string> {
    const openDropdown = this.page.getByText('English English Arabic');
    await openDropdown.waitFor({ state: "visible", timeout: 50000 });
    await openDropdown.click({ force: true });
    
    let expectedText: string;
    
    switch (language) {
        case "English":
            // Click chọn English từ dropdown
            await this.page.getByRole('link', { name: 'flag English' }).click();
            // Sau khi chọn English, giao diện hiển thị text của Flights bằng "Flights"
            expectedText = await this.page.getByRole('tab', { name: 'Flights' }).innerText();
            break;
        case "Chinese":
            await this.page.getByRole('link', { name: 'flag Chinese' }).click();
            expectedText = await this.page.getByRole('tab', { name: '航班' }).innerText();
            break;
        case "Turkish":
            await this.page.getByRole('link', { name: 'flag Turkish' }).click();
            expectedText = await this.page.getByRole('tab', { name: 'Uçuşlar' }).innerText();
            break;
        case "Russian":
             // Click chọn Chinese từ dropdown
            await this.page.getByRole('link', { name: 'flag Russian' }).click();
            expectedText = await this.page.getByRole('tab', { name: 'Полеты' }).innerText();
            break;
        case "French":
            await this.page.getByRole('link', { name: 'flag French' }).click();
            expectedText = await this.page.getByRole('tab', { name: 'Vols' }).innerText();
            break;
        case "Germany":
            await this.page.getByRole('link', { name: 'flag Germany' }).click();
            expectedText = await this.page.getByRole('tab', { name: 'Flüge' }).innerText();
            break;
        default:
        throw new Error(`Unsupported language: ${language}`);
    }
    return expectedText.trim();
  }
}

