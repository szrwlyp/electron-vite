import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";

let win: BrowserWindow | null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false, // 不要自带的窗口
    webPreferences: {
      preload: path.join(__dirname, "../electron/preload/preload.ts"),
    },
  });
  if (process.env.NODE_ENV != "development") {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  } else {
    win.loadURL(`${process.env["VITE_DEV_SERVER_URL"]}`);
  }
  // 在创建窗口的时候，打开浏览器的F12调试工具
  let contents = win.webContents;
  contents.openDevTools();
};

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "ping");

  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
