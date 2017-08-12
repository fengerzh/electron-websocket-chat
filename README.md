# electron-websocket-chat

Electron websocket聊天演示，一个简单的DEMO，从浏览器端发送消息到Electron客户端。

## 安装

```
npm install electron -g
npm install
```

## 运行

### 启动server

```
node server/index.js
```

### 在浏览器中启动第一个客户端

```
file:///path/electron-websocket-chat/index.html
```

### 启动electron客户端

```
electron .
```

### 在浏览器客户端中输入任意字符

Enjoy it!

## 待改进

1. 目前只假定2个客户端，客户端1必须为浏览器，客户端2必须为Electron，1发送，2接收，每次运行时都需要重启服务器和客户端，否则可能无法接收。
2. websocket server端长连接的心跳检测。
