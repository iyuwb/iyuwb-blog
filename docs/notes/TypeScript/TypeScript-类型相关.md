---
title: TypeScript-类型相关
author: 耶温
createTime: 2024/07/27 15:20:17
permalink: /TypeScript/jkrsnple/
---

## 类型声明

TypeScript 代码最明显的特征，就是为 JavaScript 变量加上了类型声明。

1. 定义变量
```ts
let 变量名:类型 = 变量值;
```
示例：
```ts
let str:string = 'string'
```
注意:

- 变量的值应该与声明的类型一致，如果不一致，TypeScript 就会报错。如下图：
<img src="@source/notes/TypeScript/images/image-01.png" style="width:80%;margin:0 10%" />
- TypeScript 规定，变量只有赋值后才能使用，否则就会报错。如下图：
<img src="@source/notes/TypeScript/images/image-02.png" style="width:80%;margin:0 10%" />
2. 定义函数



```ts
function 方法名(参数1:类型,参数2:类型,...):返回值类型 {
    //方法体
}
// or
const 方法名=(参数1:类型,参数2:类型,...):返回值类型 => {
    //方法体
}
```
示例：
```ts
function toString(num: number): string {
  return String(num);
}
// or
const toString = (num: number): string => {
  return String(num);
}
```

## 类型推断

1. 正确推断

在 TypeScript 中，我们可以不指定变量的类型，而是让 TypeScript 自动推断出变量的类型。

但是需要注意的是，如果后续变量更改为其它类型的值，TypeScript 会报错。如下：
<img src="@source/notes/TypeScript/images/image-03.png" style="width:80%;margin:0 10%" />

2. 无法正确推断

在某些时候，TypeScript 无法正确推断出变量的类型，那么 TypeScript 会默认这变量的类型是 any 。如下图：
<img src="@source/notes/TypeScript/images/image-04.png" style="width:80%;margin:0 10%" />


## 类型污染

在使用 `any` 类型的变量时，有一点特别需要注意的是，它会污染其他特定类型的变量，使其失去特定的类型。并且还不会提醒报错。如下图：
<img src="@source/notes/TypeScript/images/image-05.png" style="width:80%;margin:0 10%" />

我们把 `any` 类型的 `str` 赋值给 `num`，并没有报错。此时我们打印 `num` 。输出为 字符串`Hello，World！` 。可见此时的 `num` 变量已经变成了字符串类型。但是在下面接着调用数字的 toFixed 方法时。也没有相关错误提示。

但是如果我们运行这段代码，就会报错。如下：
```sh
Hello, World!
num.toFixed(2);
    ^
TypeError: num.toFixed is not a function
```

## 类型断言

在 TypeScript 中，类型断言（Type Assertion）可以告诉编译器某个值被视为特定类型。它并不会改变运行时的行为，而只是告诉 TypeScript 编译器如何处理这个值。

换句话说，它可以帮助你告诉编译器：“我知道这个值实际上是某种类型，请信任我。”
:::tip
- 类型断言不会进行任何类型检查或结构验证，因此在使用时要确保你对数据的结构有足够的了解。
- 尖括号语法在 JSX 中会与 React 的语法冲突，因此在使用 React 时推荐使用 `as` 语法。
:::

语法形式:

- 尖括号语法 (`<Type>value`)
- as 语法 (`value as Type`)


示例:

```ts
// 假设我们有一个接口
interface Person {
    name: string;
    age: number;
}

// 一个函数返回一个 `any` 类型的对象
function getPerson(): any {
    return {
        name: "Alice",
        age: 30
    };
}

// 使用类型断言将 `any` 类型转换为 `Person` 类型
const person = getPerson() as Person;

// 现在我们可以安全地访问 `person` 的属性
console.log(person.name); // 输出: Alice
console.log(person.age);  // 输出: 30


// 使用尖括号语法进行类型断言
const person2 = <Person>getPerson();

// 访问属性
console.log(person2.name); // 输出: Alice
console.log(person2.age);  // 输出: 30
```

