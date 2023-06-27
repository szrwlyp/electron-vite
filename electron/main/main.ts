import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "path";

let win: BrowserWindow | null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    // frame: false, // 不要自带的窗口
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

  ipcMain.on("setTitle", (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win?.setTitle(title);
  });

  ipcMain.handle("openDialog", async () => {
    console.log("打开选项框");
    console.log(
      await dialog.showOpenDialog({
        title: "选择文件",
        properties: ["openFile", "multiSelections"],
      })
    );
  });
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
