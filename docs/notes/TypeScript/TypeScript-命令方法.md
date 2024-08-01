---
title: TypeScript-命令方法
author: 耶温
createTime: 2024/07/31 17:43:20
permalink: /TypeScript/sa54awwt/
---

##  type 命令

在 TypeScript 中，type 关键字用于定义类型别名。类型别名可以是基本类型、联合类型、交叉类型、元组、对象类型等。使用 type 可以让代码更具可读性和可维护性。

***基本语法***

```typescript
type 类型别名 = 类型;
```

***注意事项***
-   不可拓展
-   不能重新定义，同一作用域内不能重名
-   允许嵌套，在一个type里使用另一个type


示例：

1. 基本类型别名
```typescript
type StringOrNumber = string | number;

let value: StringOrNumber;
value = "Hello"; // 合法
value = 42;      // 合法
valeue = true;   // 非法 报错
```

2. 函数类型别名

```typescript
type GreetFunction = (name: string) => string;

const greet: GreetFunction = (name) => {
    return `Hello, ${name}!`;
};

console.log(greet("Bob")); // 输出: Hello, Bob!
```
3.  对象类型别名

```typescript
type Person = {
    name: string;
    age: number;
};

const person: Person = {
    name: "Alice",
    age: 30
};
```
4. 联合类型别名
```typescript
type Status = "success" | "error" | "loading";

let currentStatus: Status;
currentStatus = "success"; // 合法
currentStatus = "failed";  // 错误: 不能将类型“"failed"”分配给类型“Status”。
```

5. 交叉类型别名

```typescript

type Person = {
    name: string;
    age: number;
};

type Address = {
    street: string;
    city: string;
};

type PersonWithAddress = Person & Address;

const personWithAddress: PersonWithAddress = {
    name: "Alice",
    age: 30,
    street: "123 Main St",
    city: "Wonderland"
};
```

## typeof 运算符

在 TypeScript 中，typeof 运算符用于获取一个值的类型，并返回一个字符串表示该类型的名称。这与 JavaScript 中的行为类似，但在 TypeScript 中这个功能还可以被用来推断变量或表达式的类型。

1. JavaScript 中的 `typeof` 运算符

```js
console.log(typeof 5); // "number"
console.log(typeof "hello"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (这是一个已知的特殊情况)

console.log(typeof []); // "object"
console.log(typeof {}); // "object"
console.log(typeof 123n) // "bigint"
console.log(typeof Symbol("name")) // "symbol"
```

2. TypeScript 中的 `typeof` 运算符

-   类型查询

```typescript
let myValue = 10;
type MyValueType = typeof myValue; // MyValueType 将会是 number 类型
```

-   类型定义

```typescript

```
