const _  =require("lodash");
const electron = require('electron');
var { dialog } = require('electron');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {app, BrowserWindow, ipcMain}  = electron;

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

ipcMain.on('videos-added', (event, videos, outputPath) => {
  console.log('Electron received output path as:' + outputPath);
  function callback() {
    console.log("Completed Converting videos");
    // alert("sending successfull event to react");
    mainWindow.webContents.send('conversion:end');
    // return function callback2() {};
  }

  const video = videos[0];
  console.log(video);

  _.each(videos, video => {
    const splittedDirectory = video.path.split('/');
    const outputDirectory = splittedDirectory.slice(0, splittedDirectory.length).join('/');
    const outputName = video.name.split('.')[0];
    const outputPath = outputDirectory + outputName + '.hsl';

    ffmpeg(video.path, { timeout: 432000 })
    .addOptions([
      '-profile:v baseline',
      '-level 3.0',
      '-s 640x360',
      '-start_number 0',
      '-hls_time 10',
      '-hls_list_size 0',
      '-f hls'
    ]).
    output(outputPath)
    .on('end', callback).run();
    });  
});

ipcMain.on('open-file-dialog-for-folder', function (event) {

  console.log(event)

      dialog.showOpenDialog(null, {
          properties: ['openDirectory']
      }).then(result => {
          if(fs.readdirSync(result.filePaths[0]).length === 0){
          event.sender.send("selected-folder", result.filePaths[0])
          } else {
              event.sender.send("selected-folder", "notEmpty")   
          }
      }).catch(err => {
          console.log(err)
      })
  
});