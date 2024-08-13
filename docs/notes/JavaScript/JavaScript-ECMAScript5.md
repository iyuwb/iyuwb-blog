---
title: JavaScript-ECMAScript5
author: 耶温
createTime: 2024/08/12 22:06:27
permalink: /JavaScript/0suf2nad/
---
> ECMAScript（简称 ES）是一种由 ECMA 国际组织制定的脚本语言标准。它是 JavaScript 的基础，定义了语言的语法、类型、语句、关键字、保留字、操作符、内置对象等。ECMAScript 的目标是提供一种通用的脚本语言，使得不同的实现（如浏览器、服务器等）能够遵循相同的标准，从而实现跨平台的兼容性。

-   ECMAScript 5 (ES5) - 2016
    -   引入了严格模式（"use strict"）
    -   新增了 JSON 支持
    -   增加了数组方法（如 forEach、map、filter、reduce 等）
    -   引入了 `Object.create`、`Object.defineProperty` 等方法

## 严格模式

严格模式（Strict Mode）是 ECMAScript 5（ES5）引入的一种在 JavaScript 中运行的更严格的解析和执行模式。通过启用严格模式，开发者可以编写更安全、更高效的代码。严格模式的主要目的是消除 JavaScript 中一些不良的语言特性，避免潜在的错误，并提高代码的可维护性。

1. 启用严格模式。严格模式可以通过在 JavaScript 文件的开头或函数的开头添加 "use strict"; 来启用。
```js
"use strict";
function myFunction() {
    // 在这个函数中启用严格模式
}
```
2. 严格模式特性

-   禁止使用未声明的变量
```js
"use strict";
x = 10; // ReferenceError: x is not defined
```
-   禁止删除变量、函数和参数
```js
"use strict";
var x = 10;
delete x; // SyntaxError: Delete of an unqualified identifier in strict mode.
```
3. 禁止使用 this 指向全局对象
```js
"use strict";
this.x = 10; // TypeError: Cannot set property 'x' of #<Object>
```
4. 禁止重复声明变量
```js
"use strict";
var x = 10;
var x = 20; // SyntaxError: Identifier 'x' has already been declared
```
5. 禁止使用 `with` 语句
```js
"use strict";
with (obj) {
    x = 10;
} // SyntaxError: Strict mode code may not include a with statement
```
6. 禁止使用 `eval()` 函数
```js
"use strict";
eval("var x = 10"); // SyntaxError: Strict mode code may not include eval()
```
7. 禁止使用 `arguments.callee` 和 `arguments.caller`
```js
"use strict";
function myFunction() {
    arguments.callee(); // SyntaxError: Strict mode code may not include arguments.callee
    arguments.caller; // SyntaxError: Strict mode code may not include arguments.caller
}
```




## 数组方法

- **`Array.prototype.forEach(callback)`**：对数组的每个元素执行一次提供的函数。
  ```javascript
  const arr = [1, 2, 3];
  arr.forEach((element) => {
      console.log(element); // 输出 1, 2, 3
  });
  ```

- **`Array.prototype.map(callback)`**：创建一个新数组，包含调用提供的函数处理每个元素后的结果。
  ```javascript
  const arr = [1, 2, 3];
  const doubled = arr.map((element) => element * 2); // [2, 4, 6]
  ```

- **`Array.prototype.filter(callback)`**：创建一个新数组，包含所有通过测试的元素。
  ```javascript
  const arr = [1, 2, 3, 4];
  const evens = arr.filter((element) => element % 2 === 0); // [2, 4]
  ```

- **`Array.prototype.reduce(callback, initialValue)`**：对数组中的每个元素执行一个 reducer 函数，最终计算出一个单一的值。
  ```javascript
  const arr = [1, 2, 3];
  const sum = arr.reduce((accumulator, current) => accumulator + current, 0); // 6
  ```

- **`Array.prototype.every(callback)`**：测试数组中的所有元素是否都满足提供的测试函数。
  ```javascript
  const arr = [2, 4, 6];
  const allEven = arr.every((element) => element % 2 === 0); // true
  ```

- **`Array.prototype.some(callback)`**：测试数组中是否至少有一个元素满足提供的测试函数。
  ```javascript
  const arr = [1, 2, 3];
  const hasEven = arr.some((element) => element % 2 === 0); // true
  ```

- **`Array.prototype.indexOf(searchElement, fromIndex)`**：返回数组中首次出现的指定元素的索引，如果未找到则返回 -1。
  ```javascript
  const arr = [1, 2, 3];
  const index = arr.indexOf(2); // 1
  ```

- **`Array.prototype.lastIndexOf(searchElement, fromIndex)`**：返回数组中最后一次出现的指定元素的索引，如果未找到则返回 -1。
  ```javascript
  const arr = [1, 2, 3, 2];
  const lastIndex = arr.lastIndexOf(2); // 3
  ```

## 对象方法

- **`Object.create(proto, propertiesObject)`**：创建一个新对象，使用指定的原型对象和可选的属性。
  ```javascript
  const proto = { greet: function() { console.log("Hello!"); } };
  const obj = Object.create(proto);
  obj.greet(); // "Hello!"
  ```

- **`Object.defineProperty(obj, prop, descriptor)`**：在对象上定义新属性或修改现有属性的特性。
  ```javascript
  const obj = {};
  Object.defineProperty(obj, 'name', {
      value: 'Alice',
      writable: false
  });
  obj.name = 'Bob'; // 不会改变，因为 writable 为 false
  ```

- **`Object.defineProperties(obj, props)`**：在对象上定义多个新属性或修改现有属性的特性。
  ```javascript
  const obj = {};
  Object.defineProperties(obj, {
      'name': { value: 'Alice', writable: false },
      'age': { value: 30, writable: true }
  });
  ```

- **`Object.keys(obj)`**：返回一个数组，包含对象自身的所有可枚举属性的名称。
  ```javascript
  const obj = { a: 1, b: 2 };
  const keys = Object.keys(obj); // ['a', 'b']
  ```


## 字符串方法

- **`String.prototype.trim()`**：去除字符串两端的空白字符。
  ```javascript
  const str = "   Hello, World!   ";
  const trimmed = str.trim(); // "Hello, World!"
  ```

## JSON 方法

- **`JSON.stringify(value, replacer, space)`**：将 JavaScript 值转换为 JSON 字符串。
  ```javascript
  const obj = { name: "Alice", age: 30 };
  const jsonString = JSON.stringify(obj); // '{"name":"Alice","age":30}'
  ```

- **`JSON.parse(text, reviver)`**：将 JSON 字符串解析为 JavaScript 值。
  ```javascript
  const jsonString = '{"name":"Alice","age":30}';
  const obj = JSON.parse(jsonString); // { name: "Alice", age: 30 }
  ```

