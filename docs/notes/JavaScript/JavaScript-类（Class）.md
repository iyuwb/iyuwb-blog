---
title: JavaScript-类（Class）
author: 耶温
createTime: 2024/08/25 14:05:32
permalink: /JavaScript/6l5coz2j/
---


> JavaScript 中的类（Class）是 ES6（ECMAScript 2015）引入的一种语法糖，用于创建对象和处理继承。类提供了一种更清晰和简洁的方式来创建构造函数和原型继承。

> 类实际上是“特殊的函数”，就像你能够定义的函数表达式和函数声明一样，类也有两种定义方式：类表达式和类声明。


## 类的定义

使用 `class` 关键字定义一个类，包括类名、属性、方法等。


`constructor` 方法是用于创建和初始化一个由类创建的对象的特殊方法。一个类只能拥有一个名为`constructor`的特殊方法。

```javascript
// 类声明
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
  }
}
// 类表达式
const Person = class {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
  }
};
```
注意点：
-   非私有属性和方法，存在多个同名属性，会覆盖前面的属性。
-   私有属性和方法，必须唯一。不能存在同名。

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.name = "Alice"; // 非私有属性，会覆盖前面的属性
  }
}

const person2 = new Person("Bob", 30);
console.log(person2.name); // 输出：Alice
```
## 字段声明
如果实例属性的值不依赖构造函数的参数。可以把它们定义为类字段。

```javascript
class Rectangle {
  height = 0; // 带有默认值的字段声明
  width ;
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

```

## 类的实例

使用 `new` 关键字创建一个类的实例。

```javascript
const person1 = new Person("Alice", 25);
const person2 = new Person("Bob", 30);

person1.sayHello(); // 输出：Hello, my name is Alice and I'm 25 years old.
```
## 类的方法

类的方法被定义在类实例的原型上并且被所有实例共享。方法可以是普通函数、异步函数、生成器函数或异步生成器函数。

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // 普通方法
  sayHello() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
  }
 
  // 生成器方法
  *getAttributes() {
    yield this.name;
    yield this.age;
  }

  // 异步方法
  async getAttributes2() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([this.name, this.age]);
      }, 1000);
    });
  }
}

const person1 = new Person("Alice", 25);
person1.sayHello(); // 输出：Hello, my name is Alice and I'm 25 years old.
console.log(person1.getAttributes()); // 输出：Object [Generator] {}
console.log([...person1.getAttributes()]) // 输出：["Alice", 25]
console.log(await person1.getAttributes2()) // 输出：["Alice", 25]
```

如上例中，`getAttributes` 方法返回一个生成器对象，可以循环遍历生成器对象。`async getAttributes2` 方法返回一个 Promise 对象，使用 `await` 关键字等待 Promise 对象的结果。


## 类的继承

使用 `extends` 关键字实现类的继承。需要注意的是，子类中如果定义了构造函数，那么它必须先调用 super() 才能使用 this。
```javascript
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age); // 调用父类的构造函数
    this.grade = grade;
  }

  sayGrade() {
    console.log(`I'm in grade ${this.grade}.`);
  }
}

const student1 = new Student("Eve", 20, 10);
student1.sayHello(); // 输出：Hello, my name is Eve and I'm 20 years old.
student1.sayGrade(); // 输出：I'm in grade 10.
```

## super 关键字

`super` 关键字用于调用父类的构造函数和方法。

```javascript
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  saySubject() {
    super.sayHello(); // 调用父类的 sayHello 方法
    console.log(`I teach ${this.subject}.`);
  }
}

const teacher1 = new Teacher("John", 40, "Math");
teacher1.saySubject(); // 输出：Hello, my name is John and I'm 40 years old. I teach Math.
```

## 类的静态方法和属性

使用 `static` 关键字定义静态方法和属性。静态方法和属性是属于类本身而不是类的实例。可以直接通过类名访问。

```javascript
class MathUtils {
  static pi = 3.14;

  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }
}

console.log(MathUtils.pi); // 输出：3.14
console.log(MathUtils.add(2, 3)); // 输出：5
console.log(MathUtils.multiply(2, 3)); // 输出：6

const mathUtils = new MathUtils(); 
console.log(mathUtils.pi); // 报错：Cannot read property 'pi' of undefined
console.log(mathUtils.add(2, 3)); // 报错：Cannot read property 'add' of undefined
```

## 私有属性和方法

使用 `#` 前缀定义私有属性和方法。私有属性和方法只能在类的内部访问，不能在类的外部访问。

```javascript
class Person {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  #sayHello() {
    console.log(`Hello, my name is ${this.#name} and I'm ${this.#age} years old.`);
  }

  sayHello() {
    this.#sayHello();
  }
}

const person1 = new Person("Alice", 25);
person1.sayHello(); // 输出：Hello, my name is Alice and I'm 25 years old.
// person1.#name = "Bob"; // 报错：Cannot access private property
// person1.#sayHello(); // 报错：Cannot access private method or property
```


## Setters 和 Getters

使用 `get` 和 `set` 关键字定义属性的 Getter 和 Setter。Getter 用于读取属性值，Setter 用于设置属性值。

```javascript
class Person {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
  }

  get age() {
    return this.#age;
  }

  set age(value) {
    this.#age = value;
  }
}

const person1 = new Person("Alice", 25);
console.log(person1.name); // 输出：Alice
person1.name = "Bob";
console.log(person1.name); // 输出：Bob
```


