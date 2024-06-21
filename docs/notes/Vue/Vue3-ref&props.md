---
title: Vue3-ref&props
author: 耶温
createTime: 2024/06/21 16:13:02
permalink: /Vue/h7vqfbiq/
---
# Vue3-ref&props

## ref属性

内置的特殊Attributes，用于注册模板引用。

- 选项式API，引用将被注册在组件`this.$refs`对象。
- 组合式API，引用将被存储在与名字匹配的`ref`里。

::: tip
组合式API中，定义在组件上的`ref`，不能直接获取子组件内的数据和方法，需要子组件暴漏数据或方法给父组件。
:::

### 选项式API

```html
<p ref="p"> hello Vue3</p>
```

```js
methods:{
    clickChange()
    {
        // 获取ref
        console.log(this.$refs.p)
    }
}
``` 

### 组合式API

```vue

<template>
  <p ref="p"> hello Vue3</p>
  <button @click="clickFun">Click</button>
</template>
<script setup>
  import {ref} from 'vue'

  let p = ref()

  function clickFun() {
    console.log(p.value)  // 输出为：p元素    <p> hello Vue3</p>
  }
</script>
```

## Props

### 数据传递

数据传递，使用`props`实现组件之间的传值，既父组件传值给子组件。具体实现方式如下。

#### 父组件传递数据

```vue

<Son :persons="persons"></Son>
```
需要注意的是，在上述代码`:persons="persons"`中，第一个`persons`为子组件接收的字段，可以改为其他字段，只要和子组件接受数据时保持一致即可，第二个`persons`为父组件中定义的数据，同时也是传递的数据。只不过在我们日常开发中，为了方便和溯源数据，普遍把传递字段和接收字段的名称保持了一致。


#### 子组件接受数据

```vue
<template>
  <p ref="p">Son hello Vue3</p>
  <div>Persons:{{ props.persons }}</div>
</template>
<script setup lang="ts" name="Son">
  import {defineProps} from 'vue'

  let props = defineProps(['persons'])  // 接受并保存
  console.log(props.persons) // 可以打印
</script>
```
或者简写为：
```vue
<template>
  <p ref="p">Son hello Vue3</p>
  <div>Persons:{{ persons }}</div>
</template>
<script setup lang="ts" name="Son">
import {defineProps} from 'vue'

defineProps(['persons']) // 只接受不保存, `console.log(persons)`会报错
</script>
```

### 限制接收数据
使用TypeScript，传递数据，接受数据（限制接受类型，限制必要性，指定默认值）

#### 父组件传递数据
`father.vue`:
```vue
<template>
  <Son :persons="persons"></Son>
</template>
<script setup lang="ts" name="App">
import Son from "./components/Son.vue";
import { reactive } from "vue";
import { type Persons } from "@/index";
let persons = reactive<Persons>(
  [
    { id: 2020522, name: 'yiran', age: 18 },
    { id: 2020523, name: 'yewen', age: 18 }
  ]
) 
</script>
```
`index.ts`:
```ts
export interface PersonInter {
    id:number,
    name:string,
    age:number,
    love?:string
}

export type Persons = PersonInter[]
```

#### 子组件接受使用数据
`son.vue`:
```vue
<template>
	<div v-for="item in persons" :key="item.id">名字：{{ item.name }} --- 年龄:{{ item.age }}</div>
</template>
<script setup lang="ts" name="demo">
import { type Persons } from "@/index";
	withDefaults(defineProps<{persons?:Persons}>(),{
		persons:()=>[{ id: 2020524, name: 'yiran', age: 12 }]
	})
</script>
```
使用`defineProps`接收的数据，如果在父组件是响应式的，在子组件中使用时也是响应式。在上方的代码示例中，如果在父组件`father.vue`手动更改`persons`的数据，在子组件`son.vue`中，列表也会实时更新。

同理，如果父组件中`persons`数据没有定义为响应式，子组件只能接收到第一次数据，后面父组件`persons`数据更新,子组件不会同步更新。

需要注意的是，和vue2一样，通过`defineProps`接收的数据，在子组件中不可更改。（基本数据类型更改报错，对象数据类型可以更改）