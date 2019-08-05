// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const electron=require('electron')
const FS = require('fs')
const Menu = electron.Menu
const ipc = electron.ipcMain

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    minWidth:1200,
    minHeight:700,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

let template = [{
label: 'File',
submenu: [
{
label: 'Save',
accelerator: 'Ctrl+S',
click:function (){
dialog.showSaveDialog({
title: 'Save file...',
buttonLabel: "Save",
filters: [
{ name: 'Excel', extensions: ['csv'] }
]
}, function (file) {
  mainWindow.webContents.send('getSheet',file);

})
}
  

},
{
label: 'Quit',
accelerator: 'Ctrl+Q',
role: 'quit'
},
{
type: 'separator'
}]
}]
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready',function(){
  const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
createWindow();
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const dialog = electron.dialog



ipc.on('asynchronous-message', function (event, arg) {
  console.log(arg);
if (arg === 'Thats one small step for man') {
event.sender.send('asynchronous-reply', ', one giant leap for mankind.')
}
})


let sheet=[];
ipc.on('sheetGotten', function (event, arg) {

 sheet=arg[0];
 if(sheet.length>0)
 save(arg[1]);
})

function save(file)
{
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: file,
    header: [
        {id: 'description', title: 'DESCRIPTION'},
        {id: 'date', title: 'DATE'},
        {id: 'price', title: 'COST'},
    ]
});
 


 
csvWriter.writeRecords(sheet)       // returns a promise
    .then(() => {
        mainWindow.webContents.send('displaySaved',file);
    });
}