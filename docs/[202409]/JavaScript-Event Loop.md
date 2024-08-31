---
title: JavaScript-事件循环机制（Event Loop）
author: 耶温
createTime: 2024/08/31 14:37:32
permalink: /article/wt16uq57/
---

# JavaScript-事件循环机制（Event Loop）

JavaScript 的事件循环机制（Event Loop）是其异步编程模型的核心部分。它允许 JavaScript 在单线程环境中处理异步操作，确保代码的执行顺序和响应性。



## 单线程模型

> JavaScript 是单线程的，这意味着它一次只能执行一个任务。虽然这使得代码执行顺序简单，但也限制了并发处理的能力。

优点：

-   简单性：单线程模型使得代码更易于理解和调试。
-   避免竞争条件：由于只有一个执行线程，避免了多线程编程中的许多常见问题。

缺点：

-   阻塞：长时间运行的操作会阻塞主线程，导致用户界面冻结。
-   性能限制：在 CPU 密集型任务中，单线程模型可能导致性能瓶颈。
-   以上问题：可以借助 Web Worker 来解决。


## 执行栈（Call Stack）

> 执行栈是一个后进先出（LIFO）的数据结构，用于管理函数调用。当一个函数被调用时，它会被推入栈中；当函数执行完毕时，它会从栈中弹出。


示例：


```javascript
function firstFunction() {
    console.log("First function is called.");
    secondFunction(); // 调用第二个函数
    console.log("First function is finished.");
}

function secondFunction() {
    console.log("Second function is called.");
    thirdFunction(); // 调用第三个函数
    console.log("Second function is finished.");
}

function thirdFunction() {
    console.log("Third function is called.");
}

console.log("Start"); // 1. 开始执行
firstFunction(); // 2. 调用第一个函数
console.log("End"); // 3. 结束执行
```
输出顺序：

```txt
Start
First function is called.
Second function is called.
Third function is called.
Second function is finished.
First function is finished.
End
```

解释：


-   `console.log("Start")` 被推入执行栈并执行，输出 "Start" 。
-    `firstFunction()` 被调用，推入执行栈。
-   在 `firstFunction` 中，输出 "First function is called." 。
-    `secondFunction()` 被调用，推入执行栈。
-   在 `secondFunction` 中，输出 "Second function is called." 。
-   `thirdFunction()` 被调用，推入执行栈。
-   在 `thirdFunction` 中，输出 "Third function is called." ，然后 `thirdFunction` 执行完毕并从栈中弹出。
-   控制权返回到 `secondFunction` ，输出 "Second function is finished." ，然后 `secondFunction` 执行完毕并从栈中弹出。
-   控制权返回到 `firstFunction，输出` "First function is finished." ，然后 `firstFunction` 执行完毕并从栈中弹出。
-    最后，`console.log("End")` 被执行，输出 "End" 。



## Web APIs

> 当 JavaScript 执行异步操作（如 setTimeout、fetch、事件监听等）时，这些操作会被交给浏览器的 Web APIs 处理。处理完成后，相关的回调函数会被放入任务队列中。

Web APIs 可以分为多个类别:

-   DOM API：用于操作文档对象模型（DOM），允许开发者动态修改网页内容和结构。
-   Fetch API：用于进行网络请求，替代传统的 XMLHttpRequest。
-   Web Storage API：提供本地存储和会话存储的功能。
-   Canvas API：用于绘制图形和动画。
-   Geolocation API：用于获取用户的地理位置信息。
-   WebSockets API：用于实现实时双向通信。

Web APIs 的工作原理:

-   Web APIs 通常在浏览器的主线程中运行。当 JavaScript 代码调用异步 Web API 时，相关的操作会被异步处理。处理完成后，回调函数会被放入宏任务队列或者微任务队列中，等待执行栈为空时执行。

宏任务队列（Macrotask Queue）：

