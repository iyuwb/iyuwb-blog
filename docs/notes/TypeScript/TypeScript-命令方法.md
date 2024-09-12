---
title: TypeScript-命令方法
author: 耶温
createTime: 2024/07/31 17:43:20
permalink: /TypeScript/sa54awwt/
---

##  type 命令

在 TypeScript 中， `type` 关键字用于定义类型别名。类型别名可以是基本类型、联合类型、交叉类型、元组、对象类型等等使用 `type` 可以让代码更具可读性和可维护性。

***基本语法***

```typescript
type 类型别名 = 类型;
```

***注意事项***
-   不可拓展
-   不能重新定义，同一作用域内不能重名
-   允许嵌套，在一个 `type` 里使用另一个 `type`


示例：

1. 基本类型别名
```typescript
type StringOrNumber = string | number;

let value: StringOrNumber;
value = "Hello"; // 合法
value = 42;      // 合法
valeue = true;   // 非法 报错
```

2. 函数类型别名

```typescript
type GreetFunction = (name: string) => string;

const greet: GreetFunction = (name) => {
    return `Hello, ${name}!`;
};

console.log(greet("Bob")); // 输出: Hello, Bob!
```
3.  对象类型别名

```typescript
type Person = {
    name: string;
    age: number;
};

const person: Person = {
    name: "Alice",
    age: 30
};
```
4. 联合类型别名
```typescript
type Status = "success" | "error" | "loading";

let currentStatus: Status;
currentStatus = "success"; // 合法
currentStatus = "failed";  // 错误: 不能将类型“"failed"”分配给类型“Status”。
```

5. 交叉类型别名

```typescript

type Person = {
    name: string;
    age: number;
};

type Address = {
    street: string;
    city: string;
};

type PersonWithAddress = Person & Address;

const personWithAddress: PersonWithAddress = {
    name: "Alice",
    age: 30,
    street: "123 Main St",
    city: "Wonderland"
};
```

## interface 命令

在 TypeScript 中， `interface` 命令用于定义对象类型。它可以用来描述对象的结构和行为，也可以用来定义函数类型。

:::tip
关于 `interface` 的详细内容可以查看：[TypeScript-interface](/TypeScript/efqwfrfq/)
:::


## typeof 运算符

在 TypeScript 中， `typeof` 运算符用于获取一个值的类型，并返回一个字符串表示该类型的名称。这与 JavaScript 中的行为类似，但在 TypeScript 中这个功能还可以被用来推断变量或表达式的类型。

1. JavaScript 中的 `typeof` 运算符

```js
console.log(typeof 5); // "number"
console.log(typeof "hello"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (这是一个已知的特殊情况)

console.log(typeof []); // "object"
console.log(typeof {}); // "object"
console.log(typeof 123n) // "bigint"
console.log(typeof Symbol("name")) // "symbol"
console.log(typeof parseInt); // "function"
```

2. TypeScript 中的 `typeof` 运算符

```typescript
let myValue = 10;
type MyValueType = typeof myValue; //  number 

const a = { x: 0 };
type T0 = typeof a; // { x: number }
type T1 = typeof a.x; // number
```

```typescript
let a = 1;
let b: typeof a;

if (typeof a === "number") {
  b = a;
}

// 上面转成JS后
let a = 1;
let b;
if (typeof a === "number") {
  b = a;
}
```

从上面的示例可以看出：

-   `typeof` 运算符可以在运行时获取变量的类型。转成 Javascript 后， `typeof` 运算符会保留。
-   在 TypeScript 中， `typeof` 还可以用于获取变量的类型并在类型注解中使用，增强了类型的复用性和代码的可读性。用于 TypeScript 类型相关的代码，会在转成 Javascript 后， `typeof` 运算符会被删除。



## keyof 运算符

在 TypeScript 中， `keyof` 运算符用于获取一个对象类型的所有键，并返回一个联合类型。它可以用于类型推断和类型检查。

1. 基本用法

```typescript
interface Person {
    name: string;
    age: number;
}

type PersonKeys = keyof Person; // "name" | "age"
```


2. keyof 与映射类型

