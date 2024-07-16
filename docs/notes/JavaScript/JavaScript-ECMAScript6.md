---
title: JavaScript-ECMAScript6
author: 耶温
createTime: 2024/05/11 15:05:45
permalink: /JavaScript/5z5x37f8/
---

# JavaScript-ECMAScript6

> ECMAScript 6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

- 一般来说 ECMAScript6，指的是 5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等。

ECMAScript6 语法的使用

- 对于 ES6 可以使用 Babel ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在老版本的浏览器执行。

## let const

var 与 let、const 区别

- `var`：定义变量会挂载到`window`上，变量会被提升
- `let`：定义变量不会挂载到`window`上，变量虽然会被提升，但是不允许访问，访问受限。不允许在同一个作用域中，重复声明变量。
- `const`：与`let`基本一致，但声明后的变量不允许再次赋值

```js
// 1.
{
  let name = "Yevin";
}
console.log(name); //报错  name is not defined

//2.
let name = "wenbo";
let name = "Yevin";
//报错 Identifier 'name' has already been declared

// 3.
function say(data) {
  let data = [];
  console.log(data);
}
say("data");
//报错 Identifier 'name' has already been declared
```

需要注意的是，虽然 const 定义的变量，不允许重新进行复制。但是对于符合类型的数据来说，const 只能保证变量指向的内存地址不会改变，不会影响指向的数据是不是可变的。可以通过`Object.freeze()`方法冻结对象。

> `Object.freeze()` 可以冻结一个对象，对象不能再被修改，添加和删除

## 解构赋值

> 解构赋值语法是一种 Javascript 表达式。通过解构赋值, 可以将属性/值从对象/数组中取出,赋值给其他变量。

- 如果赋值不成功会返回 undefined
- 1

数组解构

```js
//数组
var [a, b] = [1, 2, 3];
console.log(a, b); // 1 2

var [c, , b] = [4, 5, 6];
console.log(c, b); // 4 6

var arr = [1, 2, 3];
console.log(...arr); // 1 2 3
console.log([...arr]); // [1,2,3]
```

对象解构

```js
var { name, skill } = {
  name: "wenbo",
  age: 18,
  skill: "eat",
};
console.log(name, skill); //wenbo  eat

//无声明复制  需要加小括号
var name, skill;
({ name, skill } = {
  name: "wenbo",
  age: 18,
  skill: "eat",
});
console.log(name, skill); //wenbo  eat
```

`...`解构

> `...`语法，可以适用于迭代器对象

```js
let arr = [1, 2, 3];
console.log(...arr); // 1 2 3

let [a, ...b] = [1, 2, 3];
console.log(a, b); // 1   [2,3]

let set = new Set([1, 2, 3]);
console.log(...set); // 1 2 3
```
