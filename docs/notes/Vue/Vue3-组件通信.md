---
title: Vue3-组件通信
author: 耶温
createTime: 2024/07/10 11:02:34
permalink: /Vue/s4b8bbz7/
---
# Vue3-组件通信


## Props

- 若 **父传子**：属性值是**非函数**。
- 若 **子传父**：属性值是**函数**。

### 父传子
父组件传递数据，传递方法和Vue2相同。
```vue
<template>
  <Son :list="list"></Son>
</template>
```
子组件使用`defineProps()`接受数据并使用。
```vue
<template>
  <div class="son">
    <div v-for="item in list" :key="item"> {{ item }} </div>
  </div>
</template>
<script setup lang="ts" name="demo">
  // 接受数据 
  defineProps(['list'])
</script>
```

### 子传父

需要先在父组件创建接受数据方法。和Vue2相同。
```vue
<template>
    <Son :getList="getList"></Son>
</template>
<script setup lang="ts" name="father">
import Son from "@/components/son.vue";
function getList(data) {
  console.log(data.toString())  // 获取数据
}
</script>
```
在子组件中接收方法，并且调用方法传输数据。

```vue
<template>
    <button @click="getList(data)">button</button>
</template>
<script setup lang="ts" name="son">
import { reactive } from 'vue';
const data = reactive(['html','csss','js','ts'])
defineProps(['getList'])
</script>
```

## `emit` 自定义事件 子传父


在父组件中邦定自定义事件

```vue
<template>
    <!-- 绑定事件 -->
   <Son @get-list="getList"></Son>
</template>
<script setup lang="ts" name="father">
import Son from "@/components/son.vue";
function getList(data) {
  console.log(data.toString())  // 获取数据
}
</script>
```
在子组件中接收声明事件并使用。

```vue
<template>
    <button @click="setList">button</button>
</template>
<script setup lang="ts" name="son">
import { reactive, defineEmits } from 'vue';
const data = reactive(['html', 'css', 'js', 'ts'])
// 接收声明事件
const emit = defineEmits(['get-list'])
function setList() {
  emit('get-list', data)
}
</script>
```

## mitt 任意组件通信

mitt 可以实现 任意组件间的通信。（发布订阅），类似于Vue2的事件总线。

### 安装配置
安装`mitt`

```shell
npm i mitt
```

配置`mitt`
`src\utils\emitter.ts`
```ts
// 引入mitt 
import mitt from "mitt";

// 创建emitter
const emitter = mitt()

// 创建并暴露mitt
export default emitter
```

`main.ts`引入
```ts
import emitter from './utils/emitter'
```
常用配置
```ts
// 绑定事件
emitter.on('clickDemo',()=>{
    console.log('绑定事件')
})
// 触发事件
emitter.emit('clickDemo')
// 解绑所有事件
emitter.all.clear()
// 解绑某个事件
emitter.off('clickDemo')
```

### 日常使用

任意两个组件进行通信。

第一个组件，绑定事件，接受数据。
```js
import { onUnmounted } from "vue";
import emitter from '@/utils/emitter';
// 绑定事件
emitter.on('click-demo',(data)=>{
  console.log(data)
})
onUnmounted(()=>{
  // 解绑事件 组件卸载时解绑事件
  emitter.off('click-demo')
})
```

第一个组件，触发事件，传送数据。
```vue
<template>
    <button @click="setList">button</button>
</template>
<script setup lang="ts" name="demo">
import { reactive } from 'vue';
import emitter from '@/utils/emitter';
const data = reactive(['html', 'csss', 'js', 'ts'])

function setList(){
  emitter.emit('click-demo',data)
}
</script>
```
需要注意的是，我们需要在组件被卸载的时候，解绑事件。

## `v-model`  父子组件相互通信

### 示例演示

父组件
```vue
<template>
    {{ num }}
    <button @click="num++">Click</button>
    <Son v-model="num"></Son>
</template>
<script setup lang="ts" name="father">
import Son from '@/components/son.vue'
import { ref } from 'vue';
let num = ref(999)
</script>
```
子组件
```vue
<template>
    {{ modelValue }}
    <button @click="setList">button</button>
</template>
<script setup lang="ts" name="son">
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
let count = 0
function setList() {
  count++
  emit('update:modelValue', count)
}
</script>
```

从上面示例可以看到，不管我们在子组件还是父组件中更改数据，子父组件中数据都是同步的。因为我们可以借助`v-model`在父子组件中进行传递数据。

那为什么会这样呢，是因为此时`v-model`相当于一个语法糖。vue会将代码进行转换。如下：

```vue
<Son v-model="num"></Son>
```
Vue遇到`v-model`,会讲上面代码转成下文形式：
```vue
<Son :modelValue="num" @update:modelValue="num = $event"></Son>
```
相当于把`v-model`拆分为了两部分，一部分为父转子的`Props`。另一部分则为子传父的`emit`自定义事件。


### 绑定多个值

在上面代码中，子组件中使用`modelValue`和`update:modelValue`等默认值，接收数据和触发事件。当我们绑定多个值的时候，就不能全部使用默认值了。需要自定义数据，具体实现方式如下示例：

父组件
```vue
<template>
    <!-- 绑定事件 -->
    {{ num }} {{ name }}
    <button @click="num++; name += ' demo'">Click</button>
    <Son v-model:num="num" v-model:name="name"></Son>
    <!-- 相当于 -->
    <!-- <Son :num="num" @update:num="num = $event" :name="name" @update:name="name = $event"></Son> -->
</template>
<script setup lang="ts" name="father">
import Son from '@/components/son.vue'
import { ref } from 'vue';
let num = ref(999)
let name = ref('iyuwb')
</script>
```

子组件

```vue
<template>
    {{ num }} {{ name }}
    <button @click="setData">button</button>
</template>
<script setup lang="ts" name="son">
defineProps(['num', 'name'])
const emit = defineEmits(['update:num', 'update:name'])
let count = 0
let username = 'iyuwb'
function setData() {
  count++
  username += ' demo'
  emit('update:num', count)
  emit('update:name', username)
}
</script>
```
如上面代码示例，我们可以通过`v-model:xxx`自定义绑定数据。


## `$attrs` 父传后代组件





