"use strict";
const electron = require("electron");
const path = require("path");
let win;
const createWindow = () => {
  win = new electron.BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    // 不要自带的窗口
    webPreferences: {
      preload: path.join(__dirname, "../electron/preload/preload.ts")
    }
  });
  if (process.env.NODE_ENV != "development") {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  } else {
    win.loadURL(`${process.env["VITE_DEV_SERVER_URL"]}`);
  }
  let contents = win.webContents;
  contents.openDevTools();
};
electron.app.whenReady().then(() => {
  electron.ipcMain.handle("ping", () => "ping");
  createWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin")
    electron.app.quit();
});
