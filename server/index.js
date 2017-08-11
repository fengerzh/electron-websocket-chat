const WebSocket = require('ws');

// 创建一个WebSocket服务器，监听1040端口
const wss = new WebSocket.Server({ port: 1040 });
const clients = [];

wss.on('connection', function connection(ws) {
  clients.push(ws);
  // 当接收到消息时
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    // 将此消息转发给第2个客户
    clients[1].send(message);
  });
});
