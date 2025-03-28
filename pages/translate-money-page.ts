import { Page, expect } from "@playwright/test";
import { TravelPage } from "./travel-page";

export class TranslateMoney extends TravelPage {
  constructor(page: Page) {
    super(page);
  }

  // Lấy giá trị tiền hiện tại (EUR)
  async getCurrentMoney(): Promise<string> {
    // chọn 1 giá trị khac so với khởi tạo
    const openDropdown =  this.page.locator("(//li/a[@data-bs-toggle='dropdown'])[2]");
    await openDropdown.waitFor({ state: "visible", timeout: 50000 });
    await openDropdown.click();
    await this.page.locator("//span[normalize-space(text())='EUR']").click();

    // Sử dụng locator cho phần tử chứa thông tin tiền, ví dụ:
    const fullTextCurrent = await this.page.locator("//p[@class='m-0 text-muted']/small").first().innerText();
    const currentMoney = fullTextCurrent.replace("From", "").trim();
    return currentMoney;
  }

  // Lấy giá trị tiền sau khi thay đổi (ví dụ: "EUR 582.64")
  async getMoneyAfterChange(): Promise<string> {
    const fullText = await this.page.locator("//p[@class='m-0 text-muted']/small").first().innerText();
    const afterMoney = fullText.replace("From", "").trim();
    return afterMoney;
  }

  // So sánh giá trị hiện tại và sau khi thay đổi
  async compareMoney() {
    const current = await this.getCurrentMoney();
    const after = await this.getMoneyAfterChange();
    expect(current).toBe(after);
  }

}

  


