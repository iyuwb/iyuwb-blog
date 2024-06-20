---
title: Vue3-computed&watch
author: 耶温
createTime: 2024/06/13 19:33:28
permalink: /Vue/hs4xn6bg/
---

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
