import { Page, expect } from "@playwright/test";
import { TravelPage } from "./travel-page";

export class TranslateLanguage extends TravelPage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Chọn ngôn ngữ từ dropdown và trả về text tương ứng dựa trên ngôn ngữ đã chọn.
   * @param language Ngôn ngữ muốn chọn ( "English", "Arabic","Russian", "Chinese")
   * @returns Giá trị text tương ứng với ngôn ngữ đó.
   */
  async getCurrentLanguage(language: "Chinese" | "English" | "Arabic" | "Russian" ): Promise<string> {
    const openDropdown = this.page.locator("(//li/a[@data-bs-toggle='dropdown'])[2]");
    await openDropdown.waitFor({ state: "visible", timeout: 50000 });
    await openDropdown.click({ force: true });
    
    let expectedText: string;
    
    switch (language) {
        case "English":
            // Click chọn English từ dropdown
            // await this.page.locator("//span[normalize-space(text())='English']").click();
            await this.page.getByRole('button', { name: 'flagEnglish' }).click();
            // Sau khi chọn English, giao diện hiển thị text của Flights bằng "Flights"
            expectedText = await this.page.getByRole('tab', { name: 'Flights' }).innerText();
            break;
        case "Chinese":
            // Click chọn Chinese từ dropdown
            await this.page.getByRole('button', { name: 'flag Chinese' }).click();
            // Sau khi chọn Chinese, giao diện hiển thị text của Hotel bằng "酒店"
            expectedText = await this.page.getByRole('tab', { name: '航班' }).innerText();
            break;
        case "Arabic":
            // Click chọn Chinese từ dropdown
            await this.page.getByRole('button', { name: 'flag Arabic' }).click();
            // Sau khi chọn Chinese, giao diện hiển thị text của Hotel bằng "Uçuşlar"
            expectedText = await this.page.getByRole('tab', { name: 'Uçuşlar' }).innerText();
            break;
        case "Russian":
             // Click chọn Chinese từ dropdown
            await this.page.getByRole('link', { name: 'flag Russian' }).click();
            // Sau khi chọn Chinese, giao diện hiển thị text của Hotel bằng "Uçuşlar"
            expectedText = await this.page.getByRole('tab', { name: 'Полеты' }).innerText();
            break;
        default:
        throw new Error(`Unsupported language: ${language}`);
    }
    return expectedText.trim();
  }
}

