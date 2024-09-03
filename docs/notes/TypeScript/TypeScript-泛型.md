---
title: TypeScript-泛型
author: 耶温
createTime: 2024/09/03 09:32:12
permalink: /TypeScript/nhs7zknn/
---

# TypeScript-泛型

## 泛型是什么

泛型是TypeScript的核心特性之一，它允许我们在定义函数、接口或类时不具体指定类型，而是在使用时再指定类型。泛型可以让我们编写更加通用、灵活的代码，提高代码的重用性和可维护性。

## 泛型函数

我们可以使用 `<T>` 来定义泛型函数，写在函数名后面，其中 `T` 是一个类型变量，表示函数的参数和返回值类型。在使用泛型函数时，我们可以指定具体的类型，也可以让TypeScript自动推断类型。

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const output1 = identity<string>("myString");
const output2 = identity<number>(42);
// or 自动推断
const output3 = identity("myString");
const output4 = identity(42);
```

同样可以定义多个泛型，使用逗号隔开。需要注意的是类型参数的名字，可以随便取。不过我们一般使用 `T` 、`U` 、`V`等大写字母来实现。

```typescript
function identity<T, U>(arg: T, arg2: U): T {
  console.log(arg2);
  return arg;
}

const output1 = identity<string[], number[]>("myString", 42);
```
对于变量形式定义的函数，需要下面写法。

```typescript
let my:<T>(arg: T) => T = fun;
// or 
let my: {<T>(arg: T) : T} = fun;
```


## 泛型接口

同样的，接口 `interface` 也可以使用泛型写法。

```typescript
interface Person<T, U> {
  name: T;
  age: U;
}

const person1: Person<string, number> = { name: "John", age: 30 };
const person2: Person<number, string> = { name: 42, age: "30" };
```
泛型接口继承。

```typescript
interface Person<T> {
  name: T;
}

interface Employee<U> extends Person<U> {
  id: U;
}

const employee: Employee<string> = { name: "John", id: '42' };
const employee2: Employee<number> = { name: 42, id: 123 };
```



## 泛型类

泛型类与泛型函数类似，类型参数写在类名后。

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };
```
泛型类继承，和泛型接口相似。

```typescript
class Person<T> {
  name: T;
}

class Employee<U> extends Person<U> {
  id: U;
}

const employee: Employee<string> = { name: "John", id: '42' };
const employee2: Employee<number> = { name: 42, id: 123 };
```

泛型类的表达式写法。
```typescript
const GenericNumber = class<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
};

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };
```

关于泛型类，需要注意的是，泛型类描述的是类的实例，不包括定义在类本身的静态属性和静态方法。

## 泛型类型别名
使用 `type` 命令定义的类型别名，也可以使用泛型。

```typescript
type Container<T> = { value: T };

type Tree<T> = {
  value: T;
  left: Tree<T> | null;
  right: Tree<T> | null;
};

type Nullable<T> = T | null|undefined;
```
如上，`Container` 是一个泛型类型别名，`Tree` 是一个嵌套的泛型类型别名，`Nullable` 是一个联合类型别名。

## 泛型默认值

可以为泛型类型指定默认值，当使用泛型类型时，如果没有指定类型参数，就会使用默认值。

```typescript
function createArray<T = string>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray(3, "x"); // ['x', 'x', 'x']
```
不过，TypeScript 会从实现参数中推断出类型参数，从而覆盖掉原本默认值。

```typescript
function createArray<T = string>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray(3,3); // [3, 3, 3]
```
上面实例中，`value` 参数的类型被推断为 `number`，所以默认值 `string` 被覆盖了。


泛型参数的默认值，我们可以用在类中。

```typescript
class GenericNumber<T = number> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber(); // 默认是 number 类型

myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };


myGenericNumber.zeroValue = '0'; // 报错 不能将类型“string”分配给类型“number”
```
需要注意，泛型参数如果有默认值，那么这个参数在函数调用时是可选的。如果有多个参数，可选参数需要在必选参数之后。

## 泛型数组

泛型数组，就是泛型类型数组，数组中的元素类型是泛型类型。

```typescript
let list: Array<number> = [1, 2, 3];

let list2: Array<string> = ['1', '2', '3'];

let list3:number[] = [1, 2, 3];

let list4:string[] = ['1', '2', '3'];
```

上面示例中，`Array<number>` 其实就是一个泛型，类型参数的值是 `number`。

```typescript
interface Array<Type> {
  length: number;

  pop(): Type | undefined;

  push(...items: Type[]): number;

  // ...
}
```

## 泛型参数的约束
泛型参数可以约束，约束泛型参数的类型，比如，泛型参数必须是某个类的实例，或者泛型参数必须实现某个接口。

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); 
  return arg;
}


loggingIdentity({length: 10, value: 3});
loggingIdentity(3);  // Error 类型“number”的参数不能赋给类型“Lengthwise”的参数。
```
如上，泛型参数 `T` 被约束为 `Lengthwise` 接口，所以 `arg` 参数必须实现 `Lengthwise` 接口。



类型参数可以同时设置约束调节和默认值，但是默认值需要满足约束的条件。

```typescript
type Fn<A extends string, B extends string = "world"> = [A, B];

type Result = Fn<"hello">; // ["hello", "world"]
```

除此之外，如果有多个类型参数，一个类型参数的约束条件可以引用其他参数。
```typescript
<T, U extends T>
// 或者
<T extends U, U>
```
## 泛型使用注意点

1. 尽量少用泛型。虽然泛型比较灵活，但是会增加代码复杂性，可读性变差。
2. 类型参数越少越好。类型参数越多，代码可读性越差。
3. 类型参数至少出现两次，如果只有一次，则说明该参数不是必要的。
4. 泛型可以嵌套，但是会增加代码复杂性，可读性变差。





