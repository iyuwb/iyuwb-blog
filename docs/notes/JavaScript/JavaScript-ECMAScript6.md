---
title: JavaScript-ECMAScript6
author: 耶温
createTime: 2024/05/11 15:05:45
permalink: /JavaScript/5z5x37f8/
---
> 

# JavaScript-ECMAScript6

> ECMAScript（简称 ES）是一种由 ECMA 国际组织制定的脚本语言标准。它是 JavaScript 的基础，定义了语言的语法、类型、语句、关键字、保留字、操作符、内置对象等。ECMAScript 的目标是提供一种通用的脚本语言，使得不同的实现（如浏览器、服务器等）能够遵循相同的标准，从而实现跨平台的兼容性。

-   ECMAScript 6 (ES6 ，ES2015) - 2015
    -   引入了 let 和 const 关键字 以及 块级作用域。
    -   新增了箭头函数（arrow functions）。
    -   增加了模板字符串（template literals）。
    -   引入了默认参数、解构赋值和扩展运算符。
    -   引入了类（class）和模块（module）。
    -   新增了 Promise 对象。
    -   引入了生成器和迭代器。
    -   引入了 Map、Set、WeakMap 和 WeakSet 数据结构。
    -   引入了新的原始数据类型 Symbol。
    -   新增了一些方法。


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

1. 类的定义
```js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    sayHello() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}
```
2. 类的实例化
```js
const person = new Person('Alice', 25);
person.sayHello(); // Hello, my name is Alice and I am 25 years old.
```
3. 继承。ES6 类支持继承，可以通过 extends 关键字来实现：
```js
class Student extends Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }

    sayGrade() {
        console.log(`I am in grade ${this.grade}.`);
    }
}

const student = new Student('Bob', 20, 'A');
student.sayHello(); // Hello, my name is Bob and I am 20 years old.
student.sayGrade(); // I am in grade A.
```
4. 静态属性和方法。这些方法是属于类本身而不是类的实例。
```js
class MathUtils {
    static PI = 3.14159;

    static square(x) {
        return x * x;
    }
}

console.log(MathUtils.PI); // 输出: 3.14159
console.log(MathUtils.square(5)); // 输出: 25
```
5. 私有属性和方法。ES6 类本身并不支持访问修饰符（如 private 和 protected），但可以通过一些约定（如前缀 _）来表示私有属性。ES2022 引入了私有字段的概念，可以使用 # 前缀来定义私有属性和方法。
```js
class Person {
    #name;
    #age;

    constructor(name, age) {
        this.#name = name;
        this.#age = age;
    }

    #sayHello() {
        console.log(`Hello, my name is ${this.#name} and I am ${this.#age} years old.`);
    }

    sayHello() {
        this.#sayHello();
    }
}

const person = new Person('Alice', 25);
person.sayHello(); // Hello, my name is Alice and I am 25 years old.
// console.log(person.#name); // 报错: #name 是私有的属性
```




## 模块（import/export）

ECMAScript 模块（ES Modules）是 ECMAScript 6（ES6）引入的一种模块化机制，旨在使 JavaScript 代码的组织和管理更加清晰和高效。ES 模块允许开发者将代码分割成多个文件，并在这些文件之间进行导入和导出，从而实现代码的重用和维护。

**基本概念**

-   模块：每个模块都是一个独立的文件，默认情况下，模块中的变量和函数是私有的，外部无法直接访问。
-   导出: 使用 `export` 关键字将模块中的变量、函数或类导出，使其可以在其他模块中使用。
-   导入: 使用 `import` 关键字从其他模块中导入导出的内容。

**导出模块**

1. 默认导出。每个模块可以有一个默认导出，使用 export default 关键字。
```js
// 默认导出
export default function greet(name) {
    console.log(`Hello, ${name}`);
}
```
2. 命名导出。可以导出多个变量、函数或类，使用 `export` 关键字。
```js
// 命名导出
// myModule.js
export const name = 'Alice';
export const age = 25;

