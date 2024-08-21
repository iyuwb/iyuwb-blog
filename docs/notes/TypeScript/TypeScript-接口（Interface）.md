---
title: TypeScript-接口（Interfaces）
author: 耶温
createTime: 2024/08/21 15:08:50
permalink: /TypeScript/efqwfrfq/
---
在 TypeScript 中，接口（Interfaces）是一种强大的工具，用于定义对象的结构和类型。接口可以描述对象的属性、方法以及它们的类型，从而提供类型检查和代码提示。接口在 TypeScript 中的主要作用是增强代码的可读性和可维护性。


## 定义接口

要定义一个接口，使用 `interface` 关键字，并在接口名后加上花括号 `{}`。在花括号中，定义接口的属性和方法。属性可以是简单类型，也可以是复杂类型（如数组、对象等）。方法可以是简单的函数声明，也可以是函数表达式。

```typescript
interface Person {
  name: string;
  age: number;
  greet(): void;
}
```

下面是实现一个接口的例子：

```typescript
const obj: Person = {
  name: 'John',
  age: 30,
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
};
```

## 类型读取

和其他类型一样，可以使用方括号`[]`读取接口某个属性的类型。

```typescript
interface Person {
  name: string;
}

type nameType = Person['name']; // string
```

## 接口表示对象语法
interface 可以表示对象的各种语法，主要有对象属性，对象的属性索引，对象方法，函数，构造函数等。


1. 对象属性。可以使用`?`表示属性是可选的。使用`readonly`表示属性是只读的。

```typescript
interface Person {
  readonly name: string;
  age: number;
  address?: string;
}
```

2. 对象的属性索引。可以使用`[]`表示属性是索引的。需要注意属性索引共有三种类型：`string`, `number`, `symbol`。

```typescript
interface Person {
  [key: string]: string;
}
```

3. 对象方法。

```typescript
interface Person {
  greet(name:string): void;
}
// 或者
interface Person {
  greet: (name:string) => void;
}
// 或者
interface Person {
  greet: {(name:string): void}
}
```
对象的属性名可以采用表达式。

```typescript
const name = 'name'
interface Person {
  [name](name:string): void;
}
```
类型方法可以重载。

```typescript
interface Person {
  greet(name:string): void;
  greet(name:string, age:number): void;
}
```
interface 里定义的函数重载，不需要具体实现。由于对象内部定义方法时，无法使用函数重载的语法，所以需要额外在对象外部给出函数方法的实现。如下面例子中，MyFunc函数的实现需要在对象外部给出。

```typescript

interface A {
  f(): number;
  f(x: boolean): boolean;
  f(x: string, y: string): string;
}

function MyFunc(): number;
function MyFunc(x: boolean): boolean;
function MyFunc(x: string, y: string): string;
function MyFunc(x?: boolean | string, y?: string): number | boolean | string {
  if (x === undefined && y === undefined) return 1;
  if (typeof x === "boolean" && y === undefined) return true;
  if (typeof x === "string" && typeof y === "string") return "hello";
  throw new Error("wrong parameters");
}

const a: A = {
  f: MyFunc,
};
```


4. 函数。interface 可以声明对立的函数类型。

```typescript
interface Person {
  (name:string): void;
}

// 实现
const person: Person = (name:string) => {
  console.log(name);
}
```
5. 构造函数。interface 内部可以使用 `new` 关键字来表示构造函数。

```typescript

interface Person {
  new (name:string): Person;
}

```

## 接口继承

接口可以继承其他类型。

1. interface 继承 interface。使用 `extends` 关键字。

```typescript
interface Person {
  name: string;
  age: number;
}

interface Student extends Person {
  grade: string;
}
```
接口还允许多重继承。可以继承多个接口。

```typescript
interface Style {
  color: string;
}

interface Shape {
  name: string;
}

interface Circle extends Style, Shape {
  radius: number;
}
```
需要注意的事，多重继承时，如果多个父接口存在同名属性，那么这些同名属性不能有类型冲突，否则会报错。

2. interface 继承 type。使用 `extends` 关键字。

```typescript
type Person = {
  name: string;
  age: number;
};

interface Student extends Person {
  grade: string;
}
```
3. interface 继承 class。使用 `extends` 关键字。

