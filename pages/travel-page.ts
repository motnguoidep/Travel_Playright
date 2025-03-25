import { Locator, Page } from "@playwright/test";

export class TravelPage{
    page: Page;
    goToflightTab: string;
    goToHotelTab: string;
    goToTourTab: string;
    goToCarsTab: string;
    goToVisaTab: string;

    constructor (page: Page){
        this.page = page;
    }

    async openTravelPage(){
        await this.page.goto('https://www.phptravels.net/')
    }

    async gotoTab(pageName: string) {
        await this.page.locator(`//li[@class='nav-item' and .//span[text()='${pageName}']]`).click();
    }
    
}                       