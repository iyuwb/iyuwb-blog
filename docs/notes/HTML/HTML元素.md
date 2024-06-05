---
title: HTML元素
author: 耶温
createTime: 2024/05/13 15:55:04
permalink: /HTML/xxidnvf1/
---
# HTML元素


## HTML元素列表

|  标签   | 解释说明            |  
| :------: | :--------------: | 
|`<!-- ... -->`|HTML内注释 |
|`<!DOCTYPE>`|声明当前HTML文档类型 |
|`<a>`|超链接 |
| `<abbr>`|缩写词 |
| `<address>`|联系信息 |
| `<abbr>`|缩写词 |
| `<area>` |定于区域，关联超链接。仅在`<map>`中使用 |
| `<article>` | 语义化元素，独立结构 |
| `<b>` | 加粗，强调  |
| `<base>` | 指定文档根URL |
| `<bdi>` | 双向隔离元素 |
| `<bdo>` | 双向文本覆盖，可以 改变文字顺序方向 |
| `<bablockquot>` | 块级引用元素，代表其中内容是引用内容 |
| `<button>` | 按钮 |
| `<canvas>` | 画布，通过Javascript绘制图形及图形动画 |
| `<caption>` | 表格标题，通常是`table`第一个子元素 |
| `<cite>` | 作品引用 |
| `<code>` | 行内代码元素 |
| `<col>` | 表格列元素，通常和`<colgroup>`一起使用 |
| `<colgroup>` | 表格列组元素，通常和`<col>`一起使用 |
| `<data>` | 指定内容 |
| `<datalist>` | 建议列表，通常和`option`一起使用 |
| `<dd>` | 描述元素，描述列表 (`<dl>`) 元素中一个术语的描述，通常和`<dt>`，`<dl>`一起使用 |
| `<del>` | 指定删除内容，文字中间会有横线 |
| `<details>` | 详细信息展现，里内容默认会被隐藏 |
| `<dfn>` | 定义术语 |
| `<dialog>` | 对话框 | 
| `<div>` | 通用容器，常用块级元素 |
| `<dl>` | 描述列表元素，包含术语定义以及描述的列表，通常和`<dt>`，`<dl>`一起使用 |
| `<dt>` | 术语元素，通常和`<dd>`，`<dl>`一起使用 |
| `<embed>` | 外部内容嵌入元素 （不建议使用）建议使用 `<object>` 或 `<iframe>` 元素|
| `<fencedframe>`[实验] | 类似于`<iframe>`元素，相比会更安全 |
| `<fieldset>` | 分组元素，对表单中的控制元素进行分组 |
| `<figure>` | 独立内容元素，可附标题内容元素 |
| `<figcaption>` |`<figure>`内标题元素，可为 `<figure>`添加一个标题|
| `<footer>` |页脚，语义化元素|
| `<form>` |表单元素，包含交互控件等等，可向服务器提交信息|
| `<h1>` - `<h6>` |标题，从`<h1>`到`<h6>`,一级标题到六级标题|
| `<head>` |`<html>`头部元素，包含网页的标题介绍等等|
| `<header>` |网页头部部分元素，语义化元素|
| `<hgroup>` |文档标题和与标题相关联的内容，它将一个 `<h1>`–`<h6>` 元素与一个或多个 `<p>` 元素组合在一起。|
| `<br>` |分割线，一条直线|
| `<html>` |网页根元素|
| `<i>` |斜体，术语文本元素|
| `<iframe>` |内联框架元素，可以嵌入其他页面内容|
| `<img>` |图像嵌入元素|
| `<input>` |输入（表单输入）元素，交互式控件|
| `<ins>` |新被插入文档中的文本|
| `<kbd>` |键盘输入元素，表示用户输入，它将产生一个行内元素，以浏览器的默认 monospace 字体显示。|
| `<legend>` |分组元素标题，表示 `<fieldset>` 内容的标题|
| `<li>` |列表元素，通常用在`<ol>`有序列表`<ul>`无序列表和`<menu>`菜单元素中|
| `<link>` |外部资源链接元素，通常在`<head>`中使用，引用CSS样式表或者网站图标等|
| `<main>` |网页主体部分，语义化元素|
| `<map>` |`<map>` 元素与 `<area>` 元素一起使用来定义一个图像映射（一个可点击的链接区域）|
| `<mark>` |高亮，标记或突出显示的文本|
| `<menu>` |菜单元素，通常和`<li>`列表元素搭配使用|
| `<meta>` |元数据元素，可以传递一些元数据信息给特定的系统|
| `<meter>` |仪表，显示已知范围的标量值或者分数值|
| `<nav>` |导航部分，语义化元素|
| `<noscript>` |当页面不支持或浏览器当前关闭脚本时展示的HTML部分。|
| `<object>` |嵌入对象元素，可以引入嵌入外部资源|
| `<ol>` |有序列表，通常和`<li>`一起使用|
| `<optgroup>` |选择分组元素，通常和`<select>`与`<option>`一起使用|
| `<option>` |包含项，用于定义在 `<select>`, `<optgroup>`或`<datalist>`元素中包含的项|
| `<output>` |结果输出元素，表示计算或用户操作的结果|
| `<p>` |段落元素|
| `<picture>` |图片元素，通过包含零或多个 `<source>` 元素和一个 `<img>` 元素来为不同的显示/设备场景提供最合适图像版本|
| `<portal>`[实验] | 创建可以导航到不同URL的子窗口或视图，同时保持与主文档之间的某些交互和状态共享。`<portal>`元素的设计目标之一是提供一种更安全、更可控的iframe替代方案，以改善跨源内容嵌入的安全性和用户体验|
| `<pre>` | 元素中内容会按原文中的编排显示，会显示空格和换行等 |
|`progress`| 进度条元素 |
|`q`| 引用标签，大多数浏览器会自动添加引号 |
|`rp`| 为不能使用 `<ruby>` 元素展示拼音等注解的浏览器，提供随后的圆括号|
|`rt`| 发音元素，包含字符的发音，通常和`<ruby>`一起使用|
|`ruby`| 用来展示文字注音或字符注释 |
|`s`| 删除线 |
|`samp`| 标识计算机程序输出 |
|`script`| 脚本元素，嵌入可执行代码，通常用作嵌入或者引用 JavaScript 代码|
|`samp`| 标识计算机程序输出 |
|`search`| 搜索元素 |
|`section`| 部分，语义化标签|
|`select `| 选择器元素，通常和`option`一起使用|
|`slot `|Web组件插槽元素|
|`small `|备注元素，旁注和小字印刷|
|`source `|媒体或图像资源元素，为`<picture>`、`<audio>`和`<video>`元素指定一个或多个媒体资源|
|`span `|通用行内块元素|
|`strong`|加粗|
|`style`|样式信息元素|
|`sub`|下标元素|
|`summary`|摘要展现元素，和父元素 `<details>` 一起使用|
|`sup`|上标元素|
|`table`|表格元素|
|`tbody`|表格主体元素|
|`td`|表格数据元素|
|`template`|内容模板元素|
|`textarea`|文本区域元素，允许用户输入大量自由格式文本的场景|
|`tfoot`|表格中各列的汇总行|
|`th`|表格内的表头单元格|
|`thead`|表格的列头的行|
|`time`|（日期）时间元素|
|`title`|定义网页的的标题，始终在`<head>`中使用|
|`track`|字幕元素|
|`u`|下划线元素|
|`ul`|无序列表元素|
|`var`|表示变量的元素|
|`video`|视频嵌入元素|
|`wbr`|换行机会元素|