export function greet() {
    console.log(`Hello, ${name}`);
}
```

**导入模块**

1. 默认导入。使用 `import` 关键字导入默认导出的内容。
```js
// 默认导入
import greet from './myModule.js';

greet('Alice'); // Hello, Alice
```
2. 命名导入。使用 `import` 关键字导入命名导出的内容。
```js
// 命名导入
import { name, age, greet } from './myModule.js';

console.log(name); // Alice
console.log(age); // 25
greet(); // Hello, Alice
```
3. 重命名导入。使用 `as` 关键字重命名导入的变量、函数或类。
```js
// 重命名导入
import { name as myName, age as myAge } from './myModule.js';

console.log(myName); // Alice
console.log(myAge); // 25
```
4. 导入全部。使用 `*` 导入模块中的所有内容。
```js
// 导入全部
import * as myModule from './myModule.js';

console.log(myModule.name); // Alice
console.log(myModule.age); // 25
myModule.greet(); // Hello, Alice
```

**注意事项**
-   模块是惰性加载的: 模块在第一次被导入时执行，后续的导入不会再次执行模块代码。
-   模块的作用域: 每个模块都有自己的作用域，模块内的变量和函数不会污染全局作用域。
-   使用模块：在浏览器中使用 ES 模块时，需要在 `<script>` 标签中添加 `type="module"` 属性。


**动态导入**
可以使用 `import()` 函数动态导入模块，返回一个 Promise。
```js
async function loadModule() {
    const module = await import('./myModule.js');
    console.log(module.name); // Alice
}

loadModule();
```



## Promise

Promise 是 ECMAScript 6（ES6）引入的一种用于处理异步操作的对象。它代表一个可能在未来某个时间点完成或失败的操作，并允许你以更清晰的方式处理异步代码，避免了回调地狱（callback hell）的问题。

:::tip
关于 Promise 的详细内容可以查看：[JavaScript-Promise](/JavaScript/e6uvtokj/)
:::

## 生成器（generator）和迭代器（iterator）

在 ECMAScript 6（ES6）中，生成器（Generators）和迭代器（Iterators）是用于处理可迭代对象的重要概念。它们使得在 JavaScript 中处理序列数据变得更加灵活和强大。

**迭代器（Iterator）**
迭代器是一种对象，它定义了访问集合中元素的方式。迭代器必须实现一个 next() 方法，该方法返回一个对象，该对象包含两个属性：

-   `done`：一个布尔值，表示迭代是否完成。
-   `value`：迭代返回的值。

```js
function createIterator(array) {
    let index = 0;
    return {
        next: function() {
            if (index < array.length) {
                return { value: array[index++], done: false };
            } else {
                return { done: true };
            }
        }
    };
}
const iterator = createIterator([1, 2, 3]);

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { done: true }
```
**生成器（Generator）**

生成器是一种特殊类型的函数，可以暂停和恢复执行。生成器函数使用 function* 语法定义，并且可以使用 `yield` 关键字来返回值。每次调用生成器的 `next()` 方法时，生成器会执行到下一个 `yield` 表达式，并返回一个对象，包含 `value` 和 `done` 属性。

```js
function* createGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const generator = createGenerator();

