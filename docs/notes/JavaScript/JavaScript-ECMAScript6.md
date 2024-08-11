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
## 模板字符串

模板字符串（Template Literals）是 ECMAScript 6（ES6）引入的一种新的字符串表示法，它使用反引号（`）来定义字符串，提供了更强大的功能。


1. 多行字符串。传统的字符串在 JavaScript 中只能使用单引号（'）或双引号（"），而模板字符串可以轻松地创建多行字符串。
```js
const multiLineString = `这是一个
多行字符串`;
console.log(multiLineString);
```
2. 字符串插值。模板字符串支持字符串插值，通过 `${}` 语法将变量或表达式的值插入到字符串中。

```js
const name = 'Alice';
const greeting = `Hello, ${name}!`;
console.log(greeting); // Hello, Alice!
```
3. 嵌套表达式。模板字符串支持嵌套表达式，通过 `${}` 语法将表达式的值插入到字符串中。
```js
const a = 5;
const b = 10;
const result = `5 + 10 = ${a + b}`;
console.log(result); // 输出: 5 + 10 = 15
```
4. 标签模板。标签模板（Tagged Templates）允许你定义一个函数来处理模板字符串。这个函数可以接收模板字符串的内容和插值部分，从而实现更复杂的字符串处理。
```js
function tag(strings,...values) {
    let result = '';
    for (let i = 0; i < strings.length; i++) {
        result += strings[i];
        if (i < values.length) {
            result += values[i];
        }
    }
    return result;
}

const result = tag`Hello, ${name}!`;
console.log(result); // Hello, Alice!
```
5. 反斜杠转义。在模板字符串中，反斜杠（\）的使用更为简单，通常不需要像传统字符串那样频繁地进行转义。例如，使用反引号时，可以直接包含单引号和双引号。
```js
const quote = `他说: "你好，世界！"`;
console.log(quote); // 输出: 他说: "你好，世界！"
```
6. 模板字符串中使用单引号。在模板字符串中使用单引号，可以避免在字符串中使用反斜杠进行转义。
```js
const name = 'Alice';
const greeting = `Hello, \'${name}\'!`;
console.log(greeting); // Hello, 'Alice'!
```
## 解构赋值

解构赋值语法是一种 Javascript 表达式。通过解构赋值, 可以将属性/值从对象/数组中取出,赋值给其他变量。



1. 数组解构赋值。数组解构赋值可以将数组中的元素赋值给变量。
```js
const numbers = [1, 2, 3, 4, 5];
const [first, second,...rest] = numbers;
console.log(first, second, rest); // 1 2 [3, 4, 5]
```
解构时忽略某些数组元素。
```js
const array = [1, 2, 3];
const [a, , c] = array;

console.log(a); // 输出: 1
console.log(c); // 输出: 3
```
解构时给变量设置默认值。
```js
const array = [1];
const [a, b = 2] = array;

console.log(a); // 输出: 1
console.log(b); // 输出: 2
```


2. 对象解构赋值。对象解构赋值可以将对象中的属性赋值给变量。
```js
const person = {
    name: 'Alice',
    age: 25
};
const { name, age } = person;
console.log(name, age); // Alice 25
```
解构时重命名变量。
```js
const person = {
    name: 'Alice',
    age: 25
};
const { name: myName, age: myAge } = person;
console.log(myName, myAge); // Alice 25
```

3. 嵌套解构赋值。嵌套解构赋值可以将嵌套结构中的元素赋值给变量。
```js
const person = {
    name: 'Alice',
    age: 25,
    address: {
        city: 'New York',
        country: 'USA'
    }
};
const { address: { city } } = person;
console.log(city); // New York
```
4. 函数参数解构。在函数参数中使用解构赋值，可以将数组或对象中的元素赋值给函数的参数。
```js
function greet({ name = 'Guest', age = 0 }) {
    console.log(`Hello, ${name}! You are ${age} years old.`);
}

greet({ name: 'Bob', age: 30 }); // Hello, Bob! You are 30 years old.
greet({ name: 'Charlie' }); // Hello, Charlie! You are 0 years old.
```

总的来说，解构赋值提供了一种简洁的方式来提取数组和对象中的值，减少了代码的冗余，提高了可读性。它在现代 JavaScript 开发中得到了广泛的应用，尤其是在处理复杂数据结构时。

## 扩展运算符

扩展运算符（Spread Operator）是 ECMAScript 6（ES6）引入的一种语法，使用三个点（...）表示。它可以将可迭代对象（如数组、字符串、对象等）展开为个别元素或属性。

1. 数组的扩展

-   合并数组。使用扩展运算符可以将多个数组合并为一个数组。
-   复制数组。使用扩展运算符可以复制一个数组。
-   添加元素。使用扩展运算符可以向数组中添加元素。

```js
// 合并数组
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const mergedArray = [...array1,...array2];
console.log(mergedArray); // [1, 2, 3, 4, 5, 6]

// 复制数组
const array3 = [...array1];
console.log(array3); // [1, 2, 3]

// 添加元素
const array4 = [...array1, 4];
console.log(array4); // [1, 2, 3, 4]
```
2. 对象的扩展

-   复制对象。使用扩展运算符可以复制一个对象。
-   添加或覆盖属性。使用扩展运算符可以向对象中添加或覆盖属性。

```js
// 复制对象
const object1 = { name: 'Alice', age: 25 };
const object2 = {...object1};
console.log(object2); // { name: 'Alice', age: 25 }

