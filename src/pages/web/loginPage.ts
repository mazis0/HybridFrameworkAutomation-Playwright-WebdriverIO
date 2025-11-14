import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../../helper/wrapper/PlaywrightWrappers";


export default class LoginPage {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }


    private Elements = {
        username: "#user-name",
        password: "#password",
        loginBtn: "#login-button"
    }


    async userLoggedWithValidCredentials(username: string, password: string){
        await this.page.locator(this.Elements.username).fill(username);
        await this.page.locator(this.Elements.password).fill(password);
        await this.base.waitAndClick(this.Elements.loginBtn);
        await this.base.waitForInvisible(this.Elements.loginBtn);
    }
}   