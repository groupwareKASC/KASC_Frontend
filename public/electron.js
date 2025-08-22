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
      : `file://${path.join(__dirname, "index.html")}`
  );

  win.on("closed", () => {
    win = null;
  });
}

app.whenReady().then(createWindow);

// 모든 창이 닫혔을 때 발생하는 이벤트
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// app이 활성화될 때 발생하는 이벤트
app.on("activate", () => { 
  if (win === null) {
    createWindow();
  }
});

// import { app, BrowserWindow } from "electron";
// import path from "path";

// let win;

// function createWindow() {
//   win = new BrowserWindow({
//     // 화면 사이즈
//     width: 900,
//     height: 700,
//     webPreferences: {
//       nodeIntegration: true,
//     },
//   });

//   // 무조건 build/index.html 로드하도록 지정
//   const indexPath = path.join(__dirname, "index.html");

//   //빈 화면이 뜰 경우 에러 캐치 
//   win.loadFile(indexPath).catch((err) => {
//     console.error("❌ index.html 로드 에러 ❌:", err);
//   });

//   // 창이 뜨면 개발자도구 자동 열기 - 창 분리 
//   win.webContents.once("dom-ready", () => {
//     win.webContents.openDevTools({ mode: "detach" });
//   });

//   // 로딩 실패 시 로그 찍기
//   win.webContents.on("did-fail-load", (event, code, desc) => {
//     console.error("❌ 페이지 로드 실패 ❌ :", code, desc);
//   });

//   win.on("closed", () => {
//     win = null;
//   });
// }

// app.whenReady().then(createWindow);

// // 모든 창이 닫혔을 때 발생하는 이벤트
// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

// // app이 활성화될 때 발생하는 이벤트
// app.on("activate", () => {
//   if (win === null) {
//     createWindow();
//   }
// });
