---
title: TypeScript-any与unknown
author: 耶温
createTime: 2024/08/07 09:29:15
permalink: /TypeScript/h08p33yc/
---
## any类型

`any` 类型是一种特殊的类型，表示任何类型的值。它允许你在编写代码时忽略类型检查，从而提高代码的灵活性和可维护性。

```typescript
let anyVar: any = 42; // 可以赋值为任意类型的值
anyVar = "Hello, TypeScript!"; // 可以重新赋值为不同类型的值
anyVar = true; // 可以重新赋值为布尔值
```
需要注意的是，不再迫不得已的时候，尽可能不使用 `any` 类型。使用过多的 `any` 类型，会使 TypeScript 变得更加难以理解和维护。我们使用 TypeScript ，主要就是使用类型系统来帮助我们避免类型错误，从而提高代码的可靠性和可维护性。如果使用很多 `any` 去掉了类型检查，还不如直接不用 TypeScript 。

一些使用 `any` 的场景：

-   迫不得己，需要关闭变量类型检查。
-   适配老 Javascript 项目代码，或者老的 Javascript 插件。


::: tip
在 TypeScript 中，如果推断不出来具体的类型，也会默认该变量的类型为 `any`。
:::

### 类型污染

在使用 `any` 类型的变量时，有一点特别需要注意的是，它会污染其他特定类型的变量，使其失去特定的类型。并且还不会提醒报错。如下图：
<img src="@source/notes/TypeScript/images/image-05.png" style="width:80%;margin:0 10%" />

我们把 `any` 类型的 `str` 赋值给 `num`，并没有报错。此时我们打印 `num` 。输出为 字符串`Hello，World！` 。可见此时的 `num` 变量已经变成了字符串类型。但是在下面接着调用数字的 `toFixed` 方法时。也没有相关错误提示。

但是如果我们运行这段代码，就会报错。如下：
```sh
Hello, World!
num.toFixed(2);
    ^
TypeError: num.toFixed is not a function
```

## unknown类型

为了 解决类型污染的问题，TypeScript 引入了 `unknown` 类型。它和 `any` 一样表示任何类型的值，但是在使用前需要进行显式断言。直接将 `unknown` 类型赋值给其他类型变量时，会报错。


```typescript
let unknownVar: unknown = 42; // 可以赋值为任意类型的值
unknownVar = "Hello, TypeScript!"; // 可以重新赋值为不同类型的值
unknownVar = true; // 可以重新赋值为布尔值

// 报错
let num: number = unknownVar; // 不能将类型“unknown”分配给类型“number”。

// 正确 显式断言
let str: string = unknownVar as string; 
// or
// let str: string = <string>unknownVar; 
```

其次， `unknown` 类型的变量， 不能直接调用其方法和属性。

```typescript
let unknownVar: unknown = 42;
unknownVar.toFixed(2); // 报错   “unknownVar”的类型为“未知”。

let obj: unknown = { name :'yuwb'}
obj.name // 报错   “obj”的类型为“未知”
```

还有一点需要注意，`unknown` 类型的变量只能够进行运算符 `==`、`===`、`!=`、`!==`、`||`、`&&`、`?`、取反运算（运算符 `!` ）、`typeof` 运算符和 `instanceof` 等运算，其他运算都会报错。

```typescript
let unknownVar: unknown = 42;
unknownVar + 10; // 报错   “unknownVar”的类型为“未知”。
unknownVar ++ // 报错   “unknownVar”的类型为“未知”。
unknownVar === 42; // 正确
```

### 类型缩小

在使用 `unknown` 类型的变量时，我们可以使用类型缩小来限制其类型。让其可以进行方法属性获取和各种运算符等。

```ts
let a: unknown = 1;

if (typeof a === "number") {
  let r = a + 10; // 正确
}

let s: unknown = "hello";

if (typeof s === "string") {
  s.length; // 正确
}
```
