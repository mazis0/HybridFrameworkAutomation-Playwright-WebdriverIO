import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "../../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)

Given('the user adds {string} to the cart on Web', async function (product: string) {
    await fixture.productPage.clickAddToCartProduct(product);
});

Given('the user has added {string} and {string} to the cart on Web', async function (firstProduct: string,secondProduct: string) {
    await fixture.productPage.clickAddToCartProduct(firstProduct);
    await fixture.productPage.clickAddToCartProduct(secondProduct);
});

Given('the cart icon on Web should show 1 item', async function () {
    await fixture.productPage.verifyNumberCartProduct();
});

Given('the cart icon on Web should show {string} items', async function (numberOfProduct: string) {
    await fixture.productPage.verifyNumberCartMultipleProduct(numberOfProduct);
});

Given('the user removes {string} from the cart on Web', async function (product: string) {
    await fixture.productPage.clickRemoveProduct(product);
});

