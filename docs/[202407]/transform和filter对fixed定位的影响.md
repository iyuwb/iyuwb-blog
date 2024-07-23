---
title: CSS中 transform 和 filter 对 fixed 定位的影响
author: 耶温
createTime: 2024/07/23 10:37:52
permalink: /article/540mx9hn/
tags:
  - CSS
---
# CSS中 transform 和 filter 对 fixed 定位的影响

日常工作中我们经常使用fixed定位，来做一些顶部固定导航菜单和侧边栏等。但是有的时候，我们发现 fixed 定位会失效，不再相对于浏览器窗口进行定位，而是基于他的父元素定位。下面导致定位失效的两种情况。


## transform
示例演示：
::: normal-demo transform 影响 fixed 定位失效问题
```html
<div class="main">
    <div class="content">
        <div class="notice">hello</div>
    </div>
</div>
```
```css
    .main {
        width: 100%;
        height: 400px;
        overflow: auto;
    }

    .content {
        margin-top: 100px;
        margin-bottom: 50px;
        width: 50%;
        height: 200px;
        background-color: pink;
        position: absolute;
        left: 25%;
        transform: scale(1.2);
    }

    .notice {
        top: 0;
        left: 0;
        position: fixed;
    }
```
:::

## filter

示例演示：
::: normal-demo filter 影响 fixed 定位失效问题
```html

<div class="main">
    <div class="content">
        <div class="notice">hello</div>
    </div>
</div>
```
```css
     .main {
        width: 100%;
        height: 400px;
        overflow: auto;
    }

    .content {
        margin-top: 100px;
        margin-bottom: 50px;
        width: 50%;
        height: 200px;
        background-color: pink;
        position: absolute;
        left: 25%;
        filter:grayscale(0.5)
    }

    .notice {
        top: 0;
        left: 0;
        position: fixed;
    }
```
:::

## 总结

我们在使用 fixed 定位的使用需要注意以上两种情况，防止定位失效。也可以把 fixed 布局的元素直接写在最外层`body`身上，解决这几种问题。