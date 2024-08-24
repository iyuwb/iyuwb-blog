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

::: tip  implements
关于implements更多信息请查看[TypeScript-命令方法](/TypeScript/sa54awwt/#implements-命令)
:::

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

## 类与接口的合并

同名的类和接口可以同时存在，并且会被合并成一个类。

```typescript
class Person {
  name: string = 'yuwb';
}

class Person {
  age: number;
}

let person = new Person();
person.age = 10;

console.log(person.name)  // yuwb
console.log(person.age)  // 10

```

## Class 类型

在 TypeScript 中，类本身就是一种类型，但是它代表该类的实例类型，而不是类本身的类型。

```typescript
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const person: Person = new Person('yuwb', 10);
```

类作用类型使用时，只能表示实例类型，不能表示类本身的类型。我们需要使用 typeof 获取类自身的类型。

```typescript
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

function createPerson(PersonClass: Person,name:string,age:number): Person {  // 错误
  return new PersonClass(name, age);
}

// 需要使用 typeof 获取类的类型
function createPerson(PersonClass: typeof Person,name:string,age:number): Person{  // 正确
  return new PersonClass(name, age);
}
```

Class 也遵循 结构类型原则，一个对象只要满足Class实例结构，就跟该Class一个类型。
::: tip
结构类型原则是指 TypeScript 的类型系统是基于对象的结构而不是名称。也就是说，两个不同的类型如果具有相同的结构（属性和方法），那么它们就可以互相替代。
:::
```typescript
class Foo {
  id!: number;
}

function fn(arg: Foo) {
  // ...
}

const bar = {  // 有Class Foo的全部属性
  id: 10,
  amount: 100,
};

fn(bar); // 正确
```
同样的，如果两个Class类结构完全一致，那么它们也可以互相赋值。不仅是类，如果对象和类的结构完全一致，Type
```typescript
class Foo {
  id!: number;
}

class Bar {
  id!: number;
}

// 类
let foo = new Foo();
let bar = new Bar();

foo = bar; // 正确
bar = foo; // 正确

// 对象
foo = { id: 10 }; // 正确
let foo2: Foo = { id: 10 } // 正确
console.log(foo2 instanceof Foo); // false
```
需要注意的是，由于上面这种情况，因此`instanceof`不适用于判断某个对象是否跟某个 class 属于同一类型。
## Class类型兼容
如果两个类结构不完全一致，但是一个类包含了另一个类的所有属性。我们就会说这两个类符合类型兼容。 
```typescript
class Foo {
  id!: number;
}

class Bar {
  id!: number;
  amount!: number;
}

const foo:Bar = new Foo(); // 错误
const bar:Foo = new Bar();  // 正确
```
如上例中，Bar类包含了Foo类的所有属性，根据类型兼容原则，Bar类可以赋值给Foo类。反之则不行。

空类不包括任何属性，因此空类与任何类以及对象都符合类型兼容。

```typescript
class Empty {}

function fn(x: Empty) { // 这里的x可以是任何对象
  // ...
}

fn({});
fn(window);
fn(fn);
```
关于类的类型兼容，还有一点需要注意的是，只检查实例成员，不考虑静态成员和构造方法。
```typescript
class Point {
  x: number;
  y: number;
  static t: number; // 静态成员
  constructor(x: number) {} // 构造方法
}

class Position {
  x: number;
  y: number;
  z: number;
  constructor(x: string) {} // 构造方法
}

const point: Point = new Position("");
```


## 类的继承

类的继承是指一个类可以继承另一个类的属性和方法。通过extends关键字实现。

```typescript
class Person { // 父类
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
class Student extends Person { // 子类继承父类
  constructor(name: string, age: number) {
    super(name, age);// 调用父类的构造方法
  }
  sayHello(): void { // 重写父类的方法
    // super.sayHello(); // 该写法可以调用父类的方法
    console.log(`Hello, my name is ${this.name} and I am a student`);
  }
}

const student = new Student("yuwb", 10);
student.sayHello(); // Hello, my name is yuwb and I am a student

// 根据类型兼容性原则，Student也可以赋值给Person类型
const student2:Person = new Student("yuwb2", 12);
student2.sayHello(); // Hello, my name is yuwb2 and I am a student
```
如上例中，Student类继承了Person类的属性和方法，并且重写了sayHello方法。需要注意的是在重写父类方法时，子类的同名方法不能与父类的类型定义相冲突，不然会报错。

子类继承父类是，如果父类包括保护成员（protected），那么子类也可以继承这些保护成员。并且可以将访问权限设置为公开（public）。但是不能修改为私有成员（private）。

```typescript
class Person {
  protected name: string;
  protected age: number;
}
class Student extends Person {
  // 正确
  public name: string;
  // 正确
  protected name: string;
  // 错误
  private name: string;
}
```

在使用类的继承时，`extends`关键字后面不一定是一个类，也可以一个表达式。

```typescript

// 例一
class MyArray extends Array<number> {}

// 例二
class MyError extends Error {}

```



