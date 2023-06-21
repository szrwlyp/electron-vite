import { app, BrowserWindow } from "electron";
import path from "path";

let win: BrowserWindow | null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: true,
      contextIsolation: false,
      nodeIntegration: true,
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

app.whenReady().then(createWindow);
