---
title: TypeScript-数据类型
author: 耶温
createTime: 2024/07/26 20:39:29
permalink: /TypeScript/n7di7t58/
---


> TypeScript 是一种静态类型的 JavaScript 超集，它为 JavaScript 添加了可选的类型注解。这使得开发者可以在编写代码时使用各种数据类型，并且 TypeScript 编译器能够根据这些类型信息提供编译时检查，从而帮助发现潜在的错误。

## 基本类型
JavaScript 语言（注意，不是 TypeScript）将值分成 8 种类型。TypeScript 继承了 JavaScript 的类型设计，以下 8 种类型可以看作 TypeScript 的基本类型。

| 数据类型   | 描述  |
|------------|---------|
| `boolean`  | 代表逻辑值，只能是 `true` 或 `false`。 |
| `string`   | 用于表示文本字符串。可以使用单引号、双引号或反引号定义。|
| `number`   | 用于表示整数和浮点数。在 TypeScript 中，所有的数字都是 `number` 类型。|
| `bigint`   | 用于表示任意精度的大整数。在数值后面加上 `n` 来定义 bigint。 |
| `symbol`   | 用于创建唯一的键，通常用于对象的键。可以通过 `Symbol()` 函数创建。 |
| `object`   | 代表非原始数据类型。在 TypeScript 中，大多数复杂的数据类型（如数组和类实例）都属于 `object` 类型。 |
| `undefined`| 用于表示尚未赋值的变量。 |
| `null`     | 用于表示一个空值。在 TypeScript 中，`null` 是 `object` 类型的一个子类型。|

注意，上面所有类型的名称都是小写字母，首字母大写的Number、String、Boolean等在 JavaScript 语言中都是内置对象，而不是类型名称。

## 复杂数据类型

| 数据类型          | 描述                                                         |
|-----------------|------------------------------------------------------------|
| `object`        | 任何非原始类型的值。                                           |
| `any`           | 任何类型的值。在严格模式下尽量避免使用。                         |
| `unknown`       | 类似于`any`，但在使用前需要进行显式断言。                       |
| `tuple`         | 具有固定长度和类型的数组。                                     |
| `enum`          | 枚举类型，为一组数值分配名称。                                 |
| `array`         | 同类型的元素集合。                                             |
| `class`         | 定义类的结构。                                                 |
| `interface`     | 定义对象的结构。                                               |
| `type`          | 使用类型别名定义新的类型。                                     |
| `function`      | 函数类型。                                                     |
| `generic`       | 泛型类型，允许创建可重用的组件。                               |    

## boolean 类型

boolean 类型表示逻辑值，只能是 true 或 false。
```typescript
let boolVar: boolean = true;
let boolVar2: boolean = false;
```
包装对象
```typescript
let x: boolean = new Boolean(true); // 报错
let x: Boolean = new Boolean(true); // 正确
```
如上面所示，我们在定义的变量的时候，需要根据使用的是包装对象或者字面量来判断变量的类型是使用小写`boolean`还是大写`Boolean`。



## string 类型

string 类型表示文本字符串。可以使用单引号、双引号或反引号定义。
```typescript
let str: string = "Hello, World!";
let str2: string = `${x}, Hi, TypeScript!";`;
```
包装对象
```typescript
let str: string = new String("Hello, World!"); // 报错
let str2: String = new String("Hello, World!"); // 正确
```
和`boolean`类型一样，根据字面量还是包装对象，使用`string`和`String`。



## number 类型

number 类型表示整数和浮点数。在 TypeScript 中，所有的数字都是 `number` 类型。


```typescript
let x: number = 42;
let y: number = 3.14;
let z: number = 3.14e-2;
let a: number = 0x10; // 十六进制
```
包装对象
```typescript
let numberVar: number = new Number(42); // 报错
let numberVar2: Number = new Number(42); // 正确
```

和`boolean`类型一样，根据字面量还是包装对象，使用`number`和`Number`。

## bigint类型

bigint 类型用于表示任意精度的大整数。在数值后面加上 `n` 来定义 bigint。

```typescript
let bigintVar: bigint = 123n;
let bigintVar2: bigint = 0x10n; // 十六进制;
```

需要注意的是 bigint 不能表示小数 , 也不能把 number 类型的数据赋值给 bigint 类型。


```typescript
let bigintVar: bigint = 123; // 报错
let bigintVar3: bigint = 123.14; // 报错
```

## symbol类型

symbol 类型用于创建唯一的键，通常用于对象的键。可以通过 `Symbol()` 函数创建。
```typescript
let symbolVar: symbol = Symbol("mySymbol");
```

## object类型

object 类型表示非原始数据类型。在 TypeScript 中，大多数复杂的数据类型（如数组和类实例）都属于 `object` 类型。

小写的object类型代表 JavaScript 里面的狭义对象，即可以用字面量表示的对象，只包含对象、数组和函数，不包括原始类型的值。

```typescript
let obj: object = { name: "John", age: 30 };
let arr: object = [1, "two", true];
let classObj: object = new Date();
let func: object = function() {};

let obj1: object = 'hi' // 报错
let obj2: object = 123 // 报错
let obj3: object = true // 报错
```

Object 类型

大写的Object类型代表 JavaScript 语言里面的广义对象。所有可以转成对象的值，都是Object类型，这囊括了几乎所有的值。

```typescript
let obj: Object;
obj = true; // boolean
obj = "Hello"; // string
obj = { name: "John", age: 30 }; // object
obj = []; // array
obj = function() {}; // function
```
需要注意的是，undefined和null赋值给Object类型，就会报错。因为undefined和null这两个值不能转为对象。

```typescript
let a: Object = undefined; // 报错
let b: Object = null; // 报错
```

注意，无论是大写的Object类型，还是小写的object类型，都只包含 JavaScript 内置对象原生的属性和方法，用户自定义的属性和方法都不存在于这两个类型之中。

```typescript
const o1: Object = { foo: 0 };
const o2: object = { foo: 0 };

o1.toString(); // 正确
o1.foo; // 报错

o2.toString(); // 正确
o2.foo; // 报错
```

## undefined类型

undefined 类型表示尚未赋值的变量。改类型只包含一个特殊的 `undefined` 值。

```typescript
let undefVar: undefined = undefined;
```
需要注意的是 ，如果没有声明类型的变量，被赋值为 `undefined`，它的类型会被推断为 `any`。
```typescript
let a = undefined; // any
```


## null类型

null 类型表示一个空值。在 TypeScript 中，`null` 是 `object` 类型的一个子类型。

```typescript
let nullVar: null = null;
```
和 underfined 类型一样，如果没有声明类型的变量，被赋值为 `null`，也会被 TypeScript 推断为 `any`。


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