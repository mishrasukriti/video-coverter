const electron = require('electron');
const {app, BrowserWindow}  = electron;

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    resizable: true,
    height: 600,
    width: 800,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration:true
    }
  });

  mainWindow.loadURL(`http://localhost:3000/`);
  // mainWindow.loadURL(`file://${__dirname}/public/index.html`);

  mainWindow.on('close', ()=> mainWindow=null)
});


