import { Given} from "@cucumber/cucumber";
import { initDriver,quitDriver} from "../../../mobile/utils/driver";
import ProductPage from "../../../pages/mobile/productPage";
import CartPage from "../../../pages/mobile/cartPage";

let driver: any;
let cartPage: CartPage;
let productPage: ProductPage;

Given("the user is logged in on Mobile", async function () {
    driver = await initDriver();
    productPage = new ProductPage();
    await productPage.waitLabelProductsDisplayed();
});

Given("the user close mobile appilication", async function () {
    await quitDriver();
});

Given("the user adds {string} to the cart on Mobile", async function (product: string) {
    productPage = new ProductPage();
    await productPage.clickImageProduct(product);
    cartPage = new CartPage();
    await cartPage.clickAddToCartButton();
});

Given("the user has added {string} and {string} to the cart on Mobile", async function (firstProduct: string,secondProduct: string) {
    productPage = new ProductPage();
    cartPage = new CartPage();
    await productPage.clickImageProduct(firstProduct);
    await cartPage.clickAddToCartButton();
    await productPage.clickImageProduct(secondProduct);
    await cartPage.clickAddToCartButton();
});

Given("the cart icon on Mobile should show {string} items", async function (number: string) {
    cartPage = new CartPage();
    await cartPage.verifyNumberOfCart(number);
});