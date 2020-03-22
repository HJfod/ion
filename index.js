const { app, BrowserWindow } = require('electron');
const ipc = require('electron').ipcMain;
const path = require('path');

require(path.join(__dirname + '/ion-scripts/ion-index.js'));

let window_main;

app.on('ready', () => {
    window_main = new BrowserWindow({ frame: false, webPreferences: { nodeIntegration: true } });

    window_main.loadFile('test.html');

    window_main.on('closed', () => {
        app.quit();
    });
});