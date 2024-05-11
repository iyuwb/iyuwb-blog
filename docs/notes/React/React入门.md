---
title: React入门
author: 耶温
createTime: 2024/05/11 16:03:04
permalink: /article/mktknxa0/
---
# React 基础

> 包括 React 基础、React-Router、PubSub、Redex、Ant-Design

## React 了解

> [React 中文官网](https://react.docschina.org/)

> 用于构建用户页面(视图)的 JavaScript 库(将数据渲染成 HTML 页面的 JavaScript 库)

由 FaceBook 开发，且开源

优点：

- 不用频繁操作 DOM，效率低(重绘，重排效率低，严重影响性能)
- 原生 JavaScript 没有组件化编码方案。代码复用率低，维护不方便

特点：

- 采用组件化模式，声明式编码，提高开发效率以及组件服用率，维护方便
- 在 React Native 中可以适用 React 语法进行移动端开发
- 适用虚拟 DOM 以及 Diff 算法，减少与真实 DOM 的交互，较少重绘重排。

学习前置

- class
- ES6 相关
- npm 包管理
- 模块化
- 原型、原型链

## 基本适用

### JSX 语法

> 预处理器 可以直接写元素标签

### Hello World

=======

### 案例

::: details 点击查看代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- 加载 React。-->
    <!-- 注意: 部署时，将 "development.js" 替换为 "production.min.js"。-->
    <script
      src="https://unpkg.com/react@16/umd/react.development.js"
      crossorigin
    ></script>
    <script
      src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
      crossorigin
    ></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  </head>
  <body>
    <div class="test"></div>
    <script type="text/babel">
      const vDom = <h1>Hello world</h1>;
      ReactDOM.render(vDom, document.querySelector(".test"));
    </script>
  </body>
</html>
```

:::

### 创建 DOM 的两种方法

#### JavaScript

> 嵌套元素不方便

::: details 点击查看代码

```html
<script type="text/babel">
  const vDom = React.createElement("h1", { id: "title" }, "Hello World");
  ReactDOM.render(vDom, document.querySelector(".test"));
</script>
```

:::

### JSX

::: details 点击查看代码

```html
<script type="text/babel">
  const vDom = <h1>Hello world</h1>;
  ReactDOM.render(vDom, document.querySelector(".test"));
</script>
```

:::

多层嵌套元素

> 方便书写元素，原理还是利用`React.createElement`创建

::: details 点击查看代码

```html
<script type="text/babel">
  const vDom = (
    <h1 id="title">
      <span> Helle world </span>
    </h1>
  );
  ReactDOM.render(vDom, document.querySelector(".test"));
</script>
```

:::

### 虚拟 DOM 与真实 DOM

查看虚拟 DOM 类型

- 虚拟 DOM 本质是一个`Object`对象
- 虚拟 DOM 对象属性比真实 DOM 少，因为虚拟 DOM 是 React 内部使用，无需真实 DOM 上那么多的属性
- 虚拟 DOM 最终会被 React 转化为真实 DOM，渲染呈现到页面

虚拟 DOM

```jsx
const vDom = (
  <h1 id="title">
    <span> Helle world </span>
  </h1>
);

const =document.get

console.log(vDom);
console.log(typeof vDom); //object

```

真实 DOM
::: tip 注意
因为使用 console.log 打印的直接是元素，所以需要需要 debugger 在控制台查看真实 DOM 属性
:::

```js
//真实dom
const tDom = document.querySelector(".test");
//因为使用console.log打印的直接是元素，所以需要需要debugger在控制台查看真实DOM属性
debugger;
console.log(tDom);
```

:::
