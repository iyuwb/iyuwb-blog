---
title: TypeScript-特有数据类型
author: 耶温
createTime: 2024/07/31 21:16:02
permalink: /TypeScript/puill05i/
---

## 特有数据类型

| 数据类型/概念 | 描述 |
| --- | --- |
| 值类型 | TypeScript 规定，单个值也是一种类型，称为“值类型”。 |
| `any` | 任何值都可以被赋给的变量或属性类型。 |
| `unknown` | 类似于 `any`，但更加安全，不允许直接访问成员，除非通过类型断言。 |
| `never` | 代表永远不会出现的值，例如抛出异常的函数返回类型。 |
| `void` | 通常用于表示函数无返回值或值不存在。 |
| `enum` | 枚举类型，定义一组相关的值，可以是数字或字符串。 |
| `Array`| 数量不确定的数组 |
| 泛型 (Generics) | 一种机制，允许创建可重用的组件，这些组件能够操作任意类型的参数。 |
| 联合类型 (Union Types) | 定义一个变量可以是多种类型之一。 |
| 交集类型 (Intersection Types) | 定义一个变量同时具有多种类型的所有特征。 |
| 类型别名 (Type Aliases) | 用于给现有的类型起一个新的名字，使复杂类型更易于理解。 |
| 接口 (Interfaces) | 用来定义对象的形状，包括属性、方法等，并且可以扩展其他接口。 |
| 元组类型 (Tuple Types) | 定义数组中元素的数量和每个位置上的类型。 |
| 字面量类型 (Literal Types) | 允许你指定特定的值作为类型，例如 `"red" | "green" | "blue"`。 |
| 类型断言 (Type Assertions) | 告诉编译器某个值的类型，即使编译器无法自动推断出来。 |
| 条件类型 (Conditional Types) | 根据类型是否满足某些条件来选择不同的类型。 |
| 映射类型 (Mapped Types) | 基于现有类型创建新的类型，并对属性进行修改。 |


## 值类型

TypeScript 规定，单个值也是一种类型，称为“值类型”。

```typescript
let x: "hello"; //只能赋值给"hello"

x = "hello"; // 正确
x = "world"; // 报错
```

在我们使用 const 命令声明变量时，如果没有注明类型，就会被推断为值类型。
<img src="@source/notes/TypeScript/images/image-06.png" style="width:80%;margin:0 10%" />

需要注意的是，使用 const 命令声明 object 变量时，不会推断为值类型。

还有一点如下：

```typescript
const x: 5 = 4 + 1; // 报错

// 可以使用断言解决
const x: 5 = (4 + 1) as 5; // 正确
```

上面示例中，等号左侧的类型是数值5。等号右侧4 + 1的类型，TypeScript 推测为number。由于5是number的子类型，number是5的父类型，父类型不能赋值给子类型，所以报错了。


但是，反过来是可以的，子类型可以赋值给父类型。

```typescript
let x: 5 = 5;
let y: number = 4 + 1;

x = y; // 报错
y = x; // 正确
```

## any类型

any 类型是一种特殊的类型，表示任何类型的值。它允许你在编写代码时忽略类型检查，从而提高代码的灵活性和可维护性。

```typescript
let anyVar: any = 42; // 可以赋值为任意类型的值
anyVar = "Hello, TypeScript!"; // 可以重新赋值为不同类型的值
anyVar = true; // 可以重新赋值为布尔值
```
需要注意的是，不再迫不得已的时候，尽可能不使用any类型。使用过多的 any 类型，会使 TypeScript 变得更加难以理解和维护。我们使用 TypeScript，主要就是使用类型系统来帮助我们避免类型错误，从而提高代码的可靠性和可维护性。如果使用很多 any 去掉了类型检查，还不如直接不用 TypeScript。   

一些使用 any 的场景：

-   迫不得己，需要关闭变量类型检查。
-   适配老 Javascript 项目代码，或者老的 Javascript 插件。


::: tip
在 TypeScript 中，如果推断不出来具体的类型，也会默认该变量的类型为 `any`。
:::

类型污染

在使用 any 类型的变量时，有一点特别需要注意的是，它会污染其他特定类型的变量，使其失去特定的类型。并且还不会提醒报错。如下图：
<img src="@source/notes/TypeScript/images/image-05.png" style="width:80%;margin:0 10%" />

