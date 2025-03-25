import { test, expect } from "@playwright/test";
import { SearchTab } from "../../pages/search-page";

let departdate = "2025-03-26";
let returndate = "2025-03-27";

test('search test with return trip', async ({ page }) => {
  let searchTab = new SearchTab(page);

  await test.step('open flight tab', async () => {
    await searchTab.openTravelPage();  
    await searchTab.gotoTab("Flights");
  });

  await test.step('fill data into fields', async () => {
    await searchTab.selectRoundTrip("Return");
    await searchTab.selectTypeTrip("Business");
    await searchTab.selectFlyFrom("LHR");
    await searchTab.selectDestination("DXB");
    await searchTab.inputDepartDate(departdate);
    await searchTab.inputReturnDate(returndate);
    await searchTab.inputTraveller({ adults: 1, childs: 1, infants: 1 });

    await searchTab.clickBtnSearch();
  });
});

test('search test with one way trip', async ({ page }) => {
    let searchTab = new SearchTab(page);

    await test.step('open flight tab', async () => {
        await searchTab.openTravelPage();
        await searchTab.gotoTab("Flights");
    });

    await test.step('fill data into fields', async () => {
        await searchTab.selectRoundTrip("One Way");
        await searchTab.selectTypeTrip("Business");
        await searchTab.selectFlyFrom("MNL");
        await searchTab.selectDestination("DEL");
        await searchTab.inputDepartDate(departdate);
        await searchTab.inputTraveller({ adults: 1, childs: 1, infants: 1 });
        await searchTab.clickBtnSearch();
    });

    await test.step("Kiểm tra nội dung ở ticket vừa tìm kiếm là đúng", async () => {
        const ticketInfo = await searchTab.getInfoNewestInTicket();
        const actualDepartDate = ticketInfo.departdate;
        const actualReturnDate = ticketInfo.returndate;
        const actualTicket = ticketInfo.infomation;

        console.log("Actual Depart Date:", actualDepartDate);
        console.log("Actual Return Date:", actualReturnDate);
        console.log("Actual Ticket Info:", actualTicket);

        expect(actualDepartDate).toBe(departdate);
        expect(actualTicket).toContain('MNL');
        expect(actualTicket).toContain('DEL');
    });

});