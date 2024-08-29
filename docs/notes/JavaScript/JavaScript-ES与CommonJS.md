---
title: JavaScript-ESM与CommonJS
author: 耶温
createTime: 2024/08/29 22:00:42
permalink: /JavaScript/uf75hg8s/
---
# JavaScript-ESM 与 CommonJS 模块

## 介绍示例
**ES模块（ECMAScript Modules）**：ES 模块是 avaScript 的模块化标准，它允许开发者将代码分割成多个文件，每个文件都是一个模块，模块之间可以相互导入和导出。ES 模块使用 `import` 和 `export` 关键字来导入和导出模块。



```js
// 导出模块
export const myFunction = () => {
  // ...
}

export const myVariable = 42

// 导入模块
import { myFunction, myVariable } from './myModule.js'
```


**CommonJS模块**：CommonJS 模块是 Node.js 的模块化标准，它允许开发者将代码分割成多个文件，每个文件都是一个模块，模块之间可以相互导入和导出。CommonJS 模块使用 `require` 和 `module.exports` 关键字来导入和导出模块。


```js
// 导出模块
const myFunction = () => {
  // ...
}

const myVariable = 42

module.exports = {
  myFunction,
  myVariable
}

// 导入模块
const myModule = require('./myModule.js')

const myFunction = myModule.myFunction
const myVariable = myModule.myVariable
```

## 特点区别

ES模块：
- ES模块是JavaScript的官方模块化标准，由ECMAScript规范定义。
- ES模块使用`import`和`export`关键字来导入和导出模块。
- ES模块是静态的，即在编译时确定模块的依赖关系和导出/导入的变量。
- ES模块支持循环依赖，即一个模块可以在导入另一个模块之前导出变量。
- ES模块支持异步加载，可以使用`import()`函数来动态加载模块。

CommonJS模块：
- CommonJS模块是Node.js的模块化标准，由Node.js社区定义。
- CommonJS模块使用`require`和`module.exports`关键字来导入和导出模块。
- CommonJS模块是动态的，即在运行时确定模块的依赖关系和导出/导入的变量。
- CommonJS模块不支持循环依赖，即一个模块不能在导入另一个模块之前导出变量。
- CommonJS模块不支持异步加载，只能同步加载模块。

## 使用场景

ES模块：
- 适用于现代Web开发、前端框架、需要模块化和动态导入的场景，逐渐成为主流选择，尤其是在浏览器中。


CommonJS模块：
- 主要用于Node.js应用，适合需要同步加载和与现有工具兼容的场景。

## 其他内容

导出内容是否能被修改？

