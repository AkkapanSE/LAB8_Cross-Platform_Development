
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  console.log('🚀 Creating window...');
  mainWindow = new BrowserWindow({
    width: 1000,  
    height: 700,   
    title: "lab8-1-basic",  
    icon: path.join(__dirname, 'icon.png'), 
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    console.log('❌ Window closed');
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  console.log('⚡ Electron ready');
  createWindow();
});

app.on('window-all-closed', () => {
  console.log('🔴 All windows closed');
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
