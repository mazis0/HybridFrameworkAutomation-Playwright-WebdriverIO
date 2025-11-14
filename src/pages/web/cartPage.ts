import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../../helper/wrapper/PlaywrightWrappers";
import Assert from "../../helper/wrapper/assert";
import GlobalState from '../../helper/util/stored-value/globalStates';


export default class CartPage {
    private base: PlaywrightWrapper
    private assert : Assert
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.assert = new Assert(page);
    }


    private Elements = {
        labelYourCart: "//span[.='Your Cart']"
      }


    async verifyProductIsDisplayed(product: string){
        await this.base.waitForVisible(this.Elements.labelYourCart);
        await this.assert.assertURL("https://www.saucedemo.com/cart.html");
        await expect(this.page.locator(`//div[.='${product}']`)).toBeVisible();
    }

    async verifyMultipleProductIsDisplayed(){
        await this.base.waitForVisible(this.Elements.labelYourCart);
        await this.assert.assertURL("https://www.saucedemo.com/cart.html");
        const globalState = GlobalState.getInstance();
        const products = globalState.getProducts(); 
        for (const product of products) {
            const productElement = `//a[.="${product}"]`;
            await this.page.locator(productElement).scrollIntoViewIfNeeded();
            await expect(this.page.locator(productElement)).toBeVisible();
          }
    }

    async verifyRemovedProductNotDisplayed(product: string){
        const elements = this.page.locator("//div[@data-test='inventory-item-name']");
        const count = await elements.count();
        let found = false;

        for (let i = 0; i < count; i++) {
            const text = await elements.nth(i).innerText();
            if (text.includes(product)) {
            found = true;
            console.log(`✅ Found ${product} in element ${i}: ${text}`);
            break;
        }
        }
        expect(found).toEqual(true);
        
    }
}   