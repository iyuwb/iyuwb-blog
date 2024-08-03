---
title: TypeScript-基础数据类型
author: 耶温
createTime: 2024/07/26 20:39:29
permalink: /TypeScript/n7di7t58/
---


> TypeScript 是一种静态类型的 JavaScript 超集，它为 JavaScript 添加了可选的类型注解。这使得开发者可以在编写代码时使用各种数据类型，并且 TypeScript 编译器能够根据这些类型信息提供编译时检查，从而帮助发现潜在的错误。

## 基本类型
JavaScript 语言（注意，不是 TypeScript）将值分成 8 种类型。TypeScript 继承了 JavaScript 的类型设计，以下 8 种类型可以看作 TypeScript 的基本类型。

| 数据类型   | 描述  |
|------------|---------|
| `boolean`  | 代表逻辑值，只能是 `true` 或 `false`。 |
| `string`   | 用于表示文本字符串。可以使用单引号、双引号或反引号定义。|
| `number`   | 用于表示整数和浮点数。在 TypeScript 中，所有的数字都是 `number` 类型。|
| `bigint`   | 用于表示任意精度的大整数。在数值后面加上 `n` 来定义 bigint。 |
| `symbol`   | 用于创建唯一的键，通常用于对象的键。可以通过 `Symbol()` 函数创建。 |
| `object`   | 代表非原始数据类型。在 TypeScript 中，大多数复杂的数据类型（如数组和类实例）都属于 `object` 类型。 |
| `undefined`| 用于表示尚未赋值的变量。 |
| `null`     | 用于表示一个空值。在 TypeScript 中，`null` 是 `object` 类型的一个子类型。|

注意，上面所有类型的名称都是小写字母，首字母大写的Number、String、Boolean等在 JavaScript 语言中都是内置对象，而不是类型名称。

## boolean 类型

boolean 类型表示逻辑值，只能是 true 或 false。
```typescript
let boolVar: boolean = true;
let boolVar2: boolean = false;
```
包装对象
```typescript
let x: boolean = new Boolean(true); // 报错
let x: Boolean = new Boolean(true); // 正确
```
如上面所示，我们在定义的变量的时候，需要根据使用的是包装对象或者字面量来判断变量的类型是使用小写`boolean`还是大写`Boolean`。



## string 类型

string 类型表示文本字符串。可以使用单引号、双引号或反引号定义。
```typescript
let str: string = "Hello, World!";
let str2: string = `${x}, Hi, TypeScript!";`;
```
包装对象
```typescript
let str: string = new String("Hello, World!"); // 报错
let str2: String = new String("Hello, World!"); // 正确
```
和`boolean`类型一样，根据字面量还是包装对象，使用`string`和`String`。



## number 类型

number 类型表示整数和浮点数。在 TypeScript 中，所有的数字都是 `number` 类型。


```typescript
let x: number = 42;
let y: number = 3.14;
let z: number = 3.14e-2;
let a: number = 0x10; // 十六进制
```
包装对象
```typescript
let numberVar: number = new Number(42); // 报错
let numberVar2: Number = new Number(42); // 正确
```

和`boolean`类型一样，根据字面量还是包装对象，使用`number`和`Number`。

## bigint类型

bigint 类型用于表示任意精度的大整数。在数值后面加上 `n` 来定义 bigint。

```typescript
let bigintVar: bigint = 123n;
let bigintVar2: bigint = 0x10n; // 十六进制;
```

需要注意的是 bigint 不能表示小数 , 也不能把 number 类型的数据赋值给 bigint 类型。


```typescript
let bigintVar: bigint = 123; // 报错
let bigintVar3: bigint = 123.14; // 报错
```

## symbol类型

Symbol 是 ES2015 新引入的一种原始类型的值。它类似于字符串，但是每一个 Symbol 值都是独一无二的，与其他任何值都不相等。

symbol 类型用于创建唯一的键，通常用于对象的键。可以通过 `Symbol()` 函数创建。

```typescript
let x: symbol = Symbol();
let y: symbol = Symbol();