我们把 `any` 类型的 `str` 赋值给 `num`，并没有报错。此时我们打印 `num` 。输出为 字符串`Hello，World！` 。可见此时的 `num` 变量已经变成了字符串类型。但是在下面接着调用数字的 toFixed 方法时。也没有相关错误提示。

但是如果我们运行这段代码，就会报错。如下：
```sh
Hello, World!
num.toFixed(2);
    ^
TypeError: num.toFixed is not a function
```

## unknown类型

为了 解决类型污染的问题，TypeScript 引入了 `unknown` 类型。它和`any`一样表示任何类型的值，但是在使用前需要进行显式断言。直接将`unknown`类型赋值给其他类型变量时，会报错。


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

还有一点需要注意，`unknown` 类型的变量只能够进行运算符`==`、`===`、`!=`、`!==`、`||`、`&&`、`?`）、取反运算（运算符`!`）、`typeof`运算符和`instanceof`等运算，其他运算都会报错。

```typescript
let unknownVar: unknown = 42;
unknownVar + 10; // 报错   “unknownVar”的类型为“未知”。
unknownVar ++ // 报错   “unknownVar”的类型为“未知”。
unknownVar === 42; // 正确
```

类型缩小

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

## void 类型

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

## Array 类型

Array 数组是一个可以存储多个相同类型的值的集合。你可以使用 Array 类型或简写的 [] 语法来定义数组。数组的成员数量是可以动态变化的。

***定义数组***

```typescript
// 使用 Array 类型
let numbers: Array<number> = [1, 2, 3];

// 使用 [] 语法
let names: string[] = ["Alice", "Bob", "Charlie"];

// 数组有多种类型
let mixed: (number | string)[] = [1, "two", 3];
let mixed2: Array<number | string> = [1, "two", 3];
```
***动态成员***
数组数量可以动态变化，TypeScript 不会对数组边界进行检查，越界访问数组并不会报错。

***类型读取***

***类型推断***

***只读数组***


***多位数组***





## 联合类型

在 TypeScript 中，联合类型（Union Types）允许将多个类型组合在一起，使得一个变量可以是其中的任意一个类型。可以使用竖线 | 来定义联合类型。

1. 基本联合类型

```typescript
let value: string | number;

value = "Hello"; // 合法
console.log(value); // 输出: Hello

value = 42; // 合法
console.log(value); // 输出: 42

// value = true; // 不合法，Type 'boolean' is not assignable to type 'string | number'.
```

2. 函数参数

```typescript
function printId(id: number | string) {
    console.log("Your ID is: " + id);
}

printId(101); // 输出: Your ID is: 101
printId("202"); // 输出: Your ID is: 202
```

3. 处理联合类型

当我们使用联合类型时，TypeScript 可能无法确定具体的类型，因此我们需要使用类型保护（Type Guards）来处理不同的类型。

```typescript
function printId(id: number | string) {
    if (typeof id === "string") {
        console.log("Your ID is a string: " + id);
    } else {
        console.log("Your ID is a number: " + id);
    }
}

printId(101); // 输出: Your ID is a number: 101
printId("202"); // 输出: Your ID is a string: 202
```

## 交叉类型

TypeScript 的交叉类型（Intersection Types）允许我们将多个类型合并为一个类型。这种类型的主要用途是组合多个类型的属性，使得新类型同时具有所有组合类型的特性。

***注意事项***：

-   交叉类型只能用于对象类型，不能用于基础类型。
-   交叉类型的属性不能有同名的属性，除非它们的类型相同，否则会导致类型冲突。

***应用场景***：

-   合并多个接口。当需要一个对象同时符合多个接口时，可以使用交叉类型。

示例：

```typescript
// 定义两个接口
interface Person {
    name: string;
    age: number;
}

interface Address {
    street: string;
    city: string;
}

// 使用交叉类型将两个接口合并
type PersonWithAddress = Person & Address;

// 创建一个符合 PersonWithAddress 类型的对象
const person: PersonWithAddress = {
    name: "Alice",
    age: 30,
    street: "123 Main St",
    city: "Wonderland"
};

console.log(person);
```
 
## 类型别名

在 TypeScript 中，类型别名（Type Alias）是一种为现有类型创建新名称的方式。它可以使代码更具可读性和可维护性，同时也提高了代码的类型安全性。

:::tip
关于类型别名的详细内容可以查看：[Type 命令](/TypeScript/sa54awwt/#type-命令)
:::
