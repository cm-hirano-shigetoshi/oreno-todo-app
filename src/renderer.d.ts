export interface IElectronAPI {
    readFile: (filePath: string) => Promise<string>;
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}
