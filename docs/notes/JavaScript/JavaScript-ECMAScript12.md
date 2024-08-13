---
title: JavaScript-ECMAScript12
author: 耶温
createTime: 2024/08/13 17:06:26
permalink: /JavaScript/n01imn38/
---
> ECMAScript（简称 ES）是一种由 ECMA 国际组织制定的脚本语言标准。它是 JavaScript 的基础，定义了语言的语法、类型、语句、关键字、保留字、操作符、内置对象等。ECMAScript 的目标是提供一种通用的脚本语言，使得不同的实现（如浏览器、服务器等）能够遵循相同的标准，从而实现跨平台的兼容性。

-   ECMAScript 12 (ES2021) - 2021
   
    -   引入了 `String.prototype.replaceAll()` 方法
    -   新增了 `Promise.any()` 方法
    -   支持逻辑赋值运算符（&&=、||=、??=）


## 字符串方法

-   `String.prototype.replaceAll()` 方法用于在字符串中替换所有匹配的子字符串。

```js
const str = 'Hello, world! Hello, everyone!';
const newStr = str.replaceAll('Hello', 'Hi');
console.log(newStr); // 'Hi, world! Hi, everyone!'
```

## 数组方法
-   `Array.prototype.at()` 方法允许你通过负索引访问数组的元素，提供了一种更直观的方式来获取数组的最后一个元素。
```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.at(-1)); // 5
console.log(arr.at(-2)); // 4
```

## Promise方法

-   `Promise.any()` 方法用于将多个 Promise 实例中第一个成功的结果返回。如果所有的 Promise 都失败，则返回一个失败的 Promise。

```js
const promise1 = Promise.resolve(1);
const promise2 = Promise.reject(new Error('Failed'));
const promise3 = Promise.resolve(3);

Promise.any([promise1, promise2, promise3])
 .then(result => console.log(result)) // 输出 1
 .catch(error => console.error(error)); 
```

## 逻辑运算符
`&&=`、`||=`、`??=` 是 ECMAScript 12 中引入的逻辑赋值运算符，用于在布尔表达式中进行赋值操作。

-   `&&=`：如果左侧为 false，则不改变左侧的值；否则，将左侧与右侧的逻辑与结果赋值给左侧。
-   `||=`：如果左侧为 true，则不改变左侧的值；否则，将左侧与右侧的逻辑或结果赋值给左侧。
-   `??=`：如果左侧为 null 或 undefined，则将右侧的值赋给左侧；否则，左侧的值保持不变。

```js
let a = true;
let b = false;

// 使用 &&= 运算符
a &&= b; // 等同于 a = a && b;
console.log(a); // 输出: false

let x = true;
let y = true;

// 使用 &&= 运算符
x &&= y; // 等同于 x = x && y;
console.log(x); // 输出: true
```
```js

let a = false;
let b = true;

// 使用 ||= 运算符
a ||= b; // 等同于 a = a || b;
console.log(a); // 输出: true

let x = 'Hello';
let y = 'World';

// 使用 ||= 运算符
x ||= y; // 等同于 x = x || y;
console.log(x); // 输出: 'Hello' (x 保持不变，因为它是一个真值)
```
```js
let a = null;
let b = 'default';

// 使用 ??= 运算符
a ??= b; // 等同于 a = a ?? b;
console.log(a); // 输出: 'default'

let x = 0;
let y = 42;

// 使用 ??= 运算符
x ??= y; // 等同于 x = x ?? y;
console.log(x); // 输出: 0 (x 保持不变，因为它不是 null 或 undefined)
```
