import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "../../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)

Given('the product {string} should appear in the Web cart list', async function (product: string) {
    await fixture.productPage.clickCartButton();
    await fixture.cartPage.verifyProductIsDisplayed(product);
});

Given('both products should appear in the Web cart list', async function () {
    await fixture.productPage.clickCartButton();
    await fixture.cartPage.verifyMultipleProductIsDisplayed();
});

Given('only {string} should appear in the Web cart list', async function (product: string) {
    await fixture.productPage.clickCartButton();
    await fixture.cartPage.verifyRemovedProductNotDisplayed(product);
});



