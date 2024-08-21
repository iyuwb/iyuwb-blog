---
title: TypeScript-接口（Interfaces）
author: 耶温
createTime: 2024/08/21 15:08:50
permalink: /TypeScript/efqwfrfq/
---
在 TypeScript 中，接口（Interfaces）是一种强大的工具，用于定义对象的结构和类型。接口可以描述对象的属性、方法以及它们的类型，从而提供类型检查和代码提示。接口在 TypeScript 中的主要作用是增强代码的可读性和可维护性。


## 定义接口

要定义一个接口，使用 `interface` 关键字，并在接口名后加上花括号 `{}`。在花括号中，定义接口的属性和方法。属性可以是简单类型，也可以是复杂类型（如数组、对象等）。方法可以是简单的函数声明，也可以是函数表达式。

```typescript
interface Person {
  name: string;
  age: number;
  greet(): void;
}
```

下面是实现一个接口的例子：

```typescript
const obj: Person = {
  name: 'John',
  age: 30,
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
};
```

## 类型读取

和其他类型一样，可以使用方括号`[]`读取接口某个属性的类型。

```typescript
interface Person {
  name: string;
}

type nameType = Person['name']; // string
```

## 接口表示对象语法
interface 可以表示对象的各种语法，主要有对象属性，对象的属性索引，对象方法，函数，构造函数等。


1. 对象属性。可以使用`?`表示属性是可选的。使用`readonly`表示属性是只读的。

```typescript
interface Person {
  readonly name: string;
  age: number;
  address?: string;
}
```

2. 对象的属性索引。可以使用`[]`表示属性是索引的。需要注意属性索引共有三种类型：`string`, `number`, `symbol`。

```typescript
interface Person {
  [key: string]: string;
}
```

3. 对象方法。

```typescript
interface Person {
  greet(name:string): void;
}
// 或者
interface Person {
  greet: (name:string) => void;
}
// 或者
interface Person {
  greet: {(name:string): void}
}
```
对象的属性名可以采用表达式。

```typescript
const name = 'name'
interface Person {
  [name](name:string): void;
}
```
类型方法可以重载。

```typescript
interface Person {
  greet(name:string): void;
  greet(name:string, age:number): void;
}
```


