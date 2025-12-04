import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../../helper/wrapper/PlaywrightWrappers";
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
        viewMenu: "//android.widget.ImageView[@content-desc='View menu']",
        logInMenu: "//android.widget.TextView[@content-desc='Login Menu Item']",
        labelProducts: "//android.widget.TextView[@content-desc='title']"
      }

    async clickViewMenu() {
       this.base.waitAndClick(this.Elements.viewMenu)
    }

    async waitLabelProductsDisplayed(){
      this.base.isVisible(this.Elements.labelProducts);
    }

    async clickImageProduct(productName: string){
      const productLocator = `//android.widget.TextView[@content-desc='Product Title' and @text='${productName}']/preceding-sibling::*`;
      try{
          const isOnProductPage = await this.driver.$(this.Elements.labelProducts).isDisplayed();
          if(isOnProductPage){
            this.base.scrollToElement(productLocator,"up",5);
            const globalState = GlobalState.getInstance();
            globalState.addProductMobile(productName);
            await this.base.waitAndClick(productLocator);
          }else {
            await this.base.backButton();
            this.base.scrollToElement(productLocator,"up",5);
            const globalState = GlobalState.getInstance();
            globalState.addProductMobile(productName);
            await this.base.waitAndClick(productLocator);
            }
        }catch(error){
            console.error(`Error while handling product "${productName}":`, error);
      }
            }

    async clickLoginMenu(){
        this.base.waitAndClick(this.Elements.logInMenu)
    }

}    