-   `setTimeout` ：用于设置定时器，回调函数在指定时间后执行。
-   `setInterval` ：用于设置定时器，回调函数在指定时间间隔内重复执行。
-   事件处理：例如，用户点击按钮、键盘输入等事件的回调函数。
-   `requestAnimationFrame` ：用于在下一个重绘之前执行的回调。
-   `WebSocket` ：用于处理 `WebSocket` 连接的事件（如 `onopen` 、 `onmessage` 、 `onclose` 、 `onerror` ）。

微任务队列（Microtask Queue）:
-   `Promise` ： `Promise` 的 `.then()` 、 `.catch()` 和 `.finally()` 方法的回调会被放入微任务队列。
-   `MutationObserver` ：用于观察 DOM 变动的回调。
-   `queueMicrotask` ：用于将一个微任务添加到微任务队列。


## 任务队列（Task Queue）

> 任务队列是一个先进先出（FIFO）的数据结构，用于存储待执行的回调函数。当执行栈为空时，事件循环会从任务队列中取出一个回调函数并执行。

任务队列分为两类：

-   宏任务队列（Macrotask Queue）：存储需要延迟执行的回调函数，如 `setTimeout` 、 `setInterval` 、 `I/O` 操作等。
-   微任务队列（Microtask Queue）：存储需要尽快执行的回调函数，如 `Promise` 的回调、 `MutationObserver` 的回调等。

## 宏任务队列（Macrotask Queue）

> 宏任务队列是一个先进先出（FIFO）的数据结构，用于存储需要延迟执行的回调函数。当执行栈为空时，并且微任务队列为空时，事件循环会从宏任务队列中取出一个回调函数并执行。

## 微任务队列（Microtask Queue）

> 除了宏任务队列，JavaScript 还有一个微任务队列（如 Promise 的回调）。微任务的优先级高于普通任务，事件循环会在每次执行栈清空后，优先执行微任务队列中的所有任务，然后再执行宏任务队列中的任务。


## 事件循环（Event Loop）

> 事件循环是一个循环机制，它不断检查执行栈和任务队列，以确定是否有任务需要执行。如果有任务需要执行，事件循环会将其从任务队列中取出并放入执行栈中执行。

1. 执行同步代码：
    -   JavaScript 从上到下执行所有的同步代码，直到执行栈为空。
    -   例如，执行 `console.log` 、变量赋值、函数调用等。
2. 检查微任务队列：
    -   如当执行栈为空时，事件循环会检查微任务队列（Microtask Queue）。
    -   微任务通常包括 `Promise` 的 `.then()` 、`.catch()` 和 `.finally()` 回调，以及 `MutationObserver` 的回调。
    -   执行所有微任务，直到微任务队列为空。
3. 检查宏任务队列：
    -   微任务队列清空后，事件循环会检查任务队列（Task Queue）。
    -   任务队列中的任务通常包括 `setTimeout` 、`setInterval` 、I/O 操作的回调等。
    -   从任务队列中取出一个任务并将其推入执行栈中执行。
3. 重复：
    -   重复步骤 2 和 3，直到没有更多的任务和微任务需要执行。


示例：

```javascript
console.log('Start');

setTimeout(() => {
    console.log('Timeout 1');
}, 0);

Promise.resolve().then(() => {
    console.log('Promise 1');
});

setTimeout(() => {
    console.log('Timeout 2');
}, 0);

Promise.resolve().then(() => {
    console.log('Promise 2');
});

console.log('End');
```
执行结果：

```txt
Start
End
Promise 1
Promise 2
Timeout 1
Timeout 2
```

解释：

1. 执行同步代码，输出 'Start' 和 'End'。
2. 检查微任务队列，执行 `Promise` 的回调，输出 'Promise 1' 和 'Promise 2'。
3. 检查任务队列，执行 `setTimeout` 的回调，输出 'Timeout 1' 和 'Timeout 2'。




