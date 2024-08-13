---
title: JavaScript-ECMAScript11
author: 耶温
createTime: 2024/08/13 16:20:27
permalink: /JavaScript/g43aac6l/
---
> ECMAScript（简称 ES）是一种由 ECMA 国际组织制定的脚本语言标准。它是 JavaScript 的基础，定义了语言的语法、类型、语句、关键字、保留字、操作符、内置对象等。ECMAScript 的目标是提供一种通用的脚本语言，使得不同的实现（如浏览器、服务器等）能够遵循相同的标准，从而实现跨平台的兼容性。

-   ECMAScript 11 (ES2020) - 2020
   
    -   引入了 `BigInt` 类型
    -   新增了 `Promise.allSettled()` 方法
    -   支持动态导入（`import()`）
    -   引入了` Nullish Coalescing Operator (??)` 和 `Optional Chaining (?.)`
    -   `String.prototype.matchAll()`

## BigInt

`BigInt` 是一种新的原始数据类型，用于表示任意精度的整数。它可以表示的整数范围比 `Number` 类型大得多。

```js
const maxSafeInteger = Number.MAX_SAFE_INTEGER;
const maxSafeIntegerPlusOne = maxSafeInteger + 1;

console.log(maxSafeInteger); // 9007199254740991
console.log(maxSafeIntegerPlusOne); // 9007199254740992

const bigIntMaxSafeInteger = BigInt(maxSafeInteger);
const bigIntMaxSafeIntegerPlusOne = bigIntMaxSafeInteger + 1n;

console.log(bigIntMaxSafeInteger); // 9007199254740991n
console.log(bigIntMaxSafeIntegerPlusOne); // 9007199254740992n
```

## Promise.allSettled()

`Promise.allSettled()` 方法用于等待一组 Promise 对象全部完成（不管成功或失败），并返回一个包含所有 Promise 结果的数组。

```js
const promise1 = Promise.resolve(1);
const promise2 = Promise.reject(new Error('Error'));
const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(3);
    }, 1000);
});

Promise.allSettled([promise1, promise2, promise3])
    .then((results) => {
        console.log(results); // [{status: 'fulfilled', value: 1}, {status: 'rejected', reason: Error: Error}, {status: 'fulfilled', value: 3}]
    });
```
## 动态导入

动态导入（`import()`）允许你在运行时动态加载模块。它返回一个 Promise，解析为导入的模块。

```js
import('./myModule.js')
    .then((module) => {
        console.log(module); // 导入的模块对象
        module.default();  // 使用导入的模块
    })
    .catch((error) => {
        console.error(error); // 导入模块失败时的错误对象
    });
```

## 操作符`??`

`??` 操作符用于在左侧操作数为 `null` 或 `undefined` 时返回右侧操作数。

```js
const myVar = null;
const myVar2 = myVar ?? 'default value';

console.log(myVar2); // 'default value'
```

## 操作符`?.`

`?.` 操作符用于访问对象的属性或方法，但当左侧操作数为 `null` 或 `undefined` 时，不会抛出错误。

```js
const obj = { a: { b: { c: 42 } } };
const value = obj.a?.b?.c; // 42
const missingValue = obj.a?.b?.d; // undefined
```

## 字符串方法

-   `String.prototype.matchAll()`：用于在字符串中匹配所有正则表达式。

```js
const regex = /[a-z]+/g;
const str = 'abc xyz abc';
const matches = str.matchAll(regex);

for (const match of matches) {
  console.log(match);
  // ['abc'], ['xyz'], ['abc']
}
```


## globalThis

`globalThis` 是一个全局对象，它可以被用作 `this` 的引用。在浏览器中，它指向 `window` 对象，而在 Node.js 中，它指向 `global` 对象。

```js
console.log(this === globalThis); // true
```





