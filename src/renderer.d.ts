export interface IElectronAPI {
  subscribeAddTask: (
    callback: (summary: string, taskcode: string, memo: string) => void
  ) => void;
  executeCommand: (command: string) => Promise<string>;
  readFile: (filePath: string) => Promise<string>;
  writeFile: (filePath: string, content: string) => Promise<boolean>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
