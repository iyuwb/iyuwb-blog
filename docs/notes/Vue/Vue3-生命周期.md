---
title: Vue3-生命周期
author: 耶温
createTime: 2024/06/21 17:12:35
permalink: /Vue/nfqjxn2g/
---

# Vue3-生命周期

每个 Vue 组件实例在创建时都需要经历一系列的初始化步骤，比如设置好数据侦听，编译模板，挂载实例到 DOM，以及在数据改变时更新
DOM。在此过程中，它也会运行被称为生命周期钩子的函数，让开发者有机会在特定阶段运行自己的代码。

## 图例演示

![alt text](images/image-16.png)

## Vue2生命周期

Vue2生命周期函数，分为创建、挂载、更新、销毁几个阶段。其中不包括`router`等的全局路由守卫函数。

### 钩子函数

- 创建
    - 创建前:`beforeCreate(){}`
    - 创建后:`created(){}` - 可以获取到data对象，可以用来请求接口获取对象。
- 挂载
    - 挂载前:`beforeMount(){}`
    - 挂载后:`mounted(){}` - 可以获取到DOM对象，一般用来获取元素操作。
- 更新
    - 更新前:`beforeUpdate(){}`
    - 更新后:`updated(){}`
- 销毁
    - 销毁前:`beforeDestroy(){}` - 可以用来清楚定时器等
    - 销毁后:`destroyed(){}`

### 代码示例

```vue

<script>
  export default {
    name: 'App',
    data() { // 数据存储
      return {}
    },
    methods: { // 储存方法
    },
    // 以下为Vue2生命周期钩子函数
    beforeCreate() { // 创建前
    },
    created() { //创建后
    },
    beforeMount() { // 挂载前
    },
    mounted() { // 挂载后
    },
    beforeUpdate() { // 更新前
    },
    updated() { // 更新后
    },
    beforeDestroy() { //销毁前
    },
    destroyed() { //销毁后
    },
  }
</script>
```

## Vue3生命周期

### 钩子函数

Vue3会在合适的时机会帮我们调用钩子函数中指定的回调函数。常用的生命周期钩子函数有`onMounted`（挂载完成，可以获取到DOM）、`onUpdated`（组件更新完成）、`onBeforeUnmount`（卸载之前）。

- 创建
    - 对于Vue3 创建钩子函数相当于`setup()`，不再区分`beforeCreate`和`created`。一般在`setup()`函数中设置数据方法和调用接口获取数据。
- 挂载
    - 挂载前:`onBeforeMount(()=>{})` - Vue3会在挂载前会帮我们调用`onBeforeMount`指定的回调函数。下方其他生命周期钩子函数同理。
    - 挂载后:`onMounted(()=>{})` - 可以获取到DOM对象，一般用来获取元素操作。
- 更新
    - 更新前:`onBeforeUpdate(()=>{})` - 数据更新之前
    - 更新后:`onUpdated(()=>{})` - 数据更新之后
- 卸载（在Vue3中和Vue2中不太一样）
    - 卸载前:`onBeforeUnmount(()=>{})` - 可以用来清楚定时器等
    - 卸载后:`onUnmounted(()=>{})`

### 代码示例

```vue

<script setup lang="ts" name="Son">
  import {onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onUnmounted, onBeforeUnmount} from 'vue'

  console.log('创建')

  onBeforeMount(() => {
    console.log('挂载前')
  })
  onMounted(() => {
    console.log('挂载完毕，挂载后')
  })
  onBeforeUpdate(() => {
    console.log('更新前')
  })
  onUpdated(() => {
    console.log('更新完毕，更新后')
  })
  onBeforeUnmount(() => {
    console.log('卸载前')
  })
  onUnmounted(() => {
    console.log('卸载完毕，卸载后')
  })
</script>
```

### 父子组件生命周期顺序

用父组件`father`和子组件`son`来代替父子组件，那么总体的生命周期顺序为:

① ====> 父组件`father` :`setup()`-创建 ====>

② ====> 父组件`father`:`onBeforeMount`-挂载前 ====>

③ ====> 子组件`son`:`setup()`-创建 ====>

④ ====> 子组件`son`:`onBeforeMount`-挂载前 ====>

(如果有孙子组件，孙子组建的 创建 挂载前 挂载后 会在这里执行)

⑤ ====> 子组件`son`:`onMounted`-挂载后 ====>

⑥ ====> 父组件`father`:`onMounted`-挂载后 ====> （结束）

可以从上述顺序中看到，子组件挂载完成之后，才会挂载父组件。
