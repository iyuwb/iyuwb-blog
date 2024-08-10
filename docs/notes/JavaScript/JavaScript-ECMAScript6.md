---
title: JavaScript-ECMAScript6
author: 耶温
createTime: 2024/05/11 15:05:45
permalink: /JavaScript/5z5x37f8/
---

# JavaScript-ECMAScript6

ECMAScript（简称 ES）是一种由 ECMA 国际组织制定的脚本语言标准。它是 JavaScript 的基础，定义了语言的语法、类型、语句、关键字、保留字、操作符、内置对象等。ECMAScript 的目标是提供一种通用的脚本语言，使得不同的实现（如浏览器、服务器等）能够遵循相同的标准，从而实现跨平台的兼容性。

ES6 (2015)：又称 ECMAScript 2015，引入了大量新特性，如类、模块、箭头函数、Promise、解构赋值等。

## let 与 const

***let***：用于声明块级作用域的变量，避免了使用 var 声明变量时可能出现的作用域问题。

1. 块级作用域。`let` 声明的变量具有块级作用域，即它只在其所在的代码块内有效。

```js
{
    let x = 10;
    console.log(x); // 10
}
console.log(x); // ReferenceError: x is not defined
```

2. 不允许重复声明。在同一作用域内，不能使用 `let` 重复声明同一个变量。
```js
let y = 20;
let y = 30; // SyntaxError: Identifier 'y' has already been declared
```

3. 提升（Hoisting）。`let` 声明的变量会被提升，但在声明之前访问会导致 `ReferenceError`，这被称为“暂时性死区”（Temporal Dead Zone）。
```js
console.log(z); // ReferenceError: Cannot access 'z' before initialization
let z = 30;
```

***const***：用于声明常量，常量的值不能被重新赋值，且同样具有块级作用域。

1. 块级作用域。与 let 一样，const 也具有块级作用域。
```js
{
    const a = 5;
    console.log(a); // 5
}
console.log(a); // ReferenceError: a is not defined
```
2. 常量声明。const 用于声明常量，声明后不能重新赋值。
```js
const b = 10;
// b = 20; // TypeError: Assignment to constant variable.
```
3. 对象和数组的可变性。使用 const 声明的对象或数组的引用不能改变，但其内容是可变的。
```js
const obj = { name: 'Alice' };
obj.name = 'Bob'; // 允许，内容可变
console.log(obj.name); // Bob

// obj = {}; // TypeError: Assignment to constant variable.
```
4. 不允许重复声明。在同一作用域内，不能使用 const 重复声明同一个变量。
```js
const c = 15;
const c = 25; // SyntaxError: Identifier 'c' has already been declared
```

需要注意的是，虽然 const 定义的变量，不允许重新进行复制。但是对于复杂类型的数据来说，const 只能保证变量指向的内存地址不会改变，不会影响指向的数据是不是可变的。可以通过`Object.freeze()`方法冻结对象。

> `Object.freeze()` 可以冻结一个对象，对象不能再被修改，添加和删除

## 箭头函数

箭头函数（Arrow Functions）是 ECMAScript 6（ES6）引入的一种新的函数表达式语法。它提供了一种更简洁的方式来定义函数，并且在处理 this 关键字时具有不同的行为。

***基本语法***
```js
const functionName = (parameters) => {
    // function body
};
```

- 如果只有一个参数，可以省略圆括号。
- 如果函数体只有一条语句，可以省略大括号和 return 关键字。

1. 基本用法
```js
const sum = (a, b) => a + b;
console.log(sum(1, 2)); // 3
```
2. 无参数
```js
const greet = () => 'Hello, World!';
console.log(greet()); // Hello, World!
```
3. 单个参数
```js
const square = x => x * x;
console.log(square(4)); // 16
```

4. 多行函数体
```js
const multiply = (a, b) => {
    const result = a * b;
    return result;
};
console.log(multiply(2, 5)); // 10
```

5. 数组方法中
```js
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8]
```

***应用场景***
1. 数组处理。箭头函数常用于数组的高阶函数，如 map、filter 和 reduce，使代码更加简洁。
```js
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8]

const even = numbers.filter(num => num % 2 === 0);
console.log(even); // [2, 4]

const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 10
```
2. 事件处理。在处理 DOM 事件时，箭头函数可以避免 this 的绑定问题。
```js
const button = document.getElementById('myButton');
button.addEventListener('click', () => {
    console.log('Button clicked');
});
```
3. 简化回调函数。箭头函数可以简化回调函数的定义，使代码更加简洁。
```js
const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 35 }
];

users.forEach(user => {
    console.log(`${user.name} is ${user.age} years old.`);
});
```

***注意事项***
1. 箭头函数不绑定 this。箭头函数中的 this 指向箭头函数定义时的上下文，而不是执行时的上下文。
```js

const person = {
    name: 'John',
    age: 30,
    greet: function() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
};

const greet = () => {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

person.greet(); // Hello, my name is John and I am 30 years old.
greet(); // Hello, my name is undefined and I am undefined years old.
```
2. 箭头函数不支持 new 操作符。箭头函数不能作为构造函数使用，也不能使用 new.target 属性。
```js
const Person = (name, age) => {
    this.name = name;
    this.age = age;
};

const john = new Person('John', 30); // TypeError: Person is not a constructor
```
3. 箭头函数不支持 arguments 对象。箭头函数没有自己的 arguments 对象，而是使用函数定义时的上下文中的 arguments 对象。
```js
const sum = (a, b) => {
    console.log(arguments); // ReferenceError: arguments is not defined
    return a + b;
};
```
4. 箭头函数不支持 yield 关键字。箭头函数不能包含 yield 关键字，也不能作为生成器函数使用。
```js
const generator = () => {
    yield 1;
    yield 2;
};

const gen = generator();
gen.next(); // TypeError: generator is not a generator function
```

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
