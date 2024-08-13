---
title: JavaScript-ECMAScript1-4
author: 耶温
createTime: 2024/08/12 21:44:52
permalink: /JavaScript/wgrjgzkq/
---

## ECMAScript1-4历程

> ECMAScript（简称 ES）是一种由 ECMA 国际组织制定的脚本语言标准。它是 JavaScript 的基础，定义了语言的语法、类型、语句、关键字、保留字、操作符、内置对象等。ECMAScript 的目标是提供一种通用的脚本语言，使得不同的实现（如浏览器、服务器等）能够遵循相同的标准，从而实现跨平台的兼容性。


1. ECMAScript 1 (ES1) - 1997
    -   首个正式的 JavaScript 标准。
2. ECMAScript 2 (ES2) - 1998
    -   主要是对 ES1 的一些小修正和编辑改进，没有引入新的特性。
3. ECMAScript 3 (ES3) - 1999
    -   引入了正则表达式。
    -   增加了 `try/catch` 语句。
    -   新增了 `Array`、`String` 和 `Number` 对象的一些方法。
    -   支持更好的字符串处理和错误处理。
4. ECMAScript 4 (ES4) - 2008 被提议
    -   由于复杂性和争议，ES4 最终未发布。它的许多特性在后来的版本中以不同形式出现。


## ECMAScript 3

### 正则表达式

ES3引入了对正则表达式的支持，使得字符串处理变得更加灵活和强大。开发者可以使用正则表达式进行模式匹配、搜索和替换操作。

:::tip
关于 正则表达式 的详细内容可以查看：[JavaScript-正则表达式](/JavaScript/yclbjiod/)
:::

### 异常处理

ES3增加了 `try、catch` 语句，提供了更好的错误处理机制。和它们一起使用的还有 ES8 新增的 `finally` 语句。

```js
try {
    // 可能抛出异常的代码
} catch (e) {
    // 处理异常的代码
} finally {
    // 无论是否发生异常，都会执行的代码
}
```

-   `try` 语句用于定义一个代码块，该代码块可能会抛出异常。
-   `catch` 用于处理 try 块中抛出的异常。catch 块可以接收一个参数（通常命名为 e 或 error），该参数包含异常对象
-   `finally`（在 ES3 中不支持，但在后续ES8版本中引入）：可以用于执行清理代码，无论是否发生异常，finally 块中的代码都会执行。


在 ES3 中，异常处理的能力相对简单，主要依赖于 `try...catch` 结构。

### 数组方法

ECMAScript 3（ES3）引入了一些新的数组和字符串方法，增强了 JavaScript 的功能。以下是 ES3 中增加的一些重要数组和字符串方法：

1. **`Array.prototype.push()`**：将一个或多个元素添加到数组的末尾，并返回新数组的长度。
```javascript
let arr = [1, 2, 3];
arr.push(4); // arr 变为 [1, 2, 3, 4]
```

2. **`Array.prototype.pop()`**：删除数组的最后一个元素，并返回该元素。
```javascript
let arr = [1, 2, 3];
let last = arr.pop(); // last 为 3，arr 变为 [1, 2]
```

3. **`Array.prototype.shift()`**：删除数组的第一个元素，并返回该元素。
```javascript
let arr = [1, 2, 3];
let first = arr.shift(); // first 为 1，arr 变为 [2, 3]
```

4. **`Array.prototype.unshift()`**：将一个或多个元素添加到数组的开头，并返回新数组的长度。
```javascript
let arr = [1, 2, 3];
arr.unshift(0); // arr 变为 [0, 1, 2, 3]
```

5. **`Array.prototype.slice()`**：返回数组的一个片段，包含从开始索引到结束索引（不包括结束索引）的元素。
```javascript
let arr = [1, 2, 3, 4];
let newArr = arr.slice(1, 3); // newArr 为 [2, 3]
```

