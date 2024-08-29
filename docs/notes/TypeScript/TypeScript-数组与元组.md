---
title: TypeScript-数组与元组
author: 耶温
createTime: 2024/08/07 11:29:17
permalink: /TypeScript/lvw1ydmu/
---
## 数组类型

Array 数组是一个可以存储多个相同类型的值的集合。你可以使用 Array 类型或简写的 `[]` 语法来定义数组。数组的成员数量是可以动态变化的。

### 定义数组

```typescript
// 使用 Array 类型
let numbers: Array<number> = [1, 2, 3];

// 使用 [] 语法
let names: string[] = ["Alice", "Bob", "Charlie"];
    
// 数组有多种类型
let mixed: (number | string)[] = [1, "two", 3];
let mixed2: Array<number | string> = [1, "two", 3];
```
### 动态成员

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

### 类型读取

TypeScript 允许使用方括号读取数组成员的类型。

```typescript
type Names = string[];
// name 的类型为 string
type Name = Names[0]; // string   
```
数组成员的索引类型都是 `number` ，所以读取成员类型也可以写成下面这样。

```typescript
type Names = string[];
type Name = Names[number]; // string
```

### 类型推断

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

### 只读数组

在JavaScript中，数组是可以修改的，所以如果想让数组只读，可以使用 `readonly` 关键字。

```typescript
let numbers: readonly number[] = [1, 2, 3];
numbers.push(4); // 报错，类型“readonly number[]”上不存在属性“push”。
```
TypeScript 将 `readonly number[]` 与 `number[]` 视为两种不一样的类型，后者是前者的子类型。前者没有数组的相关方法，所以使用`push`等方法会报错。

因为 `readonly number[]` 是 `number[]` 的子类型，所以 `number[]` 可以赋值给 `readonly number[]` 类型的变量。反之则会报错。

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

### 多位数组

TypeScript 使用 `T[][]` 的形式，表示二维数组，T是最底层数组成员的类型。


```typescript
let matrix: number[][] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
```
转为 JavaScript 后，会变成二维数组。  
```js
let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
```

## 元组类型

在 TypeScript 中，元组类型是一种特殊的数组类型，它允许我们定义一个固定数量的元素，每个元素可以是不同的类型。元组的定义方式与数组类似，但在元组中，你需要指定每个元素的类型。

### 定义元组

在使用定义元组时，必须明确声明每个成员的类型。如果把类型省略，则 `Typescript` 会自动把变量推断为数组。

```typescript
// 定义一个元组类型，包含一个字符串和一个数字
let tuple: [string, number];
// 初始化元组
tuple = ["hello", 42]; // 正确
tuple = ["yuwb", 28]; // 正确
tuple = ["yuwb", 28, "123"]; // 报错 不能将类型“[string, number, string]”分配给类型“[string, number]”。
```
从上面可以看到，定义元组和数组的区别，数组是 `number[]` , 元组是 `[number]` 。 一个写在方括号中，一个写在括号外。

### 可选元组

元组成员的类型可以添加问号后缀（ `?` ），表示该成员是可选的。需要注意的，问号只能用于元组的尾部成员，也就是说，所有可选成员必须在必选成员之后。

```typescript
let tuple: [string, number];
tuple = ["hello"]; // 报错 不能将类型“[string]”分配给类型“[string, number]”。

// 使用可选元组
let tuple2: [string, number?];
tuple2 = ["hello"]; // 正确
tuple2 = ["hello", 42]; // 正确
```

### 固定类型和数量

元组的成员数量是固定的，不能动态变化。由于需要声明每个成员的类型，所以大多数情况下，元组的成员数量是有限的，从类型声明就可以明确知道，元组包含多少个成员，越界的成员会报错。

```typescript
let x: [string, string] = ["a", "b"];

x[2] = "c"; // 报错 不能将类型“"c"”分配给类型“undefined”。长度为 "2" 的元组类型 "[string, string]" 在索引 "2" 处没有元素

x[1]= "c"; // 正确
x[1]= 1; // 报错 不能将类型“number”分配给类型“string”。
```

### 不限成员数量

用扩展运算符（ `...` ），可以表示不限成员数量的元组。

```typescript
type NamedNums = [string, ...number[]];
const a: NamedNums = ["A", 1, 2];
const b: NamedNums = ["B", 1, 2, 3];
```
元组类型 `NamedNums` 的第一个成员是字符串，后面的成员使用扩展运算符来展开一个数组，从而实现了不定数量的成员。


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

### 类型读取

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
### 只读元组

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

### 成员数量的推断

如果没有可选成员和扩展运算符，TypeScript 会推断出元组的成员数量（即元组长度）。

```typescript
function f(point: [number, number]) {
  if (point.length === 3) {    // 报错
    // ...
  }
}
```
上面代码报错，原因时固定元组的长度最大为 2，不可能为 3。

如果包含可选成员，则会推断出可能的成员数量。

```typescript
function f(point: [number, number?, number?]) {
  if (point.length === 4) {    // 报错
    // ...
  }
}
```
上面代码报错，原因是元组的长度可能是 1，2，3 不可能为 4。

需要注意的是，如果元组包含可选成员和扩展运算符，则不会推断出成员数量。
```typescript
const myTuple: [...string[]] = ["a", "b", "c"];
if (myTuple.length === 4) {
  // 正确
  // ...
}
```
::: tip
注意：元组一旦使用扩展运算符使得元组的成员数量无法推断， Typescript 内部就会把该元组当成数组来处理。
:::

### 扩展运算符与成员数量

扩展运算符（ `...` ）将数组（注意，不是元组）转换成一个逗号分隔的序列，这时 TypeScript 会认为这个序列的成员数量是不确定的，因为数组的成员数量是不确定的。

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
