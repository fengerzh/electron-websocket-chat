const path = require("path")
const {
  app,
  BrowserWindow,
  dialog,
} = require('electron')
const WebSocket = require("ws")
const notify = require('electron-main-notification')

const ws = new WebSocket('ws://localhost:1040/app')
ws.onerror = function(event) {
  dialog.showMessageBox({
    message: "服务端没有启动，无法接收消息",
    buttons: [
      "确定",
    ]
  })
}

let win
function main() {
    win = new BrowserWindow({
        width: 960,
        height: 600,
        title:"WebSocket Demo"
    })
    win.setMenu(null)
    win.loadURL('http://www.qiban.com/')

    const fpath = path.join(__dirname, 'websocket.html')
    win.loadURL(fpath)
    win.on('closed', () => { win = null })

    ws.on('message', function incoming(body) {
      notify(
        '你有新的消息！',
        {body},
        () => {
          console.log('The notification got clicked on!')
        }
      )
    });
}

app.on('ready', main)
app.on('window-all-closed', () => {
    app.quit()
    process.exit(1)
})
app.on('quit', function () {
    console.log("Done.")
})
