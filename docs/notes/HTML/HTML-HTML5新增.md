---
title: HTML-HTML5新增
author: 耶温
createTime: 2024/05/09 15:36:30
permalink: /HTML/ypylogam/
---
## 语义化标签

| 标签       | 描述                                                         |
|------------|--------------------------------------------------------------|
| `<header>`  | 定义一个页面或区域的头部。                                   |
| `<footer>`  | 定义一个页面或区域的底部。                                   |
| `<main>`    | 代表文档或应用的主要内容。                                   |
| `<nav>`     | 用于定义页面导航链接的部分。                                 |
| `<section>` | 定义文档中的独立部分，如章节、页眉、页脚或文档中的其他部分。 |
| `<aside>`   | 用于定义与页面主要内容相关但可独立分离的内容，如侧边栏或注释。 |
| `<article>` | 用于表示文档、页面或应用程序中的独立部分。                   |
| `<details>` | 用于创建可以显示或隐藏详细信息的可折叠小部件。               |
| `<figure>`  | 用于标记图片、图表、照片等元素。                             |
| `<figcaption>` | 为 `<figure>` 元素定义标题。                                 |
| `<mark>`    | 用于高亮显示文本。                                           |

## 表单控件

| type         | 描述                               |
| ---------------- | ------------------------------------ |
| `data`           | 日期字段                             |
| `datatime`       | 日期字段                             |
| `datatime-local` | 日期字段                             |
| `month`          | 日期字段的月                         |
| `week`           | 日期字段周                           |
| `time`           | 日期字段时分秒                       |
| `email`          | 定义用于 e-mail 地址的文本字段       |
| `number`         | 定义带有 spinner 控件的数字字段      |
| `range`          | 带有 slider 控件的数字字段，取值范围 |
| `search`         | 用于搜索的文本字段                   |
| `tel`            | 定义用于电话号码的文本字段           |
| `url`            | 定义用于 URL 的文本字段              |


## 多媒体支持

- `<audio>`：定义音频内容
- `<video>`：定义视频内容
- `<source>`：定义媒体资源
- `<track>`：定义媒体播放器的文本轨道


## 拖拽释放 

> 拖拽是 H5 中非常常见的功能。为了让元素可以拖动需要添加`draggable`属性
> 注意：链接和图片是默认可拖动的 不需要额外添加`draggable`属性

- 在拖拽目标上触发事件（源元素）：
  - `ondragstart`：开始拖动元素时触发
  - `ondrag`：元素正在拖动时触发
  - `ondragend`：用户完成元素拖拽后触发
- 释放目标时触发的事件（目标元素）：
  - `ondragenter`：当被鼠标拖动的对象进入其容器范围内触发
  - `ondragover`：当某被拖动的对象在另一对象容器范围内拖动时触发
    - 注意：在拖动元素时，每隔 350 毫秒会触发 `ondragover`事件。
  - `ondragleave`：当被鼠标拖动的对象离开其容器范围内触发
  - `ondrop`：在一个拖动过程中，释放鼠标时触发

## 自定义属性

> 方便的保存并使用数据

- 设置自定义属性：`element.setAttribute(name, value);`

- 获取自定义属性：`element.getAttribute(name, value);`
- 从指定的元素中删除一个属性：`removeAttribute()`

H5 新增获取方法：`dataset`

```javascript
<div id="one" data-wenbo="yiran"></div>;

var one = document.getElementById("one");
console.log(one.dataset.wenbo); //yiran
one.dataset.wenbo = "wenbo";
console.log(one.dataset.wenbo); //wenbo
```

## 画布 Canvas

> canvas 标签定义图片
> canvas 本身是没有绘图能力的，所有的绘制工作必需在 JavaScript 内部完成

`image`是通过对象的形式描述图片的,`canvas`通过专门的 API 将图片绘制在画布上.

```html
<canvas id="canvas"></canvas>
<script>
  var c = document.getElementById("canvas");
  // 画一个矩形
  var ctx = c.getContext("2d");
  ctx.fillStyle = "#ccc";
  ctx.fillRect(0, 0, 100, 150);
  // 画一个直线
  ctx.moveTo(0, 0);
  ctx.lineTo(200, 200);
  ctx.stroke();
</script>
```