对于没有类型声明的变量，Tpesccript 会进行类型推断，但是有些时候，类型推断的结果可能不是我们想要的。这时，我们可以使用类型断言来指定变量的类型。
```typescript
type T  = 'a'|'b'|'c'
let t = 'a'  // 推断为 string 类型
let t1 :T = t  // 报错 不能将类型“string”分配给类型“T”。
// 需要断言 
let t1 :T = t as T
```
对象类型有严格的字面量检查，如果存在多余的属性，也会报错。这时，我们可以使用类型断言来指定对象的类型。
```typescript
const person:{
    name: string;
    age: number;
} = {
    name: "Alice",
    age: 30,
    gender: "female" // 报错  对象字面量只能指定已知属性，并且“gender”不在类型“{ name: string; age: number; }”中
}

// 断言为以下  正确
const person:{
    name: string;
    age: number;
} = {
    name: "Alice",
    age: 30,
    gender: "female"
} as {  // 断言为与等号左边一致
    name: string;
    age: number;
}
// 或者
const person:{
    name: string;
    age: number;
} = {
    name: "Alice",
    age: 30,
    gender: "female"
} as { // 断言为等号右边类型是左边类型的子类型，子类型可以赋值给父类型
    name: string;
    age: number;
    gender: string;
}
```
实际示例：
```typescript
const username = document.getElementById("username");

if (username) {
  (username as HTMLInputElement).value; // 正确
}
```
如上，我们使用类型断言将 `username` 转换为 `HTMLInputElement` 类型，这样我们就可以访问 `value` 属性了。否则会因为 `HTMLElement` 没有 `value` 属性报错。

1. 类型断言的条件

我们在使用类型的断言的时候，并不能把某个值断言为任意类型。类型断言是有前提条件的。值的实际类型与断言的类型必须满足一个条件。前者是后者的子子类型 或者 后者是前者的子类型。

```typescript
expr as T  // expr 是 T 的子类型 或者 T 是 expr 的子类型
```

换句话说，实际类型可以断言为一个更加宽泛的类型，也可以断言为一个更加具体的类型。但是不能断言为一个和原值没有关系的类型。

但是我们可以借用 `unknown` 类型，连续断言两次，将任意类型断言为任意类型。因为 `unknown` 类型是所有类型的子类型。
```typescript
// 或者写成 <T><unknown>expr
expr as unknown as T;
```

2. as const 断言

`as const` 是 TypeScript 提供的一种类型断言，用于将一个对象字面量断言为具有所有属性均为字面量类型的类型。


如果没有声明变量的类型，`let` 命令声明的变量会被推断为 Typescript 内置的基本类型之一。对于 `const` 命令声明的变量，则被推断为值类型常量。

```typescript
let s = 'JavaScript' // 推断为 string 类型

const s = 'JavaScript' // 推断为 'JavaScript' 类型

let s = 'JavaScript' as const // 推断为 'JavaScript' 类型
```

需要注意的是，`as const` 只能作用于枚举成员、字符串、数字、布尔值、数组或对象字面量。不能作用于变量，表达式等。
```typescript
let s = 'JavaScript'
let s1 = s as const // 报错 

let s = ('java' + 'script') as const // 报错
```

`as const` 的前置写法为 `<const>exper` 。

`as const` 断言可以作用域整个对象，也可以用于对象的单个属性。
···
```typescript
const v1 = {
  x: 1,
  y: 2,
}; // 类型是 { x: number; y: number; }

const v2 = {
  x: 1 as const,
  y: 2,
}; // 类型是 { x: 1; y: number; }

const v3 = {
  x: 1,
  y: 2,
} as const; // 类型是 { readonly x: 1; readonly y: 2; }
```


## 类型缩小

在 TypeScript 中，类型缩小（Type Narrowing）是指通过特定的检查或条件，缩小一个变量的类型范围，从而使得 TypeScript 能够更准确地推断出该变量的具体类型。这种特性可以提高代码的类型安全性，减少运行时错误。

常见方式

