// import electron1 from "electron";
// const { contextBridge, ipcRenderer } = electron1;
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
  setTitle: (title) => ipcRenderer.send("setTitle", title),
  openDialog: () => ipcRenderer.invoke("openDialog"),
});
