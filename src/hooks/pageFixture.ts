import { Page } from "@playwright/test";
import { Logger } from "winston";
import LoginPage from "../pages/web/loginPage";
import ProductPage from "../pages/web/productPage";
import CartPage from "../pages/web/cartPage";
import WebDriverIoWrappers from "../helper/wrapper/WebDriverIoWrappers";

export const fixture = {
    // @ts-ignore
    // Web 
    page: undefined as Page,
    logger: undefined as unknown as Logger,
    loginPage: undefined as unknown as LoginPage, 
    productPage: undefined as unknown as ProductPage, 
    cartPage: undefined as unknown as CartPage, 

    
      // 📱 Mobile
    mobileDriver: undefined as any,
    mobileWrapper: undefined as WebDriverIoWrappers | undefined,
    // mobilePage: undefined as unknown as MobilePage, 
}