console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: false }
console.log(generator.next()); // { done: true }
```




## Map 和 Set
ECMAScript 6（ES6）引入了 Set、Map、WeakSet 和 WeakMap 数据结构，它们提供了更灵活和高效的方式来存储和管理数据。

-   `Set` 是一种集合类型，允许存储唯一的值。它的主要特性是每个值只能出现一次。
-   `Map`  是一种键值对集合，允许使用任何类型的值作为键。它的主要特性是键的顺序是有序的。
-   `WeakSet` 是一种类似于 `Set` 的集合，但它只允许对象作为成员，并且对其成员的引用是弱引用。这意味着如果没有其他引用指向 `WeakSet` 中的对象，它们可以被垃圾回收。
-   `WeakMap` 是一种类似于 `Map` 的集合，但它的键是弱引用。这意味着如果没有其他引用指向 `WeakMap` 中的键，它们可以被垃圾回收。

:::tip
关于 JavaScript-Set、Map、WeakSet和WeakMap 的详细内容可以查看：[JavaScript-Set、Map、WeakSet和WeakMap](/JavaScript/aesr75yu/)
:::

## Symbol
在 ECMAScript 6（ES6）中，引入了 Symbol 数据类型，它是一种新的原始数据类型，用于创建唯一的标识符。Symbol 的主要用途是为对象的属性提供唯一性，避免属性名的冲突。

-   唯一性: Symbol 的主要用途是为对象的属性提供唯一性，避免属性名冲突。
-   隐私属性: 使用 Symbol 作为对象的属性名，可以创建隐私属性，因为 Symbol 不会被常规的属性枚举方法（如 `for...in `或 `Object.keys()`）列出。

**创建使用**
1. 创建 Symbol。可以使用 Symbol() 函数创建一个新的 Symbol。每个 Symbol 都是唯一的，即使它们的描述相同。
```js

const symbol1 = Symbol();
const symbol2 = Symbol('description');
const symbol3 = Symbol('description');

console.log(symbol1 === symbol2); // false
console.log(symbol2 === symbol3); // false
```
2. 使用 Symbol 作为属性名。可以使用 Symbol 作为对象的属性名，从而避免属性名的冲突。
```js
const symbol = Symbol('description');

const obj = {};
obj[symbol] = 'value';
console.log(obj[symbol]); // 'value'
```

**内置Symbol**

-   `Symbol.iterator`: 用于定义对象的默认迭代器，使对象可以使用 for...of 循环。
```js
const myIterable = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    }
};

for (const value of myIterable) {
    console.log(value); // 1, 2, 3
}
```
-   `Symbol.asyncIterator`: 用于创建一个异步迭代器对象，用于遍历异步可迭代对象。
```js
const asyncIterable = {
    async *[Symbol.asyncIterator]() {
        yield 1;
        yield 2;
        yield 3;
    }
};

(async () => {
    for await (const value of asyncIterable) {
        console.log(value); // 1, 2, 3
    }
})();
```
-   `Symbol.toStringTag`: 用于定义一个对象的字符串描述。
```js
const myObject = {
    [Symbol.toStringTag]: 'MyCustomObject'
};

console.log(Object.prototype.toString.call(myObject)); // '[object MyCustomObject]'
```
-   `Symbol.hasInstance`:  用于自定义 instanceof 操作符的行为。
```js
class MyClass {
    static [Symbol.hasInstance](instance) {
        return instance.customProperty === true;
    }
}

const obj = { customProperty: true };
console.log(obj instanceof MyClass); // true
```
-   `Symbol.isConcatSpreadable`: 用于指示一个对象是否可以被 `concat()` 方法展开。
```js
const myArray = [1, 2];
const myObject = {
    [Symbol.isConcatSpreadable]: true,
    0: 3,
    1: 4,
    length: 2
};

const newArray = myArray.concat(myObject); // [1, 2, 3, 4]
```
-   `Symbol.unscopables`:用于定义哪些属性不应被 with 语句访问。
```js
const myObject = {
    a: 1,
    b: 2,
    [Symbol.unscopables]: { b: true }
};

