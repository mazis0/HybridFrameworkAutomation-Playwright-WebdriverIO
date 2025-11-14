import { remote } from "webdriverio";
import { appiumConfig } from "../../config/appium.config";

let driver: any = null;

/**
 * Inisialisasi koneksi ke Appium server
 */
export async function initDriver() {
  if (!driver) {
    const opts: any = {
      protocol: "http",
      hostname: appiumConfig.host,
      port: appiumConfig.port,
      path: appiumConfig.path,
      capabilities: appiumConfig.capabilities,
    };

    console.log("🔍 Connecting to Appium server...");
    try {
      driver = await remote(opts);
      console.log("🚀 Appium driver initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize Appium driver:", error);
      throw new Error("Appium connection failed. Make sure Appium server & device are running.");
    }
  }
  return driver;
}

/**
 * Mengambil instance driver yang sudah aktif
 */
export function getDriver() {
  if (!driver) {
    throw new Error("❗ Driver not initialized. Call initDriver() first.");
  }
  return driver;
}

/**
 * Menutup sesi Appium driver
 */
export async function quitDriver() {
  if (driver) {
    try {
      await driver.deleteSession();
      console.log("🧹 Appium driver closed");
    } catch (err) {
      console.warn("⚠️ Failed to close Appium session gracefully:", err);
    } finally {
      driver = null;
    }
  }
}

