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

第二个组件，触发事件，传送数据。
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

1. 概述：`$attrs`用于实现**当前组件的父组件**，向**当前组件的子组件**通信（**祖→孙**）。

2. 具体说明：`$attrs`是一个对象，包含所有父组件传入的标签属性。

   >  注意：`$attrs`会自动排除`props`中声明的属性(可以认为声明过的 `props` 被子组件自己“消费”了)

### 示例演示

父组件通过`v-bind`，一次传递多个值。

```vue 
<template>
    <h3>Father</h3>
    <Son v-bind="{ a: 1, b: 2, c: 3, d: 4 }" :num="num" :updateNum="updateNum"></Son>
</template>
<script setup lang="ts" name="App">
import Son from '@/components/son.vue'
import { ref } from 'vue';
let num = ref(999)
function updateNum() {
  num.value++
}
</script>
```
如上方代码所示，我们给子组件传递多个数据和方法。

我们在子组件中通过`$attrs`查看所有父组件传递的数据。需要注意的是子组件已经接收的值。通过`$attrs`查看不到。如下方代码示例：

```vue
<template>
  <h3>son</h3>
   <div>props:{{ props }} </div>
   <div>$attrs: 数据：{{ $attrs }}  方法：{{ $attrs.updateNum }} </div>
</template>
<script setup lang="ts" name="son">
const props = defineProps(['a','d'])
</script>
```
页面输出内容为：
```txt
Father
son
props:{ "a": 1, "d": 4 }
$attrs: 数据：{ "b": 2, "c": 3, "num": 999 } 方法：function updateNum() { num.value++; }
```

我们此时可以借助`$attr`和`v-bind`将数据继续往下传递。

子组件:
```vue
<template>
  <h3>son</h3>
   <div>props:{{ props }} </div>
   <div>$attrs: 数据：{{ $attrs }}  方法：{{ $attrs.updateNum }} </div>
   <Child v-bind="$attrs"></Child>
</template>
<script setup lang="ts" name="son">
import Child from '@/components/child.vue'
const props = defineProps(['a','d'])
</script>
```
孩子组件:

```vue
<template>
    <h3>child</h3>
    <div>props:{{ props }} </div>
    <div>$attrs:{{ $attrs }} </div>
    <button @click="updateNum()">click</button>
</template>
<script setup lang="ts" name="child">
const props = defineProps(['c', 'updateNum'])
</script>
```
页面输出：
```txt
Father
son
props:{ "a": 1, "d": 4 }
$attrs: 数据：{ "b": 2, "c": 3, "num": 999 } 方法：function updateNum() { num.value++; }
child
props:{ "c": 3 }
$attrs:{ "b": 2, "num": 999 }
```
如上面示例所示，通过`$attrs`传递的数据和方法，我们不仅可以实现父组件向孩子组件传递数据，我们也可以通过传递的方法，从孩子组件向父组件传递数据。


## `$refs` & `$parent`

1. 概述：

   * `$refs`用于 ：**父→子。**
   * `$parent`用于：**子→父。**

2. 原理如下：

   | 属性      | 说明                                                     |
   | --------- | -------------------------------------------------------- |
   | `$refs`   | 值为对象，包含所有被`ref`属性标识的`DOM`元素或组件实例。 |
   | `$parent` | 值为对象，当前组件的父组件实例对象。   

### `$refs` 父传子

实际上来说，就是父组件获取子组件的数据并进行更改，或者调用方法使用。


我们可以通过`ref`获取子组件的数据和方法。需要注意的是，如果父组件想要直接获取到子组件的数据和方法，需要子组件把对应的数据和方法给暴露给父组件。

父组件，获取使用并修改子组件中的数据：

```vue
<template>
  儿子有车： {{ son ? son.car : null }}
  <button @click="editSon()">Click</button>
  <Son ref="son"></Son>
</template>
<script setup lang="ts" name="father">
import Son from '@/components/son.vue'
import { ref } from 'vue';
let son = ref()
function editSon() {
  // 把儿子的车换了
  son.value.car = 'BMW'
}
</script>
```
子组件，暴露出数据：
```vue
<template>
  我有车：{{ car }}
</template>
<script setup lang="ts" name="son">
import { ref } from 'vue';
let car = ref('BYD')
// 数据暴露
defineExpose({ car })
</script>
```
除了上面演示的父组件通过`ref`获取子组件外，还可以通过`$refs`获取当前页面的所有定义ref，进行数据的传递和修改。`$refs`包含了当前组件所有定义`ref`的合集。
```vue
<template>
  {{ $refs }}
  <button @click="editSon($refs)">Click</button>
  <Son ref="son"></Son>
</template>
<script setup lang="ts" name="father">
import Son from '@/components/son.vue'
function editSon($refs:any) {
  $refs.son.car = "BMW"
}
</script>
```

### `$parent` 子传父
同上，如果我们想要子组件访问父组件时，我们需要在子组件借助`$parent`访问数据的同时，还需要父组件将所需要的数据暴露出来。

父组件：
```vue
<template>
  {{ car }}
  <Son ref="son"></Son>
</template>
<script setup lang="ts" name="father">
import Son from '@/components/son.vue'
import { ref } from 'vue';
let car = ref('二手奥拓')
defineExpose({car})
</script>
```
子组件：
```vue
<template>
  <button @click="changeCar($parent)">click</button>
  {{ $parent }}
</template>
<script setup lang="ts" name="son">
function changeCar($parent:any){
  $parent.car = 'BWW'
}
</script>
```


## `provide` & `inject` 父 <=> 后代

1. 概述：实现**祖孙组件**直接通信

2. 具体使用：

   * 在祖先组件中通过`provide`配置向后代组件提供数据
   * 在后代组件中通过`inject`配置来声明接收数据

### 示例演示

父组件
```vue
<template>
  {{ car }}
  <Son ref="son"></Son>
</template>
<script setup lang="ts" name="father">
import Son from '@/components/son.vue'
import { ref, provide } from 'vue';
let car = ref('二手奥拓')

provide('car', car)
provide('changeCar', changeCar)
function changeCar(data: string) {
  car.value = data
}
</script>
```
后代组件
```vue
<template>
  <button @click="changeCar('BYD')">click</button>
  {{ car }}
</template>
<script setup lang="ts" name="son">
import { inject } from 'vue'
let car = inject('car', '默认值')
let changeCar = inject('changeCar', (params: string) => { })
</script>
```
如上示例，我们通过`let car = inject('car', '默认值')`接收父组件的数据，实现父组件到后代的数据传递。而借助接收的方法`changeCar`，可以实现后代组件传递数据到父组件。

上面使用 `provide` 和 `inject`，传递和接收多个数据时，可以写为下面形式。

父组件：
```vue
<template>
  {{ car }}
  <Son ref="son"></Son>
</template>
<script setup lang="ts" name="father">
import Son from '@/components/son.vue'
import { ref, provide } from 'vue';
let car = ref('二手奥拓')

provide('fatherContext', { car, changeCar })
function changeCar(data: string) {
  car.value = data
}
</script>
```
后代组件：

```vue
<template>
  <button @click="changeCar('BYD')">click</button>
  {{ car }}
</template>
<script setup lang="ts" name="son">
import { inject } from 'vue'
let { car, changeCar } = inject('fatherContext', { car: '默认值', changeCar: (data: string) => { } })
</script>

```

## Pinia

>   [参考【Vue3-Pinia】](/Vue/w6pgx6s3/)