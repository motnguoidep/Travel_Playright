import { Locator, Page } from "@playwright/test";

export class TravelPage{
    page: Page;
    goToflightTab: string;
    goToHotelTab: string;
    goToTourTab: string;
    goToCarsTab: string;
    goToVisaTab: string;
    goToBooking: string;


    constructor (page: Page){
        this.page = page;
    }

    async openTravelPage(){
        await this.page.goto('https://www.phptravels.net/')
    }

    async openBookingPage(){
        await this.page.goto('https://www.phptravels.net/tours/Thailand/thailand/28-03-2025/1/0/')
        await this.page.waitForTimeout(5000); 
    }

    async gotoTab(pageName: string) {
        await this.page.locator(`//li[@class='nav-item' and .//span[text()='${pageName}']]`).click();
    }
    
}                       