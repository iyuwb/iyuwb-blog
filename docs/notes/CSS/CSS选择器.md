---
title: CSS选择器
author: 耶温
createTime: 2024/05/09 17:22:08
permalink: /CSS/efmirr1m/
---
# CSS选择器
### 简单选择器
 - 元素选择器  `div{}`
 - 类选择器 `.demo{}`
 - ID选择器 `#demo{}`
 - 通配符选择器 `*{}`
### 属性选择器
 - `[attr]`：选择包含attr属性的所有元素
 - `[attr=val]`：选择attr属性值为val的所有元素
 - `[attr～=val]`：选择attr属性值包含val的所有元素
 - `[attr|=val]` : 选择attr属性的值以val（包括val）或val-开头的元素 。
- `[attr^=val]` : 选择attr属性的值以val开头（包括val）的元素。
- `[attr$=val]` : 选择attr属性的值以val结尾（包括val）的元素。
- `[attr*=val] `: 选择attr属性的值中包含字符串val的元素。
### 伪类
> 以一个冒号作为前缀，样式在特定状态下才被呈现到指定的元素
::: details  伪类 点击查看伪类
```css
:active 
:any
:checked
:default
:dir()
:disabled
:empty
:enabled
:first
:first-child
:first-of-type
:fullscreen
:focus
:hover
:indeterminate
:in-range
:invalid
:lang()
:last-child
:last-of-type
:left
:link
:not()
:nth-child()
:nth-last-child()
:nth-last-of-type()
:nth-of-type()
:only-child
:only-of-type
:optional
:out-of-range
:read-only
:read-write
:required
:right
:root
:scope
:target
:valid
:visited
```
:::
### 伪元素
> 以一个冒号作为前缀，样式在特定状态下才被呈现到指定的元素
::: details  伪元素 点击查看
```css
::after
::before
::first-letter
::first-line
::selection
::backdrop
```
:::
### 组合器
 -  后代选择器  `div span{}`
 -  子代选择器 `div>span{}`
 -  相邻兄弟选择器`div+span{}`
 -  通用兄弟选择器 `div~span{}`
 - 兄弟选择器只会向后选择
### 多用选择器