// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  subscribeAddTask: (
    callback: (summary: string, taskcode: string, memo: string) => void
  ) =>
    ipcRenderer.on(
      "add-task",
      (_, summary: string, taskcode: string, memo: string) =>
        callback(summary, taskcode, memo)
    ),
  executeCommand: (command: string) =>
    ipcRenderer.invoke("execute-command", command),
  readFile: (filePath: string) => ipcRenderer.invoke("read-file", filePath),
  writeFile: (filePath: string, content: string) =>
    ipcRenderer.invoke("write-file", filePath, content),
});
