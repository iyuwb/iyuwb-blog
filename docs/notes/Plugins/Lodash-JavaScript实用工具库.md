---
title: Lodash-JavaScript实用工具库
author: 耶温
createTime: 2024/08/22 15:12:08
permalink: /Plugins/pispvrff/
---

Lodash 是一个现代 JavaScript 工具库，提供了许多实用的函数，用于简化常见的编程任务。它的功能包括数组、对象、字符串和函数的操作，能够帮助我们日常开发中更高效地处理数据。

::: tip  官方中文网
[Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。](https://www.lodashjs.com/)
:::


## 安装

1. script 标签引入

```html
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
```
直接使用

```js
_.map([1, 2, 3], function(n) { return n * 2; });
// => [2, 4, 6]
```
2. npm 安装

```bash
npm install lodash
```
引入使用
```js
import _ from 'lodash'; 
_.map([1, 2, 3], function(n) { return n * 2; });
// => [2, 4, 6]
```
如果使用Vue等框架，可以使用全局引入。


## 常用方法
1. 数组操作
-   `_.chunk()`：分片，将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。可以用于分片发送数据录音视频数据等。
```js
_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]
```
-   `_.uniq()`：去重，将数组（array）中的重复项去除，并返回一个新数组。
```js
_.uniq([1, 2, 2, 3, 4, 4, 5]);
// => [1, 2, 3, 4, 5]
```

2. 对象操作

-  ` _.merge()`：深度合并对象，将多个对象合并成一个新对象。
```js
const object = { a: [{ b: 2 }, { d: 4 }] };
const sources = { a: [{ c: 3 }, { e: 5 }] };
_.merge(object, sources); // { a: [{ b: 2, c: 3 }, { d: 4, e: 5 }] }
```
-  ` _.cloneDeep()`：深度克隆对象，将一个对象的所有属性复制到另一个对象中。
```js
const obj = { a: 1, b: { c: 2 } };
const deepClone = _.cloneDeep(obj);
```



3. 函数操作

-   `_.debounce()`： 防抖函数，创建一个 debounced（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 func 方法。 
```js
const log = () => console.log('Logging...');
const debouncedLog = _.debounce(log, 2000);

// 立即调用
debouncedLog();
debouncedLog(); // 只有最后一次调用会在 2 秒后执行
```
-   `_.throttle()`： 节流函数，创建一个节流函数，在 wait 秒内最多执行 func 一次的函数。
```js
const log = () => console.log('Logging...');
const throttledLog = _.throttle(log, 2000);

// 每 2 秒调用一次
setInterval(throttledLog, 500); // 只会每 2 秒输出一次
```