```typescript
interface Person {
    name: string;
    age: number;
}

type ReadonlyPerson = {
    readonly [K in keyof Person]: Person[K];
};

const person: ReadonlyPerson = {
    name: "Alice",
    age: 30
};
```


## as 命令

在 TypeScript 中，`as` 关键字用于类型断言（Type Assertion），它允许开发者告诉编译器某个值的具体类型。它可以将一个值的类型断言为另一个类型。

1. 基本用法

```typescript
let myValue: any = 10;
let myNumber: number = myValue as number; // 类型断言
```

2. 断言接口

```typescript
interface Person {
    name: string;
    age: number;
}

let person: any = { name: "John", age: 30 };
let john = person as Person;
```

需要注意的是，除了 `as` 关键字外，TypeScript 还支持另一种类型断言的语法，即使用尖括号。

-   不过在 JSX 中，尖括号语法可能会与 HTML 标签冲突，因此推荐使用 `as` 语法。

```typescript
let myValue: any = 10;
let myNumber: number = <number>myValue; // 类型断言

interface Person {
    name: string;
    age: number;
}

let person: any = { name: "John", age: 30 };
let john = <Person>person;
```



## implements 命令


在 TypeScript 中， `implements` 关键字用于实现接口（interface）。当一个类实现一个接口时，它必须提供接口中定义的所有属性和方法的具体实现。这种机制使得 TypeScript 支持面向对象编程中的多态性和接口的概念。

1. 基本用法

```typescript
// 定义一个接口
interface Animal {
    name: string;
    sound(): void;
}

// 实现接口的类
class Dog implements Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    sound() {
        console.log(`${this.name} says Woof!`);
    }
}

// 创建实例
const dog = new Dog('Buddy');
dog.sound(); // 输出: Buddy says Woof!
```

2. 多个接口实现。一个类可以实现多个接口，类必须提供所有接口中定义的属性和方法。

```typescript
interface CanRun {
    run(): void;
}

interface CanBark {
    bark(): void;
}

class Dog implements CanRun, CanBark {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    run() {
        console.log(`${this.name} is running.`);
    }

    bark() {
        console.log(`${this.name} says Woof!`);
    }
}

const dog = new Dog('Buddy');
dog.run(); // 输出: Buddy is running.
dog.bark(); // 输出: Buddy says Woof!
```

3. 接口的继承

接口可以继承其他接口，类在实现时需要实现所有继承的接口中的属性和方法。

```typescript
interface Animal {
    name: string;
}

interface Dog extends Animal {
    bark(): void;
}

class Beagle implements Dog {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    bark() {
        console.log(`${this.name} says Woof!`);
    }
}

const beagle = new Beagle('Max');
beagle.bark(); // 输出: Max says Woof!
```
## namespace 命令

在 TypeScript 中， `namespace` 关键字用于定义命名空间。命名空间是一种组织和隔离代码的方式，它可以将相关的代码组织到一个范围内。



## declare 命令

在 TypeScript 中， `declare` 关键字用于声明全局变量、全局函数、全局类型等。它可以帮助编译器识别这些声明，从而提供更好的类型检查和代码补全功能。换句话说 `declare` 关键字用来告诉编译器，某个类型是存在的，可以在当前文件中使用。

> 它的主要作用，就是让当前文件可以使用其他文件声明的类型。举例来说，自己的脚本使用外部库定义的函数，编译器会因为不知道外部函数的类型定义而报错，这时就可以在自己的脚本里面使用 `declare` 关键字，告诉编译器外部函数的类型。这样的话，编译单个脚本就不会因为使用了外部类型而报错。

**基础示例**

```typescript
// 直接使用其他文件定义的类型会报错
globalVariable = 'Hello' // 报错

// 可以使用declare 命令给出它的类型，就不会报错。
declare const globalVariable: string;
globalVariable = 'Hello'; // 正确
```
如上所示，使用 `declare` 命令可以告诉编译器，某个类型是存在的，可以在当前文件中使用。

需要注意的是：

-   `declare` 关键字，它只是通知编译器某个类型是存在的，不用给出具体实现。比如，只描述函数的类型，不给出函数的实现，如果不使用 `declare` ，这是做不到的。

