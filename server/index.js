const WebSocket = require('ws');

// 创建一个WebSocket服务器，监听1040端口
const wss = new WebSocket.Server({
  port: 1040,
  clientTracking: true,
});
const clients = [];

// 心跳反馈
function heartbeat() {
  this.isAlive = true;
}

wss.on('connection', function connection(ws, req) {
  // 设置心跳
  ws.isAlive = true;
  ws.on('pong', heartbeat);

  // 设置用户名
  clients[req.url.substr(1)] = ws;
  // 当接收到消息时
  ws.on('message', function incoming(message) {
    // 将此消息转发给App客户
    clients['app'].send(message);
  });
});

// 一分钟一次心跳
setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    // 如果没有接收到反馈，则中断连接
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping('', false, true);
  });
}, 60000);

// 每隔60秒显示一次连接数
setInterval(function showClients() {
  console.log(wss.clients.size);
}, 60000);
