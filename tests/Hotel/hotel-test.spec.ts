import { test, expect } from "@playwright/test";
import { HotelTab } from "../../pages/hotel-page";

let checkInDate = "2025-03-26";
let checkOutDate = "2025-03-27";

test('search hotel with valid value', async ({ page }) => {
  let hotelTab = new HotelTab(page);

  await test.step('open hotel tab', async () => {
    await hotelTab.openTravelPage();
    await hotelTab.gotoTab("Hotels");
  });

  await test.step('fill data into all fields', async () => {
    await hotelTab.selectPlaceHotel("Phuket");
    await hotelTab.inputCheckin(checkInDate);
    await hotelTab.inputCheckout(checkOutDate);
    await hotelTab.inputHoteller({ rooms: 1, adults: 2, childs: 1 });
    await hotelTab.clickBtnHotel();
  });
});
