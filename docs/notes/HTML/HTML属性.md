---
title: HTML属性
author: 耶温
createTime: 2024/05/13 16:07:12
permalink: /HTML/5yqunq5r/
---
# HTML属性

## 输入建议：`list`

## 正则匹配：`pattern`
规定一个表单控件的值应该匹配正则表达式,如果`value`不满足正则匹配,`patternMismatch` 将为 `true`。当为 `true` 时，该元素与 `:invalid` CSS 伪类匹配。

示例如下：
```html
  <input type='text' value='' name="输入框"  placeholder="输入日期格式xxxx-xx-xx" pattern="\d{4}-\d{2}-\d{2}"/>
```

::: normal-demo date 代码演示
  ```html
  <input type='text' value='' name="输入框"  placeholder="输入日期格式xxxx-xx-xx" pattern="\d{4}-\d{2}-\d{2}"/>
```
```css
input{
    width:200px;
    height:38px;
    outline:none;
    inline:none;
    border:2px solid #ccc;
}
input:invalid{
    border:2px solid red;
}
```
:::