## 基础

### `<!DOCTYPE>`

定义HTML文档类型。

-   `<!DOCTYPE>` 声明通常是文档的第一行，位于 `<html>` 标签之前。
-   `<!DOCTYPE>` 声明不是一个 HTML 标签，因此不需要关闭标签。


`<!DOCTYPE html>`：为现在HTML5声明标签，也是最常用的，并且也是HTML5唯一的声明方式。

:::details 以下为常见DOCTYPE声明，点击展开查看
-   HTML 5
    -   `<!DOCTYPE html>`
-   HTML 4.01 Strict
    -   这个 DTD 包含所有 HTML 元素和属性，但不包括表象或过时的元素（如 font ）。框架集是不允许的。
    -   `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">`
-   HTML 4.01 Transitional
    -   这个 DTD 包含所有 HTML 元素和属性，包括表象或过时的元素（如 font ）。框架集是不允许的。
    -   `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">`
-   HTML 4.01 Frameset
    -   这个 DTD 与 HTML 4.01 Transitional 相同，但是允许使用框架集内容。
    -   `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">`
-   XHTML 1.0 Strict
    -   这个 DTD 包含所有 HTML 元素和属性，但不包括表象或过时的元素（如 font ）。框架集是不允许的。结构必须按标准格式的 XML 进行书写。
    -   `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">`
-   XHTML 1.0 Transitional
    -   这个 DTD 包含所有 HTML 元素和属性，包括表象或过时的元素（如 font ）。框架集是不允许的。结构必须按标准格式的 XML 进行书写。
    -   `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`
-   XHTML 1.0 Frameset
    -   这个 DTD 与 XHTML 1.0 Transitional 相同，但是允许使用框架集内容。
    -   `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">`
-   XHTML 1.1
    -   这个 DTD 与 XHTML 1.0 Strict 相同，但是允许您添加模块。
    -   `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">`
:::

### `<html> ... </html>` 

HTML 文档

-   `<html>` 标签告知浏览器这是一个 HTML 文档。
-   `<html>` 标签是 HTML 文档中最外层的元素。
-   `<html>` 标签是所有其他 HTML 元素（除了 <!DOCTYPE> 标签）的容器。

属性：
-   `manifest`： HTML5新属性，定义一个 URL，在这个 URL 上描述了文档的缓存信息

### `<title> ... </title>` 
文档标题

### `<body> ... </body>` 
文档主体

### `<h1> ... </h1> to <h6> ... </h6>` 
HTML内容标题

### `<p> ... </p>`
段落

### `<br/>`
换行

### `<hr/>`
隔离线，水平线

### `<!-- ... -->`
注释，网页不会显示

### 基础演示
::: normal-demo  代码演示 点击展开查看代码

```html
<!-- 定义HTML文档类型 -->
<!DOCTYPE html>
<!-- html文档 -->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- 文档标题 -->
    <title>Document</title>
</head>
<!-- 文档主体 -->
<body>
    <!-- 一级标题至6级标题 -->
    <h3>下面演示标题：</h3>
    <h1>一级标题</h1>
    <h2>二级标题</h2>
    <h3>三级标题</h3>
    <h4>四级标题</h4>
    <h5>五级标题</h5>
    <h6>六级标题</h6>
    <!-- 段落 -->
    <h3>下面演示段落：</h3>
    <p>先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。</p>
    <!-- 换行 -->
    <h3>下面演示换行：</h3>
    <div>先帝创业未半而中道崩殂，<br/>今天下三分，<br/>益州疲弊，<br/>此诚危急存亡之秋也。</div>
    <h3>下面演示隔离行，分割线：</h3>
    <hr/>
    END...
</body>
</html>

```
:::