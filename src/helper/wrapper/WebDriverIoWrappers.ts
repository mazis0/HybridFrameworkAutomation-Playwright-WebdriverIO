import fs from "fs";
import path from "path";
import { getDriver } from "../../mobile/utils/driver";

/**
 * Wrapper bergaya Playwright untuk WebdriverIO (Appium)
 * Tujuan: menyamakan style action seperti di Playwright test automation.
 */
export default class WebDriverIoWrappers {
  private driver: any;

  constructor() {
    this.driver = getDriver();
  }

  /**
   * Klik elemen setelah menunggu tampil
   */
  async waitAndClick(locator: string, timeout = 10000): Promise<void> {
    const element = await this.driver.$(locator);
    await element.waitForExist({ timeout });
    await element.waitForDisplayed({ timeout });
    await element.click();
  }

  /**
   * Isi teks ke input field
   */
  async typeText(locator: string, text: string): Promise<void> {
    const element = await this.driver.$(locator);
    await element.waitForExist({ timeout: 10000 });
    await element.setValue(text);
  }

  /**
   * Ambil teks dari elemen
   */
  async getText(locator: string): Promise<string> {
    const element = await this.driver.$(locator);
    await element.waitForExist({ timeout: 10000 });
    return await element.getText();
  }

  /**
   * Mengecek apakah elemen terlihat
   */
  async isVisible(locator: string): Promise<boolean> {
    const element = await this.driver.$(locator);
    return await element.isDisplayed();
  }

  /**
   * Mengecek apakah elemen ada di DOM
   */
  async isExist(locator: string): Promise<boolean> {
    const element = await this.driver.$(locator);
    return await element.isExisting();
  }

  /**
   * Tunggu elemen hilang dari layar
   */
  async waitForDisappear(locator: string, timeout = 10000): Promise<void> {
    const element = await this.driver.$(locator);
    await element.waitForDisplayed({ reverse: true, timeout });
  }



  /**
   * Swipe gesture sederhana di layar
   */
  async swipe(direction: "up" | "down" | "left" | "right", duration = 800): Promise<void> {
    const { width, height } = await this.driver.getWindowRect();
    let startX = width / 2;
    let startY = height / 2;
    let endX = startX;
    let endY = startY;

    switch (direction) {
      case "up":
        endY = startY - height / 3;
        break;
      case "down":
        endY = startY + height / 3;
        break;
      case "left":
        endX = startX - width / 3;
        break;
      case "right":
        endX = startX + width / 3;
        break;
    }

    await this.driver.touchPerform([
      { action: "press", options: { x: startX, y: startY } },
      { action: "wait", options: { ms: duration } },
      { action: "moveTo", options: { x: endX, y: endY } },
      { action: "release" },
    ]);
  }

  async backButton(){
    await this.driver.back();
  }

  async scrollToElement(
    selector: string,
    direction: "up" | "down",
    scrollCount: number
  ) {
    const windowRect = await this.driver.getWindowRect();
    const startX = Math.floor(windowRect.width * 0.5);
    const endX = startX;
    let startY = 0;
    let endY = 0;
  
    switch (direction) {
      case "up":
        endY = Math.floor(windowRect.height * 0.4);
        startY = Math.floor(windowRect.height * 0.8);
        break;
      case "down":
        endY = Math.floor(windowRect.height * 0.6);
        startY = Math.floor(windowRect.height * 0.4);
        break;
      default:
        throw new Error(`Invalid scroll direction: ${direction}`);
    }
  
    let isFound = false;
  
    for (let i = 0; i < scrollCount; i++) {
      const element = await this.driver.$(selector);
      const exists = await element.isExisting();
  
      if (exists) {
        console.log(`✅ Element found after ${i} scroll(s): ${selector}`);
        isFound = true;
        break;
      } else {
        console.log(
          `↕️ Scroll attempt ${i + 1} - direction: ${direction}, from ${startY} to ${endY}`
        );
  
        // Ganti touchAction() dengan performActions()
        await this.driver.performActions([
            {
              type: "pointer",
              id: "finger1",
              parameters: { pointerType: "touch" },
              actions: [
                { type: "pointerMove", duration: 0, x: startX, y: startY },
                { type: "pointerDown", button: 0 },
                { type: "pause", duration: 300 },
                { type: "pointerMove", duration: 500, x: endX, y: endY },
                { type: "pointerUp", button: 0 },
              ],
            },
          ]);
          
          await this.driver.pause(800);
          
      }
    }
  
    if (!isFound) {
      throw new Error(
        `❌ Element not found after ${scrollCount} scroll attempts: ${selector}`
      );
    }
  
    return await this.driver.$(selector);
  }
  


  /**
   * Ambil screenshot dan simpan ke folder test-results/screenshots
   */
  async takeScreenshot(fileName: string): Promise<string> {
    const screenshotDir = path.resolve("test-results/screenshots");
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

    const base64 = await this.driver.takeScreenshot();
    const filePath = path.join(screenshotDir, `${fileName}.png`);
    fs.writeFileSync(filePath, base64, "base64");

    console.log(`📸 Mobile screenshot saved: ${filePath}`);
    return filePath;
  }

  /**
   * Pause sederhana (pengganti sleep)
   */
  async sleep(ms: number): Promise<void> {
    await this.driver.pause(ms);
  }
}
