---
title: CSS-自定义属性
author: 耶温
createTime: 2024/06/24 10:19:19
permalink: /CSS/cde5o0zz/
---
# CSS-自定义属性

CSS自定义属性，也称为CSS变量，是CSS中的一种强大特性，它允许你定义可在整个文档中重复使用的值。这些变量存储在CSS中，并且可以在样式规则中引用，使得维护和修改样式变得更加容易和高效。CSS自定义属性以`--`前缀开头，后面跟变量名，然后在其他CSS属性值中通过`var()`函数来使用这些变量值。

> CSS自定义属性（也称为CSS变量或CSS自定义属性）是在CSS层面引入变量概念的一个特性，首次成为正式标准的一部分是在CSS Cascading Variables Module Level 1（简称 CSS Variables）中。这个特性最初是在2014年被纳入草案标准，并随着浏览器的支持逐渐增强。正式的规范最终在2018年作为W3C推荐标准发布。

> 因此，可以说CSS自定义属性作为一个特性，大约是从2014年开始被广泛讨论和实现，到2018年成为官方推荐的标准特性。这一特性允许开发者定义和使用自己的变量，从而提高CSS代码的可维护性、灵活性和模块化程度。


## 基本语法

### `:root`

`:root` 在 CSS 中是一个伪类选择器，它用于选择文档的根元素，即 `<html>` 元素。这个选择器的主要用途是在样式表的最顶层设置全局样式或者定义CSS变量（自定义属性）。由于它是针对根元素的，因此在这里定义的样式或变量可以被文档中的任何元素继承或通过变量引用的方式使用，使得这些样式或变量成为整个项目的基础或默认设置。

### 定义变量

```css
:root {
  --primary-color: #1e80ff;
  --font-size: 16px;
}
```
这里，我们在`:root`选择器中定义了两个变量：`--primary-color` 和 `--font-size`。

### 使用变量

```css
body {
  background-color: var(--primary-color);
  font-size: var(--font-size);
}
```
在上面的例子中，`body`的背景色和字体大小分别使用了之前定义的CSS变量。

## 特性与优势
-  动态性：CSS变量的值可以在页面运行时通过JavaScript动态更改，为交互式设计和动态主题切换提供了便利。
-  层叠与继承：CSS变量遵循CSS的层叠规则，子元素可以继承父元素的变量值，也可以重新定义覆盖。
-  易维护和一致性：变量使得维护大型项目或应用多种主题变得简单，因为可以集中修改变量值来影响整个网站的外观。
-  减少重复代码：通过使用变量，可以避免硬编码相同值多次，提高代码的DRY（Don't Repeat Yourself）原则。
## 注意事项
- 兼容性：虽然现代浏览器普遍支持CSS变量，但部分旧版本浏览器（如IE）并不支持。在需要兼容旧浏览器的场景下，考虑使用polyfills或回退方案。


- 命名规范：建议使用有意义且具有一致性的变量名，以提高代码的可读性和维护性。


## 适配兼容性

使用`css-vars-ponyfill`，它将 CSS 自定义属性转换为静态值（可以兼容不支持css自定义属性的浏览器）。并且在新老浏览器运行中实时更新。

> 插件文件地址：[https://jhildenbiddle.github.io/css-vars-ponyfill/#/](https://jhildenbiddle.github.io/css-vars-ponyfill/#/)

### 安装使用

包管理器下载安装
```shell
npm install css-vars-ponyfill
```
```js
// 引入css-vars-ponyfill库
import cssVars from 'css-vars-ponyfill';

// 初始化css-vars-ponyfill
cssVars();
```
直接使用CDN服务引入
```js
<script src="https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2"></script>
```