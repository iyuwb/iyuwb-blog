---
title: TypeScript-never与void
author: 耶温
createTime: 2024/08/07 10:44:28
permalink: /TypeScript/e9ystght/
---
## never类型

`never` 类型是一种特殊的类型，表示永远不会出现的值。它通常用于函数返回值，表示函数永远不会返回任何值。

常用场景：

-   ***函数抛出异常***：如果一个函数总是抛出异常而不返回任何值，那么它的返回类型可以被标记为 `never`。
-   ***无限循环***：如果一个函数包含一个无限循环，它也不会返回任何值，因此可以被标记为 `never`。
-   ***类型保护***：在某些情况下，`never` 类型可以用于确保某些代码路径不会被执行。

1. 函数抛出异常
```typescript
function throwError(message: string): never {
    throw new Error(message);
}

function example(value: number | null) {
    if (value === null) {
        throwError("Value cannot be null");
    }
    // 这里 TypeScript 知道 value 是 number 类型
    console.log(value * 2);
}

// example(null); // 会抛出异常
example(5); // 输出: 10
```
2. 无限循环

```typescript
function infiniteLoop(): never {
    while (true) {
        console.log("This will run forever");
    }
}

// infiniteLoop(); // 这个函数会导致无限循环 谨慎使用
```
3. 类型保护

`never` 类型可以用于确保某些代码路径不会被执行。例如，在使用类型保护时，如果所有可能的类型都被处理，剩下的情况可以被标记为 `never`。

```typescript
interface Square {
    kind: "square";
    size: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Circle;

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "square":
            return shape.size * shape.size;
        case "circle":
            return Math.PI * shape.radius ** 2;
        default:
            const _exhaustiveCheck: never = shape; // 如果没有覆盖所有情况，这里就是 never 类型
            return _exhaustiveCheck; // 这里不会被执行
    }
}
```

需要注意的时，never类型的一个重要特点是，可以赋值给任意其他类型。

```typescript
function f(): never {
  throw new Error("Error");
}

let v1: number = f(); // 不报错
let v2: string = f(); // 不报错
let v3: boolean = f(); // 不报错
```

因为在typescript中，never类型是所有类型的子类型，所以可以赋值给任何类型。我们把never类型叫做底层类型。同理还有顶层类型 any 和 unknown。

## void类型

在 TypeScript 中，void 是一种特殊的类型，表示没有任何类型。它通常用于函数的返回类型，表示该函数不返回任何值。使用 void 可以清楚地表明函数的意图，即该函数执行某些操作但不返回结果。


***应用场景***
-   ***函数返回类型***: 当一个函数不返回任何值时，可以将其返回类型指定为 void。
-   ***事件处理***: 在处理事件时，通常不需要返回值，因此可以使用 void。

```typescript
function logMessage(message: string): void {
    console.log(message);
}

logMessage("Hello, TypeScript!"); // 输出: Hello, TypeScript!
```
```typescript
document.getElementById("myButton")?.addEventListener("click", function(): void {
    console.log("Button clicked!");
});
```

void 类型表示函数没有返回值，如果设置了 void 类型的函数，却返回了一个值，就会报错。但是需要注意的是，void 类型的函数可以返回 undefined 或 null。

但是如果开启 `strictNullChecks` 编辑选项，那么 void 类型的函数就只允许返回undefined 。JavaScript 规定，如果函数没有返回值，就等同于返回undefined。

```typescript
// 正常
function f(): void {
  console.log("hello");
}
// 报错
function f(): void {
  return 123; // 报错
}

function f(): void {
  return undefined; // 正确
}

function f(): void {
  return null; // 正确   
}
```
需要特别注意的是，如果变量、对象方法、函数参数的类型是 void 类型的函数，那么并不代表不能赋值为有返回值的函数。恰恰相反，该变量、对象方法和函数参数可以接受返回任意值的函数，这时并不会报错。换句话说，只要不用到这里的返回值，就不会报错。一旦使用就会报错。

```typescript
type voidFunc = () => void;

const f: voidFunc = () => {
  return 123;
};
f() // 正确
f() * 2 // 报错
```
