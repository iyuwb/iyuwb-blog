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

## Array类型

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

```typescript
let numbers: number[] = [1, 2, 3];
numbers[3] = 4; // 不会报错，数组越界访问
console.log(numbers); // 输出: [1, 2, 3, 4]

numbers.length = 2; // 不会报错，数组长度可以动态变化
console.log(numbers); // 输出: [1, 2]
numbers.length = 4; // 不会报错，数组长度可以动态变化
console.log(numbers); // 输出: [1, 2, null, null]
```

***类型读取***

TypeScript 允许使用方括号读取数组成员的类型。

```typescript
type Names = string[];
// name 的类型为 string
type Name = Names[0]; // string   
```
数组成员的索引类型都是number，所以读取成员类型也可以写成下面这样。

```typescript
type Names = string[];
type Name = Names[number]; // string
```

***类型推断***

如果数组变量没有声明类型，TypeScript 就会推断数组成员的类型。

1. 根据数组初始化值推断类型。

```typescript
let numbers = [1, 2, 3]; // 类型为 number[]
let names = ["Alice", "Bob", "Charlie"]; // 类型为 string[]
```

2. 空数组，会推断为 `any[]`， 后续会根据数组更新推断类型。

```typescript
let arr = []; // 类型为 any[]
arr.push(1); // 类型为 number[]
arr.push("hello"); // 类型为 (number | string)[]
```
如果不是空数据，则会根据数组初始化值推断类型。不能添加其它类型的数据。

```typescript
let numbers = [1, 2, 3];
numbers.push('nihao'); // 报错 不能将类型“"nihao"”分配给类型“number”。
```

***只读数组***

在JavaScript中，数组是可以修改的，所以如果想让数组只读，可以使用 `readonly` 关键字。

```typescript
let numbers: readonly number[] = [1, 2, 3];
numbers.push(4); // 报错，类型“readonly number[]”上不存在属性“push”。
```
TypeScript 将 `readonly number[]` 与 `number[]` 视为两种不一样的类型，后者是前者的子类型。前者没有数组的相关方法，所以使用`push`等方法会报错。

因为`readonly number[]` 是 `number[]` 的子类型，所以 `number[]` 可以赋值给 `readonly number[]` 类型的变量。反之则会报错。

```typescript
let numbers:  number[] = [1, 2, 3];

let numbers2: readonly number[] = numbers; // 正确

let numbers3: number[] = numbers2; // 报错 类型 "readonly number[]" 为 "readonly"，不能分配给可变类型 "number[]"。
```
由于只读数组是数组的父类型，所以它不能代替数组传参。
```typescript
function getSum(s: number[]) {
  // ...
}
const arr: readonly number[] = [1, 2, 3];
getSum(arr); // 报错 类型“readonly number[]”的参数不能赋给类型“number[]”的参数。
```
上述可以使用断言 `as`  解决
```typescript
function getSum(s: number[]) {
  // ...
}
const arr: readonly number[] = [1, 2, 3];
getSum(arr as number[]); // 正确
```

需要注意，TypeScript 提供了两个专门的泛型，用来生成只读数组的类型。

```typescript
const a1: ReadonlyArray<number> = [0, 1];
const a2: Readonly<number[]> = [0, 1];
```

只读数组还有一种特殊的用法，即使用 `as const` 将数组转换为只读数组。    

```typescript
const a1 = [0, 1] as const; // const a1: readonly [0, 1]
a1[0] = 1; // 报错 无法为“0”赋值，因为它是只读属性。
```

***多位数组***

TypeScript 使用T[][]的形式，表示二维数组，T是最底层数组成员的类型。


```typescript
let matrix: number[][] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
```
转为JavaScript后，会变成二维数组。  
```js
let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
```

## 元组类型

在 TypeScript 中，元组类型是一种特殊的数组类型，它允许我们定义一个固定数量的元素，每个元素可以是不同的类型。元组的定义方式与数组类似，但在元组中，你需要指定每个元素的类型。

***定义元组***

在使用定义元组时，必须明确声明每个成员的类型。如果把类型省略，则Typescript会自动把变量推断为数组。

