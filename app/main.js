const { app, BrowserWindow } = require('electron')

/**
 * When the electron application is launched in screensaver mode with Windows
 * it is not possible to have logs except by logging to a file.
 * Even the openDevTools() api does not open the console for the rendering process.
 */
const log = require('electron-log');
Object.assign(console, log.functions);

console.info('===> ARGV', process.argv);

process.on("uncaughtException", (err) => {
    console.error('uncaughtException', err);
});

function createWindow () {

    console.info('createWindow() start');
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
    })

    /**
     * In the case of launching the electron application in windows screen saver
     * The event is is not always triggered or never triggered
     */
    win.once('ready-to-show', () => {
        console.info('win.once(\'ready-to-show\') triggered');
        win.show()
    })

    const loadUrl = `file://${__dirname}/index.html`;
    console.info(`win.loaUrl(${loadUrl})`);

    /**
     * In the case of launching the electron application in windows screen saver
     * the promise of win.loadUrl is not always solved or never solved.
      */
    win.loadURL(loadUrl).then( (res) => {
        console.info(`win.loaUrl(${loadUrl}) promise has succeeded`);
        win.show();
    }).catch(error => {
        console.error(`win.loaUrl(${loadUrl}) the promise failed`);
        console.error(error);
    })
}

app.whenReady().then(() => {
    console.info('after whenReady()');

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
