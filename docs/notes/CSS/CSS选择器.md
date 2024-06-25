---
title: CSS选择器
author: 耶温
createTime: 2024/05/09 17:22:08
permalink: /CSS/efmirr1m/
---
# CSS选择器

CSS选择器是CSS语言的一部分，用于定位文档中的元素并应用样式规则。随着CSS规范的更新，新的选择器可能会被引入。

### 简单选择器
 - 元素选择器：直接根据元素名称选取元素，`div{}`
 - 类选择器：通过元素的class属性值选取元素，`.demo{}`
 - ID选择器：通过元素的id属性值精确选取一个元素 `#demo{}`
 - 通配符选择器：选取文档中的所有元素，`*{}`

```css
/* 元素选择器 */
div {
  color: blue;
}
/* 类选择器 */
.demo{
  color: blue;
}
/* id选择器 */
#demo{
  color: blue;
}
/* 通配符选择器 */
*{
  padding:0,
  marigin:0
}
```
### 属性选择器

根据元素的属性及属性值来选择元素

- `[attr]`存在性选择器：选择具有指定属性的任何元素，无论该属性的值是什么。
- `[attr=val]`精确匹配属性值选择器：选取属性值完全等于给定值的元素。
- `[attr^=val]`开头匹配属性值选择器：选择那些属性值以指定值开头的元素。
- `[attr$=val]`结尾匹配属性值选择器：选择那些属性值以指定值结尾的元素。
- `[attr*=val]`包含匹配属性值选择器：选择那些属性值中任意位置包含指定值的元素。
- `[attr～=val]`指定值列表匹配选择器：选择那些属性值是一个由空格分隔的列表，并且至少有一个值与给定值相等的元素。
- `[attr|=val]`带连字符属性值匹配选择器：选择那些属性值严格等于给定值或者以给定值开头并紧接着是连字符（-）的元素，主要用于lang属性的语言代码匹配。



```css
/* 存在性选择器 */
/* 选择所有含有title属性的元素 */
[title] {
  border-bottom: 1px dotted gray;
}
/* 精确匹配属性值选择器 */
/* 选择所有type属性为submit的input元素 */
input[type="submit"] {
  background-color: blue;
  color: white;
}
/* 开头匹配属性值选择器 */
/* 选择所有href属性以'https://'开头的a元素 */
a[href^="https://"] {
  text-decoration: none;
}
/* 结尾匹配属性值选择器 */
/* 选择所有class属性以'-icon'结尾的元素 */
i[class$="-icon"] {
  display: inline-block;
  width: 24px;
  height: 24px;
}
/* 包含匹配属性值选择器 */
/* 选择所有class属性中包含'featured'的元素 */
[class*="featured"] {
  border: 2px solid gold;
}
/* 指定值列表匹配选择器 */
/* 选择所有class属性值包含'warning'单词的元素 */
[class~="warning"] {
  color: red;
}
/* 带连字符属性值匹配选择器 */
/* 选择所有lang属性为'en'或以'en-'开头的元素 */
[lang|="en"] {
  font-family: Arial, sans-serif;
}
```


### 组合选择器
 -  后代选择器`div span{}`：使用空格分开，这个组合器用于选择某个元素内部的所有特定后代元素，不论层级多深。
 -  子代选择器`div>span{}`：子选择器用于选择某个元素的直接子元素。
 -  相邻兄弟选择器`div+span{}`：相邻兄弟选择器用于选择紧接在另一个元素后的同级元素。
 -  一般兄弟选择器 `div~span{}`：一般兄弟选择器用于选择拥有相同父元素且在指定元素之后的同级元素。

 ```css
 /* 所有<div>元素内的<p>元素都会被选中并设置为红色字体。 */
div p {
  color: red;
}
/* 将所有直接位于<ul>元素内的<li>元素的背景色设置为灰色。 */
ul > li {
  background-color: gray;
}
/* 如果一个<p>元素后面紧跟一个<ul>元素，那么这个<ul>元素的上边距将会被设置为0。 */
p + ul {
  margin-top: 0;
}
/* 所有在<h2>元素之后的同级<p>元素都会被设置为粗体。 */
h2 ~ p {
  font-weight: bold;
}
 ```


### 伪元素
伪元素选择器在CSS中用于创建一些不在文档树中的元素，它们用来修饰某些选择器的内容，通常是为元素添加特定的样式效果或插入内容。与伪类不同，伪元素是对文档中元素的抽象，用于描述元素的某些部分或状态。

