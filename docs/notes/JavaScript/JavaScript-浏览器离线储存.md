---
title: JavaScript-浏览器离线储存
author: 耶温
createTime: 2024/05/11 15:05:45
permalink: /JavaScript/u2gug9dp/
---

# JavaScript-浏览器离线储存

## 离线存储所用技术

### serverWorker

serviceWorker 生命周期

- install 事件会在 serviceWorker 注册成功时候触发，主要用于缓存资源
- activate 事件会在 serviceWorker 激活的时候触发，主要用于删除旧的资源
- fetch 事件会在发送请求的时候触发，主要用于操作缓存或者读取网络资源

  注意：

- 如果 sw.js 发生了改变，install 事件会重新触发
- activate 事件会在 install 事件后触发，但是如果现在已经存在 serviceWorker，就会处于等待状态直到 serviceWorker 终止
- 可以通过`self.skipWaiting()`方法跳过等待，返回一个 promise 对象
- 可以通过`event.WautUntil()`方法扩的参数是一个 promise 对象，会在 promise 结束后才会结束当前生命周期函数，防止浏览器在一步操作之前就停止了生命周期
- serviceWorker 激活后，会在下一次刷新页面的时候生效，可以通过`self.clients.claim()`立即活的控制权

```js
//在index.html 注册serverWorker方法
// 网页加载完成时注册
window.addEventListener("load", () => {
  // 能力检测
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").then((res) => {
      console.log(res);
    });
  }
});
```

```js
//serverWorker 相关事件
self.addEventListener("install", (event) => {
  console.log("install", event);
  //skipWaiting 会让serviceworker跳过等待，直接进入activate
  //waitUntil 等待skipWaiting结束才进入到activate
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", (event) => {
  console.log("activate", event);
  // 表示service worker激活后，立即活的控制权
  event.waitUntil(self.clients.claim());
});
//fetch事件会在请求发送的时候触发
self.addEventListener("fetch", (event) => {
  console.log("fetch", event);
});
```

### cache storage

> cacheStorage 接口表示 Cache 对象的储存，配合 service worker 来实现资源的缓存

- cache api 类似于数据库的操作
  - caches.open(cacheName).then(res=>{})，用于打开缓存，返回 一个匹配 cacheName 的 cache 对象的 Promise，类似于连接数据库
  - caches.key() 返回一个 promise 对象，包括所有的缓存 key
  - caches.delete(key) 根据 key 删除对应的缓存
- cache 对象常用方法：
  - cache 接口为缓存的 Request/Response 对象对提供存储机制
  - cache.put(req,res)把请求当成 key，并且把对应的响应存储起来
  - cache.add(url)根据 url 发起请求，并且吧响应结果储存起来
  - cache.addAll(urls) 抓取一个 url 数组，并且把结果都储存起来
  - cache.match(req) 获取 req 对应的 response

## 实现离线存储

### 注册 serverWorker

```js
  // 网页加载完成时注册
    window.addEventListener("load", async () => {
      // 能力检测
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register(
            "./assets/sw.js"
          );
          console.log("注册成功");
        } catch (error) {
          console.log("注册失败", error);
        }
      }
    });
</script>
```

注意：

- 需要在网页加载完成是注册，防止与其他资源竞争，影响网页的正常使用。
- serverWorker 只能适用于 HTTPS 中或者 localhost

### 设置缓存内容

> 在 serverWorker 的 install 事件中设置缓存内容

```js
//sw.js 内容
//设置缓存名字 用于版本比较删除之前的cache
const CACHE_NAME = "cache_name_v1";
self.addEventListener("install", async (event) => {
  // 开启一个cache 得到一个cache对象
  const cache = await caches.open(CACHE_NAME);
  // 等待cache把所有的资源存储
  await cache.addAll([
    "/",
    "/manifest.json",
    "/img/icon.png",
    "/css/index.css",
    "/js/index.js",
  ]);
  // 等待skipWaiting结束才进入到activate
  await self.skipWaiting();
});
```

### 清除旧的缓存

> 在 activate 中检测储存版本是否一致，不一致删除旧的缓存

```js
//sw.js 内容
// 主要清除旧的缓存
self.addEventListener("activate", async (event) => {
  const keys = await caches.keys();
  // 判断key 删除旧的资源
  keys.forEach((key) => {
    if (key !== CACHE_NAME) {
      caches.delete(key);
    }
  });
  // 表示service worker激活后，立即活的控制权
  await self.clients.claim();
});
```

### 离线读取 cache

> fetch 事件 会在请求发送的时候触发,在 fetch 事件中，判断资源是否能够请求成功，如果能请求成功，就响应成功的结果，如果断网，请求失败了，读取 cache 缓存即可

```js
//sw.js 内容
self.addEventListener("fetch", (event) => {
  const req = event.request;
  event.respondWith(networkFirst(req));
});
// 网络优先
async function networkFirst(req) {
  try {
    // 优先网络读取最新的资源
    const fresh = await fetch(req);
    return fresh;
  } catch (e) {
    // 去缓存中读取
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);
    return cached;
  }
}
```

## 注意

- 缓存内容可以在浏览器开发者工具->application->缓存 中查看当前设置缓存
