import WebDriverIoWrappers from "../../helper/wrapper/WebDriverIoWrappers";


export default class LoginPage {
    private base: WebDriverIoWrappers;

  constructor() {
    this.base = new WebDriverIoWrappers;
  }

    private Elements = {
       username: "//android.widget.EditText[@resource-id='com.saucelabs.mydemoapp.android:id/nameET']",
       password: "//android.widget.EditText[@resource-id='com.saucelabs.mydemoapp.android:id/passwordET']",
       loginBtn: "//android.widget.Button[@content-desc='Tap to login with given credentials']"
    }

    async userLoggedWithValidCredentials(username: string, password: string) {
        await this.base.typeText(this.Elements.username, username);
        await this.base.typeText(this.Elements.password, password);
        await this.base.waitAndClick(this.Elements.loginBtn);
        await this.base.waitForDisappear(this.Elements.loginBtn);
    }

}    