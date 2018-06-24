import {app, BrowserWindow} from 'electron'; // eslint-disable-line
import path from 'path';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\'); // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    frame: false,
    show: false,
    backgroundColor: '#17141f',
    icon: path.join(__static, 'twitchy_icon.png'),
  });

  mainWindow.maximize();

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.setAppUserModelId('com.armaldio.light.desktop.twitchy');
app.setAsDefaultProtocolClient('twitchy');

app.on('ready', createWindow);

app.on('web-contents-created', (event, contents) => {
  if (contents.getType() === 'webview') {
    contents.on('new-window', (event, url) => {
      event.preventDefault();

      // TODO open window with menu
      console.log('opening new window');
      const win = new BrowserWindow({ show: true });
      win.once('ready-to-show', () => win.show());
      win.loadURL(url);
    });
  }
});

app.on('window-all-closed', () => {
  console.log('all windows closed!');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