// 添加或覆盖属性
const object3 = {...object1, address: 'New York'};
console.log(object3); // { name: 'Alice', age: 25, address: 'New York' }
```
3. 字符串的扩展

扩展运算符可以将字符串转换为数组。

```js
// 分割字符串
const str = 'Hello, World!';
const chars = [...str];
console.log(chars); // ['H', 'e', 'l', 'l', 'o', ',','', 'W', 'o', 'r', 'l', 'd', '!']
```
4. 函数参数的扩展
扩展运算符可以用于函数调用，将数组元素作为单独的参数传递。

```js
const numbers = [1, 2, 3];
const sum = (a, b, c) => a + b + c;

console.log(sum(...numbers)); // 输出: 6
```
5. 结合剩余参数

扩展运算符与剩余参数（Rest Parameters）相对，后者用于将函数的多个参数收集到一个数组中。

```js
const sum = (...args) => {
    return args.reduce((acc, curr) => acc + curr, 0);
};

console.log(sum(1, 2, 3, 4)); // 输出: 10
```
总体来说，扩展运算符是一种非常有用的语法，可以简化代码，提高可读性和可维护性。它在现代 JavaScript 开发中广泛应用，特别是在处理数组、对象、字符串和函数参数时。


## 类（Class）

ECMAScript 6（ES6）引入了类（Class）的概念，使得 JavaScript 的面向对象编程更加清晰和易于使用。类是构造函数的语法糖，提供了一种更直观的方式来创建对象和处理继承。

***基本语法***
```js
class ClassName {
    constructor(parameters) {
        // 构造函数
    }

    methodName() {
        // 方法
    }
}
```

## 模块（import/export）

## Promise

## 生成器（generator）和迭代器（iterator）

## Map 和 Set

## Symbol

## 新增方法
ECMAScript 2015，引入了许多新的方法和功能，极大地增强了 JavaScript 的能力。



1. 数组方法

- **`Array.from()`**: 将类数组对象或可迭代对象转换为数组。
- **`Array.of()`**: 创建一个新的数组实例，使用一组指定的元素。
- **`Array.prototype.copyWithin()`**: 在数组内部复制指定位置的元素到另一个位置。
- **`Array.prototype.fill()`**: 用静态值填充数组的所有元素。
- **`Array.prototype.find()`**: 返回数组中满足提供的测试函数的第一个元素的值。
- **`Array.prototype.findIndex()`**: 返回数组中满足提供的测试函数的第一个元素的索引。
- **`Array.prototype.entries()`**: 返回一个新的数组迭代器对象，包含数组中每个索引的键值对。
- **`Array.prototype.keys()`**: 返回一个新的数组迭代器对象，包含数组中每个索引的键。
- **`Array.prototype.values()`**: 返回一个新的数组迭代器对象，包含数组中每个索引的值。
- **`Array.prototype.includes()`**: 判断数组是否包含某个值。
- **`Array.prototype.flat()`**: 将嵌套数组“拉平”到指定深度。
- **`Array.prototype.flatMap()`**: 先映射每个元素，然后将结果压缩成一个新数组。

2. 字符串方法

- **`String.prototype.includes()`**: 判断一个字符串是否包含另一个字符串。
- **`String.prototype.startsWith()`**: 判断一个字符串是否以另一个字符串开头。
- **`String.prototype.endsWith()`**: 判断一个字符串是否以另一个字符串结尾。
- **`String.prototype.repeat()`**: 返回一个新字符串，表示将原字符串重复指定次数。
- **`String.prototype.padStart()`**: 在当前字符串的开头填充指定的字符。
- **`String.prototype.padEnd()`**: 在当前字符串的结尾填充指定的字符。
- **`String.prototype.trimStart()`**: 去除字符串开头的空白字符。
- **`String.prototype.trimEnd()`**: 去除字符串结尾的空白字符。
- **`String.prototype.matchAll()`**: 返回一个包含所有匹配结果的迭代器。

3. 对象方法

- **`Object.assign()`**: 将所有可枚举的属性从一个或多个源对象复制到目标对象。
- **`Object.is()`**: 判断两个值是否是相同的值。
- **`Object.keys()`**: 返回一个由对象的自身可枚举属性名组成的数组。
- **`Object.values()`**: 返回一个由对象的自身可枚举属性值组成的数组。
- **`Object.entries()`**: 返回一个由对象的自身可枚举属性的键值对数组。
- **`Object.getOwnPropertyDescriptors()`**: 返回一个对象的所有自身属性的描述符。

4. 数学方法

- **`Math.sign()`**: 返回一个数的符号，正数返回 1，负数返回 -1，零返回 0。
- **`Math.trunc()`**: 返回一个数的整数部分。
- **`Math.cbrt()`**: 返回一个数的立方根。
- **`Math.clz32()`**: 返回一个数的 32 位无符号整数的前导零的数量。
- **`Math.imul()`**: 返回两个数的整数乘积。
- **`Math.fround()`**: 返回一个数的单精度浮点数表示。
- **`Math.hypot()`**: 返回所有参数的平方和的平方根。

5. 其他方法

- **`Number.isNaN()`**: 判断一个值是否是 NaN。
- **`Number.isInteger()`**: 判断一个值是否是整数。
- **`Number.isSafeInteger()`**: 判断一个值是否是安全整数。
- **`Number.parseInt()`**: 解析一个字符串并返回一个整数。
- **`Number.parseFloat()`**: 解析一个字符串并返回一个浮点数。
- **`JSON.stringify()`**: 将 JavaScript 值转换为 JSON 字符串。
- **`JSON.parse()`**: 将 JSON 字符串转换为 JavaScript 值。

6. 迭代器和生成器

- **`Generator`**: 使用 `function*` 定义生成器函数，支持 `yield` 关键字。
- **`Iterator`**: 通过 `Symbol.iterator` 定义可迭代对象。

