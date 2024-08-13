---
title: JavaScript-ECMAScript9
author: 耶温
createTime: 2024/08/13 14:57:40
permalink: /JavaScript/srxtcqjz/
---
> ECMAScript（简称 ES）是一种由 ECMA 国际组织制定的脚本语言标准。它是 JavaScript 的基础，定义了语言的语法、类型、语句、关键字、保留字、操作符、内置对象等。ECMAScript 的目标是提供一种通用的脚本语言，使得不同的实现（如浏览器、服务器等）能够遵循相同的标准，从而实现跨平台的兼容性。

-   ECMAScript 9 (ES2018) - 2018
    -   增加了异步迭代（async iteration）。
    -   新增了 `Promise.prototype.finally `。
    -   增强了扩展运算符（spread operator）和剩余参数（rest parameters）的功能。
    -   正则表达式改进


## 异步迭代

异步迭代器使得在处理异步数据（如从网络获取数据、读取文件等）时，可以使用 for await...of 循环来逐个获取数据项。

异步迭代器是一个对象，它实现了 `Symbol.asyncIterator `方法，并返回一个异步迭代器对象。这个对象必须具有 `next()` 方法，该方法返回一个 Promise，解析为一个对象，该对象具有 `value` 和 `done` 属性。
-   `value` 属性表示当前迭代的值。
-   `done` 属性是一个布尔值，表示是否已经迭代完毕。

**简单示例**
`for await...of` 循环可以用于异步迭代器，允许你在异步操作完成时逐个处理结果。

```js
async function* asyncGenerator() {
    yield 'Hello';
    yield 'World';
}

async function processAsyncIterable() {
    for await (const value of asyncGenerator()) {
        console.log(value);
    }
}

processAsyncIterable();
// 输出:
// Hello
// World
```

## Promise.prototype.finally()

`Promise.prototype.finally()` 方法用于在 Promise 对象的状态改变时执行一个回调函数。无论 Promise 对象是成功、失败还是被取消，都会执行该回调函数。

```js
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise resolved');
    }, 2000);
});

myPromise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log('Promise settled');
    });
```


## 扩展运算符和剩余参数

-   对象的扩展运算符：允许使用 `...` 语法在对象字面量中进行属性的复制和合并。

```js
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

const mergedObj = { ...obj1, ...obj2 };
console.log(mergedObj); // { a: 1, b: 2, c: 3, d: 4 }
```




