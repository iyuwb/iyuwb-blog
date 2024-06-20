---
title: Vue3基础
author: 耶温
createTime: 2024/06/12 16:54:01
permalink: /Vue/wr2boutf/
---

# Vue3基础

> Vue3 官方中文文档 https://cn.vuejs.org/

> [Vue3点击跳转](https://cn.vuejs.org/)

## 概述简介

> Vue3.0 发布于2020年9月18日，代号：One Piece

-
    1. 性能提升
        - 打包大小减少
        - 初次渲染、更新渲染加快
        - 使用内存减少
-
    2. 源码升级(响应式原理)
        - 使用`Proxy`代替Vue2的`defineProperty`实现响应式
        - 虚拟DOM优化
-
    3. 支持TypeScript
-
    4. 新的特性(组合API等等)

## 项目创建

### Vue-cli

Vue-cli创建Vue方法，可以参考其他笔记。

> Vue2&Vue3项目创建

> [Vue2&Vue3项目创建：点击跳转](/Vue/mesk1w7p/)

### Vite(官方推荐)

> Vite是新一代前端开发与构建工具，能够显著提升前端开发体验。

- 轻量快速热重载，能够极速启动项目。
- 支持TypeScript JSX 等，可以直接使用
- 按钮编译，不用等待编译整个项目。

> [Vite中文文档：点击跳转](https://cn.vitejs.dev/)

创建命令，根据提示步骤创建，可以选择使用框架Vue和选择语言TypeScript。

```shell
npm init vite@latest
```

或者用以下命令也可以创建

```shell
npm create vue@latest
```

使用`npm create vue@latest`创建输出：

```shell
Need to install the following packages:
  create-vue@3.10.3
Ok to proceed? (y) y

Vue.js - The Progressive JavaScript Framework

✔ 请输入项目名称： … vue3_hello
✔ 是否使用 TypeScript 语法？ … 否 / 是
✔ 是否启用 JSX 支持？ … 否 / 是
✔ 是否引入 Vue Router 进行单页面应用开发？ … 否 / 是
✔ 是否引入 Pinia 用于状态管理？ … 否 / 是
✔ 是否引入 Vitest 用于单元测试？ … 否 / 是
✔ 是否要引入一款端到端（End to End）测试工具？ › 不需要
✔ 是否引入 ESLint 用于代码质量检测？ … 否 / 是
✔ 是否引入 Vue DevTools 7 扩展用于调试? (试验阶段) … 否 / 是

正在初始化项目 /Applications/前端学习/vue3_hello...

项目初始化完成，可执行以下命令：

  cd vue3_hello
  npm install
  npm run dev

```

## 项目目录

```txt
|--vue3_hello                        // Vue3 总文件夹
    | --.vscode                       // vscode 编译器配置文件夹
    | --node_modules                  // 依赖包 文件夹
    | --public                        // Vue 静态资源文件夹，可以放logo、图片等资源
    | --src                           // Vue 主体文件夹  源代码文件
        | --assets                    // 项目资产文件夹
        | --components                // 项目组件文件夹
        | --App.vue                   // Vue入口vue文件
        | --main.ts                   // Vue项目主ts文件，加载Vue
    | --.gitignore                    // git忽略文件配置
    | --env.d.ts                      // ts配置文件，可以让ts引入和识别各种文件
    | --index.html                    // Vue入口文件 html文件，文件中引入main.ts
    | --package - lock.json           // 依赖包声明文件
    | --package.json                  // 依赖包声明文件
    | --README.md                     // README 项目说明工程介绍
    | --tsconfig.app.json             // ts配置文件
    | --tsconfig.json                 // ts配置文件
    | --tsconfig.node.json            // ts配置文件
| --vite.config.ts                // vite 配置文件，项目配置文件，使用插件配置代理等
```

### `main.ts`

```ts
import './assets/main.css'          // 样式引入

import {createApp} from 'vue'     // 引入Vue创建方法
import App from './App.vue'         // 引入组件 根组件

// 创建应用实例
createApp(App).mount('#app')        // 创建Vue根组件App，挂载在(index.html中)id为app的元素上
```

### `index.vue`

Vue文件，总体结构

```vue

<template>

</template>
<script setup lang="ts">

</script>
<style scoped>

</style>
```

## 实例演示

### OptionAPI

原vue2语法

```vue

<script>
  export default {
    // data() 返回的属性将会成为响应式的状态
    // 并且暴露在 `this` 上
    data() {
      return {
        count: 0
      }
    },
    // methods 是一些用来更改状态与触发更新的函数
    // 它们可以在模板中作为事件处理器绑定
    methods: {
      increment() {
        this.count++
      }
    },
    // 生命周期钩子会在组件生命周期的各个不同阶段被调用
    // 例如这个函数就会在组件挂载完成后被调用
    mounted() {
      console.log(`The initial count is ${this.count}.`)
    }
  }
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>

```

### CompositionAPI

Vue3新语法

```vue

<script setup>
  import {ref, onMounted} from 'vue'
  // 响应式状态
  const count = ref(0)

  // 用来修改状态、触发更新的函数
  function increment() {
    count.value++
  }

  // 生命周期钩子
  onMounted(() => {
    console.log(`The initial count is ${count.value}.`)
  })
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

## OptionAPI与CompositionAPI

### OptionAPI

一个页面包含多个功能，每个功能都有自己的`data `,`methods`,`computed`等。特定的数据或者方法，需要写到特定的位置。

-
    1. 新增或者修改某个功能，需要修改该功能对应的`data `,`methods`,`computed`等。
-
    2. 随着业务增多，代码量加大，业务逻辑变的复杂，导致后续维护不易。代码复用性降低。

```js
export default {
    data() {
        return {
            data1: '',// 功能1
            data2: '',// 功能2
        };
    },
    methods: {
        methods1() {
        },// 功能1
        methods2() {
        },// 功能2
    },
    computed: {
        computed1() {
        },// 功能1
        computed2() {
        },// 功能2
    },
    watch: {
        data1() {
        },// 功能1
        data2() {
        },// 功能2
    },
};
```

如下演示图，不同颜色代表不同的功能或者模块
<center>
  <img src="@source/notes/Vue/gif.gif" style="zoom:90%;border-radius:20px" />
  <img src="@source/notes/Vue/gif2.gif" style="zoom:90%;border-radius:20px" />
</center>

### CompositionAPI

可以用函数的方式，更加优雅的组织代码，让相关功能的代码更加有序的组织在一起。方便后期维护复用。

如下演示图，不同颜色代表不同的功能或者模块

<center>
  <img src="@source/notes/Vue/gif3.gif" style="width:90%;border-radius:20px" />
  <div>OptionAPI和CompositionAPI 对比</div><br/>
  <img src="@source/notes/Vue/gif4.gif" style="width:90%;border-radius:20px" />
  <div> 函数方式组织代码</div><br/>
</center>

> 演示图出自于掘金作者[大帅老猿](https://juejin.cn/post/6890545920883032071)

## setup

`setup`是Vue3新的配置项。`Composition API`使用的容器。组件中所用到的：数据、方法、计算属性、监视等等，均配置在`setup`中。

特点：

- `setup`函数返回的对象中的内容，可直接在模板中使用。
- `setup`中访问`this`是`undefined`。避免在`setup`中使用`this`
- `setup`函数会在`beforeCreate`之前调用，它是“领先”所有钩子执行的。

### 基本使用

```vue

<template>
  <div class="hello">
    {{ msg }} {{total}}
    <button @click="clickChange">Click</button>
  </div>
</template>

<script lang="ts">
  export default {
    name: "demo",
    setup() {
      let msg = "Hello Vue3"; // 直接定义的数据不是响应式
      let total = 1;          // 直接定义的数据不是响应式
      function clickChange() {        // 直接定义的数据不是响应式
        msg = "hello Vue3, change!";
        total++;
        console.log(total, msg)        // 输出 2，hello Vue3, change! ；3，hello Vue3, change!；
      }

      return {msg, total, clickChange}; // 需要把模板使用的数据返回
    },
  };
</script>

<style scoped>
</style>
```

::: tip
注意：上面示例中，点击按钮发现页面没有改变，如果打印数据，会发现数据已经改变。因为直接定义的数据不是响应式的，需要使用ref()
定义响应式。
:::

### 返回值

- 若返回一个**对象**：则对象中的：属性、方法等，在模板中均可以直接使用。
- 若返回一个**函数**：则可以自定义渲染内容(很少使用)，代码如下：

```jsx
setup()
{
    return () => 'Hello Vue3'  //页面会直接显示 Hello Vue3
}
```

### setup与data和methods

OptionAPI中的`data`和`methods`能和`setup`同时存在，换句话说，OptionAPI与CompositionAPI可以存在使用。

- `data`和`methods`能够通过`this`读取到`setup`中定义的数据和方法，因为`setup`函数会在`beforeCreate`之前调用，比`data`
  执行要早(只能获取`setup`暴露出来的数据和方法)。
- 相反，在`setup`中获取不到`data`和`methods`的数据和方法。

总结

- `Vue2` 的配置（`data`、`methos`......）中**可以访问到** `setup`中的属性、方法。
- 但在`setup`中**不能访问到**`Vue2`的配置（`data`、`methos`......）。
- 如果与`Vue2`冲突，则`setup`优先。

### setup 简写

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
<script setup lang="ts">
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
import {defineConfig} from 'vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig({
    plugins: [VueSetupExtend()]
})
```

简写优化

```vue

<template>
  <div class="hello">
    {{ msg }}
  </div>
</template>
<script setup lang="ts" name="demo">
  let msg = "Hello Vue3";
</script>
```

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
<script setup lang="ts" name="demo">
  import {ref} from 'vue'

  let msg = "Hello Vue3";
  let total = ref(1);
  console.log(total)
  console.log(total.value)

  function clickChange() {
    total.value++
  }
</script>
```

打印输出

```shell
RefImpl {__v_isShallow: false, dep: undefined, __v_isRef: true, _rawValue: 1, _value: 1}

1
```

点击按钮时 页面也会改变 `total` 数据变化

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
<script setup lang="ts" name="demo">
  import {reactive} from "vue";

  let data = reactive({id: 1, name: "yevin", msg: "hello, everyone!"});
  let list = reactive([
    {id: 1, name: "wenbo", msg: "ni hao"},
    {id: 2, name: "yiran", msg: "hello"},
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
<script setup lang="ts" name="demo">
  import {ref} from "vue";

  let data = ref({id: 1, name: "yevin", msg: "hello, everyone!"});
  let list = ref([
    {id: 1, name: "wenbo", msg: "ni hao"},
    {id: 2, name: "yiran", msg: "hello"},
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
let data = reactive({id: 1, name: "yevin", msg: "hello, everyone!"})
// 错误示例
// data = {id: 100, name: "wenbo", msg: "wenbo" } // 失去响应式
// data = reactive({id: 100, name: "wenbo", msg: "wenbo" }) // 不行 XXXX
// 正确示例
Object.assign(data, {id: 100, name: "wenbo", msg: "wenbo"})
```

- 使用原则：

> 1. 若需要一个基本类型的响应式数据，必须使用`ref`。

> 2. 若需要一个响应式对象，层级不深，`ref`、`reactive`都可以。

> 3. 若需要一个响应式对象，且层级较深，推荐使用`reactive`。

## toRef 与 toRefs

- 作用：将一个响应式对象中的每一个属性，转换为`ref`对象。
- 备注：`toRefs`与`toRef`功能一致，但`toRefs`可以批量转换。

### 使用演示

```vue

<template>
  <div class="hello">
    {{ name }}{{ data.msg }}
    <button @click="clickChange">Click</button>
    {{ id}}
  </div>
</template>
<script setup lang="ts" name="demo">
  import {reactive} from "vue";

  let data = reactive({id: 1, name: "yevin", msg: "hello, everyone!"});
  let {id, name} = data;

  function clickChange() {
    console.log(id, name) // 1,yevin
    id = 100;
    name = "wenbo";
    console.log(id, name) // 100,wenbo
  }
</script>
```

在上述代码中，解构一个响应式的数据后，更改数据，可以看到数据更改了但是页面并没有更新。

原因：

解构代码中相当于 单独定义了 id 和 name数据，并且没有绑定响应式。

```js
let {id, name} = data;
// 上述代码相当于 单独定义了 id 和 name数据，并且没有绑定响应式。
let id = data.id
let name = data.name
```

使用`toRefs`优化代码：

```vue

<template>
  <div class="hello">
    {{ name }}{{ data.msg }}
    <button @click="clickChange">Click</button>
    {{ id}}
  </div>
</template>
<script setup lang="ts" name="demo">
  import {reactive, toRefs} from "vue";

  let data = reactive({id: 1, name: "yevin", msg: "hello, everyone!"});
  let obj = toRefs(data);
  console.log(obj)
  let {id, name} = obj

  function clickChange() {
    id.value = 100;
    name.value = "wenbo";
    console.log(id, name)
    console.log(id.value, name.value)
    console.log(data)
  }
</script>
```

点击按钮输出如下：

```shell
{id: ObjectRefImpl, name: ObjectRefImpl, msg: ObjectRefImpl}

ObjectRefImpl {_object: Proxy(Object), _key: 'id', _defaultValue: undefined, __v_isRef: true} 
ObjectRefImpl {_object: Proxy(Object), _key: 'name', _defaultValue: undefined, __v_isRef: true}

100 'wenbo'

Proxy(Object) {id: 100, name: 'wenbo', msg: 'hello, everyone!'}
```

通过上述代码可以看到：`toRefs`将一个响应式对象中的每一个属性，转换为`ref`对象，因此解构获得是对应的`ref`对象，都有绑定响应式。

所以，改变通过解构获取的值之后，页面会同步更新，原数据也会同步更新。
::: tip
注意：通过`toRefs`和`toRef`操作之后，获取值或者更改数据需要使用`.value`。
:::

### toRef与toRefs

使用`reactive`定义对象类型响应

```vue

<script setup lang="ts" name="demo">
  import {reactive, toRefs, toRef} from "vue";

  let data = reactive({id: 1, name: "yevin", msg: "hello, everyone!"});
  // toRefs使用
  let {id, name} = toRefs(data)
  // toRef使用
  let msgData = toRef(data, 'msg')
</script>
```

使用`ref`定义对象类型响应

```vue

<script setup lang="ts" name="demo">
  import {ref, toRefs, toRef} from "vue";

  let data = ref({id: 1, name: "yevin", msg: "hello, everyone!"});
  // toRefs使用
  let {id, name} = toRefs(data.value);
  // toRef使用
  let msgData = toRef(data.value, "msg");
</script>
```

## computed

### 概述

**作用：** 根据已有数据计算出新数据（和`Vue2`中的`computed`作用一致）。

**特点：** 多次使用计算属性时，如果依赖数据没有变化，计算属性不会重新执行计算。只会返回最后一次计算的数据。
::: tip
注意：计算属性使用自定义方法也可以实现，但是每次调用都会重新计算。（计算属性可以避免这种多次计算）
:::

- 不要在计算属性中，操作DOM和做异步操作。推荐只做数据处理。
- 避免直接修改计算属性值。

### 使用演示

```vue

<template>
  <div class="hello">
    <h1>名字计算</h1>
    <input type="text" v-model="firstName"/> +
    <input type="text" v-model="lastName"/> = {{ fullName }}
  </div>
</template>
<script setup>
  import {ref, computed} from 'vue'

  const firstName = ref('John')
  const lastName = ref('Doe')
  const fullName = computed(() => {
    return firstName.value + ' ' + lastName.value
  })
</script>
```

打印输出：

```shell
ComputedRefImpl {dep: undefined, __v_isRef: true, __v_isReadonly: true, getter: ƒ, _setter: ƒ, …}
```

### getter 和 setter

如果计算属性不设置`getter`和 `setter`，计算属性是一个只读属性，不能进行赋值操作。

- 注意如果设置`get`,也需要设置`set`,不能单独设置。

使用演示

```vue

<script setup>
  import {ref, computed} from 'vue'

  const firstName = ref('John')
  const lastName = ref('Doe')

  const fullName = computed({
    // getter
    get() {
      return firstName.value + ' ' + lastName.value
    },
    // setter
    set(newValue) {
      // 注意：我们这里使用的是解构赋值语 当设置fullName时，会同时改变firstName和lastName
      [firstName.value, lastName.value] = newValue.split(' ')
    }
  })
</script>
```

## watch

### 概述

作用：监视数据的变化（和`Vue2`中的`watch`作用一致）

`watch`：

第一个参数可以是不同形式的“数据源”（即为所监听的属性或对象）：

- 一个 ref (包括计算属性)
- 一个响应式对象
- 一个 getter 函数（一个能返回值的函数）
- 多个数据源组成的数组：

第二个参数是一个同调函数（数据改变的回调函数）：

- 函数第一个参数 是新的数据。根据`watch`传的第一个参数，可能是一个数据，也可能是包括多个数据的数据。
- 函数第二个参数 是旧的数据。同上。

第三个参数是一个配置对象：

- `deep`：是否开启深度监听
- `immediate`： 立即执行一次
- `once`：只监听一次
- `flush`：回调触发时机
    - `post`：Vue 更新之后，DOM更新之后触发回调函数，可以访问到DOM。简写为：`watchPostEffect`
    - `sync`：Vue 更新之前，DOM更新之前触发回调函数，不可以访问DOM。简写为：`watchSyncEffect`

```js
const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, (newX) => {
    console.log(`x is ${newX}`)
})

// getter 函数
watch(
    () => x.value + y.value,
    (sum) => {
        console.log(`sum of x + y is: ${sum}`)
    }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
    console.log(`x is ${newX} and y is ${newY}`)
})
```

### ref数据

#### 监视【ref】定义的【基本类型数据】：

:::tip
注意：监听ref定义的基本类型数据时，不用写`.value`
:::

```js
const x = ref(0)

// 单个 ref
watch(x, (newX, oldX) => {
    console.log(`x is ${newX}, old: ${oldX}`,)
})
```

#### 监视【ref】定义的【对象数据类型】：

监听对象地址改变：

```js
let x = ref({id: 1, name: 'wenbo'})
watch(x, (newX, oldX) => {
    console.log('newX:', newX, 'oldX:', oldX)
})

function fun() {
    x.value.name += '~'  // 监听不到
}

function fun2() {
    x.value = {id: 2, name: 'iyuwb'} // 可以监听到
}
```

设置深度监听，可以监听到对象内部属性的变化，也可以监听到对象地址的改变：

```js
let x = ref({id: 1, name: 'wenbo'})
watch(x, (newX, oldX) => {
    console.log('newX:', newX, 'oldX:', oldX)
}, {
    deep: true
})

function fun() {
    x.value.name += '~'  // 可以监听到
}

function fun2() {
    x.value = {id: 2, name: 'iyuwb'} // 可以监听到
}
```

:::tip
注意：上述代码中，当对象属性改变时，回调函数的`newX`和`oldX`是相等的，因为它们是同一个对象，对象的地址并没有改变！
:::
> 注意：
>
> * 若修改的是`ref`定义的对象中的属性，`newValue` 和 `oldValue` 都是新值，因为它们是同一个对象。
>
> * 若修改整个`ref`定义的对象，`newValue` 是新值， `oldValue` 是旧值，因为不是同一个对象了。

### reactive数据

reactive只能定义对象数据类型。

#### 监视【reactive】定义的【对象数据类型】：

当监视【reactive】定义的【对象数据类型】时，默认开启深度监听（现在可以关闭深度监听，早期不可更改）。

```js
let x = reactive({id: 1, name: 'wenbo'})
watch(x, (newX, oldX) => {
    console.log('newX:', newX, 'oldX:', oldX)
})

function fun() {
    x.name += '~'  // 可以监听到
}

function fun2() {
    Object.assign(x, {id: 2, name: 'iyuwb'})  // 可以监听到
}
```

::: tip
`Object.assign`只覆盖值，没有个更改对象地址。

注意：上述代码操作中，`x`数据地址都没有改变，`newValue` 和 `oldValue`是同一个对象，两个值相等。
:::

### 监听对象属性

监听`ref`或者`reactive`定义的对象类型数据中的某个属性，需要注意：

- 属性值为【基本类型】：需要写成函数形式`()=>data.key`
- 属性值为【对象类型】：可以写成函数形式`()=>data.key`，可以直接监听`data.key`,推荐写成函数。

总结：监听对象的属性时，使用函数形式。

#### 对象属性：基本类型

监听reactive创建的对象类型数据属性：

```javascript
let x = reactive({id: 1, name: 'wenbo'})
watch(() => x.name, (newX, oldX) => {
    console.log('newX:', newX, 'oldX:', oldX)
})

function fun() {
    x.name += '~'  // 可以监听到
}

function fun2() {
    Object.assign(x, {id: 2, name: 'iyuwb'})  // 可以监听到
}
```

监听ref创建的对象类型数据属性：

```javascript
let x = ref({id: 1, name: 'wenbo'})
watch(() => x.value.name, (newX, oldX) => {
    console.log('newX:', newX, 'oldX:', oldX)
})

function fun() {
    x.value.name += '~'  // 可以监听到
}

function fun2() {
    x.value = {id: 2, name: 'iyuwb'} // 可以监听到
}
```

#### 对象属性：对象类型

监听reactive创建的对象类型数据属性：

```javascript
let x = reactive({
    id: 1,
    name: 'wenbo',
    car: {name: '比亚迪', price: '79800'}
})
watch(() => x.car, (newX, oldX) => {
    console.log('newX:', newX, 'oldX:', oldX)
}, {deep: true})   // 如果不设置 deep 只能监听到地址变换
function fun() {
    x.car.name += '~'  // 可以监听到    其他：如果不设置deep，监听不到
}

function fun2() {
    x.car = {name: '奔驰', price: '279800'}// 可以监听到   其他：设置不设置deep，都能监听听到
}
```

监听ref创建的对象类型数据属性：

```js
let x = ref({
    id: 1,
    name: 'wenbo',
    car: {name: '比亚迪', price: '79800'}
})
watch(() => x.value.car, (newX, oldX) => {
    console.log('newX:', newX, 'oldX:', oldX)
}, {deep: true})  // 如果不设置 deep 只能监听到地址变换
function fun() {
    x.value.car.name += '~'  // 可以监听到    如果不设置deep  监听不到
}

function fun2() {
    x.value.car = {name: '奔驰', price: '279800'} // 可以监听到   设置不设置deep 都能监听听到
}
```

以上两种为最佳解决方案。

以下的方式仅供参考，不推荐使用。

当属性是对象时，可以直接写所需要监听属性。但是监听有问题，不能监听到属性地址的变化，只能监听到属性值的变化。

::: details 点击查看代码（这种方法会导致不可估计的问题，不推荐使用）

监听reactive创建的对象类型数据属性：

```javascript
let x = reactive({
    id: 1,
    name: 'wenbo',
    car: {name: '比亚迪', price: '79800'}
})
watch(x.car, (newX, oldX) => {
    console.log('newX:', newX, 'oldX:', oldX)
}, {deep: true})

function fun() {
    x.car.name += '~'  // 可以监听到  
}

function fun2() {
    // 监听不到 , 但是会x.car地址，导致fun中的属性更改也将监听不到
    x.car = {name: '奔驰', price: '279800'}
}
```

监听ref创建的对象类型数据属性：

```js
let x = ref({
    id: 1,
    name: 'wenbo',
    car: {name: '比亚迪', price: '79800'}
})
watch(x.value.car, (newX, oldX) => {
    console.log('newX:', newX, 'oldX:', oldX)
}, {deep: true})

function fun() {
    x.value.car.name += '~'  // 可以监听到 
}

function fun2() {
    // 监听不到 , 但是会x.car地址，导致fun中的属性更改也将监听不到
    x.value.car = {name: '奔驰', price: '279800'}
}

```

:::

### 监听多个属性

`watch`：

- 第一个参数 可以传一个数组，数组中包括多个属性函数
- 第二个参数 回调函数
    - 回调函数 第一个参数为新的数据，为一个数组，数组中为每一项监听属性的新数据
    - 回调函数 第二个参数为新的数据，为一个数组，数组中为每一项监听属性的旧数据

```js
let x = reactive({
    id: 1,
    name: 'wenbo',
    car: {name: '比亚迪', price: '79800'}
})
watch([() => x.car, () => x.name], (newX, oldX) => {
    console.log('newX:', newX, 'oldX:', oldX)
}, {deep: true})

function fun() {
    x.name += '~'
    x.car.name += '~'
}

function fun2() {
    x.name += '-'
    x.car = {name: '奔驰', price: '279800'}
}

```

或者为：

```js
let x = ref({
    id: 1,
    name: 'wenbo',
    car: {name: '比亚迪', price: '79800'}
})
watch([() => x.value.car, () => x.value.name], (newX, oldX) => {
    console.log('newX:', newX, 'oldX:', oldX)
}, {deep: true})

function fun() {
    x.value.name += '~'
    x.value.car.name += '~'
}

function fun2() {
    x.value.name += '-'
    x.value.car = {name: '奔驰', price: '279800'}
}
```

## watchEffect

### 概述

> 立即运行一个函数，同时响应式的追踪其依赖，并在依赖更改时重新执行该函数。不需要明确指出监听的数据，函数中用到哪些数据，就监听哪些数据。

#### 基本语法

```js
import {watchEffect} from 'vue'

watchEffect(() => {

})
```

#### 具体演示

```js
let msg = ref('未成年')
let person = reactive({
    name: 'wenbo',
    age: 16,
})
watchEffect(() => {
    if (person.age >= 18) {  // 自动监听 person.age 属性
        msg = '成年啦~'
        person.name = 'WENBO'
    }
})

function ageChange() {
    person.age += 1
}
```

### watch & watchEffect

`watch` 和 `watchEffect` 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：

::: tip 函数副作用

在计算机科学中，函数副作用指当调用函数时，除了返回函数值之外，还对主调用函数产生附加的影响。例如修改全局变量（函数外的变量）或修改参数。

tips:

可以理解为 函数附加作用或者额外作用。换句话说，在监听的回调函数中，处理其他数据等，即为函数的副作用。
:::

- `watch`：
    - 只追踪明确侦听的数据源。它不会追踪任何在回调函数中访问到的东西。
    - 优点：不会在副作用发生期间追踪依赖，能更加精确地控制回调函数的触发时机。
    - 缺点：仅在数据源改变时才会触发回调。

- `watchEffect`：
    - 会在副作用发生期间追踪依赖。
    - 会在同步执行过程中，自动追踪所有能访问到的响应式属性。
    - 优点：方便，而且代码往往更简洁，便于维护。
    - 优点：只跟踪回调中被使用到的属性，而不是递归地跟踪所有的属性，比`watch`更有效。
    - 缺点：有时其响应性依赖关系会不那么明确。

::: tip
watchEffect 仅会在其同步执行期间，才追踪依赖。在使用异步回调时，只有在第一个 await 正常工作前访问到的属性才会被追踪。
:::

### 停止监听

在 `setup()` 或 `<script setup>` 中用同步语句创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止。

注意：如果异步回调创建监听器，需要手动停止。（尽量避免这种情况）

```js
let unwatch = null
// 异步创建 不会自动停止
setTimeout(() => {
    unwatch = watchEffect(() => {
    })
    // or  nwatch =  watch([],() => {})
}, 100)
// ...当该侦听器不再需要时，手动卸载
unwatch()
```

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

传递数据

```vue

<Son :persons="persons"></Son>
```

子组件接受数据

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








