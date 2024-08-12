---
title: JavaScript-ECMAScript7
author: 耶温
createTime: 2024/08/10 19:53:34
permalink: /JavaScript/xx7bet2e/
---
> ECMAScript（简称 ES）是一种由 ECMA 国际组织制定的脚本语言标准。它是 JavaScript 的基础，定义了语言的语法、类型、语句、关键字、保留字、操作符、内置对象等。ECMAScript 的目标是提供一种通用的脚本语言，使得不同的实现（如浏览器、服务器等）能够遵循相同的标准，从而实现跨平台的兼容性。


-   ECMAScript 7 (ES2016) - 2016
    -   新增了 `Array.prototype.includes` 方法。
    -   新增了指数运算符（`**`）。


## 数组方法

-   `Array.prototype.includes()`：用于判断一个数组是否包含某个特定的值，返回布尔值。

```js
const fruits = ["apple", "banana", "cherry"];

console.log(fruits.includes("banana")); // true
console.log(fruits.includes("grape")); // false
```

## 指数运算符

新引入的一个运算符 `**`，用于进行指数运算。这个运算符可以用来替代 `Math.pow()` 方法，使得代码更加简洁。

```js
console.log(2 ** 3); // 8
console.log(Math.pow(2, 3)); // 8
```