```typescript
// 定义一个元组类型，包含一个字符串和一个数字
let tuple: [string, number];
// 初始化元组
tuple = ["hello", 42]; // 正确
tuple = ["yuwb", 28]; // 正确
tuple = ["yuwb", 28, "123"]; // 报错 不能将类型“[string, number, string]”分配给类型“[string, number]”。
```
从上面可以看到，定义元组和数组的区别，数组是`number[]`, 元组是`[number]`。 一个写在方括号中，一个写在括号外。

***可选元组***

元组成员的类型可以添加问号后缀（?），表示该成员是可选的。需要注意的，问号只能用于元组的尾部成员，也就是说，所有可选成员必须在必选成员之后。

```typescript
let tuple: [string, number];
tuple = ["hello"]; // 报错 不能将类型“[string]”分配给类型“[string, number]”。

// 使用可选元组
let tuple2: [string, number?];
tuple2 = ["hello"]; // 正确
tuple2 = ["hello", 42]; // 正确
```

***固定类型和数量***

元组的成员数量是固定的，不能动态变化。由于需要声明每个成员的类型，所以大多数情况下，元组的成员数量是有限的，从类型声明就可以明确知道，元组包含多少个成员，越界的成员会报错。

```typescript
let x: [string, string] = ["a", "b"];

x[2] = "c"; // 报错 不能将类型“"c"”分配给类型“undefined”。长度为 "2" 的元组类型 "[string, string]" 在索引 "2" 处没有元素

x[1]= "c"; // 正确
x[1]= 1; // 报错 不能将类型“number”分配给类型“string”。
```

***不限成员数量***

用扩展运算符（`...`），可以表示不限成员数量的元组。

```typescript
type NamedNums = [string, ...number[]];
const a: NamedNums = ["A", 1, 2];
const b: NamedNums = ["B", 1, 2, 3];
```
元组类型NamedNums的第一个成员是字符串，后面的成员使用扩展运算符来展开一个数组，从而实现了不定数量的成员。


扩展运算符用在元组的任意位置都可以，但是它后面只能是数组或元组。
```typescript
// 表示一个元组，包含一个字符串，一个数字，以及任意个布尔值。
type t1 = [string, number, ...boolean[]];
let tuple:t1 = ["hello", 1, true, false]; // 正确
// 表示一个元组，包含首位一个字符串，最后一个数字，以及中间任意个字符串。
type t2 = [string, ...boolean[], number]; 
let tuple1:t2 = ["hello", true, false, 1]; // 正确
// 表示一个元组，开启任意个布尔值，最后一位是数字，倒数第二位是字符串。
type t3 = [...boolean[], string, number];
let tuple2:t3 = [true, false, "hello", 1]; // 正确
```

如果不确定元组成员的类型和数量，可以写成下面这样。但是不推荐，因为使用了使用 元组和TypeScript 的意义。

```typescript
type Tuple = [...any[]];
```

***类型读取***

元组可以通过方括号，读取成员类型。

```typescript
type Tuple = [string, number];
type Name = Tuple[0]; // string
type Age = Tuple[1]; // number
```
通过数值索引获取
```typescript
type Tuple = [string, number];
type Name = Tuple[number]; // string | number
```
***只读元组***

元组的成员类型可以使用 `readonly` 修饰符，表示元组的成员是只读的。

```typescript
// 写法1
type Tuple = readonly [string, number];
// 写法2
type Tuple = Readonly<[string, number]>;  // 使用泛型 Readonly<T>
```
和数组一样，只读元组也是元组的子类型，所以，元组可以替代只读元组，而只读元组不能替代元组。

```typescript
type t1 = readonly [number, number];
type t2 = [number, number];

let x: t2 = [1, 2];
let y: t1 = x; // 正确

x = y; // 报错  类型 "t1" 为 "readonly"，不能分配给可变类型 "t2"。
```

和数组一样，只读元组不能替代元组传参，但是可以使用断言 `as` 解决。

