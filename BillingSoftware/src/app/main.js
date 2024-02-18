const { BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Enable integration with Node.js in renderer process
      contextIsolation: false, // Required for older React setups
      preload: path.join(__dirname, 'preload.js'), // Optional preload script
    },
  });

  win.loadFile('src/app/build/index.html'); // Adjust according to build output

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
