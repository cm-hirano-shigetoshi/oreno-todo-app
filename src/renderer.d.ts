export interface IElectronAPI {
  subscribeAddTask: (
    callback: (summary: string, taskcode: string, memo: string) => void
  ) => void;
  executeCommand: (command: string) => Promise<string>;
  getCalendarEvents: (date: string) => Promise<string>;
  readFile: (filename: string) => Promise<string>;
  writeFile: (filename: string, content: string) => Promise<boolean>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
