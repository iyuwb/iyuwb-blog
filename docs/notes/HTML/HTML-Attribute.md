---
title: HTML-Attribute
author: 耶温
createTime: 2024/07/25 20:40:36
permalink: /HTML/ts3nvnt6/
---





## HTML 属性

> 所有 HTML 属性以及它们可在哪些元素中使用。

| 属性名称 | 属性介绍 | 应用场景 |
| --- | --- | --- |
| `accept` | 定义 `<input type="file">` 允许上传的文件类型。 | 限制文件上传的文件类型。 |
| `accept-charset` | 定义 `<form>` 允许提交的字符集。 | 限定表单提交的字符集。 |
| `accesskey` | 定义快捷键，允许用户通过键盘快速访问元素。 | 为元素定义快捷键。 |
| `action` | 定义 `<form>` 提交的 URL。 | 指定表单提交的目标 URL。 |
| `alt` | 定义 `<img>` 或 `<input type="image">` 的替代文本。 | 提供图像的替代文本。 |
| `async` | 定义 `<script>` 是否异步加载。 | 异步加载脚本。 |
| `autocomplete` | 定义 `<form>` 或 `<input>` 是否启用自动完成功能。 | 启用或禁用自动完成。 |
| `autofocus` | 定义 `<input>` 或 `<button>` 是否在页面加载时自动获得焦点。 | 自动聚焦到表单元素。 |
| `autoplay` | 定义 `<audio>` 或 `<video>` 是否自动播放。 | 自动播放音频或视频。 |
| `charset` | 定义 `<meta>` 或 `<script>` 的字符集。 | 设置文档的字符集。 |
| `checked` | 定义 `<input type="checkbox">` 或 `<input type="radio">` 是否被选中。 | 设置复选框或单选按钮的初始状态。 |
| `cite` | 定义 `<blockquote>` 或 `<q>` 的引用来源。 | 显示引用来源。 |
| `class` | 定义一个或多个类名，用于 CSS 选择器或 JavaScript。 | 为元素分配样式类或行为类。 |
| `cols` | 定义 `<textarea>` 的宽度。 | 设置文本区域的宽度。 |
| `colspan` | 定义 `<td>` 或 `<th>` 横跨的列数。 | 设置单元格横跨的列数。 |
| `content` | 定义 `<meta name="...">` 的内容。 | 设置元数据的内容。 |
| `contenteditable` | 定义元素是否可编辑。 | 使元素可编辑。 |
| `controls` | 定义 `<audio>` 或 `<video>` 是否显示播放控件。 | 显示播放控件。 |
| `coords` | 定义 `<area>` 的坐标。 | 设置图像映射的坐标。 |
| `data` | 定义 `<object>` 的数据源。 | 设置对象的数据源。 |
| `data-*` | 定义自定义数据属性，用于存储私有数据。 | 存储与元素相关的自定义数据。 |
| `datetime` | 定义 `<abbr>` 或 `<time>` 的日期时间。 | 设置日期时间。 |
| `default` | 定义 `<track>` 或 `<source>` 是否是默认资源。 | 设置默认资源。 |
| `defer` | 定义 `<script>` 是否延迟加载。 | 延迟加载脚本。 |
| `dir` | 定义文本的方向，如从左至右（ltr）或从右至左（rtl）。 | 设置文本的方向。 |
| `dirname` | 定义 `<input type="text">` 的方向名称。 | 设置文本输入的方向名称。 |
| `disabled` | 定义元素是否禁用。 | 禁用表单元素。 |
| `download` | 定义 `<a>` 是否应该下载而不是导航。 | 下载文件而不是导航。 |
| `draggable` | 定义元素是否可以被拖动。 | 使元素可拖动。 |
| `enctype` | 定义 `<form>` 的编码类型。 | 设置表单提交的数据编码方式。 |
| `enterkeyhint` | 提示输入法引擎（IME）预期的下一步动作。 | 提示输入法引擎预期的下一步动作。 |
| `for` | 定义 `<label>` 关联的 `<input>`。 | 关联标签和输入元素。 |
| `form` | 定义 `<input>`、`<button>` 等属于哪个 `<form>`。 | 关联表单元素到表单。 |
| `formaction` | 定义 `<input type="submit">` 提交到的 URL。 | 设置提交按钮的目标 URL。 |
| `headers` | 定义 `<td>` 或 `<th>` 关联的 `<th>` 元素。 | 关联单元格到表头。 |
| `height` | 定义 `<img>`、`<video>` 或 `<canvas>` 的高度。 | 设置元素的高度。 |
| `hidden` | 定义元素是否隐藏。 | 隐藏元素。 |
| `high` | 定义 `<meter>` 的高值范围。 | 设置计量范围的高值。 |
| `href` | 定义 `<a>`、`<area>`、`<link>` 等的链接目标。 | 设置链接目标。 |
| `hreflang` | 定义 `<a>` 或 `<link>` 的语言。 | 设置链接的语言。 |
| `http-equiv` | 定义 `<meta http-equiv="...">` 的 HTTP 等价属性。 | 设置 HTTP 等价属性。 |
| `id` | 定义元素的唯一标识符。 | 为元素分配唯一的标识符。 |
| `inert` | 定义元素是否可交互。 | 阻止用户与元素交互。 |
| `inputmode` | 定义输入法引擎（IME）的预期输入类型。 | 提示输入法引擎预期的输入类型。 |
| `ismap` | 定义 `<img>` 是否是图像地图。 | 设置图像作为图像地图。 |
| `kind` | 定义 `<track>` 的类型。 | 设置字幕轨道的类型。 |
| `label` | 定义 `<track>` 的标签。 | 设置字幕轨道的标签。 |
| `lang` | 定义元素的语言。 | 定义元素的语言。 |
| `list` | 定义 `<input type="text">` 关联的 `<datalist>`。 | 关联输入到数据列表。 |
| `loop` | 定义 `<audio>` 或 `<video>` 是否循环播放。 | 循环播放音频或视频。 |
| `low` | 定义 `<meter>` 的低值范围。 | 设置计量范围的低值。 |
| `max` | 定义 `<input type="number">` 或 `<input type="range">` 的最大值。 | 设置数字或范围输入的最大值。 |
| `maxlength` | 定义 `<input type="text">` 或 `<textarea>` 的最大长度。 | 设置文本输入的最大长度。 |
| `media` | 定义 `<link>` 或 `<style>` 的媒体类型。 | 设置样式表的媒体类型。 |
| `method` | 定义 `<form>` 的提交方法（GET 或 POST）。 | 设置表单提交的方法。 |
| `min` | 定义 `<input type="number">` 或 `<input type="range">` 的最小值。 | 设置数字或范围输入的最小值。 |
| `multiple` | 定义 `<input type="email">` 或 `<input type="file">` 是否接受多个值。 | 允许多个值。 |
| `muted` | 定义 `<audio>` 或 `<video>` 是否静音。 | 设置音频或视频静音。 |
| `name` | 定义元素的名称。 | 为元素分配名称。 |
| `novalidate` | 定义 `<form>` 是否跳过验证。 | 跳过表单验证。 |
| `open` | 定义 `<details>` 是否默认打开。 | 设置 `<details>` 默认打开。 |
| `optimum` | 定义 `<meter>` 的最佳值。 | 设置计量的最佳值。 |
| `pattern` | 定义 `<input type="text">` 的验证模式。 | 设置文本输入的验证模式。 |
| `placeholder` | 定义 `<input type="text">` 的占位符文本。 | 设置文本输入的占位符文本。 |
| `popover` | 已废弃的属性，用于定义弹出窗口。 | 不再推荐使用。 |
| `popovertarget` | 定义弹出窗口的目标元素。 | 设置弹出窗口的目标元素。 |
| `popovertargetaction` | 定义弹出窗口触发的动作。 | 设置弹出窗口触发的动作。 |
| `poster` | 定义 `<video>` 的海报图像。 | 设置视频的海报图像。 |
| `preload` | 定义 `<audio>` 或 `<video>` 的预加载行为。 | 设置音频或视频的预加载行为。 |
| `readonly` | 定义 `<input type="text">` 或 `<textarea>` 是否只读。 | 设置文本输入或文本区域只读。 |
| `rel` | 定义 `<a>`、`<link>` 的关系类型。 | 设置链接的关系类型。 |
| `required` | 定义 `<input>` 或 `<select>` 是否必须填写。 | 设置表单元素必填。 |
| `reversed` | 定义 `<ol>` 是否反向排序。 | 设置有序列表反向排序。 |
| `rows` | 定义 `<textarea>` 的行数。 | 设置文本区域的行数。 |
| `rowspan` | 定义 `<td>` 或 `<th>` 纵跨的行数。 | 设置单元格纵跨的行数。 |
| `sandbox` | 定义 `<iframe>` 的安全沙箱。 | 设置 iframe 的安全沙箱。 |
| `scope` | 定义 `<th>` 的作用域。 | 设置表头的作用域。 |
| `selected` | 定义 `<option>` 是否被选中。 | 设置选项的初始选中状态。 |
| `shape` | 定义 `<area>` 的形状。 | 设置图像映射的形状。 |
| `size` | 定义 `<select>` 的尺寸。 | 设置下拉列表的尺寸。 |
| `sizes` | 定义 `<img>` 或 `<link>` 的尺寸。 | 设置图像或链接的尺寸。 |
| `span` | 定义 `<colgroup>` 或 `<th>` 的跨度。 | 设置列组或表头的跨度。 |
| `spellcheck` | 定义是否启用拼写检查。 | 启用或禁用拼写检查。 |
| `src` | 定义 `<img>`、`<script>`、`<iframe>` 等的源文件。 | 设置元素的源文件。 |
| `srcdoc` | 定义 `<iframe>` 的内联文档。 | 设置 iframe 的内联文档。 |
| `srclang` | 定义 `<track>` 的语言。 | 设置字幕轨道的语言。 |
| `srcset` | 定义 `<img>` 或 `<source>` 的多个源文件。 | 设置图像的多个源文件。 |
| `start` | 定义 `<ol>` 的起始编号。 | 设置有序列表的起始编号。 |
| `step` | 定义 `<input type="number">` 或 `<input type="range">` 的步长。 | 设置数字或范围输入的步长。 |
| `style` | 定义元素的内联样式。 | 为元素分配内联样式。 |
| `tabindex` | 定义元素在页面中的 tab 顺序。 | 控制元素的 tab 顺序。 |
| `target` | 定义 `<a>` 或 `<form>` 的目标窗口或框架。 | 设置链接或表单的目标窗口或框架。 |
| `title` | 定义元素的提示信息。 | 显示元素的提示信息。 |
| `translate` | 定义元素的内容是否应被翻译。 | 控制元素内容的翻译。 |
| `type` | 定义 `<input>`、`<script>`、`<button>` 等的类型。 | 设置元素的类型。 |
| `usemap` | 定义 `<img>` 或 `<input type="image">` 的图像映射。 | 设置图像映射。 |
| `value` | 定义 `<input>`、`<option>` 或 `<progress>` 的值。 | 设置元素的值。 |
| `width` | 定义 `<img>`、`<video>` 或 `<canvas>` 的宽度。 | 设置元素的宽度。 |
| `wrap` | 定义 `<textarea>` 的换行方式。 | 设置文本区域的换行方式。 |


