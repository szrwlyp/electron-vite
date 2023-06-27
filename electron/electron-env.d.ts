export interface IVersions {
  node: () => Promise<void>;
  chrome: () => Promise<void>;
  electron: () => Promise<void>;
  ping: () => Promise<void>;
  setTitle: (title) => Promise<void>;
  openDialog: () => Promise<void>;
}

declare global {
  interface Window {
    versions: IVersions;
  }
}
