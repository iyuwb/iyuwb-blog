---
title: Vue事件总线使用
author: 耶温
createTime: 2024/05/20 22:50:23
permalink: /Vue/amnf6e15/
---
# Vue事件总线使用 

## 事件总线（Event Bus）

轻量级的发布-订阅模式的应用。允许组件之前通过发布-订阅通信。（基于事件驱动）

-   事件（Event）：Event Bus之间相互通信的基本单位。通信通过事件触发。

-   发布者（Publisher）：发布事件到Event Bus的一方。

-   订阅者（Subscriber）：事件订阅者，接受事件的一方。


## Vue中使用

### Vue中`main.js`文件：

```js

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  // 开启事件总线
  beforeCreate(){
    Vue.prototype.$bus = this
  },
})

```

### 发布事件的一方：
-   需要发送事件和数据的组件

`publisher.vue`：


```vue
<script>
export default {
  name: "Publisher",
  methods: {
    // 点击事件调用事件总线
    clickEvent(data) {
      this.$bus.$emit('clickEvent', data)
    }
  }
};
</script>

```
`this.$bus.$emit('clickEvent', data)`：发布事件
-   `clickEvent`为事件名，
-   `data`为传参数据

### 订阅事件的一方
-   接受事件和参数的组件

`subscriber.vue`：


```vue
<script>
export default {
  name: "subscriber",
  mounted(){
    this.$bus.$on('clickEvent',this.drillDown)
  },
  methods: {
    // 点击事件调用事件总线
    drillDown(data) {
      // 处理事件 data传值
    }
  }
};
</script>
```
`this.$bus.$on('clickEvent',this.drillDown)`订阅事件
-   `clickEvent`为订阅事件名，需和发布事件名一致才能接收到事件
-   `this.drillDown`接收到事件后所执行方法，传参为发布事件时所传参数。
