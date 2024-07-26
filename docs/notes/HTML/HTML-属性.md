---
title: HTML-属性
author: 耶温
createTime: 2024/05/13 16:07:12
permalink: /HTML/5yqunq5r/
---
# HTML属性

## 全局属性

|   属性   | 描述 | 值 |
| :------: | :--------------: | :--: |
| `accesskey` | 快捷键 |   可打印字符   |
| `autocapitalize` | 是否自动大写（safari不支持） |   `off`、`on`、`words`、`characters`   |
| `autofocus` | 自动获得获得焦点 |   布尔值：`false`、`true`  |
| `class` | 类名 |   空格分隔的元素的类名列表  |
| `contenteditable` | 元素是否可以编辑（firefox不支持） | `false`、`true`、`plaintext-only` |
| `data-*` | 自定义数据属性 |   `data-xxx`  |
| `dir` | 元素中文本方向  |   `ltr`、`rtl`、`auto` |
| `draggable` | 是否拖拽  |   `true`、`false` |
| `enterkeyhint` | 虚拟键盘回车键显示样式  |   `enter`、`done` 、`open`、`next`、`previous`、`search`、`send`|
| `exportparts` | 将隐藏部分从一个嵌套的影子树(shadow tree)中过渡性地导出到一个包含该树的常规树(light tree)中 | 暂无 |
| `hidden` | 隐藏元素 |   布尔属性：`true`、`false`  |
| `id` | 唯一的标识符 |  唯一的标识符字符串 |
| `inert` | 忽略元素（惰性），阻止各种事件 |  布尔属性：`true`、`false`  |
| `inputmode` | 输入模式，显示适合的虚拟键盘 | `none`、`text` 、`numeric`、`tel`、`search`、`email`、`url`  |
| `is` | 使用自定义元素 |   自定义元素名称 |
| `itemid` | 唯一的全局标识符，microdata数据模型属性||   字符串  |
| `itemprop` | 添加属性名，microdata数据模型属性| |   字符串  |
| `itemref` | 添加注解，microdata数据模型属性|   字符串  |
| `itemscope` | 定义一个新的实体，microdata数据模型属性|    布尔属性：`true`、`false`   |
| `itemtype` | 定义实体类型，URL，指向表示该实体的文档，microdata数据模型属性|   字符串   |
| `lang` | 设置语言 |  格式为 BCP47 的字符串  |
| `nonce` | 增强安全性 |  字符串  |
| `part` | 可以使用伪元素“::part”来选择 shadow 树中指定元素并设置其样式 |  已空格隔开的part属性名称组成的列表  |
| `popover` | 指定一个元素为弹出框元素 | `auto`、`manual` |
| `slot` | 插槽 | 字符串 |
| `spellcheck` | 是否检查元素的拼写错误 | ` `、`true`、`false` |
| `style` | 样式 |CSS样式 |
| `tabindex` | 是否可以聚焦 | 整数 |
| `title` | 元素描述 | 字符串 |
| `translate` | 是否翻译 | ` `、`true`、`false` |
| `virtualkeyboardpolicy` | 聚焦展示虚拟键盘 | `auto`、`manual` |

## 其他属性

|   属性   | 描述 | 值 |生效元素|
| :------: | :--------------: | :--: |:------: |
| `crossorigin` | 处理跨源请求 |    `anonymous`、`use-credentials`   |`<audio>`、`<img>`、`<link>`、`<script>`、`<video>` |
| `dirname` | 用于在提交表单时发送元素的方向性  |    `rtl`、`ltl`   |`<textarea>`和部分`<input>` |
| `disabled` | 禁用元素  |   无  |`<button>`、`<fieldset>`、`<optgroup>`、`<option>`、`<select>`、`<textarea> `和 `<input>` |
| `elementtiming` | 暂无  |   暂无 |  暂无 |
| `for` | 该标签所描述的表单元素  |  相关的表单元素的id 或者 是一个空格分隔的列表 |`<label>`、`<output>` |
| `rel` |  所链接的资源与当前文档的关系 |  一组无序的、唯一的、用空格隔开的关键字  | `<a>`、`<area>` 、 `<link>` |

