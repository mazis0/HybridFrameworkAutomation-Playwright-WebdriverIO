import { expect, Page } from "@playwright/test";
import WebDriverIoWrappers from "../../helper/wrapper/WebDriverIoWrappers";
import { getDriver } from "../../mobile/utils/driver";
import GlobalState from '../../helper/util/stored-value/globalStates';


export default class LoginPage {
    private base: WebDriverIoWrappers;
    private driver: any;

  constructor() {
    this.base = new WebDriverIoWrappers();
    this.driver = getDriver();
  }

    private Elements = {
        addToCartBtn: "//android.widget.Button[@content-desc='Tap to add product to cart']",
        numberCart: "//android.widget.TextView[@resource-id='com.saucelabs.mydemoapp.android:id/cartTV']",
        cartBtn: "//android.widget.RelativeLayout[@content-desc='View cart']"
   }

   async removeProduct(productName: string){
        await this.base.waitAndClick(this.Elements.cartBtn);
        const locator = `(//*[@text="${productName}"]/parent::*/following-sibling::*/child::*)[2]`;
        await this.base.scrollToElement(locator,"up",2);
        const globalState = GlobalState.getInstance();
        globalState.removeProductMobile(productName); 
        const listProduct = globalState.getProductsMobile();
        console.log(`list product: ${listProduct}`)
        await this.base.waitAndClick(locator);
   }
   
   async verifyProductDisplayed(product: string){
        await this.base.isVisible(`//*[@text='${product}']`);
   }

   async verifyMultipleProductIsDisplayed(){
    const globalState = GlobalState.getInstance();
    const products = globalState.getProductsMobile(); 
    for (const product of products) {
        await this.base.scrollToElement(`//*[@text='${product}']`,"up",3)
        await this.base.isVisible(`//*[@text='${product}']`)
      }
    }

    async verifyRemovedProductIsNotDisplayed(){
    const globalState = GlobalState.getInstance();
    const products = globalState.getProductsMobile(); 
    for (const product of products) {
        await this.base.scrollToElement(`//*[@text='${product}']`,"up",3);
        await this.base.isVisible(`//*[@text='${product}']`);
      }
    }

   async clickCartButton(){
        await this.base.waitAndClick(this.Elements.cartBtn);
   }

    async clickAddToCartButton() {
        await this.base.waitAndClick(this.Elements.addToCartBtn);
    }

    async clickAddToCartButtonMultiple() {
        await this.base.waitAndClick(this.Elements.addToCartBtn);
    }

    async verifyNumberOfCart(number: string){
        await this.driver.$(`//android.widget.TextView[@resource-id='com.saucelabs.mydemoapp.android:id/cartTV' and @text='${number}']`).waitForDisplayed({timeout:20000});
        const numberOfCart = await this.base.getText(this.Elements.numberCart);
        expect(numberOfCart).toEqual(number);
    }

}    