---
title: TypeScript-函数类型
author: 耶温
createTime: 2024/08/07 11:30:03
permalink: /TypeScript/6a3kyjf9/
---

函数的类型声明，需要在声明函数时，给出参数的类型和返回值的类型。

如果函数没有具体的返回值，可以使用 `void` 表示没有返回值。返回值的类型也可以不写，因为 TypeScript 自己会根据 有无 `return` 和返回值的类型推断出来。

## 函数定义
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

## 函数类型定义

可以使用 `type` 或 `interface` 来定义函数类型。
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
函数的类型还可以使用对象写法。需要注意的时，这种写法的函数参数与返回值之间，间隔符是冒号 `:` ，而不是正常写法的箭头 `=>` ，因为这里采用的是对象类型的写法，对象的属性名与属性值之间使用的是冒号。
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

需要注意的是函数类型里的参数名也是必要的，如果没有，会导致 Typescript 认为参数类型都是 `any`。
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
## 类型读取

函数的类型可以通过 `typeof` 运算符读取。赋值给另一个函数的类型。
```typescript
function add(x: number, y: number): number {
  return x + y;
}
const addFunc = add;
const addFunc2: typeof add = add;
```
## Function类型

TypeScript 提供 Function 类型表示函数，任何函数都属于这个类型。
```typescript
const add: Function = () => console.log('hello');

function add(x: number, f: Function):Function  {
  console.log(x)
  return f()
}
```
需要注意的时，Function 类型的函数可以接受任意数量的参数，每个参数的类型都是 `any` ，返回值的类型也是 `any` ，代表没有任何约束，所以不建议使用这个类型，给出函数详细的类型声明会更好。

## 箭头函数

箭头函数（Arrow Functions）是 JavaScript ES6 引入的一种简化函数表达式的语法。它们在 TypeScript 中也可以使用，具有一些独特的特性和优势。

```typescript
// 类型写在箭头函数的定义里
const add = (x: number, y: number): number => x + y;
// 使用箭头函数表示函数类型
const add: (x: number, y: number) => number = (x, y) => x + y;
```
如上面示例，类型写在箭头函数的定义里面，与使用箭头函数表示函数类型，写法有所不同，一个写在参数后面，一个写在  `=>` 箭头后面，但结果是一样的。

## 可选参数

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
## 参数默认值

如果函数的某个参数可以省略，则在参数名后面加等号和默认值，表示参数的默认值。

```typescript
function add(x: number, y:number = 1): number {
  return x + y;
}

add(1, 2); // 3
add(1); // 2
```
需要注意的是可选参数与默认值不能同时使用。以及设有默认值的参数，如果传入 `undefined` 也会触发默认值，因此具有默认值的参数如果不位于参数列表的末尾，调用时不能省略，如果要触发默认值，可以显式传入 `undefined` 。
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

## 参数解构

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

## ...(rest)参数

在 TypeScript 中， `rest` 参数（剩余参数）允许我们将不定数量的参数作为数组传递给函数。这在处理可变数量的参数时非常有用。使用 `rest` 参数时，需要在参数前加上三个点（ `...` ），并且它必须是函数参数列表中的最后一个参数。

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
`rest` 参数可以嵌套使用。也可以与变量解构一起使用。
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

## 只读参数

在 TypeScript 中，如果你想要定义一个函数，使其参数为只读（即在函数内部不允许修改这些参数），可以使用 `readonly` 修饰符。这个修饰符通常用于数组和对象类型，以确保它们的内容在函数内部不会被修改。

```typescript
function printNumbers(numbers: readonly number[]): void {
    // numbers.push(4); // 这行代码会报错，因为 numbers 是只读的
    numbers.forEach(num => console.log(num));
}

const nums: number[] = [1, 2, 3];
printNumbers(nums); // 输出: 1, 2, 3
```
对于对象参数，可以使用 `readonly` 修饰符来确保对象的属性在函数内部不会被修改。

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

## void类型

`void` 类型表示函数没有返回值。如果设置了 `void` 类型的函数，却返回了一个值，就会报错。但是需要注意的是，void 类型的函数可以返回 `undefined` 或 `null` 。

:::tip
关于void类型的详细内容可以查看：[void类型](/TypeScript/e9ystght/#void类型)
:::

## never类型

`never` 类型表示肯定不会出现的值。它用在函数的返回值，就表示某个函数肯定不会返回值，即函数不会正常执行结束。
:::tip
关于never类型的详细内容可以查看：[never类型](/TypeScript/e9ystght/#never类型)
:::

::: tip
注意， `never` 类型不同于 `void` 类型。前者表示函数没有执行结束，不可能有返回值；后者表示函数正常执行结束，但是不返回值，或者说返回 `undefined` 。
:::

## 局部类型

在 TypeScript 中，我们可以使用类型别名来定义一个局部类型，即在某个作用域内使用的类型。

```typescript
function hello(txt: string) {
  type message = string;
  let newTxt: message = "hello " + txt;
  return newTxt;
}

const newTxt: message = hello("world"); // 报错
```
上面示例中，类型 `message` 是在函数 `hello()` 内部定义的，只能在函数内部使用。在函数外部使用，就会报错。

## 高阶函数

一个函数的返回值还是一个函数，那么前一个函数就称为高阶函数（higher-order function）。

```typescript
(someValue: number) => (multiplier: number) => someValue * multiplier;
```

## 函数重载

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

## 构造函数

JavaScript 语言使用构造函数，生成对象的实例。

构造函数的最大特点，就是必须使用 `new` 命令调用。

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