```typescript
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

interface Student extends Person {
  grade: string;
}

// 实现
const student: Student = {
  name: "John",
  age: 20,
  grade: "A",
}
```


## 接口合并

多个同名的接口会合并成一个接口。

```typescript
interface Person {
  name: string;
  age: number;
}

interface Person {
  address: string;
}
```
合并后的接口会保留所有属性的类型。如上例中，合并后的接口会保留 `name` 和 `age` 属性，以及`address` 属性。

接口合并，可以方便我们在使用外部库或者全局对象时，添加自定义属性。

举例来说，Web 网页开发经常会对windows对象和document对象添加自定义属性，但是 TypeScript 会报错，因为原始定义没有这些属性。解决方法就是把自定义属性写成 interface，合并进原始定义。

```typescript
interface Document {
  foo: string;
}

document.foo = "hello";
```
如上，如果我们直接使用 `document.foo = "hello"` 会报错，因为 `document` 是一个全局对象，没有 `foo` 属性。但是如果我们把 `foo` 写成 interface，合并进原始定义，就不会报错了。


同名接口合并时，如果有同名属性，那么这些同名属性不能有类型冲突，否则会报错。如果有同名方法，那么会发生函数重载。而且，后面的定义比前面的定义具有更高的优先级。

```typescript
interface A {
  a: number;
}

interface A {
  a: string; // 报错
}
```

```typescript
interface Cloner {
  clone(animal: Animal): Animal;
}

interface Cloner {
  clone(animal: Sheep): Sheep;
}

interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}

// 等同于
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
  clone(animal: Sheep): Sheep;
  clone(animal: Animal): Animal;
}
```
需要注意的式，如果合并的方法中，有一个方法的参数是字面量类型的话，那么字面量类型有更高的优先级。

```typescript
interface A {
  f(x: "foo"): boolean;
}

interface A {
  f(x: any): void;
}

// 等同于
interface A {
  f(x: "foo"): boolean;
  f(x: any): void;
}
```

如果两个 interface 组成的联合类型存在同名属性，那么该属性的类型也是联合类型。

```typescript
interface Circle {
  area: bigint;
}

interface Rectangle {
  area: number;
}

declare const s: Circle | Rectangle;

s.area; // bigint | number

```

## interface 与 type 的区别

interface 与 type 命令，都可以表示对象类型。


1. type 能够表示非对象类型，interface 只能够表示对象类型。
2. interface 可以继承其他接口，type 不止能继承，但是可以使用`&`实现继承效果。
```typescript
// interface 使用 extends
interface Person {
  name: string;
  age: number;
}
interface Student extends Person {
  grade: string;
}

// type 使用 &
type Person = {
  name: string;
  age: number;
};
type Student = Person &  {
  grade: string;
}
```
在继承时，type和interface的是可以相互继承的。

```typescript
type Person = {
  name: string;
  age: number;
};
interface Student extends Person {
  grade: string;
}

// 或者
interface Person {
  name: string;
  age: number;
}
type Student = Person &  {
  grade: string;
}
```

3. 同名的 interface 会合并成一个 interface，而同名的 type 会报错，在TypeScript 中不允许同名的 type。

```typescript
type Person = {
  name: string;
  age: number;
};
type Person = {
  address: string;
} // 报错
```
4. type 可以使用 `keyof` 关键字获取对象的属性名。interface 不能使用 `keyof` 关键字获取对象的属性名，会导致报错。


```typescript
type Person = {
  name: string;
  age: number;
};

type PersonKeys = keyof Person; // "name" | "age"

type PersonCopy = {
  [key in keyof Person]: Person[key];
};

interface PersonCopy {
  [key in keyof Person]: Person[key];
}; // 报错

```
5. this 关键字只能在 interface 中使用。

```typescript
// 正确
interface Foo {
  add(num: number): this;
}

// 报错
type Foo = {
  add(num: number): this;
};
```
6. type 可以扩展原始数据类型，interface 不行。

```typescript
// 正确
type MyStr = string & {
  type: "new";
};

// 报错
interface MyStr extends string {
  type: "new";
}
```

7. interface无法表达某些复杂类型（比如交叉类型和联合类型），但是type可以。

```typescript
type A = {
  /* ... */
};
type B = {
  /* ... */
};

type AorB = A | B;
type AorBwithName = AorB & {
  name: string;
};
```
