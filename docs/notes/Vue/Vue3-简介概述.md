---
title: Vue3-简介概述
author: 耶温
createTime: 2024/06/12 16:54:01
permalink: /Vue/wr2boutf/
---

# Vue3-简介概述

> Vue3 官方中文文档 https://cn.vuejs.org/

> [Vue3点击跳转](https://cn.vuejs.org/)

## 概述简介

> Vue3.0 发布于2020年9月18日，代号：One Piece

-
    1. 性能提升
        - 打包大小减少
        - 初次渲染、更新渲染加快
        - 使用内存减少
-
    2. 源码升级(响应式原理)
        - 使用`Proxy`代替Vue2的`defineProperty`实现响应式
        - 虚拟DOM优化
-
    3. 支持TypeScript
-
    4. 新的特性(组合API等等)

## 项目创建

### Vue-cli

Vue-cli创建Vue方法，可以参考其他笔记。

> Vue2&Vue3项目创建

> [Vue2&Vue3项目创建：点击跳转](/Vue/mesk1w7p/)

### Vite(官方推荐)

> Vite是新一代前端开发与构建工具，能够显著提升前端开发体验。

- 轻量快速热重载，能够极速启动项目。
- 支持TypeScript JSX 等，可以直接使用
- 按钮编译，不用等待编译整个项目。

> [Vite中文文档：点击跳转](https://cn.vitejs.dev/)

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

## 项目目录

```txt
|--vue3_hello                        // Vue3 总文件夹
    | --.vscode                       // vscode 编译器配置文件夹
    | --node_modules                  // 依赖包 文件夹
    | --public                        // Vue 静态资源文件夹，可以放logo、图片等资源
    | --src                           // Vue 主体文件夹  源代码文件
        | --assets                    // 项目资产文件夹
        | --components                // 项目组件文件夹
        | --App.vue                   // Vue入口vue文件
        | --main.ts                   // Vue项目主ts文件，加载Vue
    | --.gitignore                    // git忽略文件配置
    | --env.d.ts                      // ts配置文件，可以让ts引入和识别各种文件
    | --index.html                    // Vue入口文件 html文件，文件中引入main.ts
    | --package - lock.json           // 依赖包声明文件
    | --package.json                  // 依赖包声明文件
    | --README.md                     // README 项目说明工程介绍
    | --tsconfig.app.json             // ts配置文件
    | --tsconfig.json                 // ts配置文件
    | --tsconfig.node.json            // ts配置文件
    | --vite.config.ts                // vite 配置文件，项目配置文件，使用插件配置代理等
```

### `main.ts`

```ts
import './assets/main.css'          // 样式引入

import {createApp} from 'vue'     // 引入Vue创建方法
import App from './App.vue'         // 引入组件 根组件

// 创建应用实例
createApp(App).mount('#app')        // 创建Vue根组件App，挂载在(index.html中)id为app的元素上
```

### `index.vue`

Vue文件，总体结构

```vue

<template>

</template>
<script setup lang="ts">

</script>
<style scoped>

</style>
```

## 实例演示

### OptionAPI

原vue2语法

```vue

<script>
  export default {
    // data() 返回的属性将会成为响应式的状态
    // 并且暴露在 `this` 上
    data() {
      return {
        count: 0
      }
    },
    // methods 是一些用来更改状态与触发更新的函数
    // 它们可以在模板中作为事件处理器绑定
    methods: {
      increment() {
        this.count++
      }
    },
    // 生命周期钩子会在组件生命周期的各个不同阶段被调用
    // 例如这个函数就会在组件挂载完成后被调用
    mounted() {
      console.log(`The initial count is ${this.count}.`)
    }
  }
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>

```

### CompositionAPI

Vue3新语法

```vue

<script setup>
  import {ref, onMounted} from 'vue'
  // 响应式状态
  const count = ref(0)

  // 用来修改状态、触发更新的函数
  function increment() {
    count.value++
  }

  // 生命周期钩子
  onMounted(() => {
    console.log(`The initial count is ${count.value}.`)
  })
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

## OptionAPI与CompositionAPI

### OptionAPI

一个页面包含多个功能，每个功能都有自己的`data `,`methods`,`computed`等。特定的数据或者方法，需要写到特定的位置。

-
    1. 新增或者修改某个功能，需要修改该功能对应的`data `,`methods`,`computed`等。
-
    2. 随着业务增多，代码量加大，业务逻辑变的复杂，导致后续维护不易。代码复用性降低。

```js
export default {
    data() {
        return {
            data1: '',// 功能1
            data2: '',// 功能2
        };
    },
    methods: {
        methods1() {
        },// 功能1
        methods2() {
        },// 功能2
    },
    computed: {
        computed1() {
        },// 功能1
        computed2() {
        },// 功能2
    },
    watch: {
        data1() {
        },// 功能1
        data2() {
        },// 功能2
    },
};
```

如下演示图，不同颜色代表不同的功能或者模块
<center>
  <img src="@source/notes/Vue/images/gif.gif" style="zoom:90%;border-radius:20px" />
  <img src="@source/notes/Vue/images/gif2.gif" style="zoom:90%;border-radius:20px" />
</center>

### CompositionAPI

可以用函数的方式，更加优雅的组织代码，让相关功能的代码更加有序的组织在一起。方便后期维护复用。

如下演示图，不同颜色代表不同的功能或者模块

<center>
  <img src="@source/notes/Vue/images/gif3.gif" style="width:90%;border-radius:20px" />
  <div>OptionAPI和CompositionAPI 对比</div><br/>
  <img src="@source/notes/Vue/images/gif4.gif" style="width:90%;border-radius:20px" />
  <div> 函数方式组织代码</div><br/>
</center>

> 演示图出自于掘金作者[大帅老猿](https://juejin.cn/post/6890545920883032071)
