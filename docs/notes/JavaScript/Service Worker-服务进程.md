---
title: Service Worker-服务进程
author: 耶温
createTime: 2024/06/06 11:32:15
permalink: /JavaScript/oo65290p/
---

# Service Worker-服务进程


## 概念简介
service worker 的功能类似于代理服务器，允许你去修改请求和响应，将其替换成来自其自身缓存的项目。换句话说，就是对资源缓存和自定义的网络请求进行控制，因此可以让Web App 在网络丢失的状态下，也能读取缓存内容进项访问。

::: tip 注意
Service Worker 需要运行在安全的环境：
-   HTTPS
-   `localhost`，浏览器认为localhost也是一个安全的环境
:::

service worker 概念：

-   Service worker 是一个注册在指定源和路径下的事件驱动 worker。
-   采用 JavaScript 文件的形式，控制关联的页面或者网站，拦截并修改访问和资源请求，细粒度地缓存资源。


-   Service worker 运行在 worker 上下文，无法访问 DOM，相对于 JavaScript 主线程，它运行在其他线程中，所以不会造成阻塞，被设计为完全异步。
    -   无法访问 DOM
    -   同步 XHR 和 Web Storage 不能在 service worker 中使用
    -   请求数据可以使用fetch
-   Service worker 中有大量使用的Promise。

## 生命周期

### 1. 下载

用户首次访问 service worker 控制的网站或页面时，service worker 会立刻被下载。

之后，会在下面情况下触发更新下载：
-   一个前往作用域内页面的导航（ 新页面 ）
-   在 service worker 上的一个事件被触发并且过去 24 小时没有被下载。（每隔一段时间就会下载一次）

### 2. 安装

当下载的文件发现是最新的时，就会试图安装：

-   要么与现有的 service worker 不同（字节对比）
-   要么是在页面或网站遇到的第一个 service worker。

### 3. 激活

首次启用 service worker，页面会首先尝试安装，安装成功后它会被激活。

如果现有 service worker 已启用，新版本会在后台安装，但仍不会被激活——这个时序称为 worker in waiting。
-   直到所有已加载的页面不再使用旧的 service worker 才会激活新的 service worker。
-   使用 `ServiceWorkerGlobalScope.skipWaiting()` 可以更快地进行激活。
-   激活的 service worker  可以使用 `Clients.claim()` 声明现有的页面。

`ServiceWorkerGlobalScope.skipWaiting()`：强制激活当前service worker。强制等待 service worker 成为激活的 service worker。这个方法与 `Clients.claim()` 一起使用，以确保原 service worker 的更新，能立即对当前对客户端和其他所有激活的客户端生效。


`Clients.claim()`：当一个 service worker 被初始注册时，页面在下次加载之前不会使用它。`Clients.claim()` 方法会立即控制这些页面强制使用。

## 生命周期事件

### 1. install
install 事件会在 service worker 注册成功时候触发，主要用于缓存资源。
-  如果 sw.js 发生了改变，install 事件会重新触发。
-  通过`self.skipWaiting()`方法可以跳过等待，强制激活当前service worker，返回一个 promise 对象。
### 2. activate
activate 事件会在 service worker 激活的时候触发，主要用于删除旧的资源。
- activate 事件会在 install 事件后触发，但是如果现在已经存在 service worker，就会处于等待状态直到service worker 终止，才会激活新的service worker。也可以使用`self.skipWaiting()`强制激活，跳过等待。
- service worker被激活后，会在下一次刷新页面的时候生效，可以通过`self.clients.claim()`立即激活控制权。
### 3. fetch
fetch 事件会在发送请求的时候触发，主要用于操作缓存或者读取网络资源。


`sw.js`：
```javascript
self.addEventListener("install", async (event) => {
  console.log("install", event);
  // 设置缓存文件
  // doSomething

  // 强制激活当前 service worker
  await self.skipWaiting()
});
self.addEventListener("activate", async (event) => {
  console.log("activate", event);
  // 删除就缓存和文件
  // doSomething

  // 表示service worker激活后，立即激活控制权
  await self.clients.claim();
});
self.addEventListener("fetch", async (event) => {
  console.log("fetch", event);
  // 处理请求和读取缓存
  // doSomething
});
```
## 基本步骤


### 1. 注册

使用 `serviceWorkerContainer.register()` 来注册service worker。

`scope` 参数是可选的，并且可以用来指定你想要 service worker 控制的子作用域。

如下面代码演示：

```html
<script>
  // 需要在localhost 或者 HTTPS中才能使用
  // 网页加载完成时注册
  window.addEventListener("load", () => {
    // 能力检测
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js",{
        scope: "/",
      }).then((res) => {
        if (res.installing) {
            console.log("正在安装 Service worker");
        } else if (res.waiting) {
            console.log("已安装 Service worker installed");
        } else if (res.active) {
            console.log("激活 Service worker");
        }
      });
    }
  });
</script>
```

