---
title: TypeScript-配置相关
author: 耶温
createTime: 2024/10/12 16:11:38
permalink: /TypeScript/97zdlo92/
---
TypeScript 配置相关内容，包括注释指令、 tsc 命令行工具、d.ts 文件、tsconfig.json 文件中的配置项等。
## 注释指令

TypeScript 支持使用特殊的注释指令来控制编译器的行为。这些指令以 `//` 或 `/*` 开头，以 `*/` 结尾。

### // @ts-nocheck

`@ts-nocheck` 指令告诉 TypeScript 编译器忽略该文件中的所有类型检查错误。

```typescript
// @ts-nocheck
const element = document.getElementById(123);
```

### // @ts-check

`@ts-check` 指令告诉 TypeScript 编译器对该文件进行类型检查。

```typescript
// @ts-check
const element = document.getElementById(123); // 报错
```

### // @ts-ignore

`@ts-ignore` 指令告诉 TypeScript 编译器忽略下一行代码中的类型检查错误。

```typescript
const element = document.getElementById(123); // 报错
// @ts-ignore
const element2 = document.getElementById(123); // 忽略错误
```

## JSDoc

JSDoc 是一种用于注释 JavaScript 代码的规范，TypeScript 也支持使用 JSDoc 注释来提供类型信息。

基本语法：使用 `/**` 开头，以 `*/` 结尾，中间可以包含多个注释块。

需要注意：JSDoc注释必须放在函数声明之前，否则编译器无法识别。
### @param
`@param` 指令用于指定函数参数的类型和描述，可以在 JSDoc 注释中使用。
```typescript
/**
 * 这是一个函数的注释
 * @param {number} a - 参数 a 的描述
 * @param {string} b - 参数 b 的描述
 * @returns {string} 返回值的描述
 */
function foo(a: number, b: string): string {
  return b;
}
```



### @typedef

`@typedef` 指令用于定义自定义类型，可以在 JSDoc 注释中使用。

```typescript
/**
 * @typedef {Object} Person
 * @property {string} name - 人的名字
 * @property {number} age - 人的年龄
 */

/**
 * @param {Person} person - 一个人
 */
function greet(person: Person) {
    
}
```

### @type

`@type` 指令用于指定变量的类型，可以在 JSDoc 注释中使用。

```typescript
/**
 * @type {number} 
 * */
let count = 0;

// 其他
/**@type {true | false} */
let a;

/** @type {number[]} */
let b;

/** @type {Array<number>} */
let c;

/** @type {{ readonly x: number, y?: string }} */
let d;

/** @type {(s: string, b: boolean) => number} */
let e;
```
### @returns 和 @return

`@returns` 和 `@return` 指令用于指定函数的返回值类型和描述，可以在 JSDoc 注释中使用。

```typescript
/**
 * 这是一个函数的注释
 * @param {number} a - 参数 a 的描述
 * @param {string} b - 参数 b 的描述
 * @returns {string} 返回值的描述
 */
function foo(a: number, b: string): string {
    return b;
}
```
### @extends

`@extends` 指令用于指定类的父类，可以在 JSDoc 注释中使用。

```typescript
/**
 * @extends {HTMLElement}
 */
class MyElement extends HTMLElement {
    // ...
}


```
### @public、@private、@protected

`@public`、`@private`、`@protected` 指令用于指定类的成员的访问级别，可以在 JSDoc 注释中使用。

```typescript
class Base {
  /**
   * @public
   * @readonly
   */
  x = 0;

  /**
   *  @protected
   */
  y = 0;
}
```
## tsconfig.json

tsconfig.json 是 TypeScript 项目的配置文件，用于指定编译选项和项目结构。



## tsc 命令行工具

tsc 是 TypeScript 的编译器，可以通过命令行工具来编译 TypeScript 代码。

1. 下载 TypeScript：在命令行中运行 `npm install -g typescript` 来安装 TypeScript。
```bash
npm install -g typescript
```
2. 编译 TypeScript 文件：在命令行中运行 `tsc <filename>.ts` 来编译 TypeScript 文件。例如，`tsc app.ts` 将编译 `app.ts` 文件。
```bash
tsc app.ts
```


