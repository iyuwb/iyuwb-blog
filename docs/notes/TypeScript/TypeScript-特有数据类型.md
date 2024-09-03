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
| 数组类型 `Array`| 数量不确定的数组 |
| 元组类型（Tuple Types） | 定义数组中元素的数量和每个位置上的类型。 |
| `Function`| 定义函数方法 |
| 泛型（Generics） | 一种机制，允许创建可重用的组件，这些组件能够操作任意类型的参数。 |
| 联合类型（Union Types）| 定义一个变量可以是多种类型之一。 |
| 交集类型（Intersection Types）| 定义一个变量同时具有多种类型的所有特征。 |
| 接口（Interfaces）| 用来定义对象的形状，包括属性、方法等，并且可以扩展其他接口。 |
| 类（Class）| 类可以用来创建对象，并可以包含属性和方法。 |
| 条件类型（Conditional Types）| 根据类型是否满足某些条件来选择不同的类型。 |
| 映射类型（Mapped Types）| 基于现有类型创建新的类型，并对属性进行修改。 |


## 值类型

TypeScript 规定，单个值也是一种类型，称为“值类型”。又称字面量类型。

```typescript
let x: "hello"; //只能赋值给"hello"

x = "hello"; // 正确
x = "world"; // 报错
```

在我们使用 `const` 命令声明变量时，如果没有注明类型，就会被推断为值类型。
<img src="@source/notes/TypeScript/images/image-06.png" style="width:80%;margin:0 10%" />

需要注意的是，使用 `const` 命令声明 `object` 变量时，不会推断为值类型。

还有一点如下：

```typescript
const x: 5 = 4 + 1; // 报错

// 可以使用断言解决
const x: 5 = (4 + 1) as 5; // 正确
```

上面示例中，等号左侧的类型是数值 `5` 。等号右侧 `4 + 1` 的类型，TypeScript 推测为 `number`。由于 `5` 是 `number` 的子类型， `number` 是 `5` 的父类型，父类型不能赋值给子类型，所以报错了。


但是，反过来是可以的，子类型可以赋值给父类型。

```typescript
let x: 5 = 5;
let y: number = 4 + 1;

x = y; // 报错
y = x; // 正确
```

## any类型

在 TypeScript 中， `any` 类型是一种特殊的类型，它表示可以接受任何类型的值。使用 `any` 类型时，TypeScript 不会对该值进行类型检查，这意味着你可以将任何类型的值赋给 `any` 类型的变量，也可以将 `any` 类型的变量赋值给其他类型的变量。

