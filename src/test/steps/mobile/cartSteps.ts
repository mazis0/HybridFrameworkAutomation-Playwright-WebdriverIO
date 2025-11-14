import { Given,When,Then} from "@cucumber/cucumber";
import CartPage from "../../../pages/mobile/cartPage";

let driver: any;
let cartPage: CartPage;

Given("the product {string} should appear in the Mobile cart list", async function (productName: string) {
    cartPage = new CartPage();
    cartPage.clickCartButton();
    await cartPage.verifyProductDisplayed(productName);
});

Given("both products should appear in the Mobile cart list", async function () {
    cartPage = new CartPage();
    await cartPage.clickCartButton();
    await cartPage.verifyMultipleProductIsDisplayed();
});

Given("only {string} should appear in the Mobile cart list", async function (productName: string) {
    cartPage = new CartPage();
    await cartPage.clickCartButton();
    await cartPage.verifyMultipleProductIsDisplayed();
});

Given("the user removes {string} from the cart on Mobile", async function (productName: string) {
    cartPage = new CartPage();
    cartPage.removeProduct(productName);
});

