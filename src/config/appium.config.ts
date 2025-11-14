import path from "path";

export const appiumConfig = {
  host: "127.0.0.1",
  port: 4723,
  path: "/",
  capabilities: {
    platformName: "Android",
    "appium:deviceName": "RRCT4006SYD", // ✅ kamu tambahkan di sini
    "appium:platformVersion": "14.0", // sesuaikan versi Android real device / emulator
    "appium:app": path.resolve(process.cwd(), "app/saucedemo.apk"),
    "appium:automationName": "UiAutomator2",
    "appium:autoGrantPermissions": true,
    "appium:newCommandTimeout": 3000,
    "appium:appPackage": "com.saucelabs.mydemoapp.android",
    "appium:appActivity": "com.saucelabs.mydemoapp.android.view.activities.SplashActivity"
  },
};
