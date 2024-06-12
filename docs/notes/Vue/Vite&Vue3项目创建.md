---
title: Vite&Vue3项目创建
author: 耶温
createTime: 2024/06/07 21:35:05
permalink: /Vue/gsq2pijn/
---
# Vite&Vue3项目创建

## Vite简介
vite是新一代前端开发与构建工具，能够显著提升前端开发体验。

-   Vite 通过在一开始将应用中的模块区分为 依赖 和 源码 两类，改进了开发服务器启动时间。
    -   依赖： 大多为在开发时不会变动的纯 JavaScript。一些较大的依赖（例如有上百个模块的组件库）处理的代价也很高。依赖也通常会存在多种模块化格式（例如 ESM 或者 CommonJS）。
Vite 将会使用 esbuild 预构建依赖。Esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。


    -   源码： 通常包含一些并非直接是 JavaScript 的文件，需要转换（例如 JSX，CSS 或者 Vue/Svelte 组件），时常会被编辑。同时，并不是所有的源码都需要同时被加载（例如基于路由拆分的代码模块）

-   Vite 以 原生 ESM 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。

![alt text](image-9.png)

![alt text](image-10.png)
::: tip
vite创建Vue3项目需要Node.js版本10以上
:::

## Vite创建Vue3

1. 创建命令

```shell
npm init vite@latest

```
输出：
```shell
npm init vite@latest

Need to install the following packages:
  create-vite@5.2.3
Ok to proceed? (y) 
```
2. 创建项目

输入`y`,然后输入项目名称
```shell
npm init vite@latest

Need to install the following packages:
  create-vite@5.2.3
Ok to proceed? (y) y
? Project name: › vite-project
```

3. 选择使用框架

上下键选择使用框架，回车选择
```shell
npm init vite@latest

Need to install the following packages:
  create-vite@5.2.3
Ok to proceed? (y) y
✔ Project name: … vite-project
? Select a framework: › - Use arrow-keys. Return to submit.
❯   Vanilla
    Vue
    React
    Preact
    Lit
    Svelte
    Solid
    Qwik
    Others
```
4. 选择使用语言

上下键选择使用语言，回车选择
```shell
npm init vite@latest

Need to install the following packages:
  create-vite@5.2.3
Ok to proceed? (y) y
✔ Project name: … vite-project
✔ Select a framework: › Vue
? Select a variant: › - Use arrow-keys. Return to submit.
❯   TypeScript
    JavaScript
    Customize with create-vue ↗
    Nuxt ↗
```

5. 创建成功
```shell
npm init vite@latest

Need to install the following packages:
  create-vite@5.2.3
Ok to proceed? (y) y
✔ Project name: … vite-project
✔ Select a framework: › Vue
✔ Select a variant: › JavaScript

Scaffolding project in /Applications/前端学习/vite-project...

Done. Now run:

  cd vite-project
  npm install
  npm run dev
```

6. 启动项目

进入项目文件，打开终端，

-   `npm install`：下载依赖包
-   `npm run dev`：启动项目

![alt text](image-11.png)


