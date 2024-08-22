---
title: TypeScript-类（Class）
author: 耶温
createTime: 2024/08/22 15:44:21
permalink: /TypeScript/wy5zf1gm/
---
在 TypeScript 中，类（class）是面向对象编程的一个重要概念。类可以用来创建对象，并可以包含属性和方法。

## 定义类

要定义一个类，使用 `class` 关键字。类的属性可以在顶层声明，也可以在构造方法内部中声明。

```typescript
class Person {
  name: string;
  age: number;
}

// 或者
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

## 只读属性

可以使用 `readonly` 关键字定义只读属性。只读属性不能被修改。

```typescript
class Person {
  readonly name: string = 'yuwb';
}
// 或者
class Person {
  readonly name: string;
  constructor() {
    this.name = 'yuwb';
  }
}

const person = new Person();
person.name = 'yuwb2'; // 报错
```
## 方法类型
类的方法就是一个函数，类型声明与函数声明一致。

```typescript
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  sayHello(otherName:string): void {
    console.log(`Hello ${otherName}, my name is ${this.name}`);
  }
}
```
## 函数默认值与重载

类的方法跟普通函数一样，可以使用参数默认值，以及函数重载。

```typescript
class Person {
  name: string;
  age: number;
  constructor(name: string = 'John', age: number = 30) {
    this.name = name;
    this.age = age;
  }
  sayHello(otherName: string = 'Mark'): void {
    console.log(`Hello ${otherName}, my name is ${this.name}`);
  }
}
```
函数重载，需要注意的是构造方法不能声明返回值。因为它总是返回示例对象

```typescript
class Sum {
  constructor(x: number);
  constructor(x: string);
  constructor(x: number | string) {
    // ...
  }

  fun(x: string): void;
  fun(x: number): void;
  fun(x: string | number): void {
    // ...
  }
```

## 存取器
存取器（accessor）是特殊的类方法，包括取值器（getter）和存值器（setter）两种方法。
-    取值器（getter）：用于获取属性值。
-    存值器（setter）：用于设置属性值。

```typescript
class Person {
  private _name: string;
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
}
```
注意点：
-   如果某一个属性只有get方法，没有set方法，那么该属性自动成为只读属性。
```typescript
class Person {
  _name: string = 'Mark';
  get name(): string {
    return this._name;
  }
}
const person = new Person();
person.name = 'yuwb'; // 报错
```
-   set方法的参数类型，必须兼容get方法的返回值类型，否则报错。
```typescript
class Person {
  private _name: string;
  get name(): string {
    return this._name;
  }
  set name(value: number | string) {
    this._name = String(value); // 正确
  }
}
```
-   get方法与set方法的可访问性必须一致，要么都为公开方法，要么都为私有方法。

## 属性索引
类允许定义属性索引。
```typescript
class Person {
  [key: string]: string;
  // or [key: string]: string ｜((key: string) => void) ; // 包含方法
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
```

## 类的interface接口

interface 接口或 type 别名，可以用对象的形式，为 class 指定一组检查条件。然后，类使用 implements 关键字，表示当前类满足这些外部类型条件的限制。



需要注意的是，interface 只是指定检查条件，如果不满足这些条件就会报错。它并不能代替 class 自身的类型声明。包括类的属性和方法。
```typescript
interface Person {
  name: string;
  age: number;
  sayHello(): void;
}
// 或者
type Person = {
  name: string;
  age: number;
  sayHello(): void;
};

class Person implements Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  sayHello(): void {
    console.log(`Hello, my name is ${this.name}`);
  }
}
```
类也可以定义接口没有声明的方法和属性。

```typescript
interface Person {
  name: string;
  age: number;
  sayHello(): void;
}

class Person implements Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  sayHello(): void {
    console.log(`Hello, my name is ${this.name}`);
  }

  sayGoodbye(): void {
    console.log(`Goodbye, my name is ${this.name}`);
  }
}
```
implements关键字还可以是另一个类。只不过会把后面的类将被当作接口使用。不能省略属性和方法。

```typescript
class Car {
  id: number = 1;
  move(): void {}
}

class MyCar implements Car {
  id = 2; // 不可省略
  move(): void {} // 不可省略
}
```



