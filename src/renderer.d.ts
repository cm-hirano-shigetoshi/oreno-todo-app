export interface IElectronAPI {
  subscribeAddTask: (callback: (task: string) => void) => void;
  readFile: (filePath: string) => Promise<string>;
  writeFile: (filePath: string, content: string) => Promise<boolean>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
