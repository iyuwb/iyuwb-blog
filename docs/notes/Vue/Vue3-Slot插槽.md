---
title: Vue3-Slot插槽
author: 耶温
createTime: 2024/07/11 16:31:02
permalink: /Vue/a4wdq6kv/
---
## Vue3- Slot插槽
使用Props，可以实现父组件传递数据给子组件。而Slot插槽，可以让父组件的模板片段，渲染在子组件中。
## 默认插槽

父组件加载子组件，并设置插槽内容。
```vue
<template>
  <Son ref="son">
    <!-- 插槽内容 -->
    <div>hello Son</div>
  </Son>
</template>
```
子组件设置插槽出口，渲染父组件中的插槽内容。
```vue
<template>
  <h1>I am Son</h1>
  <!-- 插槽出口 -->
  <slot></slot>
</template>
```

上述代码，在执行时相当于把 `<div>hello Son</div>` 替换掉 `<slot></slot>` ，如下。

```vue
<template>
  <h1>I am Son</h1>
  <div>hello Son</div>
</template>
```
如果在没有设置具体的插槽名称，那么父组件中调用`son`组件中的内容，会全部默认渲染到子组件中的没有名称的默认`slot`中。
```html
  <Son ref="son">
    <!-- 插槽内容 -->
    <!-- 这里写的全部内容都会被渲染到son组件中的slot -->
    <div>
        <h1>hello Son</h1>
        ... ...
    </div>
  </Son>
```

## 具名插槽

## 作用域插槽


