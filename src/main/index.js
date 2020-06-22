import { 
  app, 
  BrowserWindow,
  ipcMain
} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  const Koa = require('koa')
  const app = new Koa()
  const path = require('path')
  const staticCache = require("koa-static-cache");
  const serve = require("koa-static")
  const router = require("koa-router")
  let child_router = require('./router/index.js')


  app.use(async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
      ctx.body = 200; 
    } else {
      await next();
    }
  });

  app.use(staticCache(path.join(__dirname, "public"), {
    maxAge: 365 * 24 * 60 * 60  //Add these files to caches for a year
  }))

  app.use(serve(path.join(__dirname, "public")))

  router.use('/', child_router);
  app.use(router.routes()).use(router.allowedMethods());

  app.listen(2999);

  mainWindow = new BrowserWindow({
    height: 800,
    useContentSize: true,
    frame: false,
    resizable: false,
    skipTaskbar: false,
    width: 1200
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('close',e=>{
  mainWindow.close()
})
ipcMain.on('minimize',e=>{
  mainWindow.minimize()
})



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
