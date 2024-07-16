---
title: JavaScript-原型链
author: 耶温
createTime: 2024/05/11 15:05:45
permalink: /JavaScript/6osmhhn5/
---
# JavaScript-原型链

## 构造函数创建对象

构造函数创建一个`Person`对象

```javascript
function Person() {}
var person = new Person();
person.name = "Yevin";
console.log(person.name);

//输出：Yevin
```

Person 为一个构造函数

person 为一个实例对象，使用构造函数 Person 创建的

## `prototype`

每个函数都有一个`prototype`属性，指向该函数的原型对象

> `prototype` 是函数才有的属性

```javascript
function Person() {}
Person.prototype.name = "Yevin";
var person1 = new Person();
var person2 = new Person();
console.log(person1.name);
console.log(person2.name);
//输出
//"Yevin"
//"Yevin"
```

函数的`prototype` 属性指向了一个对象，这个对象是调用该构造函数而创建的实例的原型。

也就是上面代码中 `person1` 与 `person2` 的原型

**原型是什么：**

> 每一个 JavaScript 对象(null 除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型继承属性

> 继承：一般来说继承意味着复制操作，但是在Javascript中，继承并不会复制对象的属性，而是在两个对象中建立一个关联。相当于委托。

**用一张图表示构造函数和实例之间的关系：**

![](https://yevin.gitee.io/yiran/img/01-1.png#align=left&display=inline&height=415&margin=%5Bobject%20Object%5D&originHeight=415&originWidth=848&status=done&style=none&width=848)

- `Person`：构造函数
- `Person.prototype`：实例原型

## `__proto__`

> 每一个 JavaScript 对象(除了 null)都具有一个属性叫做`__proto__`，这个属性会指向该对象的原型

通过代码证明：

```javascript
function Person() {}
person = new Person();
console.log(person.__proto__ === Person.prototype);

//输出 true
```

更新`person`与构造函数`Person`和实例原型`Person.prototype`的关系图：

![](https://yevin.gitee.io/yiran/img/01-2.png#align=left&display=inline&height=505&margin=%5Bobject%20Object%5D&originHeight=505&originWidth=850&status=done&style=none&width=850)

实例对象与构造函数都可以指向原型

## `constructor`

`constructor`：每一个原型都有一个`constructor`属性指向关联的构造函数

验证方法：

```javascript
function Person() {}
console.log(Person === Person.prototype.constructor);
//输出  true
```

因此再次更新`person`与构造函数`Person`和实例原型`Person.prototype`的关系图：

![](https://yevin.gitee.io/yiran/img/01-3.png#align=left&display=inline&height=458&margin=%5Bobject%20Object%5D&originHeight=458&originWidth=781&status=done&style=none&width=781)

```javascript
//因此可知
function Person() {}
var person = new Person();
console.log(person.__proto__ == Person.prototype); //为True
console.log(Person.prototype.constructor == Person); //为True
console.log(Object.getPrototypeOf(person) === Person.prototype); // true
```

`getPrototypeOf`：ES5 中的方法，可以获得对象的原型

## 实例与原型

> 当读取实例属性的时候，如果找不到该属性，就会自动查找与对象关联的原型中的属性，如果还查不到，就会去查找原型的原型，一直找到最顶层。

eg：

```javascript
function Person() {}
Person.prototype.name = "wenbo";
var person = new Person();
person.name = "Yevin";
console.log(person.name); //Yevin
delete person.name;
console.log(person.name); // wenbo
```

当`person`对象有`name`属性时，打印输出的为`person`对象中 `name`属性的值。

当删除掉`person`的`name`属性时，打印时`person`没有`name`属性就会通过`person`的原型也就是`person.__proto__`或者`Person.prototype`用来查找`name`属性。

## 原型的原型

> 原型也是一个对象，可以通过最原始的方法构建

```javascript
var obj = new Object();
obj.anme = "Yevin";
console.log(obj.name); //"Yevin"
```

> 原型对象就是通过`Object`构造函数生成的，结合上面所说，实例的`__proto__`指向构造函数的`prototype`

更新关系图：

![](https://yevin.gitee.io/yiran/img/01-4.png#align=left&display=inline&height=587&margin=%5Bobject%20Object%5D&originHeight=587&originWidth=850&status=done&style=none&width=850)

## 原型链

> `Object.prototype`的原型为`null`

验证：

```javascript
console.log(Object.prototype.__proto__ === null); // true
```

> `null` 标识'没有对象'，即该处不应该有值

`Object.prototype.__proto__`的值为`null`，`Object.prototype` 没有原型

说明查找属性时查到`Object.prototype` 就可以停止查找了

最后更新关系图：

![](https://yevin.gitee.io/yiran/img/01-5.png#align=left&display=inline&height=722&margin=%5Bobject%20Object%5D&originHeight=722&originWidth=803&status=done&style=none&width=803)

图中相互关联的原型组成的链状结构就是原型链，也就是红色这条线

### 注意：

`constructor`属性：

```javascript
function Person() {}
var person = new Person();
console.log(person.constructor === Person); //true
```

如上代码所示：

原因是因为获取`person.constructor`时，`person`没有`constructor`属性，当不能读取到 constructor 属性时，会从`person`的原型中读取，因此：

```javascript
person.constructor === Person.prototype.constructor;
```

`__proto__`:

绝大部分浏览器都支持这个非标准的方法访问原型，然后它并不存在于`Person.prototype`中，实际上，他是来自`Object.prototype` ，与其说时一个属性，不如说是`getter/setter`，当使用`obj.__proto__`时，可以理解返回了`Object.getPrototypeOf(obj)`。

继承：

> 继承意味着复制操作，然后 JavaScript 默认并不会复制对象的属性，相反 JavaScript 只是在两个对象之间建立一个关联，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫做继承，委托的说法更准确些。
