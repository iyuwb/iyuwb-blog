---
title: Vue3-ref&reactive
author: 耶温
createTime: 2024/06/13 19:32:43
permalink: /Vue/84h36nbg/
---

# Vue3-ref&reactive
## ref 与 reactive
### ref 基础类型响应式

- **作用：** 定义响应式变量。
- **语法：** `let xxx = ref(初始值)`。
- **返回值：** 一个`RefImpl`的实例对象，简称`ref对象`或`ref`，`ref`对象的`value`属性是响应式的。
:::tip
   - `JS`中操作数据需要：`xxx.value`，但模板中不需要`.value`，直接使用即可。
   - 对于`let total = ref(1)`来说，`total`不是响应式的，`total.value`是响应式的。
:::
```vue
<template>
  <div class="hello">
    {{ msg }}
    <button @click="clickChange">Click</button>
    {{total}}
  </div>
</template>
<script setup  lang="ts" name="demo">
import {ref} from 'vue'
let msg = "Hello Vue3";
let total = ref(1);
console.log(total)
console.log(total.value)
function clickChange(){
  total.value++
}
</script>
```
打印输出

```shell
RefImpl {__v_isShallow: false, dep: undefined, __v_isRef: true, _rawValue: 1, _value: 1}

1
```
点击按钮是 页面也会改变 `total` 数据变化

### reactive 对象类型响应式
- **作用：** 定义一个**响应式对象**（基本类型不要用它，要用`ref`，否则报错）
- **语法：** `let 响应式对象= reactive(源对象)`。
- **返回值：** 一个`Proxy`的实例对象，简称：响应式对象。
- **注意点：** `reactive`定义的响应式数据是“深层次”的。
```vue
<template>
  <div class="hello">
    {{ data.name }}{{data.msg}}
    <button @click="clickChange">Click</button>
    {{ data.id }}
    <ul>
      <li v-for="item in list" :key="item.id">{{item.name}}:{{item.msg}}</li>
    </ul>
  </div>
</template>
<script setup  lang="ts" name="demo">
import { reactive } from "vue";
let data = reactive({ id: 1, name: "yevin", msg: "hello, everyone!" });
let list = reactive([
  { id: 1, name: "wenbo", msg: "ni hao" },
  { id: 2, name: "yiran", msg: "hello" },
]);
function clickChange() {
  data.id++;
  list[0].msg += ' yevin '
  console.log(data);
  console.log(list);
}
</script>
```
点击按钮，页面id数据更新，控制台打印如下：
```shell
Proxy(Object) {id: 2, name: 'yevin', msg: 'hello, everyone!'}

Proxy(Array) {0: {…}, 1: {…}}

Proxy(Object) {id: 3, name: 'yevin', msg: 'hello, everyone!'}

Proxy(Array) {0: {…}, 1: {…}}
```

### ref 对象类型响应式

- 其实`ref`接收的数据可以是：**基本类型**、**对象类型**。
- 若`ref`接收的是对象类型，内部其实也是调用了`reactive`函数。

:::tip
`ref`定义的数据，需要通过`.value`获取
:::
```vue
<template>
  <div class="hello">
    {{ data.name }}{{data.msg}}
    <button @click="clickChange">Click</button>
    {{ data.id }}
    <ul>
      <li v-for="item in list" :key="item.id">{{item.name}}:{{item.msg}}</li>
    </ul>
  </div>
</template>
<script setup  lang="ts" name="demo">
import { ref } from "vue";
let data = ref({ id: 1, name: "yevin", msg: "hello, everyone!" });
let list = ref([
  { id: 1, name: "wenbo", msg: "ni hao" },
  { id: 2, name: "yiran", msg: "hello" },
]);
function clickChange() {
  data.value.id++;
  list.value[0].msg += ' yevin '
  console.log(data);
  console.log(list);
}
</script>
```
点击按钮，页面id数据更新，控制台打印如下：
```shell
RefImpl {__v_isShallow: false, dep: Map(1), __v_isRef: true, _rawValue: {…}, _value: Proxy(Object)}
RefImpl {__v_isShallow: false, dep: Map(1), __v_isRef: true, _rawValue: Array(2), _value: Proxy(Array)}
RefImpl {__v_isShallow: false, dep: Map(1), __v_isRef: true, _rawValue: {…}, _value: Proxy(Object)}
RefImpl {__v_isShallow: false, dep: Map(1), __v_isRef: true, _rawValue: Array(2), _value: Proxy(Array)}
```

### ref 和 reactive 对比

- 基础：

> 1. `ref`用来定义：**基本类型数据**、**对象类型数据**；

> 2. `reactive`用来定义：**对象类型数据**。

- 区别：

> 1. `ref`创建的变量必须使用`.value`（可以使用`volar`插件自动添加`.value`）。

> 2. `reactive`重新分配一个新对象，会**失去**响应式（可以使用`Object.assign`去整体替换）。


```js
let data = reactive({ id: 1, name: "yevin", msg: "hello, everyone!" })
// 错误示例
// data = {id: 100, name: "wenbo", msg: "wenbo" } // 失去响应式
// data = reactive({id: 100, name: "wenbo", msg: "wenbo" }) // 不行 XXXX
// 正确示例
Object.assign(data,{id: 100, name: "wenbo", msg: "wenbo" })
```

- 使用原则：
> 1. 若需要一个基本类型的响应式数据，必须使用`ref`。

> 2. 若需要一个响应式对象，层级不深，`ref`、`reactive`都可以。

> 3. 若需要一个响应式对象，且层级较深，推荐使用`reactive`。


## toRef 与 toRefs
- 作用：将一个响应式对象中的每一个属性，转换为`ref`对象。
- 备注：`toRefs`与`toRef`功能一致，但`toRefs`可以批量转换。