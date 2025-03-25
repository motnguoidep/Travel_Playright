import { Page, expect } from "@playwright/test";
import { TravelPage } from "./travel-page";

export class SearchTab extends TravelPage {
    roundTrip = "roundtrip";
    typeTrip = "typetrip";
    flyFrom = "flyfrom";
    destinationTo = "destinationto";
    departDate = "departdate";
    returnDate = "returndate";
    travelPeople = "traveller";
    btnSearch = "search";

    constructor(page: Page) {
        super(page);
    }

    async navigateToFlightTab() {
        await this.openTravelPage();
        await this.gotoTab('Flights');
    }

    async selectRoundTrip(roundtrip: "One Way" | "Return") {
        const value = roundtrip === "One Way" ? "oneway" : "return";
        await this.page.locator('.flight_way').selectOption(value);
    }

    async selectTypeTrip(typetrip: "Economy" | "Economy Premium" | "Business" | "First") {
        const valueMap: Record<string, string> = {
            "Economy": "economy",
            "Economy Premium": "economy_premium",
            "Business": "business",
            "First": "first"
        };

        const value = valueMap[typetrip];
        if (value) {
            await this.page.locator("//select[@id='flight_type']").selectOption(value);
        } else {
            throw new Error(`Invalid trip type: ${typetrip}`);
        }
    }

    async selectFlyFrom(flyfrom: "LHR" | "JED" | "MNL") {
        await this.page.locator("//input[@name='from']").fill(flyfrom);
    }

    async selectDestination(destinationto: "DXB" | "DEL" | "HKT") {
        await this.page.locator("//input[@name='to']").fill(destinationto);
    }

    async inputDepartDate(departdate: string) {
        await this.page.locator("//input[@name='depart']").fill(departdate);
    }

    async inputReturnDate(returndate: string) {
        await this.page.locator("//input[@name='returning']").fill(returndate);
    }

    async inputTraveller(traveller: { adults: number; childs: number; infants: number }) {
        await this.page.locator("//a[contains(@class, 'dropdown-btn') and contains(@class, 'travellers')]").nth(0).click();

        let currentAdults = parseInt(await this.page.locator("#fadults").inputValue(), 10);
        let currentChilds = parseInt(await this.page.locator("#fchilds").inputValue(), 10);
        let currentInfants = parseInt(await this.page.locator("#finfant").inputValue(), 10);

        await this.setTravellerCount("#fadults", traveller.adults, currentAdults);
        await this.setTravellerCount("#fchilds", traveller.childs, currentChilds);
        await this.setTravellerCount("#finfant", traveller.infants, currentInfants);

        await this.page.locator("//a[contains(@class, 'dropdown-btn') and contains(@class, 'travellers')]").nth(0).click();
    }

    public async setTravellerCount(selector: string, expectCount: number, actualCount: number) {
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

    async clickBtnSearch() {
        await this.page.locator("//button[@id='flights-search']").click();
    }

    async fillInfoSearch(infomation: {
        roundtrip: "One Way" | "Return",
        typetrip: "Economy" | "Economy Premium" | "Bussiness" | "First",
        flyfrom: "LHR" | "JED" | "MNL",
        destinationto: "DXB" | "DEL" | "HKT",
        departdate: string,
        returndate: string,
        traveller: { adults: number; childs: number; infants: number }
    }) {
        await this.selectRoundTrip(infomation.roundtrip);
        await this.selectTypeTrip(infomation.typetrip);
        await this.selectFlyFrom(infomation.flyfrom);
        await this.selectDestination(infomation.destinationto);
        await this.inputDepartDate(infomation.departdate);
        await this.inputReturnDate(infomation.returndate);
        await this.inputTraveller(infomation.traveller);
    }

    async getInfoNewestInTicket() {
        const ticketInfo = {
            departdate: (await this.page.locator("(//small[contains(@class, 'ls--1') and contains(@class, 'text-black')])[1]").innerText()).trim(),
            returndate: (await this.page.locator("(//small[contains(@class, 'ls--1') and contains(@class, 'text-black')])[2]").innerText()).trim(),
            infomation: (await this.page.locator("(//div[contains(@class, 'text-dark')])[1]").innerText()).trim(),
        };
        return ticketInfo;
    }
}