## Web Storage API

包括 localStorage 和 sessionStorage，用于在客户端存储数据。

- `localStorage`：存储大小 5M 左右，数据可长期保存在本地。同源域名窗口中共享数据。
- `sessionStorage`：存储大小 5M 左右，与`localStorage`类似，但是储存数据仅当前窗口有效，关闭窗口自动删除。

::: tip
这里有一点需要注意的是，如果在当前页面使用`window.opne()`打开了一个页面，这个打开的新页面自动携带了当前页面的`sessionStorage`数据。
:::

## 地理位置 API

`navigator.geolocation.getCurrentPosition()`：获取用户当前位置，传参是两个回调函数，一个成功时，一个失败时

- Geolocation 对象其他方法：
  - `watchPosition()`：返回用户的当前位置，并继续返回用户移动时的更新位置。
  - `clearWatch()`：停止`watchPosition()`方法

```javascript
navigator.geolocation.getCurrentPosition(
  (res) => {
    console.log("获取用户位置成功：", res);
  },
  (err) => {
    console.log("获取失败，错误信息：", err);
  }
);
```

## Web Worker

Web Worker 是一种浏览器技术，允许开发者在后台线程中运行 JavaScript 代码，从而实现并行处理。Web Worker 使得网页能够在不阻塞用户界面的情况下执行复杂的计算或处理大量数据，提升了应用的性能和响应速度。

**主要特点**

- 独立线程：Web Worker 运行在独立的线程中，不会阻塞主线程的执行。
- 异步通信：Web Worker 可以通过 postMessage() 方法向主线程发送消息，主线程也可以通过 onmessage 事件处理函数接收来自 Web Worker 的消息。
- 限制：Web Worker 不能访问 DOM，只能通过 postMessage() 方法向主线程发送消息。

:::tip
关于Web Worker的详细内容可以查看：[Web API-Web Worker](/WebAPI/w4p7pxmz/)
:::


## Web Socket


WebSocket 是一种网络通信协议，提供了全双工（双向）通信通道，允许客户端和服务器之间进行实时数据交换。与传统的 HTTP 请求-响应模型不同，WebSocket 允许在单个连接上进行双向通信，从而实现更高效的实时应用。

**主要特点**

- 低延迟：WebSocket 的延迟较低，可以实现毫秒级的实时通信。
- 双向通信：WebSocket 允许客户端和服务器之间进行双向通信，客户端可以向服务器发送消息，服务器也可以向客户端发送消息。
- 持久连接：WebSocket 使用持久连接，连接一旦建立，客户端和服务器之间可以持续发送和接收数据，而不需要重新建立连接。
- 事件驱动：WebSocket 使用事件驱动模型，客户端和服务器之间可以通过事件来进行通信，例如 onopen、onmessage、onclose 等。
- 支持跨域：WebSocket 支持跨域通信，允许不同域名之间的通信。

:::tip
关于Web Socket的详细内容可以查看：[Web API-Web Socket](/WebAPI/ujdqheaf/)
:::

## Web Messaging 
Web Messaging 是一种浏览器 API，允许不同的窗口、标签页、iframe 或者 Web Worker 之间进行安全的消息传递。它主要用于在不同的上下文之间传递数据，确保信息的安全性和有效性。

**主要特点**

- 安全性：Web Messaging 使用安全的消息传递机制，确保信息的安全性和有效性。
- 跨上下文通信：Web Messaging 允许不同上下文之间的通信，例如窗口、标签页、iframe 或者 Web Worker。
- 事件驱动：Web Messaging 使用事件驱动模型，可以通过监听消息事件来接收来自其他上下文的消息。
- 支持跨域：Web Messaging 支持跨域通信，允许不同域名之间的通信。
- 简单易用：Web Messaging 提供了简单易用的 API，可以轻松地在不同的上下文之间传递数据。

:::tip
关于Web Messaging 的详细内容可以查看：[Web API-Web Messaging](/WebAPI/x8kinqml/)
:::
