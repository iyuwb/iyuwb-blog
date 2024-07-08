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

创建store相关文件，存放数据。

`store/useUserStore.ts`:

```ts
// 引入pinia
import { defineStore } from "pinia";
// 定义 store 的状态类型
interface MyState {
    activeMenuId: number;
    searchEngine: number;
}
// 创建 store
export const useUserStoreHook = defineStore({
    id: "myStore", // 必须是唯一的字符串 ID
    state: (): MyState => ({
        activeMenuId: 1,
        searchEngine: 1,
    }),
    getters: {},
    actions: {},
});
```

使用数据


```vue
<template>
  <div>当前 activeMenuId:{{ userStore.activeMenuId }}</div>
  <div>当前 searchEngine:{{ userStore.searchEngine }}</div>
</template>
<script setup lang="ts" name="demo">
import { useUserStoreHook } from "@/store/useUserStore";
const userStore = useUserStoreHook();
// or  let { activeMenuId, searchEngine } = useUserStoreHook()
</script>
```
在上面示例中，我们通过一个变量直接接受了所有的Store数据。其实还可以通过解构`let { activeMenuId, searchEngine } = useUserStoreHook()`，来获取特定的数据。但需要注意的是，通过解构获取的数据不是响应式的，需要做额外处理，将在下面解决该问题。

## 修改数据

### 直接修改
```vue
<template>
  <div>当前 activeMenuId:{{ userStore.activeMenuId }}</div>
  <div>当前 searchEngine:{{ userStore.searchEngine }}</div>
  <button @click="changeData">改变数据</button>
</template>
<script setup lang="ts" name="demo">
import { useUserStoreHook } from "@/store/useUserStore";
const userStore = useUserStoreHook();

function changeData() {
  userStore.activeMenuId = userStore.activeMenuId + 1
  userStore.searchEngine++
}
</script>
```
和Vue2中的Vuex不同，在pinia中当我们通过`const userStore = useUserStoreHook();`获取数据时，也可以通过`userStore`直接修改数据。如果通过解构获取的数据，则不能直接修改。

### `patch`修改

```vue
<template>
  <div>当前 activeMenuId:{{ userStore.activeMenuId }}</div>
  <div>当前 searchEngine:{{ userStore.searchEngine }}</div>
  <button @click="changeData">改变数据</button>
</template>
<script setup lang="ts" name="demo">
import { useUserStoreHook } from "@/store/useUserStore";
const userStore = useUserStoreHook();

function changeData() {
  userStore.$patch({
    activeMenuId: userStore.activeMenuId + 1,
    searchEngine: userStore.activeMenuId + 1
  })
}
</script>
```
我们可以借助Pinia的内置方法`$patch()`,快速修改多个属性的值。
