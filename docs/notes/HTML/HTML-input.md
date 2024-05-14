---
title: HTML-input
author: 耶温
createTime: 2024/05/13 16:08:58
permalink: /HTML/4nvq330q/
---
# HTML-input

## 按钮：`button`

### 特殊属性
- `accesskey`：快捷键操作，一般浏览器都需要搭配`alt`使用（为了避免冲突），Mac上需要搭配`control`和`option`使用

### 事件
-   `click`：点击事件

::: normal-demo button 代码演示 （试试 `ALT`+`Q`）

```html
<input type="button"  accesskey="q" value="按钮" />
```
```javascript
document.querySelector('input').onclick = function(){
  alert('点击')
}
```



:::

## 复选框：`checkbox`
::: normal-demo checkbox 代码演示

```html
<label>
    <input type="checkbox"/>
    按钮1
</label>
<label>
    <input type="checkbox" checked/>
    按钮2
</label>
```
:::

## 颜色选择：`color`

::: normal-demo color 代码演示

```html
<label>
    <input type="color"/>
    按钮1
</label>

<br/>
还可以这样写：
<br/>
<input type="color" id="color"/>
<label for="color"> 按钮2</label>

```
:::

## 日期选择：`date`
```html
<input type="date"/>
```
::: normal-demo date 代码演示

```html
<input type="date"/>
```
:::