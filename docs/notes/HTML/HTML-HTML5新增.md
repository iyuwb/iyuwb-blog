---
title: HTML-HTML5新增
author: 耶温
createTime: 2024/05/09 15:36:30
permalink: /HTML/ypylogam/
---
## 语义化标签


| 标签       | 描述                                                         |
|------------|--------------------------------------------------------------|
| `<article>` | 用于表示文档、页面或应用程序中的独立部分。                   |
| `<aside>`   | 用于定义与页面主要内容相关但可独立分离的内容，如侧边栏或注释。 |
| `<details>` | 用于创建可以显示或隐藏详细信息的可折叠小部件。               |
| `<figcaption>` | 为 `<figure>` 元素定义标题。                                 |
| `<figure>`  | 用于标记图片、图表、照片等元素。                             |
| `<footer>`  | 定义一个页面或区域的底部。                                   |
| `<header>`  | 定义一个页面或区域的头部。                                   |
| `<main>`    | 代表文档或应用的主要内容。                                   |
| `<mark>`    | 用于高亮显示文本。                                           |
| `<nav>`     | 用于定义页面导航链接的部分。                                 |
| `<section>` | 定义文档中的独立部分，如章节、页眉、页脚或文档中的其他部分。 |


## HTML5 和 HTML 事件

注意：行内代码的为 H5 新增事件

### Window 事件

> 针对 window 对象触发的事件（应用到 `<body>` 标签）

| `onafterprint`   | 文档打印之后运行的脚本                           |
| ---------------- | ------------------------------------------------ |
| `onbeforeprint`  | 文档打印之前运行的脚本                           |
| `onbeforeunload` | 文档卸载之前运行的脚本                           |
| `onerror`        | 在错误发生时执行的脚本                           |
| `onhaschange`    | 当文档以改变时运行的脚本                         |
| onload           | 页面结束加载之后触发                             |
| `onmessgae`      | 在消息被触发时运行的脚本                         |
| `onoffline`      | 当文档离线时运行的脚本                           |
| `ononline`       | 当文档上线时运行的脚本                           |
| `onpagehide`     | 当窗口隐藏时运行的脚本                           |
| `onpageshow`     | 当窗口成为可见时运行的脚本                       |
| `onpagestate`    | 当窗口历史记录改时运行的脚本                     |
| `onredo`         | 当文档执行撤销(redo)是运行的脚本                 |
| `onresize`       | 当浏览器窗口被调整大小时触发                     |
| `onstorage`      | 在 web Storage 区域更新后运行的脚本              |
| `onundo`         | 在文档执行 undo 时运行的脚本                     |
| `onunload`       | 一旦页面已下载时触发（或者浏览器窗口已被关闭）。 |

### Form 事件

> 由 HTML 表单内的动画触发的时间，应用到几乎所有 HTML 元素，但最常用在 form 元素中

| onblur          | 元素失去焦点时运行             |
| --------------- | ------------------------------ |
| onchange        | 元素值被改变时运行             |
| `oncontextmenu` | 当上下文菜单被触发时运行       |
| onfocus         | 当元素活的焦点时运行           |
| `onformchange`  | 在表单改变时运行               |
| `onforminput`   | 当表单获得用户输入时运行       |
| `oninput`       | 当元素获得用户输入时运行       |
| `oninvalid`     | 当元素无效时运行               |
| onreset         | 当表单中的重置按钮被点击时运行 |
| onselect        | 在元素中文本被选中后触发       |
| onsubmit        | 在提交表单时触发               |

### Keyboard 事件

| onkeydown  | 按下按键时触发     |
| ---------- | ------------------ |
| onkeypress | 用户敲击按钮是触发 |
| onkeyup    | 释放按键时触发     |

### Mouse 事件

> 由鼠标或类似用户动作触发

| onclick        | 元素上发生鼠标点击时触发                 |
| -------------- | ---------------------------------------- |
| ondblclick     | 元素上发生鼠标双击时触发                 |
| `ondrag`       | 元素被拖动时运行的脚本                   |
| `ondragend`    | 在拖动操作末端运行的脚本                 |
| `ondragenter`  | 当元素已被拖动到有效拖放区域时运行的脚本 |
| `ondragleave`  | 当元素离开有效有效拖放区域时运行         |
| `ondragover`   | 当元素在拖放目标上正在被拖动时运行       |
| `ondragstart`  | 当拖动操作开始时运行                     |
| `ondrop`       | 当被拖元素正在被拖放时运行（释放鼠标）   |
| onmousedown    | 当元素上按下鼠标按钮时触发               |
| onmousemove    | 当鼠标指针移到元素上时触发 ，持续触发    |
| onmouseout     | 当鼠标指针移出元素时触发                 |
| onmouseover    | 当鼠标指针移到元素上时触发，刚进入时触发 |
| onmouseup      | 当在元素上释放鼠标按钮时触发             |
| `onmousewheel` | 当鼠标滚轮正在被滚动式运行               |
| `onscroll`     | 当元素滚动条被滚动时运行的脚本           |

### Media 事件

> 有媒介，比如视频图像和音频处罚的事件，适用于所有 HTML 元素，但常见于媒介元素中

