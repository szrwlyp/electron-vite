interface IVersions {
  node: any;
  chrome: any;
  electron: any;
  ping: any;
}

export interface IElectronAttribute {
  versions: IVersions;
}

declare global {
  interface Window {
    versions: IVersions;
  }
}
