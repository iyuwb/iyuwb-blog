---
title: Vue3-router
author: 耶温
createTime: 2024/06/22 10:22:02
permalink: /Vue/tzuakilt/
---

# Vue-router

## 路由简介

### 服务器路由

> 服务器路由：服务端路由指的是服务器根据用户访问的 URL 路径返回不同的响应结果。当我们在一个传统的服务端渲染的 web
> 应用中点击一个链接时，浏览器会从服务端获得全新的 HTML，然后重新加载整个页面。

### 客户端路由

> 客户端路由：在Vue单页面应用中，客户端的 JavaScript
> 可以拦截页面的跳转请求，动态获取新的数据，然后在无需重新加载的情况下更新当前页面。这样通常可以带来更顺滑的用户体验，尤其是在更偏向“应用”的场景下，因为这类场景下用户通常会在很长的一段时间中做出多次交互。

> 在这类单页应用中，“路由”是在客户端执行的。一个客户端路由器的职责就是利用诸如 History API 或是 hashchange 事件这样的浏览器
> API 来管理应用当前应该渲染的视图。

在Vue3中使用router实现SPA 应用（单页面应用）。根据地址栏 ***路径*** 不同 ，实时更新当前页面内容,切换页面比较丝滑。并没有真的跳转到其他页面。

页面的切换效果实际上是一个个组件被挂载和卸载（销毁）。

在日常工作中：

- 路由组件通常放在pages或者views文件夹
- 一般组件通常放在components文件夹

## 实现简单路由

下载vue-router

```shell
npm install vue-router
```

### 创建路由文件

`router/index.ts`:

```ts
// 引入路由
import {createRouter, createWebHistory} from 'vue-router'

// 引入组件
import Home from '../components/home.vue'
import Blog from '../components/blog.vue'
import Tag from '../components/tag.vue'

// 创建路由
const router = createRouter({
    history: createWebHistory(), // 路由工作模式
    routes: [ // 配置组件和路径
        {
            path: '/',
            component: Home
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/blog',
            component: Blog
        },
        {
            path: '/tag',
            component: Tag
        }
    ]
})
// 导出路由 
export default router
```

### 挂载路由文件

`main.ts`

```ts
import './assets/main.css'
import {createApp} from 'vue'
import App from './App.vue'

// 引入路由配置文件
import router from "./router/index";

const app = createApp(App)
// 加载路由
app.use(router)
// 挂载实例
app.mount('#app')
```

### 路由跳转页面

`app.vue`

```vue

<template>
  <h1>Hello Vue</h1>
  <nav>
    <RouterLink to="/home">Home</RouterLink>
    <RouterLink to="/blog">blog</RouterLink>
    <RouterLink to="/tag">tag</RouterLink>
  </nav>
  <RouterView></RouterView>
</template>
<script setup lang="ts" name="App">
  import {RouterLink, RouterView} from 'vue-router'
</script>
```

`RouterView`为Vue中组件出口。

利用`RouterView`可以设计出一个包括顶部导航和侧边导航的网站。在更改路径时，保持顶部和侧边不变只更新中间内容部分组件。

### `<RouterLink>`

在上述代码`<Routerlink>`标签中，还可以写为：

```html
<!-- 可以携带参数 -->
<RouterLink :to="{path:'/home'}">Home</RouterLink>
<!-- 或者 -->
<RouterLink to="/home">Home</RouterLink>
```

## 路由工作模式

### `history`模式

> 优点：`URL`更加美观，不带有`#`，更接近传统的网站`URL`。
>
> 缺点：后期项目上线，需要服务端配合处理路径问题，否则刷新会有`404`错误。（使用nginx代理）

```js
const router = createRouter({
    history: createWebHistory(), //history模式
    ......
})
```

### `hash`模式

> 优点：兼容性更好，因为不需要服务器端处理路径。
>
> 缺点：`URL`带有`#`不太美观，且在`SEO`优化方面相对较差。

```js
const router = createRouter({
    history: createWebHashHistory(), //hash模式
    ......
})
```

## 路由命名

给路由规则命名，方便路由跳转和传参。

`router/index.ts`

```ts
......

routes:[ // 配置组件和路径
    {
        path: '/', //路由重定向 默认
        red: Home
    },
    {
        name: 'Home',
        path: '/home',
        component: Home
    },
    {
        name: 'Blog',
        path: '/blog',
        component: Blog
    },
    {
        name: 'Tag',
        path: '/tag',
        component: Tag
    }
]
......
```

