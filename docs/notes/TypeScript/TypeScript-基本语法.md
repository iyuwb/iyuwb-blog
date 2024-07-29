---
title: TypeScript-基本语法
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

在使用 any 类型的变量时，有一点特别需要注意的是，它会污染其他特定类型的变量，使其失去特定的类型。并且还不会提醒报错。如下图：
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

在TypeScript中，类型断言（Type Assertion）可以告诉编译器某个值被视为特定类型。它并不会改变运行时的行为，而只是告诉 TypeScript 编译器如何处理这个值。

换句话说，它可以帮助你告诉编译器：“我知道这个值实际上是某种类型，请信任我。”
:::tip
- 类型断言不会进行任何类型检查或结构验证，因此在使用时要确保你对数据的结构有足够的了解。
- 尖括号语法在 JSX 中会与 React 的语法冲突，因此在使用 React 时推荐使用 as 语法。
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

## 类型缩小
