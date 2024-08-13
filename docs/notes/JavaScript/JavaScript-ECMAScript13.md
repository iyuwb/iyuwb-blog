---
title: JavaScript-ECMAScript13
author: 耶温
createTime: 2024/08/13 17:29:31
permalink: /JavaScript/e3loe593/
---
> ECMAScript（简称 ES）是一种由 ECMA 国际组织制定的脚本语言标准。它是 JavaScript 的基础，定义了语言的语法、类型、语句、关键字、保留字、操作符、内置对象等。ECMAScript 的目标是提供一种通用的脚本语言，使得不同的实现（如浏览器、服务器等）能够遵循相同的标准，从而实现跨平台的兼容性。

-   ECMAScript 12 (ES2021) - 2021
   
    -   引入了类字段（Class Fields）和私有字段（Private Fields）。
    -   新增了 Object.hasOwn 方法。
    -   增加了 Array.prototype.group 和 Array.prototype.groupToMap 方法。
    -   对 Error 类进行了增强。


## 类字段和私有字段

ECMAScript 12 引入了类字段（Class Fields）和私有字段（Private Fields）。

私有字段（以 # 开头）可以在类中定义，只有该类的实例可以访问。

```js
class Person {
  #name;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
  }
}

const person = new Person('John');
console.log(person.name); // 输出 'John'
person.name = 'Jane';
console.log(person.name); // 输出 'Jane'
```

## 顶级await

允许在模块的顶层使用 await，使得异步代码的书写更加简洁。

```js
const result = await fetch('URL_ADDRESS');
console.log(await result.json());
```


## 对象方法
-   `Object.hasOwn()` 方法用于检查对象是否具有指定的属性。
```js
const obj = { foo: 1, bar: 2 };
console.log(Object.hasOwn(obj, 'foo')); // 输出 true
console.log(Object.hasOwn(obj, 'baz')); // 输出 false
```
## 数据方法
-   `Array.prototype.group()` 方法用于将数组中的元素按照指定的键分组。
```js
const arr = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 30 },
  { name: 'Bob', age: 25 }
];

const grouped = arr.group(item => item.age);
console.log(grouped); // 输出 { '25': [{ name: 'John', age: 25 }, { name: 'Bob', age: 25 }], '30': [{ name: 'Jane', age: 30 }] }
```
-   `Array.prototype.groupToMap()` 方法用于将数组中的元素按照指定的键分组，并将结果转换为 Map 对象。
```js
const arr = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 30 },
  { name: 'Bob', age: 25 }
];

const groupedMap = arr.groupToMap(item => item.age);
console.log(groupedMap); // 输出 Map { 25 => [{ name: 'John', age: 25 }, { name: 'Bob', age: 25 }], 30 => [{ name: 'Jane', age: 30 }] }
```
