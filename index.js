const { app, BrowserWindow } = require('electron');
const ipc = require('electron').ipcMain;

let window_main;

app.on('ready', () => {
    window_main = new BrowserWindow({ frame: false, webPreferences: { nodeIntegration: true } });

    window_main.loadFile('test.html');

    window_main.on('closed', () => {
        app.quit();
    });
});

ipc.on('ion-app', (event, arg) => {
    switch (arg) {
        case 'fs':
            if (window_main.isMaximized()) {
                window_main.unmaximize();
            } else {
                window_main.maximize();
            }
            break;
        case 'mz':
            window_main.minimize();
            break;
    }
});