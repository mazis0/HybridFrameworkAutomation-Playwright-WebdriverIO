import { expect,Page,FrameLocator } from "@playwright/test";

export default class PlaywrightWrapper {

    constructor(private page: Page) { }

    async goto(url: string) {
        await this.page.goto(url, {
            waitUntil: "domcontentloaded"
        });
    }

    async navigateTo(link: string) {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click(link)
        ])
    }

    async waitAndClick(locator: string) {
        const element = this.page.locator(locator);
        await element.waitFor({
            state: "visible"
        });
        await element.click();
    }
    
    
      /**
       * Menunggu hingga elemen muncul
       */
      async waitForVisible(selector: string, timeout = 60000) {
        const element = this.page.locator(selector);
        try {
          await element.waitFor({ state: 'visible', timeout });
          console.log(`✅ Element visible: ${selector}`);
        } catch (error) {
          console.error(`❌ Element not visible: ${selector}`);
          throw error;
        }
      }

      /**
       * Menunggu hingga elemen tidak muncul
       */
      async waitForInvisible(selector: string, timeout = 60000) {
        const element = this.page.locator(selector);
          try {
            await element.waitFor({ state: 'hidden', timeout });
            console.log(`✅ Element hidden: ${selector}`);
          } catch (error) {
            console.error(`❌ Element not hidden within ${timeout}ms: ${selector}`);
            throw error;
          }
      }
    
      /**
       * Ambil teks dari elemen
       */
      async getText(selector: string): Promise<string> {
        const element = this.page.locator(selector);
        await element.waitFor({ state: 'visible' });
        const text = await element.textContent();
        console.log(`📖 Text from ${selector}: ${text}`);
        return text ? text.trim() : '';
      }
    
      /**
       * Hover ke elemen
       */
      async hoverElement(selector: string, timeout = 10000) {
        const element = this.page.locator(selector);
        try {
          await element.waitFor({ state: 'visible', timeout });
          await element.scrollIntoViewIfNeeded();
          await element.hover();
          console.log(`🖱️ Hovered element: ${selector}`);
        } catch (error) {
          console.error(`❌ Failed to hover element: ${selector}`);
          throw error;
        }
      }
    
      /**
       * Verifikasi teks pada elemen
       */
      async verifyText(selector: string, expectedText: string) {
        const element = this.page.locator(selector);
        await expect(element).toContainText(expectedText);
        console.log(`✅ Verified text '${expectedText}' in ${selector}`);
      }

      /**
   * Tekan tombol Enter di elemen input
   */


  async pressEnter(selector: string) {
    try {
      const element = this.page.locator(selector);
      await element.waitFor({ state: 'visible', timeout: 10000 });
      await element.press('Enter');
      console.log(`✅ Pressed Enter on: ${selector}`);
    } catch (error) {
      console.error(`❌ Failed to press Enter on: ${selector}`);
      throw error;
    }
  }

  /**
   * Upload file ke input type="file"
   * @param selector Selector dari input file
   * @param filePath Path file lokal
   */
  async uploadFile(selector: string, filePath: string, timeout = 10000) {
    const input = this.page.locator(selector);
    try {
      await input.waitFor({ state: 'visible', timeout });
      await input.setInputFiles(filePath);
      console.log(`📁 Uploaded file "${filePath}" to ${selector}`);
    } catch (error) {
      console.error(`❌ Failed to upload file to ${selector}`);
      throw error;
    }
  }

  /**
   * Akses elemen di dalam iframe dan klik
   * @param frameSelector Selector iframe
   * @param elementSelector Selector elemen di dalam iframe
   */
  async clickInIframe(frameSelector: string, elementSelector: string, timeout = 10000) {
    try {
      const frame: FrameLocator = this.page.frameLocator(frameSelector);
      const element = frame.locator(elementSelector);
      await element.waitFor({ state: 'visible', timeout });
      await element.click();
      console.log(`🪟 Clicked element ${elementSelector} inside iframe ${frameSelector}`);
    } catch (error) {
      console.error(`❌ Failed to interact with iframe ${frameSelector}`);
      throw error;
    }
  }


  async waitForPageStable(selectorToWait: string, timeout = 15000) {
    try {
      await this.page.waitForSelector(selectorToWait, { state: "visible", timeout });
      console.log(`✅ Page ready, found element: ${selectorToWait}`);
    } catch (err) {
      console.warn(`⚠️ Page did not load expected element within timeout: ${selectorToWait}`);
    }
  }

}