| onabort              | 在退出时运行的脚本                                       |
| -------------------- | -------------------------------------------------------- |
| `oncanplay`          | 当文件就绪可以开始播放是触发                             |
| `oncanplaythrough`   | 当媒介能够无需因缓冲而停止即可播放至结尾是运行           |
| `ondurationchange`   | 当媒介长度改变时运行                                     |
| `onemptied`          | 当发生故障并且文件突然不可能用时触发                     |
| `onended`            | 当媒介已经到达结尾时运行的脚本                           |
| `onerror`            | 当在文件加载期间发生错误时运行的脚本                     |
| `onloadeddate`       | 当媒介数据已加载时运行的脚本                             |
| `onloadedmetadata`   | 当元数据被加载时( 比如分辨率和时长)运行                  |
| `onloadstart`        | 文件开始加载且未实际加载任何数据前运行                   |
| `onpause`            | 当媒介被用户或程序暂停时运行                             |
| `onplaying`          | 当媒介就绪可以开始播放时运行                             |
| `onprogress`         | 当浏览器正在获取媒介数据时运行                           |
| `onratechange`       | 每当回放速率改变时运行的脚本                             |
| `onreadystatechange` | 每当就绪状态改变时运行的脚本                             |
| `onseeked`           | 当 seeking 属性设置为 false 是运行 指示定位已结束        |
| `onseeking`          | 当 seeking 属性设置为 true 是运行 指示定位是活动的       |
| `onstalled`          | 在浏览器不存何种原因未能取回媒介数据时运行               |
| `onsuspend`          | 当媒介数据完全接在之前不论何种原因终止取回媒介数据时运行 |
| `ontimeupdate`       | 当播放位置改变时运行的脚本，包括将音量设置为静音         |
| `onvolumechange`     | 当音量改变时运行                                         |
| `onwaiting`          | 当媒介已停止播放但打算继续播放时                         |

## input 的 type 属性

### HTML

| button   | 按钮                   |
| -------- | ---------------------- |
| checkout | 复选框                 |
| file     | 文件上传               |
| hidden   | 定义隐藏的输入字段     |
| image    | 定义图像形式的提交按钮 |
| password | 定义密码字段           |
| radio    | 单选按钮               |
| reset    | 重置按钮               |
| submit   | 提交按钮               |
| text     | 输入字段               |

### HTML5

| `color`          | 拾色器                               |
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

## HTML5 离线储存



## 拖拽释放 ondrag

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

## 自定义属性 data-id

> 方便的保存并适用数据

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


## 音频视频

**`audio`和`video`**

- 自动播放：在标签属性中添加 autoplay
- [音频视频相关方法，属性以及事件](https://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp)

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

[Canvas 相关方法，属性](https://www.w3school.com.cn/tags/html_ref_canvas.asp)

## 地理位置 Geolocation

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

## LocalStorage 和 SessionStorage

- `localStorage`：存储大小 5M 左右，数据可长期保存在本地。同源域名窗口中共享数据。
- `sessionStorage`：存储大小 5M 左右，与`localStorage`类似，但是储存数据仅当前窗口有效，关闭窗口自动删除。

## H5浏览器存储 

- `cookie`
- `localStorage`
- `sessionStorage`
- `indexedDB`
- `WebSQL`
- `window变量`

## 表单控件

- `email`：邮箱
- `url`：连接
- `number`：数字
- `range`：范围选择
- `Date pickers`：日期时间选择
  - `data month week time datetime datetime-local`
- `search`：搜索
- `color`：颜色选择

## Web Worker

## Web Socket


> 为 JavaScript 创造多线程环境，允许在主线程穿件 worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。当 Worker 线程完成计算任务，再把结果返回给主线程。
> 注意：Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动打断。在使用完毕后，需要及时关闭。

**Web Socket**

> HTML5 提供的一种在单个 TCP 连接上进行全双工通讯的协议。

> Web Socket 使得客户端和服务器之间的数据交换变得更加简单，允许服务器端主动向客户端推送数据。在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持续性的连接，并进行双向数据传输。


## Cache 浏览器缓存

:::tip
关于Cache 浏览器缓存的详细内容可以查看：[Cache 浏览器缓存](/JavaScript/wm68edzn/)
:::

Cache 浏览器缓存主要包括两部分，Cache 和 CacheStorage 。

Cache 接口为缓存的 Request / Response 对象对提供存储机制，例如，作为ServiceWorker 生命周期的一部分。请注意，Cache 接口像 workers 一样，是暴露在 window 作用域下的。尽管它被定义在 service worker 的标准中，但是它不必一定要配合 service worker 使用。


CacheStorage 接口表示 Cache 对象的存储。它提供了一个 ServiceWorker 、其他类型 worker 或者 window 范围内可以访问到的所有命名 cache 的主目录（它并不是一定要和 service workers 一起使用，即使它是在 service workers 规范中定义的），并维护一份字符串名称到相应 Cache 对象的映射。



### Cache (单个缓存对象)

***定义：***

- Cache 是一个单个的缓存实例，它可以存储多个请求（Request）及其响应（Response）。
- 当你想要为特定的请求存储一个响应时，你需要与一个具体的 Cache 对象交互。

***方法：***

- Cache 对象提供了一些方法来管理缓存中的条目，如 add(), match(), put(), delete() 和 keys() 等。

***用途：***
- 用于离线访问资源，比如在网络不可用时仍能加载页面。
- 用于提高性能，减少服务器负载和减少用户的等待时间。

### CacheStorage (缓存存储接口)

***定义：***

- CacheStorage 是一个接口，它允许你管理多个 Cache 对象。
- 它可以被视为一个全局的缓存存储空间，你可以通过它打开、关闭或操作多个缓存实例。

***方法：***

- CacheStorage 提供了几个方法来管理和获取 Cache 实例，例如 open(), has(), delete(), keys() 等。

***用途：***

- 用于创建、删除和查找 Cache 实例。
- 允许开发者组织不同版本的应用程序资源到不同的 Cache 中。