x === y; // false
```

***unique symbol***

symbol类型包含所有的 Symbol 值，但是无法表示某一个具体的 Symbol 值。为了解决这个问题，TypeScript 设计了symbol的一个子类型unique symbol，它表示单个的、某个具体的 Symbol 值。
因为unique symbol表示单个值，所以这个类型的变量是不能修改值的，只能用const命令声明，不能用let声明。

```typescript
let b: unique symbol = Symbol();  // 报错，类型为 "unique symbol" 的变量必须为 "const"。
const a: unique symbol = Symbol(); // 正确
```

在使用`const`定义Symbol类型的变量时，变量类型默认就是`unique symbol`。所以类型可以省略。

```typescript
const x:unique symbol = Symbol();
// 等同于
const x = Symbol();
```
每个声明为unique symbol类型的变量，它们的值都是不一样的，其实属于不同的值类型。

```typescript
const a: unique symbol = Symbol();
const b: unique symbol = Symbol();
a === b; // 报错 此比较似乎是无意的，因为类型“typeof a”和“typeof b”没有重叠。
const c:unique symbol = a ; // 报错 不能将类型“typeof a”分配给类型“typeof c”。
```
其实上面的例子转成下面代码可能更好理解：
```typescript
const a:'yuwb'= 'yuwb';
const b:'yewen' = 'yewen';
a === b; 
const c:'wenbo' = a ; 
```
由此可以看出，`a`、`b`和`c`的类型都是不同。因为不能相互赋值，相互比较。如果需要把`a`的值赋值给`c`，可以使用 `typeof`。

```typescript
const a: unique symbol = Symbol();

const c:typeof a = a ; 

a===c // true
```

unique symbol 类型是 symbol 类型的子类型，所以可以将前者赋值给后者，但是反过来就不行。

```typescript
const a: unique symbol = Symbol();
const b: symbol = a; // 正确
const c: unique symbol = b; // 报错
```

***作为属性名***

unique symbol 类型的一个作用，就是用作属性名，这可以保证不会跟其他属性名冲突。如果要把某一个特定的 Symbol 值当作属性名，那么它的类型只能是 unique symbol，不能是 symbol。

```typescript
const x: unique symbol = Symbol();
const y: symbol = Symbol();

interface Foo {
  [x]: string; // 正确
  [y]: string; // 报错
}

```



***类型推断***

`let` 命令声明的变量，推断类型为 symbol。 `const` 命令声明的变量，推断类型为 unique symbol。

```typescript
// 类型为 symbol
let x = Symbol();

// 类型为 unique symbol
const x = Symbol();
```
需要注意的是， `const` 命令声明的变量，如果赋值为另一个 symbol 类型的变量，则推断类型为 symbol。 `let` 命令声明的变量，如果赋值为另一个 unique symbol 类型的变量，则推断类型还是 symbol。 

```typescript
let x = Symbol();
// 类型为 symbol
const y = x;
// -----------------------------
const a = Symbol();
// 类型为 symbol
let b = a;
```


## object类型

object 类型表示非原始数据类型。在 TypeScript 中，大多数复杂的数据类型（如数组和类实例）都属于 `object` 类型。

小写的object类型代表 JavaScript 里面的狭义对象，即可以用字面量表示的对象，只包含对象、数组和函数，不包括原始类型的值。

```typescript
let obj: object = { name: "John", age: 30 };
let arr: object = [1, "two", true];
let classObj: object = new Date();
let func: object = function() {};

let obj1: object = 'hi' // 报错
let obj2: object = 123 // 报错
let obj3: object = true // 报错
```

Object 类型

大写的Object类型代表 JavaScript 语言里面的广义对象。所有可以转成对象的值，都是Object类型，这囊括了几乎所有的值。

```typescript
let obj: Object;
obj = true; // boolean
obj = "Hello"; // string
obj = { name: "John", age: 30 }; // object
obj = []; // array
obj = function() {}; // function
```
需要注意的是，undefined和null赋值给Object类型，就会报错。因为undefined和null这两个值不能转为对象。

```typescript
let a: Object = undefined; // 报错
let b: Object = null; // 报错
```

注意，无论是大写的Object类型，还是小写的object类型，都只包含 JavaScript 内置对象原生的属性和方法，用户自定义的属性和方法都不存在于这两个类型之中。

```typescript
const o1: Object = { foo: 0 };
const o2: object = { foo: 0 };

o1.toString(); // 正确
o1.foo; // 报错

o2.toString(); // 正确
o2.foo; // 报错
```

## undefined类型

undefined 类型表示尚未赋值的变量。改类型只包含一个特殊的 `undefined` 值。

```typescript
let undefVar: undefined = undefined;
```
需要注意的是 ，如果没有声明类型的变量，被赋值为 `undefined`，它的类型会被推断为 `any`。
```typescript
let a = undefined; // any
```


## null类型

null 类型表示一个空值。在 TypeScript 中，`null` 是 `object` 类型的一个子类型。

```typescript
let nullVar: null = null;
```
和 underfined 类型一样，如果没有声明类型的变量，被赋值为 `null`，也会被 TypeScript 推断为 `any`。