## Global 全局属性
>  全局属性是可与所有 HTML 元素一起使用的属性。

| 属性名称 | 属性介绍 | 应用场景 |
| --- | --- | --- |
| `accesskey` | 定义快捷键，允许用户通过键盘快速访问元素。 | 为元素定义快捷键。 |
| `class` | 定义一个或多个类名，用于 CSS 选择器或 JavaScript。 | 为元素分配样式类或行为类。 |
| `contenteditable` | 定义元素是否可编辑。 | 使元素可编辑。 |
| `data-*` | 定义自定义数据属性，用于存储私有数据。 | 存储与元素相关的自定义数据。 |
| `dir` | 定义文本的方向，如从左至右（ltr）或从右至左（rtl）。 | 设置文本的方向。 |
| `draggable` | 定义元素是否可以被拖动。 | 使元素可拖动。 |
| `enterkeyhint` | 规定虚拟键盘上的回车键文本。 | 规定虚拟键盘上的回车键文本。 |
| `hidden` | 定义元素是否隐藏。 | 隐藏元素。 |
| `id` | 定义元素的唯一标识符。 | 为元素分配唯一的标识符。 |
| `inert` | 定义元素是否可交互。 | 阻止用户与元素交互。 |
| `inputmode` | 指定虚拟键盘的模式。| 指定虚拟键盘的模式。 |
| `lang` | 定义元素的语言。 | 定义元素的语言。 |
| `popover` | 已废弃的属性，用于定义弹出窗口。 | 不再推荐使用。 |
| `spellcheck` | 定义是否启用拼写检查。 | 启用或禁用拼写检查。 |
| `style` | 定义元素的内联样式。 | 为元素分配内联样式。 |
| `tabindex` | 定义元素在页面中的 tab 顺序。 | 控制元素的 tab 顺序。 |
| `title` | 定义元素的提示信息。 | 显示元素的提示信息。 |
| `translate` | 定义元素的内容是否应被翻译。 | 控制元素内容的翻译。 |
