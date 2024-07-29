---
title: TypeScript-简介安装
author: 耶温
createTime: 2024/05/11 16:03:17
permalink: /TypeScript/xgndo7cj/
---

## 简介

> TypeScript 是一种由微软开发的开源静态类型检查的编程语言，它构建在 JavaScript 之上，并且完全符合 ECMAScript 6 标准。TypeScript 添加了可选的类型注解和接口定义，使得开发者可以在编写代码时就发现类型错误，从而提高代码质量和可维护性。


::: tip 

1. 所有的 TypeScript  的代码，最终都会转成 JavaScript 运行。 

2. TypeScript 最大的功能就给是 JavaScript 添加了一些强制类型，可以让我们在编写代码时更加安全。

3. TypeScript 转成 JavaScript 的过程，会将类型去掉。

4. 实际上所有的功能都是 JavaScript 引擎实现的。

:::
也就是说，TypeScript 没有单独的运行环境，只是提供编译器把 TypeScript 编译为 JavaScript 。编译时，会将类型声明和类型相关的代码全部删除，只留下能运行的 JavaScript 代码，并且不会改变 JavaScript 的运行结果。


:::tip
什么是类型？类型是人为添加的一种编程约束和用法提示。
:::

***动态类型和静态类型***

-    JavaScript 的类型系统非常弱，而且没有使用限制，运算符可以接受各种类型的值。在语法上，JavaScript 属于动态类型语言。

-    TypeScript 引入了一个更强大、更严格的类型系统，属于静态类型语言。

<hr>

***TypeScript 优缺点***

***优点***

1. 类型安全：
    -   TypeScript 提供了静态类型检查功能，这有助于在编码阶段捕获错误，而不是在运行时才发现问题。
    -   支持多种数据类型，如字符串、数字、布尔值、数组、元组等，并支持类、接口、枚举等高级类型。
2. 面向对象：
    -   TypeScript 支持面向对象编程（OOP）特性，包括类、接口、继承、泛型等。
3. 工具支持：
    -   与 Visual Studio Code 和其他现代 IDE 集成良好，提供了强大的代码提示、重构、跳转到定义等功能。
    -   有丰富的第三方类型定义库，如 DefinitelyTyped，可以为流行的库和框架提供类型定义。
3. 兼容性：
    -   TypeScript 编译后的代码是纯 JavaScript，可以在任何支持 JavaScript 的环境中运行。
    -   向后兼容 JavaScript，可以逐步迁移到 TypeScript 而不必重写现有代码。
4. 模块化：
    -   支持 ES6 模块语法，使得代码组织更加模块化，易于管理大型项目。
5. 社区和生态系统：
    -   拥有一个活跃的社区，不断更新和完善。
    -   与 Angular 等主流前端框架紧密集成。

***缺点***

学习成本；额外编译步骤；类型声明文件；增加编程工作量；灵活性受限；兼容性问题。



## 基础配置

### 编译运行
1.  安装Node.js

    > [Node.js官网](https://nodejs.org/zh-cn)

2.  安装`TypeScript`
```sh
npm install typescript -g
```

3.  编写`ts`代码，新建一个`demo.ts`文件
```typescript
const a:string = 'iyuwb'
console.log(a)
```

4.  编译`ts`文件
```sh
tsc demo.ts
```

5.  运行`js`文件。上一步编译完成之后，会在当前文件夹下生成一个`demo.js`文件，运行即可。
```sh
node demo.js  

输出：iyuwb
```



### 直接运行

还有另一种方法，不用安装`typeScript` ，直接运行`ts`文件。


1. 全局安装`ts-node`

```sh
npm install -g ts-node
```

2. 运行`ts`文件
```sh
ts-node demo.ts
```

## 进阶配置

使用上面基础配置方法，我们每次改变ts文件，都需要重新运行命令，很不友好，下面介绍一个ts文件改变之后实时更新的方式。需要先装好Node.js 和 typescript 。
 

1. 创建项目

```sh
mkdir TypeScriptCode
cd TypeScriptCode
```

2. 初始化项目，自动生成`tsconfig.json`配置文件

```sh
tsc --init
```


3.  配置`tsconfig.json`
```json
{
  "compilerOptions": { 
    "target": "es6",        // 设置目标 JavaScript 版本为 ES6。
    "module": "commonjs",   // 设置模块系统为 CommonJS。
    "outDir": "./dist",     // 指定编译后的 JavaScript 文件存放位置。
    "strict": true,         // 开启严格的类型检查。
    "esModuleInterop": true //  使导入其他模块更加方便。
  },
  "include": ["./src/**/*"] // 定义要包含的文件

}
```


4.  运行项目

使用`tsc --watch` 持续监听，监听文件改变，实时更新，会在dist文件夹生成相关js文件，实时更新。
```sh
tsc --watch // 持续监听，监听文件改变，实时更新
```

5. 下载nodemon 
安装`nodemon` ，用于监听文件改变，实时更新。
```sh
npm install -g nodemon
```

5. 运行生成的 js 文件

使用`nodemon` 运行生成的 js 文件，当文件改变，会自动重新运行生成的 js 文件。不再需要我们手动运行生成的js文件。

```sh
nodemon  dist/index.js --watch
```