如果注册成功，service worker 将在 `ServiceWorkerGlobalScope` 中执行。

- `ServiceWorkerGlobalScope`：类型与`window`，是一种特殊的上下文，在主脚本执行线程之外运行，没有访问 DOM 的权限。Service Worker 现在已为处理事件做好准备。

### 2. 安装

`install` 事件始终是发送给 service worker 的第一个事件（这可用于启动填充 IndexedDB 和缓存站点资源的过程。

-   当`ServiceWorkerRegistration.installing` 为`true`时出发。表明Service Worker正在安装中。
-   当 install 程序处理完成时，service worker 被视为已安装

如下面代码演示：

在service worker注册文件中`sw.js`监听`install`事件，并做一些缓存站点资源处理。

`sw.js`
```js
// 设置一个缓存名称
const CACHE_NAME = "cache_v1";
self.addEventListener("install", async (event) => {
  // 开启一个cache 得到一个cache对象
  const cache = await caches.open(CACHE_NAME);
  // 等待cache把所有的资源存储
  await cache.addAll(["/", "/img/icon.png", "/manifest.json", "/index.css"]);
  // 会让service worker跳过等待，直接进入激活
  await self.skipWaiting();
});
```

### 3. 激活

当 `install` 程序处理完成时，service worker 被视为已安装。此时，service worker 的先前版本可能处于激活的状态并控制着打开的页面。由于我们不希望同一 service worker 的两个不同版本同时运行，因此新版本尚未激活。


一旦 service worker 的旧版本控制的页面都已关闭，就可以安全地停用旧版本，并且新安装的 service worker 将收到 activate 事件。activate 的主要用途是去清理 service worker 之前版本使用的资源。新的 service worker 可以在`install`事件最后调用 `self.skipWaiting()` 要求立即激活，而无需要求打开的页面关闭。然后，新的 service worker 将立即收到 `activate` 事件，并将接管任何打开的页面。

激活后，service worker 将立即控制页面，但是只会控制那些在 `register()` 成功后打开的页面。换句话说，文档必须重新加载才能真正的受到控制，因为文档在有或者没有 service worker 的情况下开始存在，并在其生命周期内维护它。为了覆盖次默认行为并在页面打开的情况下，service worker 可以在`activate`事件最后调用 `clients.claim()` 方法。


`sw.js`
```js
// 主要清除旧的缓存
self.addEventListener("activate", async (event) => {
  const keys = await caches.keys();
  // 判断key 删除旧的资源
  keys.forEach((key) => {
    if (key !== CACHE_NAME) {
      caches.delete(key);
    }
  });
  // 表示service worker激活后，立即激活的控制权
  await self.clients.claim();
});
```

:::tip
每当获取新版本的 service worker 时，都会再次发生此循环，并在新版本的激活期间清理上一个版本的残留。
:::

### 4. 请求处理

`fetch` 事件会在发送请求的时候触发，主要用于操作缓存或者读取网络资源。

`FetchEvent.respondWith`：阻止浏览器默认的 fetch 操作，并且允许由你自己为 Response 提供一个 promise。

`sw.js`：
```js
// fetch事件 会在请求发送的时候触发
// 判断资源是否能够请求成功，如果能请求成功，就响应成功的结果，如果断网，请求失败了，读取cache缓存即可
self.addEventListener("fetch", (event) => {
  // console.log('fetch', event)
  const req = event.request;
  event.respondWith(networkFirst(req));
});
// 网络优先
async function networkFirst(req) {
  const cache = await caches.open(CACHE_NAME);
  try {
    // 优先网络读取最新的资源
    const fresh = await fetch(req);
    // 存储数据
    cache.put(req,fresh)
    return fresh;
  } catch (e) {
    // 去缓存中读取
    const cached = await cache.match(req);
    return cached;
  }
}
```

## 注意事项

### 1. 注册失败

可能原因：

- 网站未开启`HTTPS`
- service worker 文件的路径问题
- ervice worker 文件跨域
- Firefox 中，无痕模式，Service Worker API 将被隐藏而无法使用。
- 在 Chrome 中，当启用“阻止所有 Cookie（不建议）”选项时，注册将会失败。


### 2. waitUntil()
`ExtendableEvent.waitUntil()` 方法，确保 Service Worker 不会在 waitUntil()` 里面的代码执行完毕之前安装完成。
`sw.js`
```js
// 设置一个缓存名称
const CACHE_NAME = "cache_v1";

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(resources);
};

self.addEventListener("install", async (event) => {
  event.waitUntil(addResourcesToCache(["/", "/index.html","/style.css","/app.js",]));
  // 会让service worker跳过等待，直接进入激活
  await self.skipWaiting();
});
```

### IndexedDB

::: tip
需要的话，可以在 service worker 中使用 IndexedDB 来做数据存储
:::