如果配置的路由中添加了name。在`RouterLink`跳转中，还可以写为下面方式：

```html

<RouterLink :to="{name:'Home'}">Home</RouterLink>
<RouterLink :to="{name:'Blog'}">Blog</RouterLink>
<RouterLink :to="{name:'Tag'}">Tag</RouterLink>
```

用这个方式跳转页面，可以避免输入较长的url，让跳转更加的方便快捷。

## 嵌套路由

可以借助`children`属性进行路由嵌套。

`router/index.ts`

```ts
import Article from '../components/article.vue'

......
routes:[ // 配置组件和路径
    {
        name: 'Blog',
        path: '/blog',
        component: Home
        children: [
            {
                name: 'Article'
                path: 'article'
            }
        ]
    },
]
......
```

`components/blog.vue`

```vue

<template>
  <h1>Blog < /h1>
    <RouterLink : to="{path:'/blog/article'}"> Article</RouterLink>
    <RouterLink : to="{name:'Article'}"> Article</RouterLink>
    <RouterLink to="/blog/article"> Article</RouterLink>
    <RouterView></RouterView>
</template>
<script setup lang="ts" name="Blog">
  import {RouterLink, RouterView} from "vue-router";

</script>
```

如上面代码示例，我们把Article页面组件嵌套在了Blog页面组件中，因为需要在Blog页面中添加`RouterView`
出口。需要注意的跳转的时候，如果使用path路径，需要输入完整的路径。

## 路由传参

### query传参

路由query传参有两种方式：

- 字符串拼接：`to="/blog/article?name=yuwb&articleid=123`

```vue

<RouterLink to="/blog/article?name=yuwb&articleId=123">Article</RouterLink>
```

- query

```vue

<RouterLink :to="{path:'/blog/article',query:{name:'wenbo',articleId:'111'}}">Article</RouterLink>
<RouterLink :to="{name:'Article',query:{name:'yiran',articleId:'222'}}">Article</RouterLink>
```

### 接收query参数

```vue

<template>
  <h1>Article</h1>
  <p>{{route.query.name}}</p>
  <p>{{route.query.articleId}}</p>
</template>
<script setup lang="ts" name="Article">
  import {useRoute} from "vue-router";

  let route = useRoute()
</script>
```

### parmas传参

#### 传递参数

::: tip
1：传递`params`参数时，若使用`to`的对象写法，必须使用`name`配置项，不能用`path`。

2：传递`params`参数时，需要提前在规则中占位。

:::
路由占位

```ts
......
routes:[ // 配置组件和路径
    {
        name: 'Blog',
        path: '/blog',
        component: Home
        children: [
            {
                name: "Article",
                path: 'article/:name/:articleId',  // params 占位
                component: Article,
            }
        ]
    },
]
......

```

传递数据

```vue

<RouterLink to="/blog/article/yuwb/111">Article</RouterLink>
<RouterLink :to="{name:'Article',params:{name:'yiran',articleId:'222'}}">Article</RouterLink>
```

### 接受parmas参数

```vue
<template>
  <h1>Article</h1>
  <p>name:{{params.name}}</p>
  <p>articleId:{{params.articleId}}</p>
</template>
<script setup lang="ts" name="Article">
  import {toRefs} from "vue";
  import {useRoute} from "vue-router";
  let route = useRoute() // route.params.name
  // or
  let {params} = toRefs(route)
  console.log(params) // 可以直接使用params.name
</script>
```

### params传参问题

在我们日常实际开发中，会发现我们传参数据经常会有空值的存在。这是我们处理做一些特殊处理，不然跳转页面会报错，影响程序影响。具体如下设置在占位符后添加`?`。
例如`path: 'article/:name?/:articleId?'`,意味这`name`和`articleId`字段不是必须的，不传参数不会影响程序的运行。

:::tip
需要注意的是，当有某些是不是必须的时，我们传参建议全部使用`name`加`params`传参方法。
-   `:to="{name:'Article',params:{name:'yiran',articleId:'222'}}"`

不要再使用path拼接方式了。
-   `to="/blog/article/yuwb/111"`

因为path拼接参数时我们在使用时无法判断具体时哪些值没有传。
:::
```ts
......
routes:[ // 配置组件和路径
    {
        name: 'Blog',
        path: '/blog',
        component: Home
        children: [
            {
                name: "Article",
                path: 'article/:name?/:articleId?',  // params 占位
                component: Article,
            }
        ]
    },
]
......

```

### props传参

使用路由props传参，可以让路由组件更方便的收到参数。推荐我们在日常工作中使用。

