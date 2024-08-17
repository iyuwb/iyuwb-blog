---
title: CSS-主题切换方案
author: 耶温
createTime: 2024/08/16 21:18:57
permalink: /article/ra10jqv7/
tags:
  - CSS
---

我们借助  CSS 变量 、`:root` 和 类名切换来实现主题切换。并且借助 `localStorage` 保存用户的主题选择，以便在页面重新加载时保持一致。


##  定义主题

我们使用`:root`和 CSS变量 来定义不同的主题。如下默认主题和深色主题。

```css
/* 默认主题 */
:root {
    --background-color: white;
    --text-color: black;
}
/* 深色主题 */
:root.dark-theme  {
    --background-color: black;
    --text-color: white;
}
```
我们在开发中，可以使用我们定义好的 CSS 变量。

```css
body {
    background-color: var(--background-color);
    color: var(--text-color);
}   
```


## 切换主题

在上面我们定义了两套主题色：`:root` 和 `.root.dark-theme`。

由于 `:root` 在 CSS 中是一个伪类选择器，它用于选择文档的根元素，即 `<html>` 元素。因此我们在文档根元素 `html` 上添加或者删除类名 `dark-theme` 来切换主题。

除此之外，我们还可以借助 `localStorage` 来保存用户的主题选择，以便在页面重新加载时保持一致。优化主题切换整体的体验。


```js
const button = document.getElementById('theme-toggle');

// 检查 localStorage 中的主题
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark-theme');
}

// 点击按钮切换主题
button.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-theme');
    // 保存用户选择的主题
    if (document.documentElement.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
```


## 


## 深色模式

系统深色模式（或称为暗黑模式）在许多现代浏览器中得到了支持。我们通过监听是否处于深色模式来切换主题。优化主题切换整体的体验。

```js
// 设置默认主题
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark-theme');
}
// 监听深色模式
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
        document.documentElement.classList.add('dark-theme');
    } else {
        document.documentElement.classList.remove('dark-theme');
    }
});
``` 
