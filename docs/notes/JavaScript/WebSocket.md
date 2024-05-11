---
title: WebSocket
author: 耶温
createTime: 2024/05/11 15:05:45
permalink: /JavaScript/21qygyp7/
---
# JavaScript 简单了解-WebSocket

前段时间项目中遇到了消息推送的问题，当时采用客户端轮询，每隔 5s 请求一次数据。由于轮询的效率低，非常浪费资源。后面准备把轮询调整为使用 WebSocket 来建立连接，实现推送。

## WebSocket 介绍

一种网络通信协议，使用 WebSocket 服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，实现真正的双向平等对话，可以实现服务器推送功能。并且现在浏览器中都已实现。

## 与 HTTP 比对

HTTP 协议，通信只能客户端发起。
比如：在接收提示消息时，只能客户端向服务器端发送请求才知道有没有最新的消息。不能服务器端直接通知客户端有最新的消息。简单来说就是 HTTP 做不到信息的推送。只能通过客户端每隔一段时间发送请求查询。

而 HTTP2.0 则是对 HTML、CSS 等 JS 资源的传输方式进行了优化，并没有提供新的 JS API，也不能用于实时传输消息。

## WebSocket 特点

- 客户端与服务器端实现容易（建立在 TCP 协议之上）

- 没有同源限制可以与任意服务器建立通信

- 协议表示符为 ws 或者 wws（加密协议），服务器地址就是 url 地址
  - 比如：`ws://demo.example.com:8001`

## 客户端使用

在客户端中使用很简单，只需要开启一个 WebSocket 服务并且实现监听服务器发送的消息即可。

```js
// 开启WebSocket服务
var ws = new WebSocket("ws://127.0.0.1:8001");
ws.onopen = function(data) {
  // 发送信息
  ws.send("hello World");
};
ws.onmessage = function(data) {
  console.log(data.data); // 接收信息
};
ws.onclose = function(data) {
  console.log("关闭", data); //关闭
};
```

如上代码，我们可以使用 ws.send()发送数据，也可以适用 ws.onmessage 监听服务器端发送的信息数据，实现简单的实时双向传输功能。

## WebSocket 事件

我们在开始 WebSocket 服务之后，可以直接使用 addEventListener() 或将一个事件监听器赋值给接口的 oneventname 属性，来监听相关事件。

### clone

当一个 WebSocket 连接被关闭时触发。
也可以通过 onclose 属性来设置。

```js
ws.addEventListener("clone", function(event) {
  // WebSocket 已关闭
});

//或者
ws.onclone = function(event) {
  // WebSocket 已关闭
};
```

如上面代码所示，WebSocket 的相关事件都可以通过这两种方法来监听实现。

### error

当一个 WebSocket 连接因错误而关闭时触发，例如无法发送数据时。
也可以通过 onerror 属性来设置.

```js
ws.addEventListener("error", function(event) {
  // WebSocket 出现错误
});

//或者
ws.onerror = function(event) {
  // WebSocket 出现错误
};
```

### message

当通过 WebSocket 收到数据时触发。
也可以通过 onmessage 属性来设置。

```js
ws.addEventListener("message", function(event) {
  // WebSocket 监听消息 收到服务器端消息是触发
});

//或者
ws.onmessage = function(event) {
  // WebSocket 监听消息 收到服务器端消息是触发
};
```

### open

当一个 WebSocket 连接成功时触发。
也可以通过 onopen 属性来设置。

```js
ws.addEventListener("open", function(event) {
  // WebSocket 连接成功。
});

//或者
ws.onopen = function(event) {
  // WebSocket 连接成功。
};
```

## 客户端属性与方法

### WebSocket.readyState

该属性返回当前的实例对象状态（只读）：

- CONNECTING：值为 0，正在链接中
- OPEN：值为 1，已经链接并且可以通讯
- CLOSING：值为 2，连接正在关闭
- CLOSED：值为 3，连接已关闭或者没有链接成功

### WebSocket.bufferedAmount

未发送至服务器的字节数（只读）。当 WebSocket.bufferedAmount 为 0 时说明发送成功。在实际项目中可以该属性来判断是否发送完成。

```js
if (ws.bufferedAmount === 0) {
  // 发送成功
} else {
  // 发送未结束
}
```

### 其他属性

- WebSocket.url WebSocket 的绝对路径（只读）。
- WebSocket.protocol 服务器选择的下属协议（只读）。
- WebSocket.extensions 返回服务器已选择的扩展值。目前，链接可以协定的扩展值只有空字符串或者一个扩展列表（只读）。
- WebSocket.binaryType 返回 websocket 连接所传输二进制数据的类型。

### WebSocket.send()

对要传输的数据进行排队。

> WebSocket.send() 方法将需要通过 WebSocket 链接传输至服务器的数据排入队列，并根据所需要传输的 data bytes 的大小来增加 bufferedAmount 的值 。若数据无法传输（例如数据需要缓存而缓冲区已满）时，套接字会自行关闭。

发送数据类型需是下面几个类型之一：

- USVString:文本字符串，字符串将以 UTF-8 格式添加到缓冲区，并且 bufferedAmount 将加上该字符串以 UTF-8 格式编码时的字节数的值。
- ArrayBuffer：可以使用一有类型的数组对象发送底层二进制数据；其二进制数据内存将被缓存于缓冲区，bufferedAmount 将加上所需字节数的值。
- Blob：Blob 类型将队列 blob 中的原始数据以二进制中传输。 bufferedAmount 将加上原始数据的字节数的值。
- ArrayBufferView：可以以二进制帧的形式发送任何 JavaScript 类数组对象 ；其二进制数据内容将被队列于缓冲区中。值 bufferedAmount 将加上必要字节数的值。

```js
// 文本：

ws.send("hello world");

// ArrayBuffer
const buffer = new ArrayBuffer(8);
ws.send(buffer);

// Blob
var demo = { hello: "world" };
var blob = new Blob([JSON.stringify(demo, null, 2)], {
  type: "application/json",
});
ws.send(blob);
```

### WebSocket.close()

关闭当前链接。

两个可选参数：

- code： 可选，一个数字状态码，它解释了连接关闭的原因。如果没有传这个参数，默认使用 1005
- reason： 可选，可读的字符串，它解释了连接关闭的原因。

### 事件类型

- WebSocket.onclose 用于指定连接关闭后的回调函数。
- WebSocket.onerror 用于指定连接失败后的回调函数。
- WebSocket.onmessage 用于指定当从服务器接受到信息时的回调函数。
- WebSocket.onopen 用于指定连接成功后的回调函数。

## 服务端使用

如果各个服务器端语言实现方法不一样，这里简单说下我的测试环境。

测试使用的是 node.js 配合 nodejs-websocket 进行的

具体使用如下：

```js
// 引入nodejs-websocket
var ws = require("nodejs-websocket");
// 创建websocket
var server = ws
  .createServer(function(conn) {
    // 监听消息
    conn.on("text", function(str) {
      // 调用相关方法
      loadMessage(conn, str);
    });
    // 监听关闭
    conn.on("close", function(code, reason) {
      console.log("关闭");
    });
  })
  .listen(8001);
console.log("开启成功~");

// 接收消息 并返回信息
function loadMessage(conn, str) {
  conn.send(str + "获取到消息，已接收消息，已返回回答");
}
```