```typescript

function getSum(s: [number,number]) {
  // ...
}
const a: readonly [number,number] = [1, 2];

getSum(a); // 报错 类型“readonly [number, number]”的参数不能赋给类型“[number, number]”的参数。
getSum(a as [number,number]); // 正确
```

***成员数量的推断***

如果没有可选成员和扩展运算符，TypeScript 会推断出元组的成员数量（即元组长度）。

```typescript
function f(point: [number, number]) {
  if (point.length === 3) {    // 报错
    // ...
  }
}
```
上面代码报错，原因时固定元组的长度最大为2，不可能为3。

如果包含可选成员，则会推断出可能的成员数量。

```typescript
function f(point: [number, number?, number?]) {
  if (point.length === 4) {    // 报错
    // ...
  }
}
```
上面代码报错，原因是元组的长度可能是1，2，3不可能为4。

需要注意的是，如果元组包含可选成员和扩展运算符，则不会推断出成员数量。
```typescript
const myTuple: [...string[]] = ["a", "b", "c"];
if (myTuple.length === 4) {
  // 正确
  // ...
}
```
::: tip
注意：元组一旦使用扩展运算符使得元组的成员数量无法推断，Typescript内部就会把该元组当成数组来处理。
:::

***扩展运算符与成员数量***

扩展运算符（...）将数组（注意，不是元组）转换成一个逗号分隔的序列，这时 TypeScript 会认为这个序列的成员数量是不确定的，因为数组的成员数量是不确定的。

这导致如果函数调用时，使用扩展运算符传入函数参数，可能发生参数数量与数组长度不匹配的报错。

```typescript
const arr = [1, 2];

function add(x: number, y: number) {
  // ...
}
add(...arr); // 报错 扩张参数必须具有元组类型或传递给 rest 参数。
```
我们可以把数组转换成元组，这样就不会报错了。

```typescript
const arr:[number,number] = [1, 2];

function add(x: number, y: number) {
  // ...
}
add(...arr); 
```

## 函数类型

函数的类型声明，需要在声明函数时，给出参数的类型和返回值的类型。

如果函数没有具体的返回值，可以使用`void`表示没有返回值。返回值的类型也可以不写，因为 TypeScript 自己会根据 有无`return`和返回值的类型推断出来。

***函数定义***
```typescript
function add(x: number, y: number): number {
  return x + y;
}

// 变量被赋值为函数类型
const hello = function (txt: string):void {
  console.log("hello " + txt);
};
// 或者
const hello: (txt: string) => void = function (txt) {
  console.log("hello " + txt);
};
```

***函数类型定义***

可以使用 type 或 interface 来定义函数类型。
```typescript
// 使用 type 定义函数类型
type Add = (a: number, b: number) => number;
const add: Add = (x, y) => x + y;
// 使用 interface 定义函数类型
interface Subtract {
    (a: number, b: number): number;
}
const subtract: Subtract = (x, y) => x - y;
```
函数的类型还可以使用对象写法。需要注意的时，这种写法的函数参数与返回值之间，间隔符是冒号:，而不是正常写法的箭头=>，因为这里采用的是对象类型的写法，对象的属性名与属性值之间使用的是冒号。
```typescript
type Add = {
    (a: number, b: number): number;
}
const add: Add = (x, y) => x + y;
```
函数类型对象写法的另一种应用场景，函数还有额外的属性。
```typescript
type Subtract = {
  (a: number, b: number): number;
  version: string;
}
const subtract: Subtract = (x, y) => x - y;
subtract.version = '1.0.1'; 

console.log(subtract) // (x, y) => x - y
console.log(subtract.version) // 1.0.1
```

需要注意的是函数类型里的参数名也是必要的，如果没有，会导致Typescript任务参数类型都是any。
```typescript
type Add = (number, number) => number; //  type Add = (number: any, number: any) => number
const add: Add = (x, y) => x + y;
```
函数类型里面的参数名与实际参数名，可以不一致。并不会导致报错。
```typescript
type Add = (a: number, b: number) => number;
const add: Add = (x, y) => x + y;
```
函数的实际参数个数，可以少于或等于类型指定的个数。但是不能多于类型指定的个数，会导致报错。
```typescript
type Add = (a: number, b: number) => number;

const add: Add = (x, y) => x + y;
const fun: Add = (x) => x

const fun2: Add = (x, y, z) => x + y + z // 报错  类型“(x: number, y: number, z: number) => number”的参数不能赋给类型“(a: number, b: number) => number”的参数。
```
***类型读取***

