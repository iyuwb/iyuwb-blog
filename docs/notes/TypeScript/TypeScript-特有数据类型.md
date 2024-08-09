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
| 元组类型 (Tuple Types) | 定义数组中元素的数量和每个位置上的类型。 |
| `Function`| 定义函数方法 |
| 泛型 (Generics) | 一种机制，允许创建可重用的组件，这些组件能够操作任意类型的参数。 |
| 联合类型 (Union Types) | 定义一个变量可以是多种类型之一。 |
| 交集类型 (Intersection Types) | 定义一个变量同时具有多种类型的所有特征。 |
| 类型别名 (Type Aliases) | 用于给现有的类型起一个新的名字，使复杂类型更易于理解。 |
| 接口 (Interfaces) | 用来定义对象的形状，包括属性、方法等，并且可以扩展其他接口。 |
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

在 TypeScript 中，any 类型是一种特殊的类型，它表示可以接受任何类型的值。使用 any 类型时，TypeScript 不会对该值进行类型检查，这意味着你可以将任何类型的值赋给 any 类型的变量，也可以将 any 类型的变量赋值给其他类型的变量。

但是我们在使用 TypeScript 时尽可能避免使用该类型。
:::tip
关于any类型的详细内容可以查看：[TypeScript-any与unknown](/TypeScript/h08p33yc/#any类型)
:::

## unknown类型

为了 解决类型污染的问题，TypeScript 引入了 `unknown` 类型。它和`any`一样表示任何类型的值，但是在使用前需要进行显式断言。直接将`unknown`类型赋值给其他类型变量时，会报错。

:::tip
关于unknown类型的详细内容可以查看：[TypeScript-any与unknown](/TypeScript/h08p33yc/#any类型)
:::


## never类型

`never` 类型是一种特殊的类型，表示永远不会出现的值。它通常用于函数返回值，表示函数永远不会返回任何值。

:::tip
关于never类型的详细内容可以查看：[TypeScript-never与void](/TypeScript/e9ystght/#never类型)
:::


## void类型

:::tip
关于void类型的详细内容可以查看：[TypeScript-never与void](/TypeScript/e9ystght/#void类型)
:::

## 数组类型

Array 数组是一个可以存储多个相同类型的值的集合。你可以使用 Array 类型或简写的 [] 语法来定义数组。数组的成员数量是可以动态变化的。
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


***void类型***

void 类型表示函数没有返回值。如果设置了 void 类型的函数，却返回了一个值，就会报错。但是需要注意的是，void 类型的函数可以返回 undefined 或 null。

:::tip
关于void类型的详细内容可以查看：[void类型](/TypeScript/puill05i/#void类型)
:::

***never类型***

never类型表示肯定不会出现的值。它用在函数的返回值，就表示某个函数肯定不会返回值，即函数不会正常执行结束。
:::tip
关于never类型的详细内容可以查看：[never类型](/TypeScript/puill05i/#never类型)
:::

## 对象类型

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
