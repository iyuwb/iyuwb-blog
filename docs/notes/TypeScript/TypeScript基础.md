---
title: TypeScript基础
author: 耶温
createTime: 2024/05/11 16:03:17
permalink: /article/k5ibpk34/
---
# TypeScript 基础
> JavaScript的超集，在JS的基础上，做了一些限制并添加了类型。
- 所有`TypeScript`需要被转换成`js`执行
- 支持ES一些不具备的新特性

## 基础类型
基本语法：
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


### 布尔值
需要使用关键字`boolean`创建
```ts
let isShow:boolean = false
```
### 数字
需要使用关键字`number`创建，可以创建十六进制，二进制，八进制
```ts
let num:number = 6 //十进制
let num1:number=Oxf00d //十六进制
let num1:number=Oo377 //八进制
```
### 字符串
需要使用关键字`string`创建
```ts
let name:string = 'name' 
```

### 数组
定义具体数据类型的数组
```ts
let arr: number[] = [1, 2, 3]
//or
let arr1: Array<number> = [1, 2, 3]
```
### 对象
创建对象，注意函数也是对象

```ts
let o: object
o = {}
o = function () { }

//创建 固定类型的对象属性 
let o1: { name: string, age: number }
o1.name = 'zhijian'
o1.age = 18

//在属性类型加 ？ 表示属性是可选的,可以用也可以没有
let o2: { name: string, age?: number }
o2 = {
    name: "zhijian"
}
// 追加属性 任意类型的属性 属性键为字符串
let o3: { name: string, [key: string]: any }
o3 = {
    name: "zhijian",
    a: '123',
    b: 123
}
//创建函数

let fn: (a: number, b: number) => number

fn = function(a: number, b:number):number{
    return a + b
}
```
### 元组
-   一个已知数量和类型的数组
```ts
let arr:[string,number] = ['1', 2]
```

### 枚举
`enum`枚举是对JavaScript标准数据类型的一个补充
```ts
enum Color { Red, Pink }
console.log(Color.Red) //0
console.log(Color.Pink) //1

//or
enum Color { Red = 1, Pink }
console.log(Color.Red) //1
console.log(Color.Pink) //2

//or
enum Color { Red = 1, Pink = 3 }
console.log(Color.Red) //1
console.log(Color.Pink) //3
```

### 任意值
不清楚变量的具体类型时，可以使用任意值,对其可以赋值任何类型的值
```ts
let demo: any = 'yewen'
demo = false
demo = 123456
console.log(demo) //123456    不会报错
```

### 空值 void 和 never
- 当函数没有返回值时，可以将函数类型设置为`void`(当没设置函数返回类型时，会自动设置为void)
- 但是当声明一个void类型的变量时，只能给它赋值 `null`或`undefined`

- never 表示永远不会有返回结果
```ts
function myFun(): void {
    console.log('hello ts!')
}

let demo: void = undefined
```
### null 和 undefined
`null` 和 `undefined` 分别有自己的类型 `null`和`undefined`。
-   默认情况下，`null` 和 `undefined`是所有类型的子类型。可以赋值给其他类型。

### 类型断言
```ts
 
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
console.log(strLength)  //16

//or  
let someValue: any = 123;
let strLength: number = (<string>someValue).length;
console.log(strLength)  //undefined

// as 实现
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```
### unknown 
表示未知的类型, 与`any`一致,可以赋值任意类型的值
-   any类型的变量赋值给其他变量时，其他变量也会变成any
-   unknown类型不能赋值于其他类型，会导致报错，需要赋值的时候 可以先试用typeof判断类型，或者使用类型断言
-   推荐使用unknown
## 定义变量
```ts
let demo: 'male' | 'female' //限制变量在两个值之间  不能赋值其他数值 

let demo: string | number = '123'//可以将demo变量设置为string和number
//or 
let demo; //不指定类型，会自动设置为any类型
```
###  类型别名
```ts
//类型别名
type myType= 1|2|3|4|5
let demo:myType
```

## TS编译配置
>   运行编译TS文件需要 下载`Node.js` 以及npm包：`npm install typescripot -g`

### 编译单个TS文件
1. 编译目标文件,会生成一个编译好的js文件
```shell
tsc demo.ts  
```
2. 开启服务，持续监听文件改变
```shell
tsc demo.ts  -w
```
### 编译多个TS文件
1. 配置tsconfig.json
```json
//TS编译配置信息
{
    
}
```