const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let win;

function createWindow() {
    win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  win.on("closed", function () {
    win = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", function () { // 모든 창이 닫혔을 때 발생하는 이벤트
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () { // app이 활성화될 때 발생하는 이벤트
  if (win === null) {
    createWindow();
  }
});