## Input属性

`<input> `元素包含的属性包含全局的 HTML 属性和以下这些额外属性：

|   属性   | 类型（TYPE） |   描述   |
| :------: | :--------------: | :--: |
| `accept`    | 	`file`   |   文件上传控件中接受的预期文件类型  |
| `alt`    | 	`image`   |   图片类型的 alt 属性  |
| `autocomplete` | `checkbox`、`radio`和按钮以外的所有类型  |  表单自动填充特性提示 |
| `capture` | `file`  | 文件上传控件中媒体捕获方法 |
| `checked` | `checkbox`、`radio`  | 是否选中 |
| `dirname` | `search`、`text` | 表单字段的名称，用于在提交表单时发送元素的方向性 |
| `disabled` | 所有类型 | 是否禁用 |
| `form` | 所有类型 | 在`<input>`控件联系到表单元素 |
| `formaction` | `image`、`submit` | 提交表单的URL地址 |
| `formenctype` | `image`、`submit` | 提交表单时使用的编码类型|
| `formmethod` | `image`、`submit` | 提交表单时所使用的HTTP方法 |
| `formnovalidate` | `image`、`submit` | 提交时是否跳过验证表单控件 |
| `formtarget` | `image`、`submit` | 提交表单时的浏览上下文|
| `height` | `image` | 元素高度|
| `list` |`hidden`、`password`、`checkbox`、`radio`和按钮以外的所有类型 | 输入建议，和`<datalist>`的`id`属性绑定 |
| `max` |`date`、`month`、`week`、`time`、`datatime-local`、`number`、`range`  | 最大值|
|`maxlength` | `text`、`search` 、`url` 、`tel` 、`email` 、`password` | `value`的最大字符长度|
| `min` |`date`、`month`、`week`、`time`、`datatime-local`、`number`、`range`  | 最小值|
| `minlength` | `text`、`search` 、`url` 、`tel` 、`email` 、`password` | `value`的最小字符长度|
| `multiple` | `email`、`file` | 布尔值，是否允许多选|
| `name` | 所有类型 | 表单的控件名称，提交时作为键值对的键一起提交|
| `pattern` | `text`、`search`、`url`、`tel`、`email`、`password` |正则匹配|
| `placeholder` | `text`、`search`、`url`、`tel`、`email`、`password`、`number` |当没有值设定时，出现在表单控件上的文字|
| `readonly` | `hidden`、`range`、`color`、`checkbox`、`radio` 和按钮以外的所有类型 | 布尔值。能否编辑值|
| `required` | `hidden`、`range`、`color` 和按钮以外的所有类型 | 布尔值，是否必填|
| `size` | `text`、`search`、`url`、`tel`、`email`、`password`| 控件的尺寸 |
| `src` | `image`| 图片资源地址 |
| `step` | `data`、`month`、`week`、`time`、`datetime-local`、`number`、`range`| 步进值 |
| `type` | 所有类型| 	表单控件的类型 |
| `value` | 所有类型| 表单控件的初始值 |
| `width` | `image`| 元素宽度 |


## 属性详情示例：

### 自动填充：`autocomplete`

### 输入建议：`list`

给输入框提供一个预先定义的输入建议列表和`datalist`一起使用

```html
<input  list="data-list" type='text'  name="输入框"  />
<datalist id="data-list">
  <option value="输入建议1"></option>
  <option value="输入建议1"></option>
  <option value="输入建议1"></option>
</datalist>
```
::: normal-demo date 代码演示
```html
<div>请点击输入<div>
<input  list="data-list" type='text'  name="输入框"  />
<datalist id="data-list">
  <option value="输入建议1"></option>
  <option value="输入建议1"></option>
  <option value="输入建议1"></option>
</datalist>
```
:::


### 正则匹配：`pattern`
规定一个表单控件的值应该匹配正则表达式,如果`value`不满足正则匹配,`patternMismatch` 将为 `true`。当为 `true` 时，该元素与 `:invalid` CSS 伪类匹配。为`false`时与 `:valid `匹配

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