---
title: Vue3-setup
author: 耶温
createTime: 2024/06/13 19:30:39
permalink: /Vue/ls1wr821/
---
# Vue3-setup 

## setup

`setup`是Vue3新的配置项。`Composition API`使用的容器。组件中所用到的：数据、方法、计算属性、监视等等，均配置在`setup`中。

特点：

- `setup`函数返回的对象中的内容，可直接在模板中使用。
- `setup`中访问`this`是`undefined`。避免在`setup`中使用`this`
- `setup`函数会在`beforeCreate`之前调用，它是“领先”所有钩子执行的。

## 基本使用

```vue
<template>
  <div class="hello">
    {{ msg }} {{total}}
    <button @click="clickChange">Click</button>
  </div>
</template>

<script  lang="ts">
export default {
  name: "demo",
  setup() {
    let msg = "Hello Vue3"; // 直接定义的数据不是响应式
    let total = 1;          // 直接定义的数据不是响应式
    function clickChange() {        // 直接定义的数据不是响应式
      msg = "hello Vue3, change!";
      total++;
      console.log(total,msg)        // 输出 2，hello Vue3, change! ；3，hello Vue3, change!；
    }
    return { msg, total, clickChange }; // 需要把模板使用的数据返回
  },
};
</script>

<style scoped>
</style>
```
::: tip
注意：上面示例中，点击按钮发现页面没有改变，如果打印数据，会发现数据已经改变。因为直接定义的数据不是响应式的，需要使用ref()定义响应式。
:::



## 返回值

- 若返回一个**对象**：则对象中的：属性、方法等，在模板中均可以直接使用。
- 若返回一个**函数**：则可以自定义渲染内容(很少使用)，代码如下：
```jsx
setup(){
  return ()=> 'Hello Vue3'  //页面会直接显示 Hello Vue3
}
```

## setup与data和methods

OptionAPI中的`data`和`methods`能和`setup`同时存在，换句话说，OptionAPI与CompositionAPI可以存在使用。


- `data`和`methods`能够通过`this`读取到`setup`中定义的数据和方法，因为`setup`函数会在`beforeCreate`之前调用，比`data`执行要早(只能获取`setup`暴露出来的数据和方法)。
- 相反，在`setup`中获取不到`data`和`methods`的数据和方法。

总结

- `Vue2` 的配置（`data`、`methos`......）中**可以访问到** `setup`中的属性、方法。
- 但在`setup`中**不能访问到**`Vue2`的配置（`data`、`methos`......）。
- 如果与`Vue2`冲突，则`setup`优先。

## setup 简写

`setup`函数有一个语法糖，这个语法糖，可以让我们把`setup`独立出去。
- 不用在写`setup`方法
- 不用自己`return`各个数据和方法。
```vue
<template>
  <div class="hello">
    {{ msg }}
  </div>
</template>
<script lang="ts">
export default {
  name: "demo",
};
</script>
<script setup  lang="ts">
let msg = "Hello Vue3";
</script>
```

使用`vite-plugin-vue-setup-extend`插件可以省略第一个`<script>`标签里声明的组件`name`。让页面只存在一个`<script>`标签。

下载插件

```shell
npm install vite-plugin-vue-setup-extend -D
```
配置插件

```ts
import { defineConfig } from 'vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig({
  plugins: [ VueSetupExtend() ]
})
```
简写优化

```vue
<template>
  <div class="hello">
    {{ msg }}
  </div>
</template>
<script setup  lang="ts" name="demo">
let msg = "Hello Vue3";
</script>
```
