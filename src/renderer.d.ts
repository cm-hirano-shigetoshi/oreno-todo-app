export interface IElectronAPI {
  subscribeAddTask: (
    callback: (summary: string, taskcode: string, memo: string) => void
  ) => void;
  executeCommand: (command: string) => Promise<string>;
  readFile: () => Promise<string>;
  writeFile: (content: string) => Promise<boolean>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
