---
title: Vue3-自定义hook
author: 耶温
createTime: 2024/06/22 09:25:05
permalink: /Vue/6a93u9zj/
---

# Vue3-自定义hook

## 简介概述

- 什么是`hook`？—— 本质是一个函数，把`setup`函数中使用的`Composition API`进行了封装，类似于`vue2`中的`mixin`。

- 自定义`hook`的优势：复用代码, 让`setup`中的逻辑更清楚易懂。

总体来说，就是让一个功能的数据和方法封装在一起，变成一个小的整体，进行模块化开发，方便维护和复用。(组合式API)

## 代码示例

### 封装hook

`useSum.ts`

```ts
import {ref} from 'vue'

export default function () {
    let sum = ref(0)

    function add() {
        sum.value += 1
    }

    return {
        sum, add
    }
}
```

在`useSum.ts`中，可以写相关的数据和语法，还可以使用计算属性`computed`监听器`watch`
以及生命周期钩子函数等等。需要注意的是，想要在其他组件中使用hook中的方法和数据，需要在封装hook的文件中，将方法属性暴露出去，比如上方示例中的`return { sum, add }`
，将数据`sum`和方法`add`给暴露出去。

### 使用hook

可以在任意组件使用使用封装好的hook。

```vue

<template>
  <p ref="p">{{ sum }}</p>
  <button @click="add">ADD</button>
</template>
<script setup lang="ts" name="Son">
  // 导入hook
  import useSum from './useSum'
  // 使用hook
  const {sum, add} = useSum()
</script>
```

如上方代码所示，我们可以在任意组件中使用封装好的hook，请注意：在使用时候需要执行对应的函数，例如`useSum()`
,因为在封装hook时我们封装的整体是一个函数，所以在使用的时候注意要执行函数而不能直接使用。

### 其他情况

可能有的时候，我们在使用封装的hook中，并没有返回值（hook中没有暴露方法和数据）。而是需要使用hook中的一些生命周期函数。这时候我们只需要执行对象的hook方法，不需要接收数据和方法。
示例代码：

```ts
import {onMounted, onUpdated, onBeforeUnmount} from 'vue'

export default function () {

    onMounted(() => {
        // 执行内容
        console.log('hook Mounted')
    })
    onUpdated(() => {
        // 执行内容
        console.log('hook Updated')
    })
    onBeforeUnmount(() => {
        // 执行内容
        console.log('hook BeforeUnmount')
    })
}
```

```ts
// 使用hook

import useSum from './useSum'
import {onBeforeUnmount, onMounted, onUpdated} from "vue";
// 执行hook 无需接受数据和方法
useSum()

onMounted(() => {
// 执行内容
    console.log('son Mounted')
})
onUpdated(() => {
// 执行内容
    console.log('son Updated')
})
onBeforeUnmount(() => {
// 执行内容
    console.log('son BeforeUnmount')
})
```

如上述代码所示，如果我们在hook中和组件中都使用了同一个生命周期函数，我们会发现两个生命周期函数都会被触发执行，不会被顶掉。并且两者的数据顺序，和组件中使用的生命周期函数和hook方法先后顺序有关。如果hook方法在前就会先执行hook中定义的生命周期函数，反之同理。