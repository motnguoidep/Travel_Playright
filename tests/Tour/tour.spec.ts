import { test, expect } from "@playwright/test";
import { TourTab } from "../../pages/tour-page";

let datetour = "2025-03-29";

test('search tour with valid value', async ({ page }) => {
  let tourTab = new TourTab(page);

  await test.step('open tour tab', async () => {
    await tourTab.openTravelPage();
    await tourTab.gotoTab("Tours");
  });

  await test.step('fill in data into all fields', async () => {
    await tourTab.inputdateTour('Thailand');
    await tourTab.inputdateTour(datetour);
    await tourTab.inputTraveller({ adult: 4, child: 2 });
    await tourTab.clickBtnTour();
  });
});

test('compare actual result with expected result', async ({ page }) => {
  let tourTab = new TourTab(page);

  await test.step('open tour tab', async () => {
    await tourTab.openTravelPage();
    await tourTab.gotoTab("Tours");
  });

  await test.step('fill in data into all fields', async () => {
    await tourTab.selectplaceTour("Baku");
    await tourTab.inputdateTour(datetour);
    await tourTab.inputTraveller({ adult: 4, child: 2 });
    await tourTab.clickBtnTour();
  });

  await test.step('check content of search tour', async () => {
    const tourInfo = await tourTab.getDataNewestInTour();
    const actualTour = tourInfo.infomation;

    console.log("Actual Place Tour:", actualTour);

    // So sánh kết quả với giá trị mong đợi
    expect(actualTour).toContain('Baku');
  });
});