with (myObject) {
    console.log(a); // 1
    console.log(b); // ReferenceError: b is not defined
}
```



## 新增方法
ECMAScript 2015，引入了许多新的方法和功能，极大地增强了 JavaScript 的能力。

1. 数组方法

- **`Array.from()`**: 将类数组对象或可迭代对象转换为数组。
```js
const arrayLike = { 0: 'a', 1: 'b', length: 2 };
const arr = Array.from(arrayLike); // ['a', 'b']
```
- **`Array.of()`**: 创建一个新的数组实例，使用一组指定的元素。
```js
const arr = Array.of(1, 2, 3); // [1, 2, 3]
```
- **`Array.prototype.fill()`**: 用静态值填充数组的所有元素。
```js
const arr = new Array(3).fill(0); // [0, 0, 0]
```
- **`Array.prototype.find()`**: 返回数组中满足提供的测试函数的第一个元素的值。
```js
const numbers = [1, 2, 3, 4, 5];
const found = numbers.find(num => num > 3); // 4
```
- **`Array.prototype.findIndex()`**: 返回数组中满足提供的测试函数的第一个元素的索引。
```js
const index = numbers.findIndex(num => num > 3); // 3
```
- **`Array.prototype.copyWithin()`**:  在数组内部复制指定位置的元素到另一个位置。
```js
const arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3);
console.log(arr); // 输出: [4, 5, 3, 4, 5]
``` 

2. 字符串方法

- **`String.prototype.includes()`**: 判断一个字符串是否包含另一个字符串。
```js
const includes = str.includes('world'); // true
```
- **`String.prototype.startsWith()`**: 判断一个字符串是否以另一个字符串开头。
```js
const str = 'Hello, world!';
const starts = str.startsWith('Hello'); // true
```
- **`String.prototype.endsWith()`**: 判断一个字符串是否以另一个字符串结尾。
```js
const ends = str.endsWith('world!'); // true
```
- **`String.prototype.repeat()`**: 返回一个新字符串，表示将原字符串重复指定次数。
```js
const repeated = 'abc'.repeat(3); // 'abcabcabc'
```
3. 对象方法

- **`Object.assign()`**: 将所有可枚举的属性从一个或多个源对象复制到目标对象。
```js
const target = { a: 1 };
const source = { b: 2 };
const returnedTarget = Object.assign(target, source); // { a: 1, b: 2 }
```
- **`Object.is()`**: 判断两个值是否严格相等，类似于 ===，但处理 NaN 和 -0 的方式不同。
```js
Object.is(NaN, NaN); // true
Object.is(0, -0); // false
```
- **`Object.keys()`**: 返回一个数组，包含对象自身可枚举属性的名称。
```js
const obj = { a: 1, b: 2 };
console.log(Object.keys(obj)); // 输出: ['a', 'b']
```
- **`Object.values()`**: 返回一个由对象的自身可枚举属性值组成的数组。
```js
const values = Object.values(obj); // [1, 2]
```
- **`Object.freeze()`**:  冻结一个对象，使其不能被修改。
```js
const obj = { a: 1 };
Object.freeze(obj);
obj.a = 2; // 无效，obj.a 仍然是 1
```
- **`Object.seal()`**: 密封一个对象，防止添加新属性，但可以修改现有属性。
```js
const obj = { a: 1 };
Object.seal(obj);
obj.a = 2; // 有效
obj.b = 3; // 无效
```
- **`Object.getOwnPropertyNames()`**: 返回一个数组，包含对象自身的所有属性（包括非枚举属性）。
```js
const obj = Object.create({ b: 2 }, { a: { value: 1 } });
const propertyNames = Object.getOwnPropertyNames(obj); // ['a']
```

4. Number 方法
- **`Number.isFinite()`**: 判断一个值是否是有限的数字。
```js
Number.isFinite(2); // true
Number.isFinite(Infinity); // false
```
- **`Number.isNaN()`**: 判断一个值是否是 NaN。
```js
Number.isNaN(NaN); // true
Number.isNaN('NaN'); // false
```
- **`Number.isInteger()`**: 判断一个值是否是整数。
```js
Number.isInteger(4); // true
Number.isInteger(4.5); // false
```
- **`Number.isSafeInteger()`**: 判断一个值是否是安全整数。
```js
Number.isSafeInteger(10); // true
Number.isSafeInteger(Math.pow(2, 53)); // false
```




