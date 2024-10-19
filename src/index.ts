import { app, BrowserWindow, ipcMain } from "electron";
import * as fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import { exec } from "child_process";
import { promisify } from "util";
import path = require("path");

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const TODO_LIST_JSON = path.join(
  process.env.HOME,
  ".local/share/oreno-todo-app/todo_list.json"
);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow: BrowserWindow;

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

const appExpress = express();
const PORT = 3001; // 任意のポート番号

appExpress.use(bodyParser.json());

appExpress.post("/addTask", (req, res) => {
  const { summary, taskcode, memo } = req.body;
  if (summary !== "") {
    mainWindow.webContents.send("add-task", summary, taskcode, memo);
    res.status(200).send({ message: "タスクを追加しました！" });
  } else {
    res.status(400).send({ message: "タスクが提供されていません。" });
  }
});

appExpress.listen(PORT, () => {
  console.log(`サーバーがポート${PORT}で起動しました`);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with command + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const execPromise = promisify(exec);
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.handle("execute-command", async (_, command) => {
  try {
    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
      console.error(`エラーが発生したよ: ${stderr}`);
    }
    return stdout.trim();
  } catch (error) {
    console.error(`コマンド実行中にエラーが起きちゃった: ${error}`);
    throw error;
  }
});

ipcMain.handle("get-calendar-events", async (_, date) => {
  try {
    const pythonCode = `import json;import sys;from google_calendar_utils.calendar import Calendar;calendar_id = "main";from_date = sys.argv[1];to_date = sys.argv[2] if len(sys.argv) >= 3 else None;calendar = Calendar();events = calendar.collect_events_by_jst_date(calendar_id, from_date, to_date=to_date);print(json.dumps(events))`;
    const command = `python3 -c '${pythonCode}' '${date}' | grep -v '^Please visit'`;

    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
      console.error(`エラーが発生したよ: ${stderr}`);
    }
    return stdout.trim();
  } catch (error) {
    console.error(`コマンド実行中にエラーが起きちゃった: ${error}`);
    throw error;
  }
});

ipcMain.handle("read-file", async (_) => {
  try {
    const data = await fs.promises.readFile(TODO_LIST_JSON, "utf-8");
    return data;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
});

ipcMain.handle("write-file", async (_, content) => {
  try {
    await fs.promises.writeFile(TODO_LIST_JSON, content, "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing file:", error);
    throw error;
  }
});
