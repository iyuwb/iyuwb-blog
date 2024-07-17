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
如果在没有设置具体的插槽名称，那么父组件中调用`son`组件中的内容，会全部默认渲染到子组件中的没有名称的默认`slot`中。需要注意的是其实默认插槽也是有`name`的，只不过值默认是`default`。
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

使用具名插槽，可以传递一个或者多个模板到组件中分别指定的位置。

在父组件中，我们需要给多个模板定义名称，用来区分。需要注意的是`v-solt:name`，需要写在组件本身或者`template`标签包裹的模板。

`v-solt:name` 可以简写为`:name`。
```vue
<template>
  <Son ref="son">
    <template v-slot:title>
      <h1>我是title</h1>
    </template>
    <template v-slot:content>
      <h1>我是content</h1>
    </template>
  </Son>
</template>
```
`son`组件需要设置模板渲染出口以及出口名称。需要注意的是，这里的名称需要和父组件中定义的模板名称一致，才能展示。换句话说，就是什么名称的模板将会渲染在什么名称的插槽`Slot`出。

```vue
<template>
  <slot name="title"></slot>
  <h1>I am Son</h1>
  <slot name="content"></slot>
</template>
```

## 作用域插槽

作用域插槽可以实现在父组件中的插槽模板中使用子组件中暴露出来的数据。

父组件接收数据使用

```vue
<template>
  <Son ref="son">
    <template v-slot:title="title">
      <!-- 这里也可以使用接结构 -->
      <!-- <template v-slot:title="{ message }">  -->
      <!-- <h1>{{ message }}</h1> -->
      <h1>{{ title.message }}</h1>
    </template>
    <template v-slot:content="content">
      <h1>{{ content.message }}</h1>
    </template>
  </Son>
</template>
<script setup lang="ts" name="father">
import Son from '@/components/son.vue'
</script>
```
子组件需要传递数据
```vue
<template>
  <slot name="title" :message="title"></slot>
  <h1>I am Son</h1>
  <slot name="content" :message="content"></slot>
</template>
<script setup lang="ts" name="son">

import { ref } from 'vue';
const title = ref('I am Title')
const content = ref('I am content')
</script>
```





