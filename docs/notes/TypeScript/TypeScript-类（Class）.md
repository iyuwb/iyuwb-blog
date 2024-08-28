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

在使用类的继承时，`extends`关键字后面不一定是一个类，也可以一个表达式。需要返回类型符合某个接口或类的结构或者返回一个构造函数。
```typescript

// 例一
class MyArray extends Array<number> {}

// 例二
class MyError extends Error {}

```

## 可访问性修饰符

在TypeScript中，可访问行修饰符是指在类的属性或方法上使用的修饰符。可访问行修饰符可以控制属性或方法的访问权限，包括公有（public）、私有（private）、保护（protected）。

在使用定义时，三个修饰符的位置，都写在属性或方法的最前面。

-    public：公有属性或方法，在类的外部和子类中都可以访问。
-    private：私有属性或方法，只能在类的内部访问，类的实例和子类都不能使用该成员。
-    protected：保护属性或方法，只能在类的内部和子类中访问，类的实力不能使用该成员。

**`public`**

public 修饰符是默认的，可以省略不写。表示是公开成员，外部可以自由访问。

```typescript
class Person {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  public sayHello(): void {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const person = new Person("yuwb");
person.sayHello(); // Hello, my name is yuwb
```

**`private`**

private 修饰符表示私有成员，只能在类的内部访问，类的实例和子类都不能使用该成员。

```typescript
class Person {
  private name: string;
  constructor(name: string, age: number) {
    this.name = name;
  }
}
const person = new Person("yuwb");
person.name; // 属性“name”为私有属性，只能在类“Person”中访问。
  
class Student extends Person {
  constructor(name: string) {
    super(name);
  }
}

const student = new Student("yuwb");
student.name; // 属性“name”为私有属性，只能在类“Person”中访问。
```
如上所示，子类不能继承父类的私有成员，类的实例也不能访问私有成员。同样的子类不能重新定义父类的私有成员。

```typescript
class Person {
  private age = 0;
}

class Student extends Person {
  age = 1; // 报错
}
```
我们可以在类的内容，用当前类的实例来获取私有成员。
```typescript
class Person {
  private age = 0;
  getAge(data:Person){
    return data.age;
  }
}
const person = new Person();
person.getAge(person); // 0
```
::: tip
需要注意的是，private定义的成员，并不是真正的私有成员，而是编译时的私有成员。在编译后的代码中，仍然可以访问到该成员。而且在Typescript中我们也可以通过`[]`方括号写法，直接获取实例对象的私有成员。
:::
```typescript
class Person {
  private age = 0;
}

const person = new Person();
person["age"]; // 0

if('age' in person){
  // 是
}
```
ES6后续版本，JavaScript的类已经支持私有成员，以我们可以使用`#`来定义私有成员。不再推荐使用private来定义私有成员。

```typescript
class Person {
  #age = 0;
}

const person = new Person();
person["#age"]; // undefined
```

在Class中，不止属性和方法可以使用可访问性修饰符，构造函数也可以使用private修饰符。

```typescript
class Person {
  name: string;
  private constructor(name: string) {
    this.name = name;
  }
  static create(name: string) {
    return new Person(name);
  }
}

const person = Person.create("yuwb");
person.name; // "yuwb"
```
如上所示，我们使用private修饰符，将构造函数设置为私有，那么我们无法通过new关键字来创建实例。但是我们可以通过静态方法来创建实例。



**`protected`**

protected 修饰符表示保护成员，只能在类的内部和子类中访问，类的实例不能使用该成员。

```typescript
class Person {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Student extends Person {
  constructor(name: string) {
    super(name);
  }
  sayHello(): void {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const student = new Student("yuwb");
student.sayHello(); // Hello, my name is yuwb
student.name; // 属性“name”受保护，只能在类“Person”及其子类中访问。
```
如上所示，子类可以继承父类的保护成员，并且可以在子类中访问。但是类的实例不能访问保护成员。

同时，我们也可以在子类中，将父类的保护成员，修改为公开成员。
```typescript
class Person {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Student extends Person {
  constructor(name: string) {
    super(name);
  }
  public name: string;
  sayHello(): void {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const student = new Student("yuwb");
student.sayHello(); // Hello, my name is yuwb
student.name; // "yuwb"
```


## 实例属性简写

在TypeScript中，我们可以使用实例属性简写来定义类的属性。实例属性简写是在类的构造函数中，直接定义属性。

```typescript
class Person {
  constructor(public name: string, public age: number) {}
}

const person = new Person("yuwb", 18);
console.log(person.name); // "yuwb"
console.log(person.age); // 18
```
如上所示，我们在构造函数中，直接定义了两个属性，并且使用了public修饰符，表示是公开成员，外部可以自由访问。

同时，readonly修饰符也可以使用在实例属性简写中。并且可以和可访问性修饰符一起使用。
```typescript
class Person {
  constructor(public readonly name: string, public age: number) {}
}

const person = new Person("yuwb", 18);
console.log(person.name); // "yuwb"
console.log(person.age); // 18
person.name = "yuwb1"; // 报错 属性“name”是只读的。
```

## 静态成员

在TypeScript中，我们可以使用 `static` 关键字来定义静态成员，包括属性和方法。静态成员是类级别的成员，可以通过类名直接访问，而不是通过实例来访问。

```typescript
class Person {
  static name: string = "yuwb";
  static sayHello(): void {
    console.log(`Hello, my name is ${this.name}`);
  }
}

Person.name; // "yuwb"
Person.sayHello(); // Hello, my name is yuwb
```
如上所示，我们使用 `static` 关键字，定义了两个静态成员，一个静态属性 `name` 和静态方法 `sayHello` 。我们可以通过类名直接访问这两个静态成员。

`stacic` 也可以和访问性修饰符一起使用。但是需要注意的是，修饰符需要放到 `static` 关键字之前。
```typescript
class Person {
  public static  aname: string = "yuwb";
  private static  sayHello(): void {
    console.log(`Hello, my name is ${this.aname}`);
  }
}

Person.aname; // "yuwb"
Person.sayHello(); // 报错 属性“sayHello”为私有属性，只能在类“Person”中访问。
```

其中 `public` 和 `protected` 的静态成员，可以被继承类访问。
```typescript
class Person {
  public static  aname: string = "yuwb";
  protected static  sayHello(): void {
    console.log(`Hello, my name is ${this.aname}`);
  }
}

class Student extends Person {
  static sayHello(): void {
    super.sayHello();
  }
}

Student.sayHello(); // Hello, my name is yuwb
```
## 泛型类