6. **`Array.prototype.splice()`**：改变数组的内容，通过添加、删除或替换现有元素。
```javascript
let arr = [1, 2, 3, 4];
arr.splice(1, 2, 5); // arr 变为 [1, 5, 4]
```

### 字符串方法

1. **`String.prototype.charAt()`**：返回指定位置的字符。
```javascript
let str = "hello";
let char = str.charAt(1); // char 为 "e"
```

2. **`String.prototype.indexOf()`**：返回指定子字符串在字符串中首次出现的位置，如果未找到则返回 -1。
```javascript
let str = "hello";
let index = str.indexOf("e"); // index 为 1
```

3. **`String.prototype.lastIndexOf()`**：返回指定子字符串在字符串中最后一次出现的位置，如果未找到则返回 -1。
```javascript
let str = "hello";
let lastIndex = str.lastIndexOf("l"); // lastIndex 为 3
```

4. **`String.prototype.split()`**：将字符串分割成数组。
```javascript
let str = "a,b,c";
let arr = str.split(","); // arr 为 ["a", "b", "c"]
```

### 对象操作

在 ECMAScript 3（ES3）中，对象支持得到了显著的改进，使得 JavaScript 的对象处理更加灵活和强大。以下是一些关键的改进和特性：

1. **对象字面量**：ES3 允许使用对象字面量语法来创建对象，这种方式简洁明了，易于使用。
```javascript
let person = {
    name: "Alice",
    age: 30,
    greet: function() {
        console.log("Hello, " + this.name);
    }
};
```

2. **原型链**：ES3 明确了原型链的概念，允许对象通过其原型继承属性和方法。这使得对象的创建和继承变得更加灵活。
```javascript
function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function() {
    console.log(this.name + " makes a noise.");
};

let dog = new Animal("Dog");
dog.speak(); // "Dog makes a noise."
```

3. **`Object` 构造函数**：ES3 引入了 `Object` 构造函数，允许开发者创建对象并动态添加属性。
```javascript
let obj = new Object();
obj.property1 = "value1";
```

4. **`Object.prototype` 扩展**：ES3 允许开发者扩展 `Object.prototype`，从而为所有对象添加通用的方法和属性。
```javascript
Object.prototype.describe = function() {
    return JSON.stringify(this);
};
let obj = { name: "Alice" };
console.log(obj.describe()); // '{"name":"Alice"}'
```

5. **`hasOwnProperty` 方法**：ES3 引入了 `hasOwnProperty` 方法，用于检查对象是否具有特定的属性，而不是从原型链中继承的属性。这有助于避免属性冲突。
```javascript
let obj = { a: 1 };
console.log(obj.hasOwnProperty("a")); // true
console.log(obj.hasOwnProperty("toString")); // false
```



### 改进类型系统

在 ECMAScript 3（ES3）中，虽然没有引入全新的类型系统，但对 JavaScript 的类型处理进行了改进和增强。以下是一些与类型系统相关的关键点：

1. **基本数据类型**：JavaScript 中的基本数据类型包括 `Undefined`、`Null`、`Boolean`、`Number`、`String` 和 `Object`。ES3 确保了这些基本类型的行为一致性，并提供了更好的类型检查机制。

2. **类型转换**：ES3 对隐式和显式类型转换进行了更清晰的定义。例如，字符串和数字之间的转换在 ES3 中得到了更好的处理，开发者可以使用 `Number()`、`String()` 和 `Boolean()` 函数进行显式转换。

3. **`typeof` 操作符**：ES3 引入了 `typeof` 操作符，用于检测变量的类型。它返回一个表示变量类型的字符串，例如：
```javascript
typeof "hello"; // "string"
typeof 42;      // "number"
typeof true;    // "boolean"
typeof {};      // "object"
typeof null;    // "object" (这是一个历史遗留问题)
```

4. **对象和数组的类型**：ES3 明确了对象和数组的类型，允许开发者更好地理解和使用这些数据结构。数组在 ES3 中被视为对象的一种特殊形式，具有特定的属性和方法。
