import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../../helper/wrapper/PlaywrightWrappers";
import GlobalState from '../../helper/util/stored-value/globalStates';


export default class HomePage {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }


    private Elements = {
        cartBtn: "//a[@data-test='shopping-cart-link']",
        countProductCart: "//*[@data-test='shopping-cart-badge']"
    }

    async clickCartButton(){
        await this.base.waitAndClick(this.Elements.cartBtn);
    }


    async clickAddToCartProduct(product: string){
        const globalState = GlobalState.getInstance();
        globalState.addProduct(product);
        await this.page.locator(`//a[.='${product}']/parent::*/following-sibling::*/child::button`).scrollIntoViewIfNeeded();
        await this.page.locator(`//a[.='${product}']/parent::*/following-sibling::*/child::button`).click();
    }

    async clickRemoveProduct(product: string){
        const globalState = GlobalState.getInstance();
        globalState.removeProduct(product);
        await this.page.locator(`//a[.='${product}']/parent::*/following-sibling::*/child::button`).scrollIntoViewIfNeeded();
        await this.page.locator(`//a[.='${product}']/parent::*/following-sibling::*/child::button`).click();
    }

    async clickAddToCartMultipleProductSavedVariable(product: string){
        const globalState = GlobalState.getInstance();
        globalState.addProduct(product);
        await this.page.locator(`//a[.='${product}']/parent::*/following-sibling::*/child::button`).scrollIntoViewIfNeeded();
        await this.page.locator(`//a[.='${product}']/parent::*/following-sibling::*/child::button`).click();
    }

    async verifyNumberCartProduct(){
        const numberCartProduct = await this.base.getText(this.Elements.countProductCart);
        expect(numberCartProduct).toEqual("1");
    }

    async verifyNumberCartMultipleProduct(numberOfProduct:string){
        const numberCartProduct = await this.base.getText(this.Elements.countProductCart);
        expect(numberCartProduct).toEqual(numberOfProduct);
    }


}   