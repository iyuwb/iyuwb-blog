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

### 特殊属性
-   `indeterminate`：表示不确定或者半选中，不能直接通过`HTML `属性设置。

::: normal-demo checkbox 代码演示

```html
<label>
    <input id="checkbox" type="checkbox"/>
    按钮1
</label>
<label>
    <input type="checkbox" checked/>
    按钮2
</label>
```
```js
// 设置半选中状态
const el = document.querySelector('#checkbox')
el.indeterminate = true
```
:::


注意：当使用submit 提交`checkbox`时，只有选中的`checkbox`会提交，会提交`value`的值，如果`value`省略则默认值为`on`,提交时数据为`name=value`

```html
<label>
    <input type="checkbox" name="selectType" value="cat"/>
    按钮1
</label>
```
如上选中提交数据为:`selectType=cat`
```html
<label>
    <input type="checkbox" name="selectType" value="cat"/>
    按钮1
</label>
<label>
    <input type="checkbox" name="selectType" value="dog"/>
    按钮1
</label>
```
如上如果多个`checkbox`的`name`一致，则提交数据为`selectType=cat&selectType=dog`


## 颜色选择：`color`

### 事件

-   `input`：颜色发生改变时触发

-   `change`：颜色发生改变并且用户关闭选色器之后会触发`change`事件


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

### 事件

-   `input`：日期发生改变时触发

-   `change`：日期发生改变并且用户关闭日期选择器之后会触发`change`事件


::: normal-demo date 代码演示

```html
<input type="date" step="day"/>
```
:::