---
title: CSS-主题切换方案
author: 耶温
createTime: 2024/08/16 21:18:57
permalink: /CSS/glfn0vjv/
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
    document.body.classList.add('dark-theme');
}

// 点击按钮切换主题
button.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    // 保存用户选择的主题
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
```





## 


## 深色模式

我们可以借助媒体查询的`prefers-color-scheme: dark`，用于检测用户的系统或浏览器的颜色主题偏好。具体来说，它用于判断用户是否选择了“深色模式”（dark mode）。

利用该媒体查询，可以优化我们的主题切换逻辑，以适应不同的用户偏好。当用户选择了深色模式时，我们可以自动将主题的颜色设置为深色，以提高用户的视觉体验。反之，如果用户未选择深色模式，则可以将主题的颜色设置为浅色，以保持主题的统一。

实现方式：

```css
@media (prefers-color-scheme: dark) {
    body {
        background-color: black;
        color: white;
    }
}
```