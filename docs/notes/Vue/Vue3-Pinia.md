---
title: Vue3-Pinia
author: 耶温
createTime: 2024/06/23 17:21:46
permalink: /Vue/w6pgx6s3/
---

# Vue3-Pinia
符合直觉的Vue.js 状态管理库。

- 所见即所得：与组件类似的 Store。其 API 的设计旨在让你编写出更易组织的 store。
- 类型安全：类型可自动推断，即使在 JavaScript 中亦可为你提供自动补全功能
- 开发工具支持：不管是 Vue 2 还是 Vue 3，支持 Vue devtools 钩子的 Pinia 都能给你更好的开发体验。
- 可扩展性：可通过事务、同步本地存储等方式扩展 Pinia，以响应 store 的变更以及 action。
- 模块化设计：可构建多个 Store 并允许你的打包工具自动拆分它们。
- 极致轻量化：Pinia 大小只有 1kb 左右，你甚至可能忘记它的存在！

## 安装Pinia

```shell
npm install pinia
```

`main.ts`
```ts
import { createApp } from 'vue'
import App from './App.vue'

// 引入
import { createPinia } from 'pinia'
import router from "./router/index";

const app = createApp(App)

// 创建pinia
const pinia = createPinia()
// 加载pinia
app.use(pinia)

app.use(router)
app.mount('#app')
```

## 储存读取数据