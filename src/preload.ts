// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  subscribeAddTask: (callback: (task: string) => void) =>
    ipcRenderer.on("add-task", (_, task: string) => callback(task)),
  readFile: (filePath: string) => ipcRenderer.invoke("read-file", filePath),
  writeFile: (filePath: string, content: string) =>
    ipcRenderer.invoke("write-file", filePath, content),
});
