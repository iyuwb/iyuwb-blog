---
title: Vue CLI 把引入的 CSS 打包成一个文件
author: 耶温
createTime: 2024/08/02 16:19:52
permalink: /article/rytcqxs6/
tags:
  - Vue
  - Vue CLI
---


## 问题描述

在日常使用 Vue 开发项目，我们经常会在 Main.js 中引入各种 CSS 文件，但是每次引入的 CSS 文件都会被打包成一个单独的 CSS 文件，每个CSS 都会在页面 `<head>` 中单独生成一个 `<style>` 标签引入。


***`mian.js`***
```js
import Vue from 'vue';
import App from './App.vue';
import './assets/styles1.css'; // 引入第一个 CSS 文件
import './assets/styles2.css'; // 引入第二个 CSS 文件
import './assets/styles3.css'; // 引入第三个 CSS 文件
Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
}).$mount('#app');
```

***页面效果***：

<img src="@source/[202407]/images/image-4.png" style="width:80%;margin:0 10%" />


现在我们需要将所有引入的 CSS 文件打包成一个单独的 CSS 文件，并把这个文件链接到 HTML 模板中。具体实现方式如下。

## 解决方案

***修改 `vue.config.js` 文件***
```js
// vue.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  css: {
    extract: {
      filename: 'styles.css', // 你可以自定义输出的 CSS 文件名
    },
  },
  configureWebpack: {
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css', // 你可以自定义输出的 CSS 文件名
      }),
    ],
  },
};

```
重新运行或者打包项目，Vue CLI 将会把所有引入的 CSS 文件打包到一个单独的 CSS 文件中，并把这个文件链接到 HTML 模板中。



***实现效果：***

<img src="@source/[202407]/images/image-5.png" style="width:80%;margin:0 10%" />

可以看到，之前的 `<style>` 标签已经被删除，所有的 CSS 文件都被打包到一个单独的 CSS 文件中，并通过 `<link>` 标签引入。