函数的类型可以通过 `typeof` 运算符读取。赋值给另一个函数的类型。
```typescript
function add(x: number, y: number): number {
  return x + y;
}
const addFunc = add;
const addFunc2: typeof add = add;
```
***Function类型***

TypeScript 提供 Function 类型表示函数，任何函数都属于这个类型。
```typescript
const add: Function = () => console.log('hello');

function add(x: number, f: Function):Function  {
  console.log(x)
  return f()
}
```
需要注意的时，Function 类型的函数可以接受任意数量的参数，每个参数的类型都是any，返回值的类型也是any，代表没有任何约束，所以不建议使用这个类型，给出函数详细的类型声明会更好。

***箭头函数***

箭头函数（Arrow Functions）是 JavaScript ES6 引入的一种简化函数表达式的语法。它们在 TypeScript 中也可以使用，具有一些独特的特性和优势。

```typescript
// 类型写在箭头函数的定义里
const add = (x: number, y: number): number => x + y;
// 使用箭头函数表示函数类型
const add: (x: number, y: number) => number = (x, y) => x + y;
```
如上面示例，类型写在箭头函数的定义里面，与使用箭头函数表示函数类型，写法有所不同，一个写在参数后面，一个写在 => 箭头后面吗，但结果是一样的。

***可选参数***

如果函数的某个参数可以省略，则在参数名后面加问号表示。

```typescript
function add(x: number, y?: number): number {
  if (y) {
    return x + y;
  }
  return x;
}
add(1, 2); // 3
add(1); // 1
```
***参数默认值***

如果函数的某个参数可以省略，则在参数名后面加等号和默认值，表示参数的默认值。

```typescript
function add(x: number, y:number = 1): number {
  return x + y;
}

add(1, 2); // 3
add(1); // 2
```
需要注意的是可选参数与默认值不能同时使用。以及设有默认值的参数，如果传入`undefined`也会触发默认值，因此具有默认值的参数如果不位于参数列表的末尾，调用时不能省略，如果要触发默认值，可以显式传入 `undefined` 。
```typescript
function add(x: number, y?:number = 1): number { // 报错 参数不能包含问号和初始化表达式。
  return x + y;
}

```
```typescript
function add(x: number, y:number = 1): number {
  return x + y;
}
add(1,undefined); // 2
```

***参数解构***

函数的参数可以使用解构获取需要的数据。
```typescript
function add({x, y = 1}: {x: number, y?: number}): number {
  return x + y;
}
add({x: 1}); // 2
add({x: 1, y: 2}); // 3
```
函数参数的结构，可以使用类型别名，使代码更加简洁，易于阅读和维护。
```typescript
type Point = {
  x: number;
  y: number;
};

function add({x, y = 1}: Point): number {
  return x + y;
}
```

***...(rest)参数***

在 TypeScript 中，rest 参数（剩余参数）允许我们将不定数量的参数作为数组传递给函数。这在处理可变数量的参数时非常有用。使用 rest 参数时，需要在参数前加上三个点（...），并且它必须是函数参数列表中的最后一个参数。

需要注意的是 ，它可以适用于数组和元祖。

```typescript
function add(x: number,...y: number[]): number {
  return x + y.reduce((acc, cur) => acc + cur, 0);
}


function add(x: number,...y: [number, number]): number {
  return x + y.reduce((acc, cur) => acc + cur, 0);
}
```
如果是元组，则需要我门声明每一个剩余参数的类型。元祖里面的参数可以使用可选参数。
```typescript
function add(x: number,...y: [number, number?, number?]): number {
  return x + y.reduce((acc, cur) => acc + cur, 0);
}
```
rest参数可以嵌套使用。也可以与变量解构一起使用。
```typescript
function add(x: number,...y: [number,...number[]]): number {
  return x + y.reduce((acc, cur) => acc + cur, 0);
}

function repeat(...[str, times]: [string, number]): string {
  return str.repeat(times);
}
// 等同于
function repeat(str: string, times: number): string {
  return str.repeat(times);
}
```

