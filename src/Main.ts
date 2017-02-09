/**
 * Entry file for the electron application. 
 * 
 * Written from a template found here [http://blog.dmbcllc.com/typescript-and-electron-the-right-way/]
 */

import { BrowserWindow, ipcMain } from 'electron';
import { ListenerUtils } from './ts//main/ListenerUtils';

export default class Main {
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow : typeof BrowserWindow;
    
    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onClose() {
        // Dereference the window object.
        Main.mainWindow = null;
    }

    private static onReady() {
        Main.mainWindow = new Main.BrowserWindow({width: 800, height: 600});
        Main.mainWindow.loadURL('file://' + __dirname + '/../../src/index.html');
        ListenerUtils.listen();
        Main.mainWindow.on('closed', Main.onClose);
    }

    private static onFileOpen(event: Event) {
        event.preventDefault();
        console.log('File open');
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        // we pass the Electron.App object and the Electron.BrowserWindow into this function
        // so this class has no dependencies. This makes the code easier to write tests for.
        
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('open-file', Main.onFileOpen);
        Main.application.on('ready', Main.onReady);
    }
}
