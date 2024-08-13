---
title: JavaScript-ECMAScript10
author: 耶温
createTime: 2024/08/13 16:09:06
permalink: /JavaScript/dmqq8bye/
---
> ECMAScript（简称 ES）是一种由 ECMA 国际组织制定的脚本语言标准。它是 JavaScript 的基础，定义了语言的语法、类型、语句、关键字、保留字、操作符、内置对象等。ECMAScript 的目标是提供一种通用的脚本语言，使得不同的实现（如浏览器、服务器等）能够遵循相同的标准，从而实现跨平台的兼容性。

-   ECMAScript 10 (ES2019) - 2019
   
    -   引入了 `Array.prototype.flat()` 和 `Array.prototype.flatMap()`
    -   新增了 `Object.fromEntries()`
    -   增加了 `String.prototype.trimStart()` 和 `String.prototype.trimEnd()`
    -   支持可选的 `catch` 绑定

## 数组方法

-   `Array.prototype.flat()`：用于将多维数组转换为一维数组。

```js
const nestedArray = [1, 2, [3, 4], [5, 6]];

const flattenedArray = nestedArray.flat();

console.log(flattenedArray); // [1, 2, 3, 4, 5, 6]
```

-   `Array.prototype.flatMap()`：用于将数组的每个元素映射为一个新数组，然后将新数组扁平化为一维数组。

```js
const nestedArray = [1, 2, [3, 4], [5, 6]];

const flattenedArray = nestedArray.flatMap((num) => [num * 2]);

console.log(flattenedArray); // [2, 4, 6, 8, 10, 12]
```

## 对象方法

-   `Object.fromEntries()`：用于将一个键值对数组转换为一个对象。

```js
const entries = [
    ['name', 'John'],
    ['age', 30],
    ['city', 'New York'],
];

const obj = Object.fromEntries(entries);

console.log(obj); // { name: 'John', age: 30, city: 'New York' }
```

## 字符串方法

-   `String.prototype.trimStart()`：用于删除字符串开头的空白字符。

```js
const str = '   Hello, World   ';

const trimmedStr = str.trimStart();

console.log(trimmedStr); // 'Hello, World   '
```

-   `String.prototype.trimEnd()`：用于删除字符串末尾的空白字符。

```js
const str = '   Hello, World   ';

const trimmedStr = str.trimEnd();

console.log(trimmedStr); // '   Hello, World'
```

## 可选的 `catch` 绑定

在 `try...catch` 语句中，catch 语句的参数变为可选的，可以省略。

```js
try {
    // 执行可能抛出异常的代码
} catch {
    // 处理异常
}
```

## Symbol.prototype.description

`Symbol.prototype.description` 属性是一个只读属性，返回一个字符串，表示 Symbol 对象的描述。

```js
const mySymbol = Symbol('My Symbol');

console.log(mySymbol.description); // 'My Symbol'
```
