import { Page, expect } from "@playwright/test";
import { TravelPage } from "./travel-page";

export class BookingPage extends TravelPage {
    btnViewDetail = "viewdetail";
    btnBookNow = "booknow";
    btnCheckAvaliable = "checkavaliabe";
    btnCheckAvaliable2 = "checkavaliabe2";
    btnBookNow2 = "booknow2";
    userContact = "contact";
    btnNext = "next";
    btnNext2 = "next2";
    checkBox = "checkbox";
    payInfo = "payinfo"

    constructor(page: Page){
        super(page);
    }

    async clickBtnViewDetail(){
        const viewDetailBtn = this.page.locator("(//a[@target='_blank'])[3]");
        await viewDetailBtn.waitFor({ state: "visible", timeout: 100000 });
        await viewDetailBtn.click();
        // await this.page.locator("(//a[@target='_blank'])[3]").click();
    }
    
    async clickBtnBookNow(){
        const btnBook = this.page.locator("(//a[@target='_blank'])[1]");
        await btnBook.waitFor({ state: "visible", timeout: 30000 })
        await btnBook.click();
    }

    async clickBtnCheckAvailable(){
        await this.page.locator("(//a[@target='_blank'])[2]").click();
    }

    async clickBtnCheckAvaliable2(){
        // await this.page.locator("//button[@data-automation='availability-search-button']").click();
        await this.page.locator("//button[@data-automation='availability-search-button']").click();        
    }

    async clickBtnBookNow2(){
        await this.page.locator("//button[@data-automation='tour-grade-buy-now-button']").click();
    }

    async fillUserContact(contact: {
        firstname: string, 
        lastname: string, 
        email: string, 
        country: string, 
        phone: string
    }){
        await this.page.locator("//input[@id='accountFirstName']").fill(contact.firstname)
        await this.page.locator("//input[@id='accountLastName']").fill(contact.lastname);
        await this.page.locator("//input[@id='email']").fill(contact.email);
        await this.page.locator("//select[@name='bookerPhoneNumber_countryCodePrefix']").fill(contact.country);
        await this.page.locator("//input[@data-automation='account-details-phone-number-input-national-number']").fill(contact.phone)
    }

    async clickBtnNext(){
        await this.page.locator("//button[@data-automation='account-details-submit-cta']").click();
    }

    async fillUserContact2(contact2: {firstname: string, lastname: string, requirement: string }){
        await this.page.locator("//input[@id='travellerFirstName_2_ADULT']").fill(contact2.firstname);
        await this.page.locator("//input[@id='travellerLastName_2_ADULT']").fill(contact2.lastname)
        await this.page.locator("//input[@id='specialRequirements']").fill(contact2.requirement)

    }

    async clickBtnNext2(){
        await this.page.locator("//button[@data-automation='activity-details-submit-cta']").click();
    }

    async clickCheckbox(){
        await this.page.locator("(//div[@class='dummyRadioButton__GGeA'])[1]").click();
    }

    async fillDataPay(payinfo: { 
        cardholdername: string, 
        cardnumber: string, 
        expirydatemonth: string, 
        expirydateyear: string, 
        code: string, 
        country: string, 
        zipcode: string
    }){
        await this.page.locator("//input[@id='cardholderFullName']").fill(payinfo.cardholdername);
        await this.page.locator("//input[@name='creditCard']").fill(payinfo.cardnumber);
        await this.page.locator("//input[@id='expiryDateMonth']").fill(payinfo.expirydatemonth);
        await this.page.locator("//input[@id='expiryDateYear']").fill(payinfo.expirydateyear)
        await this.page.locator("//input[@name='securityCode']").fill(payinfo.code);
        await this.page.locator("//select[@id='cardholderCountry']").fill(payinfo.country);
        await this.page.locator("//option[@value='CA' and normalize-space(text())='Canada']").click();
        await this.page.locator("//span[@class='innerWrapper__FCMk']").click()
    }














}