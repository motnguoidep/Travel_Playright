import { Page, expect } from "@playwright/test";
import { TravelPage } from "./travel-page";

export class HotelTab extends TravelPage {
    placeHotel = "place";
    checkIn = "checkin";
    checkOut = "checkout";
    peopleHotel = "hoteller";
    btnSearchHotel = "hotel";

    constructor(page: Page){
        super(page);
    }

    async navigateToHotelTab(){
        await this.openTravelPage();
        await this.gotoTab('Hotels');
    }

    async selectPlaceHotel(place: "Dubai" | "Phuket" | "India" | "Singapore") {
        await this.page.locator("(//span[@class='selection'])[1]").click();
      
        const searchInput = this.page.locator("input.select2-search__field");
        await searchInput.waitFor({ state: "visible", timeout: 5000 });
      
        await searchInput.fill(place);
      
        const optionLocator = this.page.locator(`li.select2-results__option:has-text("${place}")`);
        await optionLocator.waitFor({ state: "visible", timeout: 5000 });
        await optionLocator.click();
    }
      
    async inputCheckin(checkin: string) {
        await this.page.locator("//input[@id='checkin']").fill(checkin);
        await this.page.locator("//input[@id='checkin']").click();
    
    }

    async inputCheckout(checkout: string) {
        await this.page.locator("//input[@id='checkout']").fill(checkout);
        await this.page.locator("//input[@id='checkout']").click();
    }
    async inputHoteller(hoteller: { rooms: number; adults: number; childs: number }) {
        await this.page.locator("(//a[contains(@class, 'dropdown-btn')])[2]").click();
    
        let currentRooms = parseInt(await this.page.locator("#hotels_rooms").inputValue(), 10);
        let currentAdultHotel = parseInt(await this.page.locator("#hotels_adults").inputValue(), 10);
        let currentChildHotel = parseInt(await this.page.locator("#hotels_childs").inputValue(), 10);
    
        await this.setHotellerCount("#hotels_rooms", hoteller.rooms, currentRooms);
        await this.setHotellerCount("#hotels_adults", hoteller.adults, currentAdultHotel);
        await this.setHotellerCount("#hotels_childs", hoteller.childs, currentChildHotel);
    
        await this.page.locator("(//a[contains(@class, 'dropdown-btn')])[2]").click();
      }
    
      public async setHotellerCount(selector: string, expectCount: number, actualCount: number) {
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
    
    async clickBtnHotel(){
        await this.page.locator("(//button[@type='submit'])[2]").click();
    }
}