***只读参数***

在 TypeScript 中，如果你想要定义一个函数，使其参数为只读（即在函数内部不允许修改这些参数），可以使用 readonly 修饰符。这个修饰符通常用于数组和对象类型，以确保它们的内容在函数内部不会被修改。

```typescript
function printNumbers(numbers: readonly number[]): void {
    // numbers.push(4); // 这行代码会报错，因为 numbers 是只读的
    numbers.forEach(num => console.log(num));
}

const nums: number[] = [1, 2, 3];
printNumbers(nums); // 输出: 1, 2, 3
```
对于对象参数，可以使用 readonly 修饰符来确保对象的属性在函数内部不会被修改。

```typescript
interface User {
    readonly id: number;
    readonly name: string;
}

function printUser(user: User): void {
    // user.id = 2; // 这行代码会报错，因为 id 是只读的
    console.log(`ID: ${user.id}, Name: ${user.name}`);
}

const user: User = { id: 1, name: "Alice" };
printUser(user); // 输出: ID: 1, Name: Alice
```

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

::: tip
注意，never类型不同于void类型。前者表示函数没有执行结束，不可能有返回值；后者表示函数正常执行结束，但是不返回值，或者说返回undefined。
:::

***局部类型***

在 TypeScript 中，我们可以使用类型别名来定义一个局部类型，即在某个作用域内使用的类型。

```typescript
function hello(txt: string) {
  type message = string;
  let newTxt: message = "hello " + txt;
  return newTxt;
}

const newTxt: message = hello("world"); // 报错
```
上面示例中，类型message是在函数hello()内部定义的，只能在函数内部使用。在函数外部使用，就会报错。

***高阶函数***

一个函数的返回值还是一个函数，那么前一个函数就称为高阶函数（higher-order function）。

```typescript
(someValue: number) => (multiplier: number) => someValue * multiplier;
```

***函数重载***

在 TypeScript 中，函数重载允许我们为同一个函数定义多个不同的调用签名。这意味着你可以根据传入参数的类型和数量来实现不同的行为。函数重载的实现通常包括多个重载签名和一个实现签名。

```typescript
function greet(person: string): string;
function greet(person: string, age: number): string;
function greet(person: string, age?: number): string {
    if (age !== undefined) {
        return `Hello, ${person}. You are ${age} years old.`;
    } else {
        return `Hello, ${person}.`;
    }
}
// 使用重载
console.log(greet("Alice"));          // 输出: Hello, Alice.
console.log(greet("Bob", 30));        // 输出: Hello, Bob. You are 30 years old.
```
如上，前两行代码为重载签名，定义了函数可以接受的不同参数组合，第三行为实现签名，定义了函数的具体实现逻辑。

多种参数类型

```typescript
function combine(input1: number, input2: number): number;
function combine(input1: string, input2: string): string;
function combine(input1: number, input2: string): string;
function combine(input1: string, input2: number): string;
function combine(input1: any, input2: any): any {
    return input1.toString() + input2.toString();
}

// 使用重载
console.log(combine(1, 2));            // 输出: 3
console.log(combine("Hello, ", "World!")); // 输出: Hello, World!
console.log(combine(1, " apples"));     // 输出: 1 apples
console.log(combine("Number: ", 42));   // 输出: Number: 42
```

***构造函数***

JavaScript 语言使用构造函数，生成对象的实例。

构造函数的最大特点，就是必须使用new命令调用。

内置构造函数
```typescript
 const date = new Date() 
```
自定义构造函数

```typescript
  class Animal {
  numLegs: number = 4;
}

type AnimalConstructor = new () => Animal;

function create(c: AnimalConstructor): Animal {
  return new c();
}
const a = create(Animal);
```
采用对象形式的构造函数，如下F既可以当构造函数使用，又可以当普通函数使用。

```typescript
type F = {
  new (s: string): object;
  (n?: number): number;
};
```

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