-   `declare` 只能用来描述已经存在的变量和数据结构，不能用来声明新的变量和数据结构。另外，所有 `declare` 语句都不会出现在编译后的文件里面。

**描述类型**

-   变量
-   type 或者 interface 声明的类型
-   类（class）
-   枚举（enum）
-   函数（function）
-   模块（module）
-   命名空间（namespace）

**变量**

`declare` 关键字可以给出外部变量的类型描述。例如：当前的脚本中使用了其他文件定义的全局变量，但是编译器不知道这个变量的类型，这时可以使用 `declare` 关键字来描述这个变量的类型。

```typescript
declare var globalVariable: string;
globalVariable = 'Hello';
```
**函数**

`declare` 关键字可以给出外部函数的类型描述。

```typescript
declare function greet(name: string): void;
greet('Alice');
```
**类（Class）**

`declare` 关键字可以给出外部类的类型描述。

```typescript
declare class Person {
    name: string;
    age: number;
    constructor(name: string, age: number);
    sayHello(): void;
}
```
**模块和命名空间**

`declare` 关键字可以给出外部模块和命名空间的类型描述。下面示例中的`export`关键字可以省略。

```typescript
declare module 'moduleName' {
    export interface MyInterface {
        property: string;
        method(): void;
    }
}

declare namespace MyNamespace {
    export const myConstant: number;
    export function myFunction(): void;
}
```
举例说明，下面例子中使用了 `myDemoLib` 外部库定义的类型，但是编译器不知道这个类型的具体实现，这时可以使用`declare` 关键字来描述这个类型。

```typescript
// 类型描述
declare namespace myDemoLib {
    export function sayHello(message: string): string;
    export const count: number;
}
// 外部库使用
let result = myDemoLib.sayHello("你好");
let count = myDemoLib.count;
```


## abstract 命令
在 TypeScript 中， `abstract` 关键字用于定义抽象类和抽象方法。抽象类是不能被实例化的类，只能被继承。抽象成员是抽象类中定义的成员，必须在子类中实现。

```typescript
abstract class Person {
  abstract name: string;
  abstract sayHello(): void;
}

class Student extends Person {
  name: string = "yuwb";
  sayHello(): void {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const student = new Student();
student.sayHello(); // Hello, my name is yuwb
```


## asserts 命令

在 TypeScript 中，asserts 关键字用于类型保护，允许你在函数中进行类型断言，以确保某个条件为真时，特定的类型是有效的。这通常用于自定义类型保护函数，以便在运行时检查某个值的类型，并在检查通过后，告知 TypeScript 编译器该值的类型。

类型保护函数示例：

```typescript
// 定义一个类型
type User = {
    name: string;
    age: number;
};

// 自定义类型保护函数
function assertIsUser(user: any): asserts user is User {
    if (typeof user !== 'object' || user === null) {
        throw new Error('Not a user');
    }
    if (typeof user.name !== 'string' || typeof user.age !== 'number') {
        throw new Error('Invalid user properties');
    }
}

// 使用类型保护函数
function processUser(user: any) {
    assertIsUser(user); // 运行时检查
    // 这里 TypeScript 知道 user 是 User 类型
    console.log(`User name: ${user.name}, age: ${user.age}`);
}

// 测试
const userInput: any = { name: 'Alice', age: 30 };
processUser(userInput); // 正常工作

const invalidInput: any = { name: 'Bob', age: 'thirty' };
processUser(invalidInput); // 抛出错误
```
换句话说，该函数用来断言参数 `user` 的类型是 `User`，如果参数 `user` 的类型不是 `User`，则抛出错误。程序就会在这里中断。如果达到要求，则 `user` 的类型会被断言为 `User`，从而在后续代码中可以安全地使用 `User` 类型的属性和方法。


## is 命令

在 TypeScript 中，is 关键字通常用于类型保护，帮助 TypeScript 确定某个变量的具体类型。它通常与用户自定义的类型保护函数一起使用。

基础示例：

```typescript
function isString(value: any): value is string {
    return typeof value === 'string';
}

function processValue(value: any) {
    if (isString(value)) {
        console.log(`Value is a string: ${value.toUpperCase()}`);
    } else {
        console.log(`Value is not a string`);
    }
}
```