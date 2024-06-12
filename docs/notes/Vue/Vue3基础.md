---
title: Vue3基础
author: 耶温
createTime: 2024/06/12 16:54:01
permalink: /Vue/wr2boutf/
---
# Vue3基础

## Vue3简介

> Vue3.0 发布于2020年9月18日，代号：One Piece

-   1. 性能提升
        -   打包大小减少
        -   初次渲染、更新渲染加快
        -   使用内存减少
-   2. 源码升级(响应式原理)
        -   使用`Proxy`代替Vue2的`defineProperty`实现响应式
        -   虚拟DOM优化
-   3. 支持TypeScript
-   4. 新的特性(组合API等等)


## Vue3项目创建

### Vue-cli

Vue-cli创建Vue方法，可以参考其他笔记。

> Vue2&Vue3项目创建

> [Vue2&Vue3项目创建：点击跳转](/Vue/mesk1w7p/)

### Vite(官方推荐)

>   Vite是新一代前端开发与构建工具，能够显著提升前端开发体验。

-   轻量快速热重载，能够极速启动项目。
-   支持TypeScript JSX 等，可以直接使用
-   按钮编译，不用等待编译整个项目。

>  [Vite中文文档：点击跳转](https://cn.vitejs.dev/)

创建命令，根据提示步骤创建，可以选择使用框架Vue和选择语言TypeScript。
```shell
npm init vite@latest
```
或者用以下命令也可以创建
```shell
npm create vue@latest
```
使用`npm create vue@latest`创建输出：

```shell
Need to install the following packages:
  create-vue@3.10.3
Ok to proceed? (y) y

Vue.js - The Progressive JavaScript Framework

✔ 请输入项目名称： … vue3_hello
✔ 是否使用 TypeScript 语法？ … 否 / 是
✔ 是否启用 JSX 支持？ … 否 / 是
✔ 是否引入 Vue Router 进行单页面应用开发？ … 否 / 是
✔ 是否引入 Pinia 用于状态管理？ … 否 / 是
✔ 是否引入 Vitest 用于单元测试？ … 否 / 是
✔ 是否要引入一款端到端（End to End）测试工具？ › 不需要
✔ 是否引入 ESLint 用于代码质量检测？ … 否 / 是
✔ 是否引入 Vue DevTools 7 扩展用于调试? (试验阶段) … 否 / 是

正在初始化项目 /Applications/前端学习/vue3_hello...

项目初始化完成，可执行以下命令：

  cd vue3_hello
  npm install
  npm run dev

```


## Vue3 项目目录

