---
title: JavaScript-ECMAScript8
author: 耶温
createTime: 2024/08/13 11:14:36
permalink: /JavaScript/ok33bw2v/
---
> ECMAScript（简称 ES）是一种由 ECMA 国际组织制定的脚本语言标准。它是 JavaScript 的基础，定义了语言的语法、类型、语句、关键字、保留字、操作符、内置对象等。ECMAScript 的目标是提供一种通用的脚本语言，使得不同的实现（如浏览器、服务器等）能够遵循相同的标准，从而实现跨平台的兼容性。

-   ECMAScript 8 (ES2017) - 2017
    -   引入了 `async` 和 `await`。
    -   新增了 `Object.values()` 和 `Object.entries()`。
    -   增加了字符串填充方法（`padStart` 和 `padEnd`）。
    -   引入了 `Object.getOwnPropertyDescriptors()`。
    -   允许函数参数列表和调用中的尾随逗号。
    -   引入了共享数组缓冲区（SharedArrayBuffer）和 Atomics 对象用于多线程编程

## `async` 和 `await`

`async` 和 `await` 是 ECMAScript 2017（ES8）引入的两个关键字，用于处理异步操作。它们使得异步代码的编写更加简洁和易于理解。

-   `async`：用于声明一个异步函数。
-   `await`：用于等待一个异步操作的结果。只能在异步函数中使用。

```js
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("数据加载完成");
        }, 1000);
    });
}

async function getData() {
    const data = await fetchData();
    console.log(data);
}

getData(); // 输出: 数据加载完成
```

## 对象方法

-   `Object.values()`：返回一个包含对象所有值的数组。

```js
const obj = { a: 1, b: 2, c: 3 };

console.log(Object.values(obj)); // 输出: [1, 2, 3]
```

-   `Object.entries()`：返回一个包含对象所有值的数组。
```js
const obj = { a: 1, b: 2, c: 3 };

console.log(Object.entries(obj)); // 输出: [['a', 1], ['b', 2], ['c', 3]]
```

-   `Object.getOwnPropertyDescriptors()`：返回一个对象的所有自有属性描述符。
```js
const obj = {
    a: 1,
    b: 2
};
const descriptors = Object.getOwnPropertyDescriptors(obj);
console.log(descriptors);
// 输出: { a: { value: 1, writable: true, enumerable: true, configurable: true }, b: { value: 2, writable: true, enumerable: true, configurable: true } }
```



## 字符串方法

-   `String.prototype.padStart()`：在字符串的开头填充指定的字符串，直到达到指定的长度。
```js
const str = "hello";

console.log(str.padStart(10, "*")); // 输出: "****hello"
```
-   `String.prototype.padEnd()`：在字符串的末尾填充指定的字符串，直到达到指定的长度。

```js
const str = "hello";

console.log(str.padEnd(10, "*")); // 输出: "hello****"
```

## 函数参数

在 ECMAScript 2017（ES8）中，允许在函数参数列表和函数调用中使用尾随逗号（trailing commas）。这意味着在定义函数参数或调用函数时，可以在最后一个参数后面添加一个逗号，而不影响代码的执行。这一特性使得在添加新参数时，减少了对现有行的修改，从而提高了代码的可维护性。

1. 在定义函数参数时使用尾随逗号：
```js
function sum(a, b, c,) {
    return a + b + c;
}
```
2. 在调用函数时使用尾随逗号：
```js
console.log(sum(1, 2, 3,)); // 输出: 6
```