但是我们在使用 TypeScript 时尽可能避免使用该类型。
:::tip
关于any类型的详细内容可以查看：[TypeScript-any与unknown](/TypeScript/h08p33yc/#any类型)
:::

## unknown类型

为了 解决类型污染的问题，TypeScript 引入了 `unknown` 类型。它和 `any` 一样表示任何类型的值，但是在使用前需要进行显式断言。直接将 `unknown` 类型赋值给其他类型变量时，会报错。

:::tip
关于unknown类型的详细内容可以查看：[TypeScript-any与unknown](/TypeScript/h08p33yc/#any类型)
:::


## never类型

`never` 类型是一种特殊的类型，表示永远不会出现的值。它通常用于函数返回值，表示函数永远不会返回任何值。

:::tip
关于 `never` 类型的详细内容可以查看：[TypeScript-never与void](/TypeScript/e9ystght/#never类型)
:::


## void类型

:::tip
关于 `void` 类型的详细内容可以查看：[TypeScript-never与void](/TypeScript/e9ystght/#void类型)
:::
## 枚举类型

枚举类型（`enum`）是一种特殊的类型，TypeScript 允许我们为一组数值赋予友好的名字。枚举类型可以用于表示一组相关的常量，例如星期、月份、颜色等。

1. 定义常量

我们可以使用 `enum` 关键字来定义一个枚举类型。枚举类型中的每个成员都有一个对应的数字值，默认从 `0` 开始递增。
```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

// 相当于  js
const Direction = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
}

// 使用
const direction = Direction.Up; // 0
// 相当于 js
const direction = Direction["Up"]; // 0
```
需要注意的是，Enum 成员值都是只读的，不能修改。
```typescript
Direction.Up = 1; // 报错 无法为“Up”赋值，因为它是只读属性。
```
2. 定义常量值

我们也可以为枚举类型中的每个成员指定一个具体的值。例如：
```typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
// 相当于 js
const Direction = {
  Up: "UP",
  Down: "DOWN",
  Left: "LEFT",
  Right: "RIGHT",
}
// 使用
const direction = Direction.Up; // Up
// 相当于 js
const direction = Direction["Up"]; // Up
```
3. Enum 类型

Enum本身就是一种类型。

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
let direction: Direction = Direction.Up; // 正确
let direction: number = Direction.Up; // 正确
let direction: string = Direction.Up; // 报错 不能将类型“Direction”分配给类型“string”。
```
如上所示，变量 `direction` 的类型写成 `Direction` 或 `number` 都是可以的。

4. 适用场景

枚举比较适合不关注具体值，只关注值名字。
```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

function move(direction: Direction) {
  switch (direction) {
    case Direction.Up:
      // ...
      break;
    case Direction.Down:
      // ...
      break;
    case Direction.Left:
      // ...
      break;
    case Direction.Right:
  // ...
}
move(Direction.Up); // 正确
move(0); // 正确
move(123); // 正确
move("Up"); // 报错
```
如上所示，枚举类型有一个缺点就是输入任何数值都不会报错。

5. 枚举的值

（1）数值

Enum成员默认不必手动赋值，系统会从 `0` 按照顺序开始递增。当然也可以手动指定枚举的值。

```typescript
enum Direction {
  Up = 10,
  Down,
  Left,
  Right,
}
// 相当于 js
const Direction = {
  Up: 10,
  Down: 11,
  Left: 12,
  Right: 13,
}
```
如上，如果设置了 `Up` 的值为 `10`，那么 `Down` 的值就是 `11`，以此类推。需要注意的是，当枚举的值是数值是，可以为整数和小数，不能为 `bigint`。 也可以是计算表达式或者是有返回值的函数调用。
```typescript

enum Direction {
    Up = 10,
    Down = Up + 1,
    Left = Math.PI,
    Right = Math.random(),
}
```

（2）字符串

枚举的值也可以是字符串。

```typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

## 数组类型

Array 数组是一个可以存储多个相同类型的值的集合。你可以使用 Array 类型或简写的 `[]` 语法来定义数组。数组的成员数量是可以动态变化的。

:::tip
关于数组类型的详细内容可以查看：[TypeScript-数组与元组](/TypeScript/lvw1ydmu/#数组类型)
:::


## 元组类型

在 TypeScript 中，元组类型是一种特殊的数组类型，它允许我们定义一个固定数量的元素，每个元素可以是不同的类型。元组的定义方式与数组类似，但在元组中，你需要指定每个元素的类型。

:::tip
关于元组类型的详细内容可以查看：[TypeScript-数组与元组](/TypeScript/lvw1ydmu/#元组类型)
:::


## 函数类型

函数的类型声明，需要在声明函数时，给出参数的类型和返回值的类型。

:::tip
关于函数类型的详细内容可以查看：[TypeScript-函数](/TypeScript/6a3kyjf9/#函数类型)
:::


**void类型**

`void` 类型表示函数没有返回值。如果设置了 `void` 类型的函数，却返回了一个值，就会报错。但是需要注意的是， `void` 类型的函数可以返回 `undefined` 或 `null` 。

:::tip
关于 `void` 类型的详细内容可以查看：[void类型](/TypeScript/puill05i/#void类型)
:::

**never类型**

`never` 类型表示肯定不会出现的值。它用在函数的返回值，就表示某个函数肯定不会返回值，即函数不会正常执行结束。
:::tip
关于 `never` 类型的详细内容可以查看：[never类型](/TypeScript/puill05i/#never类型)
:::

## 对象类型

在 TypeScript 中，对象是一个非常重要的概念。对象可以用来表示复杂的数据结构，通常由键值对组成。TypeScript 提供了多种方式来定义和使用对象。

:::tip
关于对象类型的详细内容可以查看：[对象类型](/TypeScript/78auqnpo/)
:::


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

**注意事项**：

-   交叉类型只能用于对象类型，不能用于基础类型。
-   交叉类型的属性不能有同名的属性，除非它们的类型相同，否则会导致类型冲突。

**应用场景**：

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
 


## 接口（Interfaces）

在 TypeScript 中，接口（Interfaces）是一种强大的工具，用于定义对象的结构和类型。接口可以描述对象的属性、方法以及它们的类型，从而提供类型检查和代码提示。接口在 TypeScript 中的主要作用是增强代码的可读性和可维护性。

:::tip
关于类型别名的详细内容可以查看：[接口（Interfaces）](/TypeScript/efqwfrfq/)
:::



## 类（Class）

在 TypeScript 中，类（Class）是一种面向对象的编程方式。类可以定义属性、方法和构造函数，并且可以继承和实现其他类。类在 TypeScript 中的主要作用是提供了一种组织和封装代码的方式，使得代码更加模块化和可维护。

:::tip
关于类（Class）的详细内容可以查看：[类（Class）](/TypeScript/wy5zf1gm/)
:::