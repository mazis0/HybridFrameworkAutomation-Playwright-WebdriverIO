import { BeforeAll, AfterAll, Before, After, Status,AfterStep } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";
import LoginPage from "../pages/web/loginPage";
import ProductPage from "../pages/web/productPage";
import CartPage from "../pages/web/cartPage";
import { initDriver, getDriver, quitDriver } from "../mobile/utils/driver";
import path from "path";
import WebDriverIoWrappers from "../helper/wrapper/WebDriverIoWrappers";
import GlobalState from '../helper/util/stored-value/globalStates';
const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});
// It will trigger for not auth scenarios
Before({ tags: "not @auth" }, async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext({
        viewport: null,
        recordVideo: {
            dir: "test-results/videos",
        },
    });
     // Atur timeout global di page (action & navigation)
    context.setDefaultNavigationTimeout(60000); // untuk page.goto() dll
    context.setDefaultTimeout(60000);           // untuk semua action (click, fill, dll)

    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true, snapshots: true
    });
    // web
    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
    fixture.loginPage = new LoginPage(page); 
    fixture.productPage = new ProductPage(page); 
    fixture.cartPage = new CartPage(page); 

    const globalState = GlobalState.getInstance();
    globalState.clearProducts();
    globalState.clearProductsMobile();
});


// It will trigger for auth scenarios
Before({ tags: '@auth' }, async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext({
        storageState: getStorageState(pickle.name),
        recordVideo: {
            dir: "test-results/videos",
        },
    });
    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true, snapshots: true
    });
    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
    fixture.loginPage = new LoginPage(page);  
    fixture.productPage = new ProductPage(page); 
    fixture.cartPage = new CartPage(page); 

    const globalState = GlobalState.getInstance();
    globalState.clearProducts();
    globalState.clearProductsMobile();
});

After(async function ({ pickle, result }) {
  try {
    // Jika test gagal, ambil screenshot dsb
    if (result?.status === Status.FAILED) {
      await this.attach(`❌ Scenario failed: ${pickle.name}`, "text/plain");
      try {
        const mobileDriver = getDriver();
        if (mobileDriver) {
          const base64 = await mobileDriver.takeScreenshot();
          await this.attach(Buffer.from(base64, "base64"), "image/png");
        }
      } catch (err) {
        console.warn("⚠️ Mobile screenshot skipped:", err.message);
      }
    }
  } catch (err) {
    console.error("❌ After hook failed:", err);
  } finally {
    // Tutup driver hanya sekali & pastikan tidak ada pending commands
    try {
      const mobileDriver = getDriver();
      if (mobileDriver) {
        console.log("🔻 Closing mobile driver...");
        await mobileDriver.pause(1000); // beri jeda 1 detik
        await quitDriver();
      }
    } catch (err: any) {
      if (!/Driver not initialized/i.test(err.message)) {
        console.warn("⚠️ Failed to close Appium session:", err.message);
      }
    }
  }
});


AfterAll(async function () {
    await browser.close();
})


function getStorageState(user: string): string | { cookies: { name: string; value: string; domain: string; path: string; expires: number; httpOnly: boolean; secure: boolean; sameSite: "Strict" | "Lax" | "None"; }[]; origins: { origin: string; localStorage: { name: string; value: string; }[]; }[]; } {
    if (user.endsWith("admin"))
        return "src/helper/auth/admin.json";
    else if (user.endsWith("lead"))
        return "src/helper/auth/lead.json";
}


