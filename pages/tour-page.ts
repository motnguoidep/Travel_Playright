import { Page, expect } from "@playwright/test";
import { TravelPage } from "./travel-page";

export class TourTab extends TravelPage {
  placeTour = "placetour";
  dateTour = "datetour";
  traverllerTour = "travellertour";

  constructor(page: Page) {
    super(page);
  }

  async navigateToTourTab() {
    await this.openTravelPage();
    await this.gotoTab('Tours');
    await this.page.locator("(//span[@class='selection'])[2]").click();

  }

  async selectplaceTour(placetour: "Jeddah" | "Baku" | "Berlin" | "Thailand" | "Dubai") {
    await this.page.locator("#select2-tours_city-container").click();

    await this.page.locator("ul.select2-results__options").waitFor({ state: "visible", timeout: 5000 });
    
    const searchInput = this.page.locator("input.select2-search__field");
    if (await searchInput.count() > 0) {
      await searchInput.waitFor({ state: "visible", timeout: 5000 });
      await searchInput.fill(placetour);
    }
    
    const optionLocator = this.page.locator(`li.select2-results__option:has-text("${placetour}")`);
    await optionLocator.waitFor({ state: "visible", timeout: 5000 });
    await optionLocator.click();
  }
  
  async inputdateTour(datetour: string) {
    await this.page.evaluate((value) => {
      const input = document.querySelector("#date") as HTMLInputElement;
      if (input) {
        input.value = value;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }, datetour);
  }

  async inputTraveller(travellertour: { adult: number; child: number }) {
    // Mở dropdown chọn số lượng tour
    await this.page.locator("(//a[contains(@class, 'dropdown-btn')])[3]").click();

    let currentAdultTour = parseInt(await this.page.locator("#tours_adults").inputValue(), 10);
    let currentChildTour = parseInt(await this.page.locator("#tours_child").inputValue(), 10);

    await this.setTourCount("#tours_adults", travellertour.adult, currentAdultTour);
    await this.setTourCount("#tours_child", travellertour.child, currentChildTour);

    await this.page.locator("(//a[contains(@class, 'dropdown-btn')])[3]").click();
  }

  public async setTourCount(selector: string, expectCount: number, actualCount: number) {
    const input = this.page.locator(selector);

    if (actualCount < expectCount) {
      const incrementButton = input.locator('xpath=following-sibling::div[@class="qtyInc"]');
      for (let i = actualCount; i < expectCount; i++) {
        await incrementButton.click();
        await this.page.waitForTimeout(300); 
      }
    } else if (actualCount > expectCount) {
      const decrementButton = input.locator('xpath=preceding-sibling::div[@class="qtyDec"]');
      for (let i = actualCount; i > expectCount; i--) {
        await decrementButton.click();
        await this.page.waitForTimeout(300);
      }
    }
    const finalCount = parseInt(await input.inputValue(), 10);
    expect(finalCount).toBe(expectCount);
  }

  async clickBtnTour() {
    await this.page.locator("(//button[@type='submit'])[3]").click();
  }

  async fillDataSearch(info: {
    placetour: "Jeddah" | "Baku" | "Berlin" | "Thailand" | "Dubai",
    datetour: string,
    travellertour: { adult: number; child: number },
  }) {
    await this.selectplaceTour(info.placetour);
    await this.inputdateTour(info.datetour);
    await this.inputTraveller(info.travellertour);
  }

  async getDataNewestInTour() {
    const tourInfo = {
      placetour: (await this.page.locator("(//div[contains(@class, 'tour-info')])[1]").innerText()).trim(),
    };
    return tourInfo;
  }
}