-   使用 `typeof` 进行类型检查
-   使用 `instanceof` 进行类型检查
-   使用自定义类型保护
-   使用联合类型的特性

1. 使用`typeof` 

```typescript
function example(value: string | number) {
    if (typeof value === "string") {
        // 在这里，TypeScript 知道 value 是 string 类型
        console.log(value.toUpperCase());
    } else {
        // 在这里，TypeScript 知道 value 是 number 类型
        console.log(value.toFixed(2));
    }
}

example("hello"); // 输出: HELLO
example(123.456); // 输出: 123.46
```
2. 使用`instanceof` 
```typescript
class Dog {
    bark() {
        console.log("Woof!");
    }
}

class Cat {
    meow() {
        console.log("Meow!");
    }
}

function makeSound(animal: Dog | Cat) {
    if (animal instanceof Dog) {
        // 在这里，TypeScript 知道 animal 是 Dog 类型
        animal.bark();
    } else {
        // 在这里，TypeScript 知道 animal 是 Cat 类型
        animal.meow();
    }
}

makeSound(new Dog()); // 输出: Woof!
makeSound(new Cat()); // 输出: Meow!

```
3. 自定义类型保护

```typescript
function isString(value: any): value is string {
    return typeof value === "string";
}

function example(value: string | number) {
    if (isString(value)) {
        // 在这里，TypeScript 知道 value 是 string 类型
        console.log(value.toUpperCase());
    } else {
        // 在这里，TypeScript 知道 value 是 number 类型
        console.log(value.toFixed(2));
    }
}

example("hello"); // 输出: HELLO
example(123.456); // 输出: 123.46

```

4. 联合类型的特性

```typescript
function printId(id: number | string) {
    console.log("Your ID is: " + id);
}

printId(101); // 输出: Your ID is: 101
printId("202"); // 输出: Your ID is: 202
```

## 类型别名

在 TypeScript 中，类型别名（Type Alias）是一种为现有类型创建新名称的方式。它可以使代码更具可读性和可维护性，同时也提高了代码的类型安全性。

:::tip
关于类型别名的详细内容可以查看：[Type 命令](/TypeScript/sa54awwt/#type-命令)
:::

## 类型兼容

在 TypeScript 中，如果一个类型的结构与另一个类型的结构相匹配，那么这两个类型是兼容的。也就是说，只要一个类型包含了另一个类型的所有属性，它就可以被视为兼容。

示例：

```typescript
type Person = {
    name: string;
    age: number;
};

type Employee = {
    name: string;
    age: number;
    position: string;
};

// Employee 兼容 Person，因为 Employee 包含了 Person 的所有属性
const employee: Employee = {
    name: "Alice",
    age: 30,
    position: "Developer",
};

const person: Person = employee; // 合法
```

如上，由于 `Employee` 包含了 `Person` 的所有属性，因此 `Employee` 类型是 `Person` 类型的子类型。因此，我们可以将 `Employee` 赋值给 `Person` 类型的变量。相反，则不行，会报错。


```typescript
type T = number | string;

let a: number = 1; 
let b: T = a;  // 正确
```
```typescript
let a: "hi" = "hi";
let b: string = "hello";

b = a; // 正确
a = b; // 报错
```

## 类型读取

在 TypeScript 中，类型读取（Type Lookup）是指通过特定的语法来获取某个类型的属性或方法的类型。这种特性可以帮助我们在编写代码时更好地利用已有的类型信息，提高代码的可读性和可维护性。

1. 使用 `keyof` 操作符

`keyof` 操作符可以获取一个对象类型的所有键，并返回一个联合类型。

```typescript
interface Person {
    name: string;
    age: number;
}
type PersonKeys = keyof Person; // "name" | "age"
```
2. 使用索引访问类型

```typescript
interface Person {
    name: string;
    age: number;
}
type NameType = Person["name"]; // string
type AgeType = Person["age"];   // number
```

3. 使用条件类型

```typescript
type IsString<T> = T extends string ? "Yes" : "No";

type Test1 = IsString<string>; // "Yes"
type Test2 = IsString<number>; // "No"
```