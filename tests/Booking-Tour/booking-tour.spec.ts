import { test, expect } from "@playwright/test";
import { BookingPage } from "../../pages/booking-page";

test('booking tour', async ({ page }) => {

    let bookingPage = new BookingPage(page);

    await test.step('open tour tab', async () => {
        await bookingPage.openBookingPage();
    });
         
    await test.step('fill data into fields', async () => {
        await bookingPage.clickBtnViewDetail();
        await bookingPage.clickBtnBookNow();
        await bookingPage.clickBtnCheckAvailable();
        await bookingPage.clickBtnCheckAvaliable2();
        await bookingPage.clickBtnBookNow2();
        await bookingPage.fillUserContact({
            firstname: 'tana', 
            lastname: 'ngo', 
            email: 'tana@gmail.com', 
            country: 'Canada', 
            phone: '0398321744'
        })
        await bookingPage.clickBtnNext();
        await bookingPage.clickCheckbox();
        await bookingPage.fillDataPay({
            cardholdername: "tana1", 
            cardnumber: "000123", 
            expirydatemonth: "06", 
            expirydateyear: "1999", 
            code: "070699", 
            country: "Canada", 
            zipcode: "1999"
        });   
    });
})
