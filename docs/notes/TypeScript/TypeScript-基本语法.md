---
title: TypeScript-基本语法
author: 耶温
createTime: 2024/07/27 15:20:17
permalink: /TypeScript/jkrsnple/
---


## 基本语法

```ts

//定义变量
let 变量名:类型 = 变量值;
//表示可能是两种类型之一
let 变量名:类型 | 类型= 变量值;

let 对象:{属性名:属性类型,...}

//定义方法
(形参:类型,形参:类型,...)=>返回值类型

function 方法名(参数1:类型,参数2:类型,...):返回值类型{

}

//类型别名
type myType= 1|2|3|4|5
let demo:myType
```