::: tip
- 从CSS3开始，推荐使用双冒号`::`来区分伪元素和伪类，尽管单冒号`:`仍然被大多数浏览器支持，但为了向前兼容和语义清晰，建议使用双冒号。
- 伪元素并不真实存在于DOM中，因此不能通过JavaScript直接获取或操作它们。
:::

-   `::before`，在选定元素的内容之前插入新内容。
-   `::after`，在选定元素的内容之后插入新内容。
-   `::first-letter`，选择元素文本内容的第一个字母。
-   `::first-line`，选择元素文本内容的第一行。
-   `::selection`，选择用户当前选中的文本部分。
-   `::backdrop`，幕布元素，呈现在顶层显示的任何元素的下方。

```css
/* ::before */
/*  这会在每个<p>段落前插入文本“注意：”，并将其颜色设置为红色。 */
p::before {
  content: "注意：";
  color: red;
}
/* ::after */
/*  这会在每个<div>元素之后添加文本“—— 结束”，并使其右对齐显示为新的一行。 */
div::after {
  content: " —— 结束";
  display: block;
  text-align: right;
}
/* ::first-letter */
/*  会使得每个段落的第一个字母字号加倍且加粗。 */
p::first-letter {
  font-size: 2em;
  font-weight: bold;
}
/* ::first-line */
/*  会将每个段落的第一行文字颜色设为蓝色并转换为大写。。 */
p::first-line {
  color: blue;
  text-transform: uppercase;
}
/* ::selection */
/*  当用户选中文本时，选中部分的背景色变为粉色，文字颜色变为白色。 */
::selection {
  background-color: #FF5E99;
  color: white;
}
```

::: normal-demo backdrop 代码演示
```html
<button id="showDialogBtn">Show a dialog</button>

<dialog id="favDialog">
  <form method="dialog">
    <p>The background shown outside of this dialog is a backdrop.</p>
    <button id="confirmBtn">Close the dialog</button>
  </form>
</dialog>
```
```css
button {
  font-size: 1.2rem;
  padding: 5px 15px;
}

dialog::backdrop {
  background-color: #ccc;
}

```
```js
const showDialogBtn = document.getElementById('showDialogBtn');
const favDialog = document.getElementById('favDialog');
showDialogBtn.addEventListener('click', () => favDialog.showModal());
```
:::
### 伪类
伪类是CSS中一个非常重要的概念，它们用于选择页面中元素的特定状态或特定位置，而无需修改HTML标记。这使得开发者能够基于用户与页面的交互或元素在文档中的位置来改变元素的样式，而不需要额外的JavaScript或复杂的HTML结构。

- 伪类不是真实的DOM元素：它们是一种抽象概念，用来描述元素在某种特定条件下的状态。
- 语法形式：通常，伪类通过在其前面加上一个冒号（:）与元素选择器或其他选择器结合使用，例如a:hover`。
- 动态性：伪类的状态可以随着用户的操作或页面的变化而自动改变，无需编程干预。

#### 状态伪类
- `:active`： - 元素被激活（比如，鼠标点击下）时的样式。
- `:hover`： - 鼠标悬停在元素上时的样式。
- `:focus`： - 元素获得焦点（比如，通过键盘导航到）时的样式。
- `:visited`： - 链接被访问过后的样子。
- `:link`： - 未访问的链接样式。
- `:target`： - 当前URL片段标识符（hash）指向的元素。
- `:enabled / :disabled`： - 控制启用或禁用状态的表单元素。
- `:checked`： - 被选中的单选按钮或复选框。

#### 结构化伪类

- `:first-child`： - 选择作为父元素的第一个子元素的元素。
- `:last-child`： - 选择作为父元素的最后一个子元素的元素。
- `:nth-child(n)`： - 选择父元素中的第n个子元素，n可以是数字、公式（如2n+1）。
- `:nth-last-child(n)`： - 类似于`:nth-child`，但倒序计数。
- `:only-child`： - 如果元素是其父元素的唯一子元素，则选择它。
- `:empty`： - 选择没有任何子元素（包括文本节点）的元素。
- `:root`： - 选择文档的根元素（通常是`<html>`）。

#### 其他伪类

- `:not(selector)`： - 选择不匹配给定选择器的元素。
- `:lang(language)`： - 选择指定语言的元素。
- `:placeholder-shown`： - 输入框显示占位符文本时匹配。
- `:required / :optional`： - 匹配表单元素是否为必填或可选。


