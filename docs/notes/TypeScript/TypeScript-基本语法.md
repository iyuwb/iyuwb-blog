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

在 TypeScript 中，我们可以不指定变量的类型，而是让 TypeScript 自动推断出变量的类型。

但是需要注意的是，如果后续变量更改为其它类型的值，TypeScript 会报错。如下：
<img src="@source/notes/TypeScript/images/image-03.png" style="width:80%;margin:0 10%" />

