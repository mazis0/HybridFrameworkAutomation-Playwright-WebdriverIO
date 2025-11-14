import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "../../../hooks/pageFixture";
import * as data from "../../../helper/util/test-data/userCredentials.json";

setDefaultTimeout(60 * 1000 * 2)

Given('the user is logged in on Web', async function () {
    await fixture.page.goto(process.env.BASEURL!);
    await fixture.loginPage.userLoggedWithValidCredentials(data.username,data.password);
});